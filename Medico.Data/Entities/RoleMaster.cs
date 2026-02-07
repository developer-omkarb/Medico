using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace Medico.Data.Entities
{
    public partial class RoleMaster
    {
        public RoleMaster()
        {
            AppointmentStatusMaster = new HashSet<AppointmentStatusMaster>();
            SpecialityMaster = new HashSet<SpecialityMaster>();
            User = new HashSet<User>();
        }

        public int Roleid { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }

        public virtual ICollection<AppointmentStatusMaster> AppointmentStatusMaster { get; set; }
        public virtual ICollection<SpecialityMaster> SpecialityMaster { get; set; }
        public virtual ICollection<User> User { get; set; }
    }
}
