using System;
using System.Collections.Generic;

#nullable disable

namespace PruebaDev.Models
{
    public partial class PropertyTrace
    {
        public int IdPropertyTrace { get; set; }
        public DateTime DateSale { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }
        public string Tax { get; set; }
        public int IdProperty { get; set; }
    }
}
