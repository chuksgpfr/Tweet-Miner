using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PiadaAPI.Models
{
    public class PullDetails
    {
        [Key]
        public Guid ID { get; set; }
        public ApplicationUser User { get; set; }
        public string UserID { get; set; }
        public string Title { get; set; }
        public string Keyword { get; set; }
        public int Quantity { get; set; }
        public string FileName { get; set; }
        public DateTime Date { get; set; }

    }
}
