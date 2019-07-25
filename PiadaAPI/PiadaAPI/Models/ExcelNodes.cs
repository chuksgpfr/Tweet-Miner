using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PiadaAPI.Models
{
    public class ExcelNodes
    {
        public string Location { get; set; }
        public bool ShowChildren { get; set; }
        public List<ExcelJson> Children { get; set; }

    }
}
