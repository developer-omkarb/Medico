using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace Medico.Data.Entities
{
    public partial class PatientDiagnosis
    {
        public int Patientdiagnosisid { get; set; }
        public int? Diagnosisid { get; set; }
        public string Diagnosisnote { get; set; }
        public int? Appointmentid { get; set; }
        public string Createdby { get; set; }
        public DateTime Createddate { get; set; }
        public string Modifiedby { get; set; }
        public DateTime? Modifieddate { get; set; }

        public virtual Appointment Appointment { get; set; }
        public virtual DiagnosisMaster Diagnosis { get; set; }
    }
}
