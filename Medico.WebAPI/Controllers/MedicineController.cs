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
    public class MedicineController : ControllerBase
    {
        private IMedicineService _medicineService;
        public MedicineController(IMedicineService medicineService)
        {
            _medicineService = medicineService;
        }
        [HttpGet("GetAllMedicines")]
        public IActionResult GetAllMedicines()
        {
            var medicines = _medicineService.GetAllMedicin();
            if (medicines != null)
                return Ok(medicines);
            else
                return NoContent();
        }
        [HttpGet("GetMedicineById/{id}")]
        public IActionResult GetMedicineById(int id)
        {
            var medicine = _medicineService.GetMedicinById(id);
            if (medicine != null)
                return Ok(medicine);
            else
                return NoContent();
        }
        [HttpPost("AddMedicine")]
        public IActionResult AddMedicine(MedicinMaster request)
        {
            _medicineService.AddMedicineData(request);
            return CreatedAtAction("GetMedicineById", new { id = request.Medicinid }, request);
        }
        [HttpPut("UpdateMedicine")]
        public IActionResult UpdateMedicine(MedicinMaster request)
        {
            var rows=_medicineService.UpdateMedicineData(request);
            return rows!=0? Ok(new Response() { Status = "Success", Message = "Medicine added" }):BadRequest();
        }
    }
    }
