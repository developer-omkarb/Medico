using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Medico.Data.Entities;



namespace Medico.Service.Abstraction
{
    public interface IPatientService
    {
        public bool updatePatientDetails(Patient patientmodel);
        public Patient getPatientDetails(int userid);
        IEnumerable<Appointment> GetWeekAppointmentsByWeekDay(int userid, DateTime weekDayDate);
        string GetPhysicianNameByPK(int? phyId);
        public List<string> GetDashboardCardsInfo(int patientUserId, out List<string> headers, out List<string> imgUrls, out List<string> unit);
        IEnumerable<Appointment> GetAllPatientAppointmentsById(int patientUserId);
        IDictionary<int, string> GetAllPatientsIdNamesForDropDowns();
        public bool isProfileComplete(int userid);
    }
}
