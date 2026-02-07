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
    public class AdminController : Controller
    {
        private IAdminService _adminSrv;
        private IEmailService _emailSrv;

        public AdminController(IAdminService adminService)
        {
            _adminSrv = adminService;
        }
        [HttpGet("GetNewEmployeeCode")]
        public IActionResult GetNewEmployeeCode()
        {
            var code = _adminSrv.GetNewEmployeeCode();
            if (code != null)
                return Ok(new Response { Status = "Success", Message = code });
            else
                return StatusCode(StatusCodes.Status204NoContent, new Response { Status = "Error", Message = "Code not generated" });
        }

        /// <summary>
        /// Get total no of users on the basis of role
        /// </summary>
        /// <param name="role">type of user</param>
        /// <returns></returns>
        [HttpGet("GetTotalUserCount/{role}")]
        public IActionResult GetTotalUserCount(int role)
        {
            var count = _adminSrv.GetTotalUserCount(role);
            if (count != null)
                return Ok(new Response { Status = "Success", Message = count.ToString() });
            else
                return StatusCode(StatusCodes.Status204NoContent, new Response { Status = "Error", Message = "Operation Failed" });
        }
        /// <summary>
        /// get total no of appointments
        /// </summary>
        /// <param name="isToday">True if want count of today's apppointments only</param>
        /// <returns></returns>
        [HttpGet("GetTotalAppointmentCount/{isToday}")]
        public IActionResult GetTotalAppointmentCount(bool isToday)
        {
            var count = _adminSrv.GetTotalAppointmentCount(isToday);
            if (count != null)
                return Ok(new Response { Status = "Success", Message = count.ToString() });
            else
                return StatusCode(StatusCodes.Status204NoContent, new Response { Status = "Error", Message = "Operation Failed" });
        }
        /// <summary>
        /// get list of appointments
        /// </summary>
        /// <returns></returns>
        [HttpGet("GetAppointmentList")]
        public IActionResult GetAppointmentList()
        {
            var list = _adminSrv.GetAppointmentList();
            if (list != null)
            {
                return Ok(list);
            }
            else
            {
                return NoContent();
            }
        }


        [HttpGet("GetHospitalUsers")]
        public IActionResult GetHospitalUsers()
        {
            var usersList = _adminSrv.GetHospitalUsers().ToList();

            List<UsersListModel> users = usersList.Select(y => new UsersListModel
            {
                userid = y.Userid,
                Name = (y.Person.Firstname + " " + y.Person.Lastname),
              //  Lastname = y.Person.Lastname,
                Username = y.Email,
                Role = y.Role.Name,
                Createdby = y.Createdby,
                Createddate = y.Createddate,
                Employeecode = y.Employee?.Code,
                password = y.Password,
                Islocked = y.Islocked,
                status = y.Status?.Value

            }).ToList();


            if (users != null)
                return Ok(users);
            else
                return StatusCode(StatusCodes.Status204NoContent, new Response { Status = "Error", Message = "Users not found" });
        }

        [HttpGet("GetPatientUsers")]
        public IActionResult GetPatientUsers()
        {
            var usersList = _adminSrv.GetPatientUsers().ToList();

            List<UsersListModel> users = usersList.Select(y => new UsersListModel
            {
                userid = y.Userid,
                Name = (y.Person.Firstname + " " + y.Person.Lastname),
                //Lastname = y.Person.Lastname,
                Role = y.Role.Name,
                Createdby = y.Createdby,
                Createddate = y.Createddate,
                Islocked = y.Islocked,
                Username = y.Email,
                status = y.Status.Value


            }).ToList();


            if (users != null)
                return Ok(users);
            else
                return StatusCode(StatusCodes.Status204NoContent, new Response { Status = "Error", Message = "Users not found" });
        }

        [HttpPut("manageUser/{userid}/{value}/{randomstring}/{randomstring2}")]
        public IActionResult manageUser(int userid,int value,string randomstring,string randomstring2)
        {
            var isUpdated = _adminSrv.ManageUserAccount(userid,value, randomstring, randomstring2);
            if (isUpdated)
            {
                 
                return Ok(true);

            }
            else
            {
                return Ok(false);
            }
        }

        [HttpPut]
        [Route("EditUser")]
        public async Task<IActionResult> UpdateUser([FromBody] User model)
        {
            if (model != null)
            {
                _adminSrv.UpdateUser(model);

                return Ok(new Response { Status = "Success", Message = "User updated successfully!" });
            }
            else
            {
                return BadRequest();
            }

        }

        [HttpGet("GetUserById/{userId}")]
        public IActionResult GetUserById(int userId)
        {
            var user = _adminSrv.GetUserById(userId);
            if (user != null)
                return Ok(user);
            else
                return BadRequest();
        }

        [HttpGet("GetAllUsers")]
        public IActionResult GetAllUsers()
        {
            var usersList = _adminSrv.GetAllUsers();

            if (usersList != null)
                return Ok(usersList);
            else
                return StatusCode(StatusCodes.Status204NoContent, new Response { Status = "Error", Message = "Users not found" });
        }
        [HttpGet("common/getrandomstring")]
        public IActionResult GetRandomString()
        {
            string randomString = Common.RandomString(10);
            KeyValModel model = new KeyValModel();
            model.Key = 1;
            model.Value = randomString;
            if (randomString != null)
                return Ok(model);
            else
                return StatusCode(StatusCodes.Status204NoContent, new Response { Status = "Error", Message = "Users not found" });
        }


    }
}
