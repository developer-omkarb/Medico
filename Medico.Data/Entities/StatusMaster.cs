using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace Medico.Data.Entities
{
    public partial class StatusMaster
    {
        public StatusMaster()
        {
            User = new HashSet<User>();
        }

        public int Statusid { get; set; }
        public string Value { get; set; }

        public virtual ICollection<User> User { get; set; }
    }
}
