using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace Medico.Data.Entities
{
    public partial class User
    {
        public User()
        {
            LoginHistory = new HashSet<LoginHistory>();
            Notification = new HashSet<Notification>();
            Patient = new HashSet<Patient>();
        }

        public int Userid { get; set; }
        public int Personid { get; set; }
        public string Email { get; set; }
        public int Roleid { get; set; }
        public string Password { get; set; }
        public int? Employeeid { get; set; }
        public string Lastchangepassword { get; set; }
        public bool Islocked { get; set; }
        public string Createdby { get; set; }
        public DateTime Createddate { get; set; }
        public string Modifiedby { get; set; }
        public DateTime? Modifieddate { get; set; }
        public bool? Isfirstlogin { get; set; }
        public int? Statusid { get; set; }

        public virtual Employee Employee { get; set; }
        public virtual DemographicDetails Person { get; set; }
        public virtual RoleMaster Role { get; set; }
        public virtual StatusMaster Status { get; set; }
        public virtual ICollection<LoginHistory> LoginHistory { get; set; }
        public virtual ICollection<Notification> Notification { get; set; }
        public virtual ICollection<Patient> Patient { get; set; }
    }
}
