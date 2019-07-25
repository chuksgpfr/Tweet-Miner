using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PiadaAPI.ViewModels
{
    public class EditApiDetailsViewModel
    {
        [Required]
        public string APIKey { get; set; }
        [Required]
        public string APISecretKey { get; set; }
        [Required]
        public string AccessToken { get; set; }
        [Required]
        public string AccessTokenSecret { get; set; }

    }
}
