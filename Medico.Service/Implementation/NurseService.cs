using Medico.Data.DBContext;
using Medico.Service.Abstraction;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Medico.Service.Implementation
{
    public class NurseService : INurseService
    {
        private MedicoContext _context;
        public NurseService(MedicoContext context)
        {
            this._context = context;
        }
        public string[] GetDashboardCardsInfo(int nurseUserId)
        {
            var user = _context.User.FirstOrDefault(x => x.Userid == nurseUserId);
            string served_By_Me = "";
            if (user.Roleid==3)
            {
                served_By_Me = _context.Appointment.Where(x => x.Nurseid == user.Employeeid || x.Appointmentstatus.Name=="Visited").Count().ToString();
            }
            else if(user.Roleid==2)
            {
                served_By_Me = _context.Appointment.Where(x => x.Physicianid == user.Employeeid || x.Appointmentstatus.Name == "Visited").Count().ToString();
            }
            string served_By_All_Today = _context.Appointment.Where(x => x.Apptdate == DateTime.Today).Count().ToString();
            //Use constent in future below Line
            string appointments_Today = _context.Appointment.Where(x => x.Apptdate == DateTime.Today && x.Appointmentstatus.Name != "Cancelled").Count().ToString();
            string total_Appointments = _context.Appointment.Where(x => x.Appointmentstatus.Name == "Confirmed" || x.Appointmentstatus.Name=="Visited" || x.Appointmentstatus.Name=="Awaited").Count().ToString();

            string[] result = { served_By_Me, served_By_All_Today, appointments_Today, total_Appointments };

            return result;

        }
        public IDictionary<int, string> GetAllNursesIdNamesForDropDowns()
        {
            IDictionary<int, string> dict = new Dictionary<int, string>();
            var userdata = from p in _context.User.Include(x => x.Person).Where(x => x.Roleid == 3)
                           select p;
            foreach (var user in userdata)
            {
                dict.Add(new KeyValuePair<int, string>((int)user.Employeeid,
                    user.Person.Firstname + " " + user.Person.Lastname));
            }
            return dict;
        }
    }
}
