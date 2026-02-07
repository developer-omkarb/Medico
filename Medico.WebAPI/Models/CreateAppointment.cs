using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medico.WebAPI.Models
{
    public class CreateAppointment
    {
        public int UserId { get; set; }
        public string appointmentTitle { get; set; }
        public int PhyId  { get; set; }
        public string SelectedDate { get; set; }
        public int SelectedSlotId { get; set; }

    }
}
