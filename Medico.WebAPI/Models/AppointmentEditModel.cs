using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medico.WebAPI.Models
{
    public class AppointmentEditModel
    {
        public int AppointmentId { get; set; }
        public int AppointmentStatusId { get; set; }
        public string AppointmentStatus { get; set; }
        public string AppointmentTitle { get; set; }
        public string Description { get; set; }
        public int? PatientId { get; set; }
        public string PatientName { get; set; }
        public int? PhysicianId { get; set; }
        public string PhysicianName { get; set; }
        public int? NurseId { get; set; }
        public string NurseName { get; set; }
        public int? TimeslotId { get; set; }
        public string AppointmentTime { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string? ModifiedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public DateTime? AppointmentDate { get; set; }
        public string RejectCancelReason { get; set; }
    }
}
