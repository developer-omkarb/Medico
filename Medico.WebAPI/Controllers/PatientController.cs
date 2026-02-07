using Medico.Service.Abstraction;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Medico.Data.Entities;
using Medico.WebAPI.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;

namespace Medico.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private readonly IPatientService _patientService;
        public PatientController(IPatientService patientService)
        {
            this._patientService = patientService;
        }

        [HttpPost("updatePatientDetails")]
        public IActionResult updatePatientDetails([FromBody] Patient patientmodel)
        {
            bool patient = _patientService.updatePatientDetails(patientmodel);
            return Ok(patient);
        }
        [HttpGet("getPatientDetails/{userid}")]
        public IActionResult getPatientDetails(int userid)
        {
            Patient patient = _patientService.getPatientDetails(userid);
            return Ok(patient);
        }

        [HttpGet]
        [Route("weeklyappointment/{userid}/{weekDayDateStr}")]
        public IActionResult GetWeekAppointmentsByWeekDay(int userid, string weekDayDateStr)
        {
            DateTime weekDayDate = Common.GetDate(weekDayDateStr);
            var apointments = _patientService.GetWeekAppointmentsByWeekDay(userid, weekDayDate);
            List<AppointmentEditModel> appointmentViews = new List<AppointmentEditModel>();
            AppointmentEditModel model;
            foreach (var appointment in apointments)
            {
                model = new AppointmentEditModel()
                {
                    AppointmentId = appointment.Appointmentid,
                    AppointmentTitle = appointment.Title,
                    PhysicianId = appointment.Physicianid,
                    PatientId = appointment.Patientid,
                    AppointmentDate = appointment.Apptdate,
                    AppointmentTime = appointment.Timeslot.Value,
                    AppointmentStatus = appointment.Appointmentstatus.Name,
                    CreatedBy = appointment.Createdby,
                    ModifiedBy = appointment.Modifiedby
                };

                appointmentViews.Add(model);
            }
            foreach (var appt in appointmentViews)
            {
                appt.PhysicianName = _patientService.GetPhysicianNameByPK(appt.PhysicianId);
            }
            return Ok(appointmentViews);
        }
        [HttpGet]
        [Route("dashboardcardinfo/{patientUserId}")]
        public IActionResult DashboardCardsInfo(int patientUserId)
        {

            List<string> headers, imgUrls, units;
            var dashboardCardsInfo = _patientService.GetDashboardCardsInfo(patientUserId, out headers, out imgUrls, out units);

            string[] header = headers.ToArray();
            string[] imgUrl = imgUrls.ToArray();
            string[] unit = units.ToArray();
            List<DashboardCardModel> dashboardCardModels = new List<DashboardCardModel>();
            for (int i = 0; i < header.Length; i++)
            {
                DashboardCardModel model = new DashboardCardModel()
                {
                    Header = header[i],
                };

                if (i < imgUrl.Length)
                    model.ImgUrl = imgUrl[i];

                if (i < unit.Length)
                    model.Value = "" + dashboardCardsInfo[i] + unit[i];
                else
                    model.Value = "" + dashboardCardsInfo[i];

                dashboardCardModels.Add(model);

            }
            return Ok(dashboardCardModels);
        }
        [HttpGet]
        [Route("appointments/{patientUserId}")]
        public IActionResult GetPatientAppointmentsById(int patientUserId)
        {
            var apointments = _patientService.GetAllPatientAppointmentsById(patientUserId);
            List<PatientAppointmentsViewModel> appointmentViews = new List<PatientAppointmentsViewModel>();
            PatientAppointmentsViewModel model;
            foreach (var appointment in apointments)
            {
                model = new PatientAppointmentsViewModel()
                {
                    AppointmentId = appointment.Appointmentid,
                    AppointmentTitle = appointment.Title,
                    PhyId = appointment.Physicianid,
                    PatientId = appointment.Patientid,
                    AppointmentDate = appointment.Apptdate,
                    AppointmentTime = appointment.Timeslot.Value,
                    AppointmentStatus = appointment.Appointmentstatus.Name
                };

                appointmentViews.Add(model);
            }
            foreach (var appt in appointmentViews)
            {
                appt.PhysicianName = _patientService.GetPhysicianNameByPK(appt.PhyId);
            }
            return Ok(appointmentViews);
        }
        [HttpGet]
        [Route("patientsfordropdown")]
        public IActionResult GetAllPatientsForDropDown()
        {
            var patientdata = _patientService.GetAllPatientsIdNamesForDropDowns();
            List<KeyValModel> result = new List<KeyValModel>();

            foreach (KeyValuePair<int, string> patient in patientdata)
            {
                result.Add(new KeyValModel() { Key = patient.Key, Value = patient.Value });
            }
            return Ok(result);
        }
        [HttpGet("isProfileComplete/{userid}")]
        public IActionResult isProfileComplete(int userid)
        {
            bool isProfileComplete = _patientService.isProfileComplete(userid);
            return Ok(isProfileComplete);
        }
    }
}
