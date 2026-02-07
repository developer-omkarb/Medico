using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace Medico.Data.Entities
{
    public partial class CityMaster
    {
        public CityMaster()
        {
            DemographicDetails = new HashSet<DemographicDetails>();
        }

        public int Cityid { get; set; }
        public int Stateid { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }

        public virtual StateMaster State { get; set; }
        public virtual ICollection<DemographicDetails> DemographicDetails { get; set; }
    }
}
