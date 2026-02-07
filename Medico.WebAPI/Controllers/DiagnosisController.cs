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
    public class DiagnosisController : ControllerBase
    {
        private IDiagnosisService _diagnosisService;
        public DiagnosisController(IDiagnosisService diagnosisService)
        {
            _diagnosisService =diagnosisService;
        }
        [HttpGet("GetAllDiagnosis")]
        public IActionResult GetAllDiagnosis()
        {
            var diagnosis = _diagnosisService.GetAllDiagnosis();
            if (diagnosis != null)
                return Ok(diagnosis);
            else
                return NoContent();
        }
        [HttpGet("GetDiagnosisById/{id}")]
        public IActionResult GetDiagnosisById(int id)
        {
            var diagnosis = _diagnosisService.GetDiagnosisById(id);
            if (diagnosis != null)
                return Ok(diagnosis);
            else
                return NoContent();
        }
        [HttpPost("AddDiagnosis")]
        public IActionResult AddDiagnosis(DiagnosisMaster request)
        {
            _diagnosisService.AddDiagnosisData(request);
            return CreatedAtAction("GetDiagnosisById", new { id = request.Diagnosisid }, request);
        }
        [HttpPut("UpdateDiagnosis")]
        public IActionResult UpdateDiagnosis(DiagnosisMaster request)
        {
            var rows=_diagnosisService.UpdateDiagnosisData(request);
            return rows!=0? Ok(new Response() { Status = "Success", Message = "Diagnosis added" }): BadRequest();
        }
    }
    }
