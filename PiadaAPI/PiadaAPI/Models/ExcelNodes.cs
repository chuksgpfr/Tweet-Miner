﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PiadaAPI.Models
{
    public class ExcelNodes
    {
        public string Country { get; set; }
        public bool ShowChildren { get; set; }
        public List<ExcelNodesChild> Children { get; set; }

    }
}
