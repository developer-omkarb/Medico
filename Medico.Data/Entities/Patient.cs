using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace Medico.Data.Entities
{
    public partial class Patient
    {
        public Patient()
        {
            Appointment = new HashSet<Appointment>();
            EmergencyContInfo = new HashSet<EmergencyContInfo>();
        }

        public int Patientid { get; set; }
        public int Personid { get; set; }
        public int Userid { get; set; }
        public int[] Allergies { get; set; }
        public int[] Emergencycontacts { get; set; }
        public string[] Allergiesdescription { get; set; }

        public virtual DemographicDetails Person { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<Appointment> Appointment { get; set; }
        public virtual ICollection<EmergencyContInfo> EmergencyContInfo { get; set; }
    }
}
