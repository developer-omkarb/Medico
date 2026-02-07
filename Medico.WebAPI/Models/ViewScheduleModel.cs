using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medico.WebAPI.Models
{
    public class ViewScheduleModel
    {
        public int Appointmentid { get; set; }
        public int Appointmentstatusid { get; set; }

        public DateTime? Start { get; set; }

        public DateTime? End { get; set; }

        public String Title { get; set; }

        public string Status { get; set; }

        public string Timeslot { get; set; }

        public string Patientname { get; set; }
    }
}
