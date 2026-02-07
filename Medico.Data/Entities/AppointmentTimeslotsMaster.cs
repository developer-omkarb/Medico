using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace Medico.Data.Entities
{
    public partial class AppointmentTimeslotsMaster
    {
        public AppointmentTimeslotsMaster()
        {
            Appointment = new HashSet<Appointment>();
        }

        public int Timeslotid { get; set; }
        public string Value { get; set; }

        public virtual ICollection<Appointment> Appointment { get; set; }
    }
}
