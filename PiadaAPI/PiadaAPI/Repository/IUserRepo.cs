using Microsoft.AspNetCore.Identity;
using PiadaAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PiadaAPI.Repository
{
    public interface IUserRepo
    {
        Task<ApplicationUser> GetUserById(string userid);
    }

    public class UserRepo : IUserRepo
    {
        private readonly UserManager<ApplicationUser> _userManager;

        public UserRepo(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<ApplicationUser> GetUserById(string userid)
        {
            try
            {
                return await _userManager.FindByIdAsync(userid);
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
