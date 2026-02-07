using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace Medico.Data.Entities
{
    public partial class DialcodeMaster
    {
        public int Dialcodeid { get; set; }
        public int Countryid { get; set; }
        public string Dialcode { get; set; }

        public virtual CountryMaster Country { get; set; }
    }
}
