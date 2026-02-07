using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace Medico.Data.Entities
{
    public partial class DiagnosisMaster
    {
        public DiagnosisMaster()
        {
            PatientDiagnosis = new HashSet<PatientDiagnosis>();
        }

        public int Diagnosisid { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
        public bool? IsDeprecated { get; set; }
        public string Createdby { get; set; }
        public DateTime Createddate { get; set; }
        public string Modifiedby { get; set; }
        public DateTime? Modfieddate { get; set; }

        public virtual ICollection<PatientDiagnosis> PatientDiagnosis { get; set; }
    }
}
