using System;
using System.Collections.Generic;

#nullable disable

namespace PruebaDev.Models
{
    public partial class PropertyImage
    {
        public int IdPropertyImage { get; set; }
        public int IdProperty { get; set; }

        public virtual Property IdPropertyNavigation { get; set; }
    }
}
