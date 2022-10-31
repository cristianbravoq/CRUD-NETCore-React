using System;
using System.Collections.Generic;

#nullable disable

namespace PruebaDev.Models
{
    public partial class Property
    {
        public Property()
        {
            PropertyImages = new HashSet<PropertyImage>();
        }

        public int IdProperty { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Price { get; set; }
        public string CodeInternal { get; set; }
        public string Year { get; set; }
        public int IdOwner { get; set; }

        public virtual ICollection<PropertyImage> PropertyImages { get; set; }
    }
}
