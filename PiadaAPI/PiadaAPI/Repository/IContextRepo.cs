using Microsoft.EntityFrameworkCore;
using PiadaAPI.Data;
using PiadaAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PiadaAPI.Repository
{
    public interface IContextRepo
    {
        bool IsDetailsEmpty(ApplicationUser user);
        void Create(object details);
        void Update(object details);
        APIDetails GetAPIDetails(ApplicationUser user);
        IEnumerable<PullDetails> GetUserPullDetails(ApplicationUser user);
        bool FileNameExist(string fileName);

    }

    class ContextRepo : IContextRepo
    {
        private ApplicationDbContext _context;

        public ContextRepo(ApplicationDbContext context)
        {
            _context = context;
        }

        public void Create(object details)
        {
            try
            {
                _context.Add(details);
                _context.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public bool FileNameExist(string fileName)
        {
            try
            {
                var filename = _context.PullDetails.FirstOrDefault(x=>x.FileName == fileName);
                if (filename != null)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        public APIDetails GetAPIDetails(ApplicationUser user)
        {
            try
            {
                return _context.APIDetails.FirstOrDefault(x => x.User == user);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<PullDetails> GetUserPullDetails(ApplicationUser user)
        {
            try
            {
                return _context.PullDetails.Where(x => x.User == user);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public bool IsDetailsEmpty(ApplicationUser user)
        {
            try
            {
                var api = _context.APIDetails.FirstOrDefault(x => x.User == user);
                if (api == null)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void Update(object details)
        {
            try
            {
                _context.Update(details).State = EntityState.Modified;
                _context.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
