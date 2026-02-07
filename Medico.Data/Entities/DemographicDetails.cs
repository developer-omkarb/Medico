using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace Medico.Data.Entities
{
    public partial class DemographicDetails
    {
        public DemographicDetails()
        {
            Patient = new HashSet<Patient>();
            User = new HashSet<User>();
        }

        public int Personid { get; set; }
        public int Titleid { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public DateTime Dob { get; set; }
        public string Gender { get; set; }
        public int? Cityid { get; set; }
        public string Race { get; set; }
        public string Ethnicity { get; set; }
        public string Email { get; set; }
        public string Contactnumber { get; set; }
        public string Dialcode { get; set; }
        public string Address { get; set; }
        public int? Age { get; set; }
        public string[] Languageknown { get; set; }

        public virtual CityMaster City { get; set; }
        public virtual TitleMaster Title { get; set; }
        public virtual ICollection<Patient> Patient { get; set; }
        public virtual ICollection<User> User { get; set; }
    }
}
