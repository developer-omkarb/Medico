using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medico.WebAPI.Models
{
    public class NotificationModel
    {
        public int Id { get; set; }
        public int NotificationId { get; set; }
        public int appointmentid { get; set; }
        public string Text { get; set; }
        public DateTime? CreationDate { get; set; }
    }
}
