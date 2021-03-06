﻿using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using PiadaAPI.Helpers;
using PiadaAPI.Models;
using PiadaAPI.Repository;
using PiadaAPI.ViewModels;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Tweetinvi;
using Tweetinvi.Models;
using Tweetinvi.Parameters;

namespace PiadaAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [Authorize(AuthenticationSchemes = "Bearer")]
    public class DashboardController : ControllerBase
    {
        private IUserRepo _userRepo;
        private IContextRepo _contextRepo;
        private IHelperService _helper;

        public DashboardController(IUserRepo userRepo, IContextRepo contextRepo, IHelperService helper)
        {
            _userRepo = userRepo;
            _contextRepo = contextRepo;
            _helper = helper;
        }
        [HttpGet]
        public async Task<ActionResult> Index()
        {
            string userId = User.Claims.First(x => x.Type == "UserID").Value;
            ApplicationUser user = await _userRepo.GetUserById(userId);
            
            var apidetailsempty = _contextRepo.IsDetailsEmpty(user);
            var pullDetails = _contextRepo.GetUserPullDetails(user);

            //calculate daily pull 
            double days = (DateTime.UtcNow - user.DateUpdated).TotalDays;
            double daypull = pullDetails.Count() / days;

            return Ok(new
            {
                user.Firstname,
                user.Lastname,
                user.Email,
                apidetailsempty,
                details = pullDetails,
                totalpull = pullDetails.Count(),
                dailypull = string.Format("{0:F2}", daypull)
            });
        }

        [HttpPost]
        public async Task<ActionResult> UpdateApiDetails([FromBody]EditApiDetailsViewModel model)
        {
            if (ModelState.IsValid)
            {
                string userId = User.Claims.First(x => x.Type == "UserID").Value;
                ApplicationUser user = await _userRepo.GetUserById(userId);
                APIDetails details = _contextRepo.GetAPIDetails(user);
                if (details == null)
                {
                    var apiDetails = new APIDetails()
                    {
                        User = user,
                        ApiKey = model.APIKey,
                        ApiSecretKey = model.APISecretKey,
                        AccessTokenSecret = model.AccessTokenSecret,
                        AccessToken = model.AccessToken,
                        DateUpdated = DateTime.UtcNow
                    };
                    _contextRepo.Create(apiDetails);
                }
                else
                {

                    details.ApiKey = model.APIKey;
                    details.ApiSecretKey = model.APISecretKey;
                    details.AccessTokenSecret = model.AccessTokenSecret;
                    details.AccessToken = model.AccessToken;
                    details.DateUpdated = DateTime.UtcNow;
                    _contextRepo.Update(details);

                }

                return Ok();
            }
            return BadRequest();
        }

        [HttpGet]
        public async Task<ActionResult> GetApiDetails()
        {
            string userId = User.Claims.First(x => x.Type == "UserID").Value;
            ApplicationUser user = await _userRepo.GetUserById(userId);
            var apiDetails = _contextRepo.GetAPIDetails(user);
            return Ok(new
            {
                apiDetails.AccessToken,
                apiDetails.AccessTokenSecret,
                apiDetails.ApiKey,
                apiDetails.ApiSecretKey,
                apiDetails.DateUpdated
            });
        }

        [HttpPost]
        public async Task<ActionResult> PullTweets([FromBody]PullTweetViewModel model)
        {
            if (ModelState.IsValid)
            {
                var userId = User.Claims.First(x => x.Type == "UserID").Value;
                var user = await _userRepo.GetUserById(userId);
                APIDetails details = _contextRepo.GetAPIDetails(user);
                var tweet = _helper.GetTweets(model, details);
                if (tweet.Any())
                {
                    string filename = model.Title;
                    bool fileExist = _contextRepo.FileNameExist(model.Title);
                    if (fileExist)
                    {
                        filename = model.Title + "_" + Guid.NewGuid();
                    }
                    _helper.CreateCsv(tweet, filename);
                    var pullDetails = new PullDetails()
                    {
                        User = user,
                        Title = model.Title,
                        Keyword = model.Keyword,
                        FileName = filename,
                        Quantity = model.Quantity,
                        Date = DateTime.UtcNow
                    };
                    _contextRepo.Create(pullDetails);

                    return Ok();
                }
                return Ok("tweet is null");

            }
            return BadRequest();

        }

        [HttpGet]
        public FileResult Download([FromQuery]string filename)
        {
            var fileName = $"{filename}.xlsx";
            var filepath = $"ExcelFiles/{fileName}";
            byte[] fileBytes = System.IO.File.ReadAllBytes(filepath);
            return File(fileBytes, "application/x-msdownload", fileName);
        }

        [HttpPost]
        public async Task<ActionResult> GetCountryTrend([FromBody]TrendViewModel model)
        {
            if (ModelState.IsValid)
            {
                var userId = User.Claims.First(x => x.Type == "UserID").Value;
                var user = await _userRepo.GetUserById(userId);
                APIDetails details = _contextRepo.GetAPIDetails(user);
                long newWoeid = long.Parse(model.WoeID);
                var trends = _helper.GetTrendsFromPlace(newWoeid, details);
                
                return Ok(new
                {
                    location=trends.woeIdLocations,
                    trending = trends.Trends
                });
            }
            return BadRequest("Woe ID is empty");

        }

        [HttpGet]
        public ActionResult Visualize([FromQuery]string filename)
        {
            var fileName = $"{filename}.xlsx";
            var filepath = $"ExcelFiles/{fileName}";
            var excelToJson = _helper.GetExcelFile(filepath);
            var countryStates = ReadJson();

            //the node for showing my tweet and children
            List<ExcelNodes> excelNodes = new List<ExcelNodes>();

            List<ExcelNodesChild> excelNodeChild = new List<ExcelNodesChild>();

            //the json with my tweets
            List<ExcelJson> tweetJsons = new List<ExcelJson>();

            
            foreach (var country in countryStates)
            {
                foreach (var state in country.States)
                {
                    foreach (var tweet in excelToJson)
                    {
                        if (tweet.Location.Contains(","))
                        {
                            string[] loc = tweet.Location.Split(',');
                            if (loc[0] == state)
                            {
                                var newTweet = new ExcelJson() { Tweet = tweet.Tweet, Location = loc[0], Amount = tweet.Amount };
                                tweetJsons.Add(newTweet);
                            }
                        }

                    }
                    var stateTweet = tweetJsons.Where(x => x.Location == state);
                    int total = 0;
                    if (stateTweet.Any())
                    {
                        
                        foreach (var stt in stateTweet)
                        {
                            
                            total += Convert.ToInt32(stt.Amount);
                        }
                        var newStateTweet = new ExcelNodesChild() { State = state, Country = country.Country, Total = total, ShowChildren = false, Children = stateTweet.ToList() };
                        excelNodeChild.Add(newStateTweet);
                    }
                }
                var countryTweet = excelNodeChild.Where(x => x.Country == country.Country);
                if (countryTweet.Any())
                {
                    var newCountryTweet = new ExcelNodes() { Country = country.Country, Children = countryTweet.ToList(), ShowChildren = false };
                    excelNodes.Add(newCountryTweet);
                }
            }
               
            return Ok(excelNodes);
        }


        
        public List<Countries> ReadJson()
        {
            var fileName = "countrystates.json";
            var filepath = $"Files/{fileName}";
            var file = _helper.ReadJson(filepath);
            var tojson = JsonConvert.DeserializeObject<List<Countries>>(file);
            
            return tojson;
            
        }
    }
}
