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
    public class ProcedureController : ControllerBase
    {
        private IProcedureService _svc;
        public ProcedureController(IProcedureService svc)
        {
            _svc = svc;
        }
        [HttpGet("GetAllProcedures")]
        public IActionResult GetAllProcedures()
        {
            var procedures = _svc.GetAllProcedure();
            if (procedures != null)
                return Ok(procedures);
            else
                return NoContent();
        }
        [HttpGet("GetProcedureById/{id}")]
        public IActionResult GetProcedureById(int id)
        {
            var procedure = _svc.GetProcedureById(id);
            if (procedure != null)
                return Ok(procedure);
            else
                return NoContent();
        }
        [HttpPost("AddProcedure")]
        public IActionResult AddProcedure(ProcedureMaster request)
        {
            _svc.AddProcedureData(request);
            return CreatedAtAction("GetProcedureById", new { id = request.Procedureid }, request);
        }
        [HttpPut("UpdateProcedure")]
        public IActionResult UpdateProcedure(ProcedureMaster request)
        {
            var rows=_svc.UpdateProcedureData(request);
            return rows!=0? Ok(new Response() { Status = "Success", Message = "Procedure added" }):BadRequest();
        }
    }
}
