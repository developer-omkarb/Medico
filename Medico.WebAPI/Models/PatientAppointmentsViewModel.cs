using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medico.WebAPI.Models
{
    public class PatientAppointmentsViewModel
    {
        public int AppointmentId { get; set; }
        public int? PatientId { get; set; }
        public string AppointmentTitle { get; set; }
        public int? PhyId { get; set; }
        public string PhysicianName { get; set; }
        public DateTime? AppointmentDate { get; set; }
        public string AppointmentTime { get; set; }
        public string AppointmentStatus { get; set; }

    }
}
