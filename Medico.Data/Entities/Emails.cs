using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace Medico.Data.Entities
{
    public partial class Emails
    {
        public int Emailid { get; set; }
        public string Subject { get; set; }
        public string Sender { get; set; }
        public string Receiver { get; set; }
        public string Body { get; set; }
        public DateTime? Sentdate { get; set; }
        public bool? Issent { get; set; }
        public string Purpose { get; set; }
    }
}
