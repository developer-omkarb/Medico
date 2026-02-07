using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace Medico.Data.Entities
{
    public partial class MedicinMaster
    {
        public MedicinMaster()
        {
            MedicinDetails = new HashSet<MedicinDetails>();
        }

        public int Medicinid { get; set; }
        public int Appno { get; set; }
        public int Medicinnumber { get; set; }
        public string Form { get; set; }
        public string Strength { get; set; }
        public string Referencedrug { get; set; }
        public string Drugname { get; set; }
        public string Activeingredient { get; set; }
        public bool? IsDeprecated { get; set; }
        public string Createdby { get; set; }
        public DateTime Createddate { get; set; }
        public string Modifiedby { get; set; }
        public DateTime? Modfieddate { get; set; }

        public virtual ICollection<MedicinDetails> MedicinDetails { get; set; }
    }
}
