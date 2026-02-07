using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace Medico.Data.Entities
{
    public partial class PatientProcedureDetails
    {
        public int Patientprocedureid { get; set; }
        public int? Procedureid { get; set; }
        public string Procedurenote { get; set; }
        public int Appointmentid { get; set; }
        public string Createdby { get; set; }
        public DateTime Createddate { get; set; }
        public string Modifiedby { get; set; }
        public DateTime? Modifieddate { get; set; }

        public virtual Appointment Appointment { get; set; }
        public virtual ProcedureMaster Procedure { get; set; }
    }
}
