using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PiadaAPI.Models
{
    public class APIDetails
    {
        [Key]
        public Guid ID { get; set; }
        public ApplicationUser User { get; set; }
        public string UserID { get; set; }
        public string ApiKey { get; set; }
        public string ApiSecretKey { get; set; }
        public string AccessToken { get; set; }
        public string AccessTokenSecret { get; set; }
        public DateTimeOffset DateUpdated { get; set; }

    }
}
