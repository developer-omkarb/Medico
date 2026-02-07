using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace Medico.Data.Entities
{
    public partial class NotificationTemplates
    {
        public NotificationTemplates()
        {
            Notification = new HashSet<Notification>();
        }

        public int Notificationid { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool? Isdeprecated { get; set; }

        public virtual ICollection<Notification> Notification { get; set; }
    }
}
