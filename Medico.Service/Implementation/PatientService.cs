using Microsoft.Extensions.Logging;
using Medico.Data.DBContext;
using Medico.Data.Entities;
using Medico.Repository;
using Medico.Service.Abstraction;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Medico.Service.Implementation
{
    public class PatientService : IPatientService
    {
        private IUserService _userService;
        private MedicoContext _context;
        private IRepository<Patient> _patientRepo;
        private ILogger<PatientService> _logger;

        public PatientService(IRepository<Patient> patientRepo, IUserService userService, MedicoContext context, ILogger<PatientService> logger)
        {
            this._userService = userService;
            this._context = context;
            this._patientRepo = patientRepo;
            this._logger = logger;
        }
        public bool updatePatientDetails(Patient patientmodel)
        {

            Patient patient = _context.Patient.FirstOrDefault(x => x.Userid == patientmodel.Userid);
            if(patient == null)
            {
                _context.Patient.Add(patientmodel);
                _context.SaveChanges();
                patient = _context.Patient.FirstOrDefault(x => x.Userid == patientmodel.Userid);
            }
            else
            {
            patient.Person = patientmodel.Person;
            }

            patient.EmergencyContInfo = patientmodel.EmergencyContInfo;
            if (patientmodel.Allergies[0] != 0)
            {
                patient.Allergies = patientmodel.Allergies;
                patient.Allergiesdescription = patientmodel.Allergiesdescription;
            }
            else
            {
                patient.Allergies = null;
                patient.Allergiesdescription = null;
            }

            patient.Person.Personid = patient.Personid;

            _context.Patient.Update(patient);
            _context.DemographicDetails.Update(patient.Person);
            foreach (var item in patient.EmergencyContInfo)
            {
                _context.EmergencyContInfo.Update(item);
            }
            _context.SaveChanges();

            EmergencyContInfo emergencyContInfo = _context.EmergencyContInfo.FirstOrDefault(x => x.Patientid == patient.Patientid);
            int contactId = emergencyContInfo.Emergencycontactid;

            if (patient.Emergencycontacts == null)
            {
                patient.Emergencycontacts = new int[] { contactId };
            }
            else
            {
                List<int> contacts = new List<int>(patient.Emergencycontacts);
                contacts.Add(contactId);
                patient.Emergencycontacts = contacts.ToArray();
            }


            _context.Patient.Update(patient);
            _context.SaveChanges();

            return true;

        }

        public Patient getPatientDetails(int userid)
        {
            Patient patient = _context.Patient.Include(x => x.Person).Include(x => x.EmergencyContInfo).FirstOrDefault(u => u.Userid == userid);
            return patient;
        }
        public IEnumerable<Appointment> GetWeekAppointmentsByWeekDay(int patientUserId, DateTime weekDayDate)
        {
            var yesterday = weekDayDate.AddDays(-1);
            var thisWeekStart = weekDayDate.AddDays(-(int)weekDayDate.DayOfWeek + 1);
            var today = DateTime.Today;
            var nextWeekEnd = thisWeekStart.AddDays(13).AddSeconds(-1);

            var patientData = _context.Patient.FirstOrDefault(x => x.Userid == patientUserId);
            var data = from a in _context.Appointment.Include(x => x.Physician).Include(x => x.Timeslot).Include(x => x.Appointmentstatus)
                .Where(x => (x.Apptdate >= today && x.Apptdate <= nextWeekEnd) &&
                x.Patientid == patientData.Patientid)
                       select a;

            return data;
        }
        public string GetPhysicianNameByPK(int? phyId)
        {
            var user = _context.User.FirstOrDefault(x => x.Employeeid == phyId);
            var person = _context.DemographicDetails.FirstOrDefault(x => x.Personid == user.Personid);
            if (person != null)
                return person.Firstname + " " + person.Lastname;
            return "No Name";
        }

        public List<string> GetDashboardCardsInfo(int patientUserId, out List<string> headers, out List<string> imgUrls, out List<string> unit)
        {
            string unitFromDB = "";
            int patientId = _context.Patient.FirstOrDefault(x => x.Userid == patientUserId).Patientid;
            var appointments = _context.Appointment.Include(x => x.PatientVisitDetails).Where(x => x.Patientid == patientId).OrderByDescending(x => x.Apptdate).ToList();
            List<string> reult = new List<string>();
            headers = new List<string>();
            imgUrls = new List<string>();
            unit = new List<string>();

            List<Dictionary<string, string>> data = new List<Dictionary<string, string>>();
            foreach (var app in appointments)
            {
                if (app.PatientVisitDetails != null)
                {
                    foreach (var visit in app.PatientVisitDetails)
                    {
                        data = JsonConvert.DeserializeObject<List<Dictionary<string, string>>>(visit.Vitalsigns);
                        break;
                    }
                }
            }
            if (data.Any())
            {
                foreach (var vitals in data)
                {
                    List<string> vitalSigns = new List<string>();
                    foreach (KeyValuePair<string, string> val in vitals)
                    {
                        if (val.Key == "name")
                        {
                            headers.Add(val.Value);
                            var vital = _context.VitalSignsMaster.FirstOrDefault(x => (x.Name.ToLower()).Equals(val.Value.ToLower()));
                            if (vital != null)
                            {
                                unit.Add(vital.Unit);
                                imgUrls.Add(vital.Imgurl);
                            }

                        }
                        else if (val.Key == "value")
                        {
                            reult.Add(val.Value);
                        }

                    }
                }
            }
            else
            {
                var allVItals = _context.VitalSignsMaster.ToList();
                foreach (var vital in allVItals)
                {
                    headers.Add(vital.Name);
                    unit.Add("");
                    imgUrls.Add(vital.Imgurl);
                    reult.Add("No Record");
                }
            }
            return reult;
        }


        public IEnumerable<Appointment> GetAllPatientAppointmentsById(int patientUserId)
        {
            var patientData = _context.Patient.FirstOrDefault(x => x.Userid == patientUserId);
            var data = from a in _context.Appointment.Where(x=>x.Appointmentstatusid==5).Include(x => x.Physician).Include(x => x.Timeslot).Include(x => x.Appointmentstatus)
                .Where(x => x.Patientid == patientData.Patientid)
                       select a;

            return data;
        }

        public IDictionary<int, string> GetAllPatientsIdNamesForDropDowns()
        {
            IDictionary<int, string> dict = new Dictionary<int, string>();
            var userdata = from p in _context.User.Include(x => x.Person).Where(x => x.Roleid == 1)
                           select p;
            foreach (var user in userdata)
            {
                dict.Add(new KeyValuePair<int, string>(user.Userid,
                    user.Person.Firstname + " " + user.Person.Lastname));
            }
            return dict;
        }
        public bool isProfileComplete(int userid)
        {
            try
            {
                User patientUser = _context.User.Include(x => x.Person).FirstOrDefault(x => x.Userid == userid);
                if (patientUser.Person.Race == null)
                    return false;
                else
                    return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, typeof(PatientService).Name, nameof(IPatientService.isProfileComplete));
                return false;
            }
        }
    }
}
