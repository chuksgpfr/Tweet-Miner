using Newtonsoft.Json;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using PiadaAPI.Models;
using PiadaAPI.ViewModels;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using Tweetinvi;
using Tweetinvi.Models;
using Tweetinvi.Parameters;

namespace PiadaAPI.Helpers
{
    public interface IHelperService
    {
        IEnumerable<ITweet> GetTweets(PullTweetViewModel model, APIDetails details);
        void CreateCsv(IEnumerable<ITweet> tweets, string title);
        IPlaceTrends GetTrendsFromPlace(long woeid, APIDetails details);
        List<ExcelJson> GetExcelFile(string filepath);
        string ReadJson(string filepath);
    }

    class HelperService : IHelperService
    {
        public void CreateCsv(IEnumerable<ITweet> tweets, string title)
        {
            string folder = "ExcelFiles";
            FileInfo file = new FileInfo(Path.Combine(folder,title+".xlsx"));

            using(ExcelPackage package = new ExcelPackage(file))
            {
                ExcelWorksheet worksheet = package.Workbook.Worksheets.Add(title);

                worksheet.Cells["A1"].Value = "Tweets";
                worksheet.Cells["B1"].Value = "Location";
                worksheet.Cells["C1"].Value = "Number of retweets";
                //worksheet.Cells["A1:B1"].Merge = true;

                int i = 2;
                foreach (var tweet in tweets)
                {
                    worksheet.Cells["A" + i].Value = tweet.Text;

                    //worksheet.Cells["A" + i + ":B" + i].Merge = true;

                    //worksheet.Cells["A" + i + ":B" + i].Style.WrapText = true;
                    //if (!string.IsNullOrEmpty(tweet.Place.FullName))
                    //    worksheet.Cells["C" + i].Value = tweet.Place.FullName;
                    //else
                    //    worksheet.Cells["C" + i].Value = "No Location";
                    if (tweet.Place != null)
                    {
                        worksheet.Cells["B" + i].Value = tweet.Place.FullName;
                    }
                    else if(tweet.CreatedBy != null)
                    {
                        //tweet.CreatedBy.Location
                        worksheet.Cells["B" + i].Value = tweet.CreatedBy.Location;
                    }
                    else
                    {
                        worksheet.Cells["B" + i].Value = "No Location";
                    }

                    worksheet.Cells["C" + i].Value = tweet.RetweetCount;
                    i++;
                    

                    worksheet.Cells.Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                    worksheet.Cells.AutoFitColumns();

                    package.Save();
                }
                    

            }
            
        }

        

        public IPlaceTrends GetTrendsFromPlace(long woeid, APIDetails details)
        {
            try
            {
                // Get a AuthenticatedUser from a specific set of credentials
                Auth.SetUserCredentials(details.ApiKey, details.ApiSecretKey, details.AccessToken, details.AccessTokenSecret);

                var trends = Trends.GetTrendsAt(woeid);
                return trends;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<ITweet> GetTweets(PullTweetViewModel model, APIDetails details)
        {
            try
            {
                // Get a AuthenticatedUser from a specific set of credentials
                Auth.SetUserCredentials(details.ApiKey, details.ApiSecretKey, details.AccessToken, details.AccessTokenSecret);
                //var authenticatedUser = User.GetAuthenticatedUser(userCredentials);

                var from = Convert.ToDateTime(model.From);
                var to = Convert.ToDateTime(model.To);
                var searchParameter = new SearchTweetsParameters(model.Keyword)
                {
                    //GeoCode = new GeoCode(9.0820, 8.6753, 1, DistanceMeasure.Miles),
                    Lang = LanguageFilter.English,
                    //SearchType = SearchResultType.Popular,
                    MaximumNumberOfResults = model.Quantity,
                    //Until = new DateTime(2019, 08, 02),
                    //Since = from.Date,
                    //Until = to.Date,
                    //SinceId = 399616835892781056,
                    //MaxId = 405001488843284480,
                    //Filters = TweetSearchFilters.Images | TweetSearchFilters.Verified
                };

                IEnumerable<ITweet> tweets = Search.SearchTweets(searchParameter);
                return tweets;
            }
            catch (Exception)
            {
                throw;
            }
        }





        public List<ExcelJson> GetExcelFile(string filepath)
        {
            try
            {
                //create a list to hold all the values
                List<string> excelData = new List<string>();
                List<ExcelJson> newJson = new List<ExcelJson>();
                ExcelJson exjs = new ExcelJson();

                //read the Excel file as byte array
                byte[] bin = File.ReadAllBytes(filepath);

                //or if you use asp.net, get the relative path
                //byte[] bin = File.ReadAllBytes(Server.MapPath("ExcelDemo.xlsx"));

                //create a new Excel package in a memorystream
                using (MemoryStream stream = new MemoryStream(bin))
                using (ExcelPackage excelPackage = new ExcelPackage(stream))
                {
                    //loop all worksheets
                    foreach (ExcelWorksheet worksheet in excelPackage.Workbook.Worksheets)
                    {
                        //loop all rows
                        for (int i = worksheet.Dimension.Start.Row + 1; i <= worksheet.Dimension.End.Row; i++)
                        {
                            //loop all columns in a row
                            for (int j = worksheet.Dimension.Start.Column; j <= worksheet.Dimension.End.Column; j++)
                            {
                                //add the cell data to the List
                                //if (worksheet.Cells[i, j].Value != null)
                                //{
                                    //excelData.Add(worksheet.Cells[i, j].Value.ToString());
                                    newJson.Add(new ExcelJson { Tweet = worksheet.Cells[i, j].Value.ToString(), Location = worksheet.Cells[i, j + 1].Value.ToString(), Amount = worksheet.Cells[i, j+2].Value.ToString() });
                                    j += 2;
                                //}
                            }
                            
                        }
                    }
                }
                //var jsonData = JsonConvert.SerializeObject(excelData);
                return newJson;
                //return jsonData;
                //return excelData;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public string ReadJson(string filepath)
        {
            try
            {
                return File.ReadAllText(filepath);
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
