using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PiadaAPI.ViewModels
{
    public class PullTweetViewModel
    {
        [Required]
        public string Keyword { get; set; }
        [Required]
        public int Quantity { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string From { get; set; }
        [Required]
        public string To { get; set; }


    }
}
