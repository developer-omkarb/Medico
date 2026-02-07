using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace Medico.Data.Entities
{
    public partial class AllergyMaster
    {
        public int Allergyid { get; set; }
        public string Type { get; set; }
        public string Name { get; set; }
        public string Source { get; set; }
        public string Partialsequences { get; set; }
        public string Allerginicity { get; set; }
        public string Createdby { get; set; }
        public DateTime Createddate { get; set; }
        public string Modifiedby { get; set; }
        public DateTime? Modfieddate { get; set; }
    }
}
