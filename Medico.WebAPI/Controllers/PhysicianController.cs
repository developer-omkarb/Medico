using Medico.Service.Abstraction;
using Medico.WebAPI.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Medico.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhysicianController : ControllerBase
    {
        private IMasterService _masterService;
        private IPhysicianService _service;
        public PhysicianController(IMasterService masterService, 
            IPhysicianService service)
        {
            this._masterService = masterService;
            this._service = service;
        }
        [HttpGet("info")]
        public IActionResult GetPhysicianBySearch()
        {
            var data = _service.GetPhysicianInfo();

            if (data != null)
            {
                IDictionary<int, string> tempspacilities = new Dictionary<int, string>();
                foreach (var phy in data)
                {
                    string spacilities = "";
                    for (int i = 0; i <= phy.Employee.Spacilities?.Length - 1; i++)
                    {
                        var spacility = _masterService.GetSpecialityById(phy.Employee.Spacilities[i]);
                        spacilities = spacilities + spacility.Name + ", ";

                    }
                    tempspacilities.Add(phy.Employee.Employeeid, spacilities.Remove(spacilities.Length - 2));
                }

                Random random = new Random();
                List<PhyInfo> info = new List<PhyInfo>();
                foreach (var item in data)
                {
                    info.Add(new PhyInfo
                    {
                        phyId = item.Employee.Employeeid,
                        Name = item.Person.Firstname + " " + item.Person.Lastname,
                        Exp = item.Employee.Experience.ToString(),
                        Score = random.Next(80, 100).ToString(),
                        TotalReview = 0,
                        Location = item.Employee.Worklocation,
                    });
                }
                foreach (var item in info)
                {
                    foreach (var spacility in tempspacilities)
                    {
                        if (spacility.Key == item.phyId)
                        {
                            item.spacialities = spacility.Value;
                        }
                    }
                }

                return Ok(info);
            }
            return NotFound();
        }
        [HttpGet("info/{searchtxtboxval}/{searchdrpdownval}/{physicianid}")]
        public IActionResult GetPhysicianBySearch(string searchtxtboxval, string searchdrpdownval, int physicianid)
        {
            var data = _service.GetPhysicianBySearch(searchtxtboxval, searchdrpdownval, physicianid);
            if (data != null)
            {
                IDictionary<int, string> tempspacilities = new Dictionary<int, string>();
                foreach (var phy in data)
                {
                    string spacilities = "";
                    for (int i = 0; i <= phy.Employee.Spacilities?.Length - 1; i++)
                    {
                        var spacility = _masterService.GetSpecialityById(phy.Employee.Spacilities[i]);
                        spacilities = spacilities + spacility.Name + ", ";

                    }
                    tempspacilities.Add(phy.Employee.Employeeid, spacilities.Remove((int)(spacilities?.Length - 2)));
                }

                Random random = new Random();
                List<PhyInfo> info = new List<PhyInfo>();
                foreach (var item in data)
                {
                    info.Add(new PhyInfo
                    {
                        phyId = item.Employee.Employeeid,
                        Name = item.Person.Firstname + " " + item.Person.Lastname,
                        Exp = item.Employee.Experience.ToString(),
                        Score = random.Next(80, 100).ToString(),
                        TotalReview = 0,
                        Location = item.Employee.Worklocation,
                    });
                }
                foreach (var item in info)
                {
                    foreach (var spacility in tempspacilities)
                    {
                        if (spacility.Key == item.phyId)
                        {
                            item.spacialities = spacility.Value;
                        }
                    }
                }

                return Ok(info);
            }
            return NotFound();
        }
        [HttpGet]
        [Route("physiciansfordropdown")]
        public IActionResult GetAllPhysiciansForDropDown()
        {
            var physiciandata = _service.GetAllPhysiciansIdNamesForDropDowns();
            List<KeyValModel> result = new List<KeyValModel>();

            foreach (KeyValuePair<int, string> patient in physiciandata)
            {
                result.Add(new KeyValModel() { Key = patient.Key, Value = patient.Value });
            }
            return Ok(result);
        }

    }
}
