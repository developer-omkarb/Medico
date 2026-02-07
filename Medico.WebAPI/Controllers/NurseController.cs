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
    public class NurseController : ControllerBase
    {
        private INurseService _service;
        public NurseController(INurseService service)
        {
            this._service = service;
        }
        [HttpGet]
        [Route("dashboardcardinfo/{nurseUserId}")]
        public IActionResult DashboardCardsInfo(int nurseUserId)
        {
            var dashboardCardsInfo = _service.GetDashboardCardsInfo(nurseUserId);
            string[] headers = { "Served By Me", "Today's Served Patients", "Today's Appointments", "Total Appointments" };
            string[] imgUrls = { "../../../../assets/images/nurse/totalpatienticon.png", "../../../../assets/images/nurse/totalpatienticon.png", "../../../../assets/images/nurse/newpatienticon.png", "../../../../assets/images/nurse/todaydischargeicon.png" };

            List<DashboardCardModel> dashboardCardModels = new List<DashboardCardModel>();
            for (int i = 0; i < headers.Length; i++)
            {
                dashboardCardModels.Add(new DashboardCardModel()
                {
                    Header = headers[i],
                    ImgUrl = imgUrls[i],
                    Value = dashboardCardsInfo[i]
                });

            }
            return Ok(dashboardCardModels);
        }
        [HttpGet]
        [Route("nursesfordropdown")]
        public IActionResult GetAllNursesForDropdown(int nurseUserId)
        {
            var nursedata = _service.GetAllNursesIdNamesForDropDowns();
            List<KeyValModel> result = new List<KeyValModel>();

            foreach (KeyValuePair<int, string> nurse in nursedata)
            {
                result.Add(new KeyValModel() { Key = nurse.Key, Value = nurse.Value });
            }
            return Ok(result);
        }
    }
}
