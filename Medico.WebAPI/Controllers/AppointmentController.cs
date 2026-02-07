using Medico.Data.Entities;
using Medico.Service.Abstraction;
using Medico.WebAPI.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace Medico.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private IAppointmentService _service;
        public AppointmentController(IAppointmentService service)
        {
            this._service = service;
        }
        [HttpGet("timeslots/{phyId}/{appDate}")]
        public IActionResult GetAppointments(int phyId, string appDate)
        {
            DateTime date = Common.GetDate(appDate);
            var data = _service.GetAvaiableAppointment(phyId, date);

            List<KeyValModel> timeSlots = new List<KeyValModel>();

            if (data != null)
            {
                foreach (var item in data)
                {
                    timeSlots.Add(
                        new KeyValModel() { Key = item.Timeslotid, Value = item.Value }
                        );
                }
                return Ok(timeSlots);
            }
            return NotFound();
        }
        [HttpPost]
        [Route("appointment")]
        public IActionResult CreateAppointment([FromBody] CreateAppointment createAppointmentData)
        {
            DateTime date = Common.GetDate(createAppointmentData.SelectedDate);
            try
            {
                _service.CreateAppointment(createAppointmentData.UserId, createAppointmentData.appointmentTitle, createAppointmentData.PhyId, date, createAppointmentData.SelectedSlotId);
            }
            catch (Exception ex) { }
            return Ok();
        }


        [HttpGet]
        [Route("appointment/{weekDayDateStr}/{userId}")]
        public IActionResult GetAppointmentsPerWeek(string weekDayDateStr, int userId)
        {
            DateTime weekDayDate = Common.GetDate(weekDayDateStr);

            var apointments = _service.GetAppointmentsPerWeekByDate(weekDayDate, userId);
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
                    PatientName = appointment.Patient.Person.Firstname + " " + appointment.Patient.Person.Lastname,
                    AppointmentDate = appointment.Apptdate,
                    AppointmentTime = appointment.Timeslot.Value,
                    TimeslotId = appointment.Timeslotid,
                    AppointmentStatusId = appointment.Appointmentstatusid,
                    AppointmentStatus = appointment.Appointmentstatus.Name,
                    CreatedBy = appointment.Createdby,
                    CreatedDate = appointment.Createddate,
                    ModifiedBy = appointment.Modifiedby,
                    ModifiedDate = appointment.Modifieddate,
                    Description = appointment.Description,
                    RejectCancelReason = appointment.RejectCancelReason
                };
                if (appointment.Nurse != null)
                {
                    model.NurseId = appointment.Nurseid;
                }
                appointmentViews.Add(model);
            }
            foreach (var appt in appointmentViews)
            {
                appt.PhysicianName = _service.GetPhysicianNameByPK(appt.PhysicianId);
            }
            foreach (var appt in appointmentViews)
            {
                if (appt.NurseId != null)
                {
                    int id = 0;
                    if (appt.NurseId != null)
                    {
                        id = (int)(appt.NurseId);
                    }
                    appt.NurseName = _service.GetFullNameByEmployeeId(id);
                }
                else
                    appt.NurseName = "Not Assigned";
            }
            return Ok(appointmentViews.OrderBy(x=>x.AppointmentDate));
        }

        [HttpGet]
        [Route("appointments/{userId}/{role}")]
        public IActionResult GetAppointmentsForEdit(int userId, string role)
        {
            var apointments = _service.GetAppointmentDetails(userId, role);
            List<AppointmentEditModel> appointmentEditViews = new List<AppointmentEditModel>();
            AppointmentEditModel model;
            foreach (var appointment in apointments)
            {
                model = new AppointmentEditModel()
                {
                    AppointmentId = appointment.Appointmentid,
                    AppointmentTitle = appointment.Title,
                    PhysicianId = appointment.Physicianid,
                    PatientId = appointment.Patientid,
                    PatientName = appointment.Patient.Person.Firstname + " " + appointment.Patient.Person.Lastname,
                    AppointmentDate = appointment.Apptdate,
                    AppointmentTime = appointment.Timeslot.Value,
                    TimeslotId = appointment.Timeslotid,
                    AppointmentStatusId = appointment.Appointmentstatusid,
                    AppointmentStatus = appointment.Appointmentstatus.Name,
                    CreatedBy = appointment.Createdby,
                    CreatedDate = appointment.Createddate,
                    ModifiedBy = appointment.Modifiedby,
                    ModifiedDate = appointment.Modifieddate,
                    Description = appointment.Description,
                    RejectCancelReason = appointment.RejectCancelReason
                };

                if (appointment.Nurse != null)
                {
                    model.NurseId = appointment.Nurseid;
                    model.NurseName = appointment.Nurse.Employeeid.ToString();
                }
                else
                    model.NurseName = "Not Assigned";


                appointmentEditViews.Add(model);
            }
            foreach (var appt in appointmentEditViews)
            {
                appt.PhysicianName = _service.GetPhysicianNameByPK(appt.PhysicianId);
            }
            return Ok(appointmentEditViews.OrderBy(x=>x.AppointmentDate));
        }
        [HttpGet("timeslotsfordropdown")]
        public IActionResult GetAllAppointmentSlotsForDropDown()
        {
            var timeslotdata = _service.GetAllAppointmentSlotsForDropDown();

            List<KeyValModel> result = new List<KeyValModel>();

            foreach (KeyValuePair<int, string> timeslot in timeslotdata)
            {
                result.Add(new KeyValModel() { Key = timeslot.Key, Value = timeslot.Value });
            }
            return Ok(result);
        }
        [HttpGet]
        [Route("appointmentactionsfordropdown/{userid}/{appointmentId}")]
        public IActionResult GetAllAppointmentActionsForDropDown(int userid, int appointmentId)
        {
            var timeslotdata = _service.GetAllAppointmentActionsForDropDown(userid, appointmentId);

            List<KeyValModel> result = new List<KeyValModel>();

            foreach (KeyValuePair<int, string> timeslot in timeslotdata)
            {
                result.Add(new KeyValModel() { Key = timeslot.Key, Value = timeslot.Value });
            }
            return Ok(result);
        }
        [HttpPut]
        [Route("appointment")]
        public IActionResult UpdateAppointment([FromBody] AppointmentEditModel updateAppointmentData)
        {
            Appointment app = new Appointment()
            {
                Appointmentid = updateAppointmentData.AppointmentId,
                Patientid = updateAppointmentData.PatientId,
                Appointmentstatusid = updateAppointmentData.AppointmentStatusId,
                Physicianid = updateAppointmentData.PhysicianId,
                Nurseid = updateAppointmentData.NurseId,
                Title = updateAppointmentData.AppointmentTitle,
                RejectCancelReason = updateAppointmentData.RejectCancelReason,
                Timeslotid = updateAppointmentData.TimeslotId,
                Apptdate = updateAppointmentData.AppointmentDate,
                Modifieddate = DateTime.Now,
                Createdby = updateAppointmentData.CreatedBy,
                Description = updateAppointmentData.Description
            };
            try
            {
                bool isUpdated = _service.UpdateAppointment(app);
            }
            catch (Exception ex) { }
            return Ok();
        }
        [HttpPut]
        [Route("appointmentcancellation/{userId}/{appointmentId}")]
        public IActionResult CancelAppointment(int userId, int appointmentId)
        {
            _service.CancelAppointment(appointmentId, userId);
            return Ok();
        }

        [HttpPost("saveDiagnosisDetails")]
        public IActionResult saveDiagnosisDetails([FromBody] PatientDiagnosis[] diagnosisDetails)
        {
            bool response = _service.savePatientDiagnosisDetails(diagnosisDetails);
            return Ok(response);
        }

        [HttpGet]
        [Route("appointmentstatusforcancellation/{appointmentId}")]
        public IActionResult checkAppointmentStatusForCancellation(int appointmentId)
        {
            KeyValuePair<int, string> canAppointmentBeCancelled = _service.CheckAppointmentStatusForCancellation(appointmentId);

            KeyValModel result = new KeyValModel();
            result.Key = canAppointmentBeCancelled.Key;
            result.Value = canAppointmentBeCancelled.Value;
            return Ok(result);
        }
        [HttpPost("AddPatientPrescription")]
        public IActionResult AddPatientPrescription(PatientPrescription prescription)
        {
            var result = _service.AddPrescriptionDetails(prescription);
            return result == true ? Ok() : BadRequest();
        }


        [HttpPost("saveProcedureDetails")]
        public IActionResult saveProcedureDetails([FromBody] PatientProcedureDetails[] procedureDetails)
        {
            bool response = _service.saveProcedureDetails(procedureDetails);
            return Ok(response);
        }

        [HttpPost("saveVitalSignDetails")]
        public IActionResult saveVitalSignDetails([FromBody] PatientVisitDetails patientVisitDetails)
        {
            bool response = _service.saveVitalSignDetails(patientVisitDetails);
            return Ok(response);
        }



        [HttpGet("GetAllAppointmentList/{userId}")]
        public IActionResult GetAppointmentList(int userId)
        {

            var list = _service.GetAllAppointmentList(userId).Select(y => new ViewScheduleModel
            {
                Appointmentid = y.Appointmentid,
                Appointmentstatusid = y.Appointmentstatusid,
                Start = y.Apptdate + new TimeSpan(Int32.Parse(y.Timeslot.Value.Split(":")[0]), 00, 00),
                End = y.Apptdate + new TimeSpan(Int32.Parse(y.Timeslot.Value.Split(":")[0]) + 1, 00, 00),
                Status = y.Appointmentstatus?.Name,
                Title = y.Title,
                Timeslot = y.Timeslot?.Value,
                Patientname = y.Patient?.Person?.Firstname + " "+ y.Patient?.Person?.Lastname
            }).ToList();
            if (list != null)
            {
                return Ok(list);
            }
            else
            {
                return NoContent();
            }


        }

        [HttpPut("delete/{appointmentid}/{statusid}")]
        public IActionResult manageUser(int appointmentid, int statusid)
        {
            var isUpdated = _service.DeleteAppointment(appointmentid, statusid);
            if (isUpdated)
            {

                return Ok(true);

            }
            else
            {
                return Ok(false);
            }
        }

        [HttpGet("getById/{appointmentid}")]
        public IActionResult GetAppointmentById(int appointmentid)
        {

            var data = _service.GetAppointmentById(appointmentid);



            if (data != null)
            {

                return Ok(data);
            }
            else
            {
                return NotFound();
            }

        }

        [HttpGet("getUserByAppointmentId/{appointmentid}")]
        public IActionResult getUserByAppointmentId(int appointmentid)
        {
            var data = _service.getUserByAppointmentId(appointmentid);
            if (data != 0)
            {
                return Ok(data);
            }
            else
            {
                return NotFound();
            }

        }



        [HttpGet("GetPrescriptionById/{prescriptionid}")]
        public IActionResult GetPrescriptionById(int prescriptionid)
        {



            var data = _service.GetPrescriptionDetailsById(prescriptionid);
            if (data != null)
            {
                return Ok(data);
            }
            else
            {
                return NotFound();
            }
        }
        [HttpGet("GetDemographicDetailsById/{employeeId}")]
        public IActionResult GetDemographicDetailsById(int employeeid)
        {



            var data = _service.GetDemographicDetailsById(employeeid);
            if (data != null)
            {
                return Ok(data);
            }
            else
            {
                return NotFound();
            }
        }
        [HttpGet("GetPatientVisitHistory/{patientId}")]
        public IActionResult GetPatientVisitHistory(int patientId)
        {
            var appointments = _service.GetPatientVisitHistory(patientId);
            if (appointments != null)
                return Ok(appointments.OrderByDescending(x=>x.Apptdate));
            else
                return NoContent();
        }

        [HttpGet("GetVitalSignDetails/{appointmentId}")]
        public IActionResult getVitalSignDetailsbyAppointmentId(int appointmentId)
        {
            PatientVisitDetails vitalSignDetails = _service.getVitalSignDetailsbyAppointmentId(appointmentId);
            return Ok(vitalSignDetails);
        }
        
        [HttpGet("GetDiagnosisDetails/{appointmentId}")]
        public IActionResult GetDiagnosisDetailsbyAppointmentId(int appointmentId)
        {
            IEnumerable<PatientDiagnosis> DiagnosisDetails = _service.GetDiagnosisDetailsbyAppointmentId(appointmentId);
            return Ok(DiagnosisDetails);
        }

        [HttpGet("GetProcedureDetails/{appointmentId}")]
        public IActionResult GetProcedureDetailsbyAppointmentId(int appointmentId)
        {
            IEnumerable<PatientProcedureDetails> procedureDetails = _service.GetProcedureDetailsbyAppointmentId(appointmentId);
            return Ok(procedureDetails);
        }

        [HttpGet("GetPrescriptionDetails/{appointmentId}")]
        public IActionResult GetPrescriptionDetailsbyAppointmentId(int appointmentId)
        {
            PatientPrescription prescriptionDetails = _service.GetPrescriptionDetailsbyAppointmentId(appointmentId);
            return Ok(prescriptionDetails);
        }
        [HttpGet("isProfileComplete/{userid}")]
        public IActionResult isProfileComplete(int userid)
        {
            bool isProfileComplete = _service.isProfileComplete(userid);
            return Ok(isProfileComplete);
        }
        [HttpGet("checkappointmentconflict/{searchDateVal}/{selectedslotid}")]
        public IActionResult CheckAppointmentConflict(string searchDateVal, int selectedslotid)
        {
            DateTime date = Common.GetDate(searchDateVal);
            bool isConflict = _service.CheckAppointmentConflict(date, selectedslotid);
            return Ok(isConflict);
        }
    }
}
