using Medico.Data.Entities;
using Medico.Service.Abstraction;
using Medico.WebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medico.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VitalSignsController : ControllerBase
    {
        private IVitalSignsService _svc;
        public VitalSignsController(IVitalSignsService svc)
        {
            _svc = svc;
        }
        [HttpGet("GetAllVitalSigns")]
        public IActionResult GetAllVitalSigns()
        {
            var signs = _svc.GetAllVitalSigns();
            if (signs != null)
                return Ok(signs);
            else
                return NoContent();
        }
        [HttpGet("GetVitalSignById/{id}")]
        public IActionResult GetVitalSignById(int id)
        {
            var sign = _svc.GetVitalSignsById(id);
            if (sign != null)
                return Ok(sign);
            else
                return NoContent();
        }
        [HttpPost("AddVitalSign")]
        public IActionResult AddVitalSign(VitalSignsMaster request)
        {
            _svc.AddVitalSignData(request);
            return CreatedAtAction("GetVitalSignById", new { id = request.Vitalsignid }, request);
        }
        [HttpPut("UpdateVitalSign")]
        public IActionResult UpdateVitalSign(VitalSignsMaster request)
        {
            var rows=_svc.UpdateVitalSignsData(request);
            return rows!=0? Ok(new Response() { Status = "Success", Message = "Vital sign added" }):BadRequest();
        }
    }
}
