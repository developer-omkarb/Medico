using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace Medico.Data.Entities
{
    public partial class TitleMaster
    {
        public TitleMaster()
        {
            DemographicDetails = new HashSet<DemographicDetails>();
        }

        public int Titleid { get; set; }
        public string Value { get; set; }

        public virtual ICollection<DemographicDetails> DemographicDetails { get; set; }
    }
}
