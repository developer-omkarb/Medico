using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace Medico.Data.Entities
{
    public partial class Notification
    {
        public int Id { get; set; }
        public int? Notificationid { get; set; }
        public int Userid { get; set; }
        public int Appointmentid { get; set; }
        public bool? Isread { get; set; }
        public DateTime? Createddate { get; set; }

        public virtual Appointment Appointment { get; set; }
        public virtual NotificationTemplates NotificationNavigation { get; set; }
        public virtual User User { get; set; }
    }
}
