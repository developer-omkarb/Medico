using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace Medico.Data.Entities
{
    public partial class Emailtemplates
    {
        public int Id { get; set; }
        public string Screen { get; set; }
        public string Purpose { get; set; }
        public string Html { get; set; }
        public string Role { get; set; }
        public string Subject { get; set; }
    }
}
