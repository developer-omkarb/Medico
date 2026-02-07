using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace Medico.Data.Entities
{
    public partial class Appointment
    {
        public Appointment()
        {
            Notification = new HashSet<Notification>();
            PatientDiagnosis = new HashSet<PatientDiagnosis>();
            PatientPrescription = new HashSet<PatientPrescription>();
            PatientProcedureDetails = new HashSet<PatientProcedureDetails>();
            PatientVisitDetails = new HashSet<PatientVisitDetails>();
        }

        public int Appointmentid { get; set; }
        public int Appointmentstatusid { get; set; }
        public string Title { get; set; }
        public int? Patientid { get; set; }
        public int? Physicianid { get; set; }
        public int? Nurseid { get; set; }
        public string Createdby { get; set; }
        public DateTime Createddate { get; set; }
        public string Modifiedby { get; set; }
        public DateTime? Modifieddate { get; set; }
        public DateTime? Apptdate { get; set; }
        public int? Timeslotid { get; set; }
        public string Description { get; set; }
        public string RejectCancelReason { get; set; }

        public virtual AppointmentStatusMaster Appointmentstatus { get; set; }
        public virtual Employee Nurse { get; set; }
        public virtual Patient Patient { get; set; }
        public virtual Employee Physician { get; set; }
        public virtual AppointmentTimeslotsMaster Timeslot { get; set; }
        public virtual ICollection<Notification> Notification { get; set; }
        public virtual ICollection<PatientDiagnosis> PatientDiagnosis { get; set; }
        public virtual ICollection<PatientPrescription> PatientPrescription { get; set; }
        public virtual ICollection<PatientProcedureDetails> PatientProcedureDetails { get; set; }
        public virtual ICollection<PatientVisitDetails> PatientVisitDetails { get; set; }
    }
}
