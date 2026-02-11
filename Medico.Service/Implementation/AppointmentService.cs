using Microsoft.Extensions.Logging;
using Medico.Data.DBContext;
using Medico.Data.Entities;
using Medico.Repository;
using Medico.Service.Abstraction;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Medico.Service.Implementation
{
    public class AppointmentService : IAppointmentService
    {
    private MedicoContext _context;
    private IRepository<PatientPrescription> _prescriptionrepo;
    private IRepository<Appointment> _AppointmentRepo;
    private ILogger<AppointmentService> _logger;
        private NotificationService _notificationService;
        public AppointmentService(MedicoContext context,
            IRepository<Appointment> AppointmentRepo,
            IRepository<PatientPrescription> prescriptionRepo,
            ILogger<AppointmentService> logger,
            NotificationService notificationService)
        {
            this._context = context;
            this._AppointmentRepo = AppointmentRepo;
            _prescriptionrepo = prescriptionRepo;
            _logger = logger;
            _notificationService = notificationService;
        }




        public void CreateAppointment(int userId, string appointmentTitle, int phyId, DateTime apptDate, int selectedSlotId)
        {
            try
            {
                Patient patient = _context.Patient.FirstOrDefault(x => x.Userid == userId);
                var user = _context.User.FirstOrDefault(u => u.Userid == userId);
                Appointment appointment = new Appointment
                {
                    Title = appointmentTitle,
                    Patientid = patient.Patientid,
                    Physicianid = phyId,
                    Apptdate = apptDate,
                    Timeslotid = selectedSlotId,
                    Appointmentstatusid = 3,
                    Createdby = user.Email,
                    Createddate = DateTime.Now
                };

                if (user != null)
                {
                    _AppointmentRepo.Create(appointment);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, typeof(AppointmentService).Name, nameof(IAppointmentService.CreateAppointment));
            }

        }

        public List<AppointmentTimeslotsMaster> GetAvaiableAppointment(int phyid, DateTime appDate)
        {

            if (appDate.DayOfWeek == DayOfWeek.Sunday)
            {
                return null;
            }


            var applist = _context.AppointmentTimeslotsMaster.ToList();
            var appointments = _context.Appointment.Where(x => x.Physicianid == phyid && x.Apptdate == appDate
            && (x.Appointmentstatusid != 4 || x.Appointmentstatusid != 1));

            foreach (var app in appointments)
            {
                applist.RemoveAll(x => x.Timeslotid == app.Timeslotid);
            }
            if (appDate == DateTime.Today)
            {
                String hour = "";
                hour = DateTime.Now.ToString("HH");
                List<AppointmentTimeslotsMaster> tsToremove = new List<AppointmentTimeslotsMaster>();
                foreach (var app in applist)
                {
                    string tsHour = app.Value.Substring(0, 2);
                    if (int.Parse(tsHour) <= int.Parse(hour))
                    {
                        tsToremove.Add(app);
                    }
                }
                foreach (var app in tsToremove)
                {
                    applist.Remove(app);
                }
            }


            return applist;
        }
        public IEnumerable<Appointment> GetPatientAppointments(int patientId, DateTime startDate, DateTime endDate)
        {
            IEnumerable<Appointment> appointments = Enumerable.Empty<Appointment>();

            try
            {
                appointments = _AppointmentRepo.GetAll();
                return appointments;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, typeof(AppointmentService).Name, nameof(IAppointmentService.GetPatientAppointments));
            }

            return appointments;
        }
        public IEnumerable<Appointment> GetAppointmentsPerWeekByDate(DateTime weekDayDate, int userId)
        {
            //checkIfUserPhysician
            int roleId = _context.User.FirstOrDefault(x => x.Userid == userId).Roleid;

            bool isPhysician = (_context.User.FirstOrDefault(x => x.Userid == userId).Roleid == 2) ? true : false;

            var today = weekDayDate;
            var yesterday = weekDayDate.AddDays(-1);
            var thisWeekStart = DateTime.Today;
            var thisWeekEnd = thisWeekStart.AddDays(7).AddSeconds(-1);
            if (!isPhysician)
            {
                var data = from a in _context.Appointment.Include(x => x.Patient).ThenInclude(x => x.Person).Include(x => x.Nurse).Include(x => x.Physician).Include(x => x.Timeslot).Include(x => x.Appointmentstatus)
                .Where(x => x.Apptdate >= thisWeekStart && x.Apptdate <= thisWeekEnd)
                           select a;
                return data;
            }
            else
            {
                int empId = (int)_context.User.FirstOrDefault(x => x.Userid == userId).Employeeid;

                var data = from a in _context.Appointment.Include(x => x.Patient).ThenInclude(x => x.Person).Include(x => x.Nurse).Include(x => x.Physician).Include(x => x.Timeslot).Include(x => x.Appointmentstatus)
                .Where(x => x.Apptdate >= thisWeekStart && x.Apptdate <= thisWeekEnd && x.Physicianid == empId)
                           select a;
                return data;
            }
        }

        string IAppointmentService.GetPhysicianNameByPK(int? phyId)
        {
            var name = "";
            try
            {
                var user = _context.User.FirstOrDefault(x => x.Employeeid == phyId);
                var person = _context.DemographicDetails.FirstOrDefault(x => x.Personid == user.Personid);
                if (person != null)
                    name = person.Firstname + " " + person.Lastname;
                else
                    name = "No Name";

                return name;

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, typeof(AppointmentService).Name, nameof(IAppointmentService.GetPhysicianNameByPK));
            }
            return name;

        }

        public IEnumerable<Appointment> GetAllAppointmentList(int userid)
        {
            var employeeID = _context.User.Where(x => x.Userid == userid).FirstOrDefault().Employeeid;
            var data = _context.Appointment.Where(x => x.Physicianid == employeeID && x.Appointmentstatusid != 1).
                Include(x => x.Appointmentstatus).
                Include(x => x.Timeslot)
                .Include(x=>x.Patient).ThenInclude(y=>y.Person);
            return data;
        }

        public bool DeleteAppointment(int appointmentid, int statusid)
        {

            var data = _context.Appointment.Where(x => x.Appointmentid == appointmentid).FirstOrDefault();

            if (data != null)
            {
                data.Appointmentstatusid = 1;
                _context.Update(data);
                _context.SaveChanges();

                return true;
            }

            else
            {
                return false;
            }
        }



        public Appointment GetAppointmentById(int appointmentId)
        {
            Appointment data = new Appointment();


            try
            {


                data = _context.Appointment.Where(x => x.Appointmentid == appointmentId).Include(x => x.Appointmentstatus)
               .Include(x => x.Patient).ThenInclude(y => y.Person).Include(x => x.Timeslot)
               .Include(x=>x.Nurse)
               .Include(x => x.Physician).Include(x => x.PatientDiagnosis).ThenInclude(x=>x.Diagnosis)
               .Include(x => x.PatientVisitDetails).Include(x => x.PatientProcedureDetails)
               .Include(x => x.PatientPrescription).ThenInclude(y => y.MedicinDetails).FirstOrDefault();
                return data;
            }

            catch (Exception ex)
            {
                _logger.LogError(ex, typeof(AppointmentService).Name, nameof(IAppointmentService.GetAppointmentById));
            }

            return data;
        }
        public PatientPrescription GetPrescriptionDetailsById(int prescriptionId)
        {
            try
            {
                var patientPrescription = _context.PatientPrescription.Where(x => x.Patientprescriptionid == prescriptionId)
                .Include(x => x.MedicinDetails).ThenInclude(y => y.Medicin).FirstOrDefault();
                return patientPrescription;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, typeof(AppointmentService).Name, nameof(IAppointmentService.GetPrescriptionDetailsById));
                return null;
            }
        }

        public DemographicDetails GetDemographicDetailsById(int employeeid)
        {
            try
            {
                var details = _context.User.Where(x => x.Employeeid == employeeid).FirstOrDefault();
                var demoDetails = _context.DemographicDetails.FirstOrDefault(x => x.Personid == details.Personid);
                return demoDetails;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, typeof(AppointmentService).Name, nameof(IAppointmentService.GetDemographicDetailsById));
                return null;
            }
        }

        public IEnumerable<Appointment> GetAppointmentDetails(int userId, string role)
        {
            if (role.Equals("Patient"))
            {
                var patient = _context.Patient.FirstOrDefault(x => x.Userid == userId);
                var data = from a in _context.Appointment.Include(x => x.Patient).ThenInclude(x => x.Person).Include(x => x.Nurse).Include(x => x.Physician).Include(x => x.Timeslot).Include(x => x.Appointmentstatus)
                    .Where(x => x.Patientid >= patient.Patientid &&
                    x.Apptdate > DateTime.Now)
                           select a;
                return data;
            }
            else if (role.Equals("Nurse"))
            {
                var data = from a in _context.Appointment.Include(x => x.Patient).ThenInclude(x => x.Person).Include(x => x.Nurse).Include(x => x.Physician).Include(x => x.Timeslot).Include(x => x.Appointmentstatus)
                    .Where(x => x.Apptdate > DateTime.Now)
                           select a;
                return data;
            }
            else if (role.Equals("Physician"))
            {
                throw new NotImplementedException();
            }
            return null;

        }

        public IDictionary<int, string> GetAllAppointmentSlotsForDropDown()
        {
            IDictionary<int, string> dict = new Dictionary<int, string>();
            var timeslot = _context.AppointmentTimeslotsMaster.ToList();
            foreach (var slot in timeslot)
            {
                dict.Add(new KeyValuePair<int, string>(slot.Timeslotid, slot.Value));
            }
            return dict;
        }

        public IDictionary<int, string> GetAllAppointmentStatusForDropDown(int userid, int appointmentId)
        {
            IDictionary<int, string> dict = new Dictionary<int, string>();
            var appstatus = _context.AppointmentStatusMaster.ToList();
            foreach (var status in appstatus)
            {
                dict.Add(new KeyValuePair<int, string>(status.Appointmentstatusid, status.Name));
            }

            var user = _context.User.FirstOrDefault(x => x.Userid == userid);
            string role = _context.RoleMaster.FirstOrDefault(x => x.Roleid == user.Roleid).Name;
            var appointment = _context.Appointment.Include(x => x.Appointmentstatus).FirstOrDefault(x => x.Appointmentid == appointmentId);
            if (role.Equals("Patient"))
            {
                switch (appointment.Appointmentstatus.Name)
                {
                    case "Awaited":
                        dict.Remove(2);
                        dict.Remove(1);
                        dict.Remove(5);
                        break;

                    case "Confirmed":
                        dict.Remove(3);
                        dict.Remove(1);
                        dict.Remove(5);
                        break;
                    case "Declined":
                        dict.Remove(2);
                        dict.Remove(3);
                        dict.Remove(4);
                        dict.Remove(5);
                        break;
                    case "Cancelled":
                        dict.Remove(2);
                        dict.Remove(3);
                        dict.Remove(1);
                        dict.Remove(5);
                        break;
                    case "Visited":
                        dict.Remove(1);
                        dict.Remove(2);
                        dict.Remove(3);
                        dict.Remove(4);
                        break;
                }
            }
            else
            {
                switch (appointment.Appointmentstatus.Name)
                {
                    case "Awaited":
                        dict.Remove(5);
                        break;

                    case "Confirmed":
                        dict.Remove(3);
                        dict.Remove(1);
                        dict.Remove(4);
                        break;
                    case "Declined":
                        dict.Remove(2);
                        dict.Remove(3);
                        dict.Remove(4);
                        dict.Remove(5);
                        break;
                    case "Cancelled":
                        dict.Remove(2);
                        dict.Remove(3);
                        dict.Remove(1);
                        dict.Remove(5);
                        break;
                    case "Visited":
                        dict.Remove(1);
                        dict.Remove(2);
                        dict.Remove(3);
                        dict.Remove(4);
                        break;
                }
            }
            return dict;
        }

        public IDictionary<int, string> GetAllAppointmentActionsForDropDown(int userid, int appointmentId)
        {
            IDictionary<int, string> dict = new Dictionary<int, string>();
            var user = _context.User.FirstOrDefault(x => x.Userid == userid);
            string role = _context.RoleMaster.FirstOrDefault(x => x.Roleid == user.Roleid).Name;
            if (role.Equals("Nurse") )
            {
                var appstatus = _context.AppointmentActionMaster.ToList();
                foreach (var status in appstatus)
                {
                    dict.Add(new KeyValuePair<int, string>(status.Actionid, status.Name));
                }
                var appointment = _context.Appointment.Include(x => x.Appointmentstatus).FirstOrDefault(x => x.Appointmentid == appointmentId);
                if (appointment.Appointmentstatus.Name.Equals("Awaited"))
                    dict.Remove(4);
                else
                    dict.Clear();
            }
            
            return dict;
        }
        public bool UpdateAppointment(Appointment app)
        {
            //If Update Timing are changed
            Appointment checkAppointment = _context.Appointment.FirstOrDefault(x => x.Appointmentid + x.Physicianid + x.Timeslotid == app.Appointmentid + app.Physicianid + app.Timeslotid &&
            x.Apptdate == app.Apptdate);

            if (checkAppointment == null)
            {
                app.Appointmentstatusid = 3;
            }

            Appointment appointment = _context.Appointment.FirstOrDefault(x => x.Appointmentid == app.Appointmentid);
            if (appointment != null)
            {
                appointment.Title = app.Title;
                appointment.Patientid = app.Patientid;
                appointment.Physicianid = app.Physicianid;
                appointment.Apptdate = app.Apptdate;
                appointment.Timeslotid = app.Timeslotid;
                appointment.Appointmentstatusid = app.Appointmentstatusid;
                appointment.Modifiedby = app.Modifiedby;
                appointment.Modifieddate = app.Modifieddate;
                appointment.Description = app.Description;
                appointment.RejectCancelReason = app.RejectCancelReason;
            }
            if (app.Nurseid != null && app.Nurseid != 0)
            {
                appointment.Nurseid = app.Nurseid;
            }

            _context.SaveChanges();
            var patient = _context.Patient.FirstOrDefault(x => x.Patientid == app.Patientid);
            if (app.Appointmentstatusid == 2)
                _notificationService.AppointmentApprovedNotification(patient.Userid,app.Appointmentid);
            else if (app.Appointmentstatusid == 1)
                _notificationService.AppointmentRejectedNotification(patient.Userid, app.Appointmentid);
            return true;
        }

        public void CancelAppointment(int appointmentId, int userid)
        {
            var user = _context.User.FirstOrDefault(x => x.Userid == userid);

            var app = _context.Appointment.FirstOrDefault(x => x.Appointmentid == appointmentId);
            app.Appointmentstatusid = 4;
            app.Modifiedby = user.Email;
            _context.Appointment.Update(app);
            _context.SaveChanges();
        }

        public bool savePatientDiagnosisDetails(PatientDiagnosis[] diagnosisDetails)
        {
            try
            {
                IEnumerable<PatientDiagnosis> diagnosisData = _context.PatientDiagnosis.Where(x => x.Appointmentid == diagnosisDetails[0].Appointmentid).ToList();

                if (diagnosisData != null)
                {
                    foreach (PatientDiagnosis diagnosis in diagnosisData)
                    {
                        _context.PatientDiagnosis.Remove(diagnosis);
                    }
                }


                foreach (PatientDiagnosis diagnosis in diagnosisDetails)
                {
                    _context.PatientDiagnosis.Add(diagnosis);
                }
                _context.SaveChanges();
                updateAppointmentStatustoVisited(diagnosisDetails[0].Appointmentid);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, typeof(AppointmentService).Name, nameof(IAppointmentService.savePatientDiagnosisDetails));
                return false;
            }
        }

        public void updateAppointmentStatustoVisited(int? appoinmentId)
        {
            Appointment appointment = _context.Appointment.FirstOrDefault(x => x.Appointmentid == appoinmentId);
            appointment.Appointmentstatusid = 5;
            _context.Appointment.Update(appointment);
            _context.SaveChanges();
        }

        public KeyValuePair<int, string> CheckAppointmentStatusForCancellation(int appointmentId)
        {
            var app = _context.Appointment.FirstOrDefault(x => x.Appointmentid == appointmentId);
            var statusList = _context.AppointmentStatusMaster.Where(x => x.Name == "Declined" || x.Name == "Cancelled").ToList();
            foreach (var val in statusList)
            {
                if (app.Appointmentstatusid == val.Appointmentstatusid)
                {
                    return new KeyValuePair<int, string>(0, $"As Appointment is Already {val.Name}. Reverted Operation");
                }
            }
            return new KeyValuePair<int, string>(1, "");
        }
        bool IAppointmentService.AddPrescriptionDetails(PatientPrescription prescription)
        {
            try
            {
                var prescriptionData = _context.PatientPrescription.Include(x => x.MedicinDetails).FirstOrDefault(x => x.Appointmentid == prescription.Appointmentid);
                prescription.Createddate = DateTime.Now;

                if (prescriptionData != null)
                {
                    foreach (MedicinDetails medicinDetails in prescriptionData.MedicinDetails)
                    {
                        _context.MedicinDetails.Remove(medicinDetails);
                    }
                    _context.SaveChanges();
                    _prescriptionrepo.Remove(prescriptionData);
                }

                _prescriptionrepo.Create(prescription);

                _context.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, typeof(AppointmentService).Name, nameof(IAppointmentService.AddPrescriptionDetails));
                return false;
            }
        }

        public bool saveProcedureDetails(PatientProcedureDetails[] procedureDetails)
        {
            try
            {
                IEnumerable<PatientProcedureDetails> procedureData = _context.PatientProcedureDetails.Where(x => x.Appointmentid == procedureDetails[0].Appointmentid).ToList();
                if (procedureData != null)
                {
                    foreach (PatientProcedureDetails procedure in procedureData)
                    {
                        _context.PatientProcedureDetails.Remove(procedure);
                    }
                }


                foreach (PatientProcedureDetails procedure in procedureDetails)
                {
                    _context.PatientProcedureDetails.Add(procedure);
                }
                _context.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, typeof(AppointmentService).Name, nameof(IAppointmentService.saveProcedureDetails));
                return false;
            }
        }

        public bool saveVitalSignDetails(PatientVisitDetails patientVisitDetails)
        {
            try
            {
                Appointment appointmentDetails = _context.Appointment.Include(x => x.PatientVisitDetails).FirstOrDefault(x => x.Appointmentid == patientVisitDetails.Appointmentid);
                PatientVisitDetails vitalSignsData = _context.PatientVisitDetails.FirstOrDefault(x => x.Appointmentid == appointmentDetails.Appointmentid);
                appointmentDetails.Description = patientVisitDetails.Appointment.Description;
                patientVisitDetails.Appointment = appointmentDetails;

                if (vitalSignsData != null)
                {
                    vitalSignsData.Vitalsigns = patientVisitDetails.Vitalsigns;
                    _context.PatientVisitDetails.Update(vitalSignsData);
                }
                else
                    _context.PatientVisitDetails.Add(patientVisitDetails);

                _context.SaveChanges();
                _context.Appointment.Update(appointmentDetails);
                _context.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, typeof(AppointmentService).Name, nameof(IAppointmentService.saveVitalSignDetails));
                return false;
            }
        }

        public int getUserByAppointmentId(int appointmentid)
        {
            try
            {
                int userId = 0;
                var appointmentObj = _context.Appointment.Include(x => x.Patient).FirstOrDefault(x => x.Appointmentid == appointmentid);
                userId = appointmentObj.Patient.Userid;
                return userId;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, typeof(AppointmentService).Name, nameof(IAppointmentService.getUserByAppointmentId));
                return 0;
            }
        }

        public string GetFullNameByEmployeeId(int empid)
        {
            var name = "";
            try
            {
                var user = _context.User.FirstOrDefault(x => x.Employeeid == empid);
                var person = _context.DemographicDetails.FirstOrDefault(x => x.Personid == user.Personid);
                if (person != null)
                    name = person.Firstname + " " + person.Lastname;
                else
                    name = "No Name";

                return name;

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, typeof(AppointmentService).Name, nameof(IAppointmentService.GetPhysicianNameByPK));
            }
            return name;

        }
        public IEnumerable<Appointment> GetPatientVisitHistory(int patientId)
        {
            try
            {
                List<Appointment> apptList = new List<Appointment>();
                var appointments = _context.Appointment.Where(x => x.Patientid == patientId && x.Apptdate < DateTime.Now && x.Appointmentstatusid == 5).ToList();
                foreach (var appt in appointments)
                {
                    var apptDetails = GetAppointmentById(appt.Appointmentid);
                    var physicianDetails = GetDemographicDetailsById(Convert.ToInt32(appt.Physicianid));
                    apptDetails.Physician.User.First().Person = physicianDetails;
                    apptList.Add(apptDetails);
                }
                return apptList;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, typeof(AppointmentService).Name, nameof(GetPatientVisitHistory));
                return null;
            }
        }

        public PatientVisitDetails getVitalSignDetailsbyAppointmentId(int appointmentId)
        {
            try
            {
                PatientVisitDetails vitalSignsData = _context.PatientVisitDetails.Include(x => x.Appointment).FirstOrDefault(x => x.Appointmentid == appointmentId);
                if (vitalSignsData == null)
                    return null;
                else
                    return vitalSignsData;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, typeof(AppointmentService).Name, nameof(IAppointmentService.getVitalSignDetailsbyAppointmentId));
                return null;
            }
        }

        public IEnumerable<PatientDiagnosis> GetDiagnosisDetailsbyAppointmentId(int appointmentId)
        {
            try
            {
                IEnumerable<PatientDiagnosis> diagnosisDeatil = _context.PatientDiagnosis.Where(x => x.Appointmentid == appointmentId).ToList();
                if (diagnosisDeatil == null)
                {
                    return null;
                }
                else
                    return diagnosisDeatil;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, typeof(AppointmentService).Name, nameof(IAppointmentService.GetDiagnosisDetailsbyAppointmentId));
                return null;
            }
        }

        public IEnumerable<PatientProcedureDetails> GetProcedureDetailsbyAppointmentId(int appointmentId)
        {
            try
            {
                IEnumerable<PatientProcedureDetails> procedureDetail = _context.PatientProcedureDetails.Where(x => x.Appointmentid == appointmentId).ToList();

                if (procedureDetail == null)
                {
                    return null;
                }
                else
                    return procedureDetail;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, typeof(AppointmentService).Name, nameof(IAppointmentService.GetProcedureDetailsbyAppointmentId));
                return null;
            }
        }

        public PatientPrescription GetPrescriptionDetailsbyAppointmentId(int appointmentId)
        {
            try
            {
                PatientPrescription prescriptionId = _context.PatientPrescription.Include(x => x.MedicinDetails).FirstOrDefault(x => x.Appointmentid == appointmentId);
                PatientPrescription prescriptionDetails = _context.PatientPrescription.Where(x => x.Patientprescriptionid == prescriptionId.Patientprescriptionid).Include(x => x.MedicinDetails).ThenInclude(y => y.Medicin).FirstOrDefault();
                if (prescriptionDetails == null)
                {
                    return null;
                }
                else
                    return prescriptionDetails;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, typeof(AppointmentService).Name, nameof(IAppointmentService.GetPrescriptionDetailsbyAppointmentId));
                return null;
            }
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
                _logger.LogError(ex, typeof(AppointmentService).Name, nameof(IAppointmentService.isProfileComplete));
                return false;
            }
        }
        public bool CheckAppointmentConflict(DateTime searchDateVal, int selectedslotid)
        {
            var data = _context.Appointment.FirstOrDefault(x => x.Apptdate == searchDateVal && x.Timeslotid == selectedslotid && (x.Appointmentstatus.Name != "Declined" || x.Appointmentstatus.Name != "Cancelled"));
            if (data == null)
            {
                return false;
            }
            return true;
        }
    }
}
