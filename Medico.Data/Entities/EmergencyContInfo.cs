using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace Medico.Data.Entities
{
    public partial class EmergencyContInfo
    {
        public int Emergencycontactid { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Contactnumber { get; set; }
        public string Relationship { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public bool Allowedaccess { get; set; }
        public string Dialcode { get; set; }
        public int? Patientid { get; set; }
        public string Title { get; set; }

        public virtual Patient Patient { get; set; }
    }
}
