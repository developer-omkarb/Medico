using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace Medico.Data.Entities
{
    public partial class CountryMaster
    {
        public CountryMaster()
        {
            DialcodeMaster = new HashSet<DialcodeMaster>();
            StateMaster = new HashSet<StateMaster>();
        }

        public int Countryid { get; set; }
        public string Countrycode { get; set; }
        public string Name { get; set; }

        public virtual ICollection<DialcodeMaster> DialcodeMaster { get; set; }
        public virtual ICollection<StateMaster> StateMaster { get; set; }
    }
}
