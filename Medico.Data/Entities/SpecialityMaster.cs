using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace Medico.Data.Entities
{
    public partial class SpecialityMaster
    {
        public int Specialityid { get; set; }
        public string Name { get; set; }
        public int? Roleid { get; set; }

        public virtual RoleMaster Role { get; set; }
    }
}
