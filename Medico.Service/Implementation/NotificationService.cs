using Medico.Data.DBContext;
using Medico.Data.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Medico.Service.Implementation
{
    public class NotificationService
    {
        MedicoContext _context = new MedicoContext();
        public NotificationService(MedicoContext context)
        {
            this._context = context;
        }
        public void AppointmentApprovedNotification(int userid,int appointmentid)
        {
            Notification notification = new Notification();
            notification.Notificationid = 1;notification.Userid = userid;notification.Appointmentid = appointmentid;
            _context.Notification.Add(notification);
            SaveChanges();
        }
        public void AppointmentRejectedNotification(int userid,int appointmentid)
        {
            Notification notification = new Notification();
            notification.Notificationid = 2; notification.Userid = userid; notification.Appointmentid = appointmentid;
            _context.Notification.Add(notification);
            SaveChanges();
        }
        private void SaveChanges()
        {
            _context.SaveChanges();
        }

        public List<Notification> GetUserNotifications(int userId)
        {
            var notifications = from p in _context.Notification.Include(x => x.NotificationNavigation).Where(x => x.Userid == userId && x.Isread == false)
                           select p;
            List<Notification> result = new List<Notification>();
            foreach (var notification in notifications)
            {
                result.Add(notification);
            }
            return result;
        }

        public int GetUserNotificationCount(int userId)
        {
            return  _context.Notification.Where(x => x.Userid == userId && x.Isread ==false).Count();
        }
        public void  SetUserNotificationAsRead(int notificationId)
        {
            var notification = _context.Notification.FirstOrDefault(x => x.Id == notificationId);
            if(notification!= null)
            {
                notification.Isread = true;
                SaveChanges();
            }
        }
    }
}
