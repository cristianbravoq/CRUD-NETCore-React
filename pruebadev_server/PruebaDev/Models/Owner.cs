using System;
using System.Collections.Generic;

#nullable disable

namespace PruebaDev.Models
{
    public partial class Owner
    {
        public int IdOwner { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Photo { get; set; }
        public DateTime Birthday { get; set; }
    }
}
