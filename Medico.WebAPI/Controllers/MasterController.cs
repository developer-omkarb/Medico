using Medico.Service.Abstraction;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medico.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MasterController : ControllerBase
    {
        private IMasterService _service;
        public MasterController(IMasterService service)
        {
            this._service = service;
        }
        /// <summary>
        /// Get data of titles
        /// </summary>
        /// <returns></returns>
        [HttpGet("title")]
        public IActionResult GetAllTitle()
        {
            var data = _service.GetAllTitles();
            return Ok(data);
        }
        /// <summary>
        /// Get data of a particular titleid
        /// </summary>
        /// <param name="Id">TitleId</param>
        /// <returns></returns>
        [HttpGet("title/{Id}")]
        public IActionResult GetTitleById(int Id)
        {
            var data = _service.GetTitleById(Id);
            return Ok(data);
        }
        /// <summary>
        /// Get list of languages
        /// </summary>
        /// <returns></returns>
        [HttpGet("language")]
        public IActionResult GetAllLanguage()
        {
            var data = _service.GetAllLanguage();
            return Ok(data);
        }
        /// <summary>
        /// get details of a particular language
        /// </summary>
        /// <param name="Id">LanguageId</param>
        /// <returns></returns>
        [HttpGet("language/{Id}")]
        public IActionResult GetLanguageById(int Id)
        {
            var data = _service.GetLanguageById(Id);
            return Ok(data);
        }
        /// <summary>
        /// get list of ethinicity
        /// </summary>
        /// <returns></returns>
        [HttpGet("ethinicity")]
        public IActionResult GetAllEthinicity()
        {
            var data = _service.GetAllEthinicity();
            return Ok(data);
        }
        /// <summary>
        /// get details of an ethinicity
        /// </summary>
        /// <param name="Id">EthinicityId</param>
        /// <returns></returns>
        [HttpGet("ethinicity/{Id}")]
        public IActionResult GetEthinicityById(int Id)
        {
            var data = _service.GetEthinicityById(Id);
            return Ok(data);
        }
        /// <summary>
        /// get list of dial codes
        /// </summary>
        /// <returns></returns>
        [HttpGet("dialcode")]
        public IActionResult GetAllDialcode()
        {
            var data = _service.GetAllDialcode();
            return Ok(data);
        }
        /// <summary>
        /// get details of a dial code
        /// </summary>
        /// <param name="Id">DialcodeId</param>
        /// <returns></returns>
        [HttpGet("dialcode/{Id}")]
        public IActionResult GetDialcodeById(int Id)
        {
            var data = _service.GetDialcodeById(Id);
            return Ok(data);
        }
        /// <summary>
        /// get list of all departments
        /// </summary>
        /// <returns></returns>
        [HttpGet("department")]
        public IActionResult GetAllDepartment()
        {
            var data = _service.GetAllDepartment();
            return Ok(data);
        }
        /// <summary>
        /// get details of a department
        /// </summary>
        /// <param name="Id">DepartmentId</param>
        /// <returns></returns>
        [HttpGet("department/{Id}")]
        public IActionResult GetDepartmentById(int Id)
        {
            var data = _service.GetDepartmentById(Id);
            return Ok(data);
        }
        /// <summary>
        /// get list of roles
        /// </summary>
        /// <returns></returns>
        [HttpGet("role")]
        public IActionResult GetAllRole()
        {
            var data = _service.GetAllRole();
            return Ok(data);
        }
        /// <summary>
        /// get details of a role
        /// </summary>
        /// <param name="Id">RoleId</param>
        /// <returns></returns>
        [HttpGet("role/{Id}")]
        public IActionResult GetRoleById(int Id)
        {
            var data = _service.GetRoleById(Id);
            return Ok(data);
        }
        /// <summary>
        /// get list of slots for appointments
        /// </summary>
        /// <returns></returns>
        [HttpGet("appointmenttimeslot")]
        public IActionResult GetAllAppointmentTimeslots()
        {
            var data = _service.GetAllAppointmentTimeslots();
            return Ok(data);
        }
        /// <summary>
        /// get details of a slot of doctor
        /// </summary>
        /// <param name="Id">AppointmentSlotId</param>
        /// <returns></returns>
        [HttpGet("appointmenttimeslot/{Id}")]
        public IActionResult GetAppointmentTimeslotsById(int Id)
        {
            var data = _service.GetAppointmentTimeslotsById(Id);
            return Ok(data);
        }
        /// <summary>
        /// get list of all vital signs
        /// </summary>
        /// <returns></returns>
        [HttpGet("vitalsigns")]
        public IActionResult GetAllVitalsigns()
        {
            var data = _service.GetAllVitalSigns();
            return Ok(data);
        }
        /// <summary>
        /// get details of a vital sign 
        /// </summary>
        /// <param name="Id">VitalkSignId</param>
        /// <returns></returns>
        [HttpGet("vitalsigns/{Id}")]
        public IActionResult GetVitalsignsById(int Id)
        {
            var data = _service.GetVitalSignsById(Id);
            return Ok(data);
        }
        /// <summary>
        /// get list of specialities
        /// </summary>
        /// <returns></returns>
        [HttpGet("speciality")]
        public IActionResult GetAllSpeciality()
        {
            var data = _service.GetAllSpeciality();
            return Ok(data);
        }
        /// <summary>
        /// get details of a speciality
        /// </summary>
        /// <param name="Id">SpecialityId</param>
        /// <returns></returns>
        [HttpGet("speciality/{Id}")]
        public IActionResult GetSpecialityById(int Id)
        {
            var data = _service.GetSpecialityById(Id);
            return Ok(data);
        }
        /// <summary>
        /// get list of all allergies
        /// </summary>
        /// <returns></returns>
        [HttpGet("allergy")]
        public IActionResult GetAllAllergy()
        {
            var data = _service.GetAllAllergy();
            return Ok(data);
        }
        /// <summary>
        /// get details of an allergy
        /// </summary>
        /// <param name="Id">AllergyId</param>
        /// <returns></returns>
        [HttpGet("allergy/{Id}")]
        public IActionResult GetAllergyById(int Id)
        {
            var data = _service.GetAllergyById(Id);
            return Ok(data);
        }
        /// <summary>
        /// get list of all appointments status
        /// </summary>
        /// <returns></returns>
        [HttpGet("appointmentsatus")]
        public IActionResult GetAllAppointmentsatus()
        {
            var data = _service.GetAllAppointmentStatus();
            return Ok(data);
        }
        /// <summary>
        /// get details of status of appointment
        /// </summary>
        /// <param name="Id">AppointmentStatusId</param>
        /// <returns></returns>
        [HttpGet("appointmentsatus/{Id}")]
        public IActionResult GetAppointmentsatusById(int Id)
        {
            var data = _service.GetAppointmentStatusById(Id);
            return Ok(data);
        }
        /// <summary>
        /// get list of all medicines
        /// </summary>
        /// <returns></returns>
        [HttpGet("medicin")]
        public IActionResult GetAllMedicin()
        {
            var data = _service.GetAllMedicin();
            return Ok(data);
        }
        /// <summary>
        /// get details of a medicine
        /// </summary>
        /// <param name="Id">MedicineId</param>
        /// <returns></returns>
        [HttpGet("medicin/{Id}")]
        public IActionResult GetMedicinById(int Id)
        {
            var data = _service.GetMedicinById(Id);
            return Ok(data);
        }
        /// <summary>
        /// get list of all procedures
        /// </summary>
        /// <returns></returns>
        [HttpGet("procedure")]
        public IActionResult GetAllProcedure()
        {
            var data = _service.GetAllProcedure();
            return Ok(data);
        }
        /// <summary>
        /// get details of a procedure
        /// </summary>
        /// <param name="Id">ProcedureId</param>
        /// <returns></returns>
        [HttpGet("procedure/{Id}")]
        public IActionResult GetProcedureById(int Id)
        {
            var data = _service.GetProcedureById(Id);
            return Ok(data);
        }
        /// <summary>
        /// get list of all diagnosis
        /// </summary>
        /// <returns></returns>
        [HttpGet("diagnosis")]
        public IActionResult GetAllDiagnosis()
        {
            var data = _service.GetAllDiagnosis();
            return Ok(data);
        }
        /// <summary>
        /// get details of a diagnosis
        /// </summary>
        /// <param name="Id">DiagnosisId</param>
        /// <returns></returns>
        [HttpGet("diagnosis/{Id}")]
        public IActionResult GetDiagnosisById(int Id)
        {
            var data = _service.GetDiagnosisById(Id);
            return Ok(data);
        }
    }
}
