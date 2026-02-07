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
    public class AllergyController : ControllerBase
    {
        private IAllergyService _allergyService;
        public AllergyController(IAllergyService allergyService)
        {
            _allergyService = allergyService;
        }
        [HttpGet("GetAllAllergies")]
        public IActionResult GetAllAllergies()
        {
            var allergies = _allergyService.GetAllAllergy();
            if (allergies != null)
                return Ok(allergies);
            else
                return NoContent();
        }
        [HttpGet("GetAllergyById/{id}")]
        public IActionResult GetAllergyById(int id)
        {
            var allergy = _allergyService.GetAllergyById(id);
            if (allergy != null)
                return Ok(allergy);
            else
                return NoContent();
        }
        [HttpPost("AddAllergy")]
        public IActionResult AddAllergy([FromBody]AllergyMaster request)
        {
            _allergyService.AddAllergyData(request);
            return CreatedAtAction("GetAllergyById", new { id = request.Allergyid }, request);
        }
        [HttpPut("UpdateAllergy")]
        public IActionResult UpdateAllergy([FromBody]AllergyMaster request)
        {
            var rows=_allergyService.UpdateAllergyData(request);
            if(rows!=0)
            {
                return Ok(new Response() { Status = "Success", Message = "Allergy updated" });
            }
            else
            {
                return BadRequest();
            }
        }
    }
    }
