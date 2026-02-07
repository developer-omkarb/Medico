using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medico.WebAPI.Models
{
    public class CancelAppointmentModel
    {
        public int userid { get; set; }
        public int appointmentId { get; set; }
    }
}
