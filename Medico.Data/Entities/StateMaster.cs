using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace Medico.Data.Entities
{
    public partial class StateMaster
    {
        public StateMaster()
        {
            CityMaster = new HashSet<CityMaster>();
        }

        public int Stateid { get; set; }
        public int Countryid { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }

        public virtual CountryMaster Country { get; set; }
        public virtual ICollection<CityMaster> CityMaster { get; set; }
    }
}
