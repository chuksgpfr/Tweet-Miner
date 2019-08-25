using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PiadaAPI.Models
{
    public class ExcelNodesChild
    {
        public string State { get; set; }
        public string Country { get; set; }
        public bool ShowChildren { get; set; }
        public long Total { get; set; }
        public List<ExcelJson> Children { get; set; }
    }
}
