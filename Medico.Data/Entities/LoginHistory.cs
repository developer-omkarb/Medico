using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace Medico.Data.Entities
{
    public partial class LoginHistory
    {
        public int Loginhistoryid { get; set; }
        public int Userid { get; set; }
        public DateTime Logindatetime { get; set; }
        public string Ipaddress { get; set; }
        public bool? Loggedoutsuccessfully { get; set; }
        public int Attempts { get; set; }

        public virtual User User { get; set; }
    }
}
