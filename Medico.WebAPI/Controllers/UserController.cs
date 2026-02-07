using Medico.Data.Entities;
using Medico.Service.Abstraction;
using Medico.Service.Implementation;
using Medico.WebAPI.Models;
using Microsoft.AspNetCore.Cors;
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
    public class UserController : Controller
    {

        private readonly IUserService _userService;
        private NotificationService _service;

        public UserController(IUserService userService, NotificationService service)
        {
            this._userService = userService;
            this._service = service;

        }
        /// <summary>
        /// Registering a User
        /// </summary>
        /// <param name="model">details of the user</param>
        /// <returns></returns>
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] User model)
        {
            var userExists = _userService.IsUserExists(model.Email);
            if (userExists)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new Response { Status = "Error", Message = "User already exists!" });
            }
            else
            {
                _userService.RegisterUser(model);
                return Ok(new Response { Status = "Success", Message = "User created successfully!" });
            }


        }
        /// <summary>
        /// Verify current password of the user
        /// </summary>
        /// <param name="id">userid</param>
        /// <param name="pwd">current password</param>
        /// <returns></returns>
        [HttpGet("verifypassword/{id}/{pwd}")]
        public IActionResult VerifyPassword(int id, string pwd)
        {
            var isVerified = _userService.VerifyChangePassword(id, pwd);
            if (isVerified != null)
            {
                if (isVerified)
                    return Ok(true);
                else
                    return Ok(false);
            }
            else
            {
                return BadRequest();
            }
        }
        /// <summary>
        /// change password of a user
        /// </summary>
        /// <param name="request">user id, old password and new password of the user</param>
        /// <returns></returns>
        [HttpPut("changepassword")]
        public IActionResult ChangePassword([FromBody] ChangePasswordRequest request)
        {
            string username = "";
            User user;
            if(request.attempt<=3)
            {
                if (request.UserId == 0)
                {
                    string uniqueKey = request.OldPassword;
                    username = _userService.GetChangePassReqByUniqueKey(uniqueKey);
                    user = new Data.Entities.User()
                    {
                        Email = username,
                        Password = request.NewPassword,
                        Modifieddate = DateTime.Now,
                        Userid = request.UserId
                    };
                    var isChanged = _userService.ChangePasswordWithoutUserId(user);
                    if (isChanged)
                    {
                        _userService.RemovePasswordChangeRequestByUniqueId(uniqueKey);
                    }
                    if (isChanged != null)
                    {
                        if (isChanged)
                            return Ok(true);
                        else
                            return BadRequest();
                    }
                    else
                    {
                        return BadRequest();
                    }

                }
                var userDetails = _userService.GetUserDetails(request.UserId);
                if (userDetails != null)
                {
                    if (_userService.IsPasswordValid(userDetails, request.NewPassword))
                    {
                        userDetails.Password = request.NewPassword;
                        userDetails.Modifieddate = DateTime.Now;
                        userDetails.Lastchangepassword = request.OldPassword;
                        if (Convert.ToBoolean(userDetails.Isfirstlogin))
                        {
                            userDetails.Isfirstlogin = false;
                        }
                        var isChanged = _userService.ChangePassword(userDetails);

                        if (isChanged != null)
                        {
                            if (isChanged)
                                return Ok(isChanged);
                            else
                            {
                                if (request.attempt == 3)
                                {
                                    if (_userService.BlockUserAccount(request.UserId))
                                    {
                                        return StatusCode(StatusCodes.Status423Locked);
                                    }
                                }
                                else
                                {
                                    return BadRequest();
                                }
                            }
                        }
                        else
                        {
                            return BadRequest();
                        }
                    }
                    else
                    {
                        if (request.attempt == 3)
                        {
                            if (_userService.BlockUserAccount(request.UserId))
                            {
                                return StatusCode(StatusCodes.Status423Locked);
                            }
                        }
                        else
                        {
                            return StatusCode(StatusCodes.Status304NotModified);
                        }
                    }
                }
            }
            return Ok();
        }

        /// <summary>
        /// Block user on three unsuccessful attempts
        /// </summary>
        /// <param name="userId">user id of user</param>
        /// <returns></returns>
        [HttpPut("blockuser/{userId}")]
        internal IActionResult BlockUser(int userId)
        {
            var isBlocked = _userService.BlockUserAccount(userId);
            if (isBlocked)
            {
                return Ok(true);
            }
            else
            {
                return Ok(false);
            }
        }
        /// <summary>
        /// check if user exists
        /// </summary>
        /// <param name="email">email of user</param>
        /// <returns></returns>
        [HttpGet("IsUserNameExists/{email}")]
        public IActionResult IsUserNameExists(string email)
        {
            var userexist = _userService.IsUserExists(email);
            return Ok(userexist);
        }
        /// <summary>
        /// check if unique generated when user wishes to change password exists
        /// </summary>
        /// <param name="uniquekey">key</param>
        /// <returns></returns>
        [HttpGet("checkUniqueKeyExist/{uniquekey}")]
        public IActionResult CheckUniqueKeyExist(string uniquekey)
        {
            bool userexist = _userService.CheckUniqueKeyExist(uniquekey);
            return Ok(userexist);
        }

        [HttpGet("GetUserById/{userId}")]
        public IActionResult GetUserById(int userId)
        {
            var user = _userService.GetUserById(userId);
            if (user != null)
                return Ok(user);
            else
                return BadRequest();
        }
        [HttpGet("notifications/{userId}")]
        public IActionResult GetnotificationsById(int userId)
        {
            var notifications = _service.GetUserNotifications(userId);
            List<NotificationModel> result = new List<NotificationModel>();

            foreach (var notification in notifications)
            {
                result.Add(new NotificationModel()
                {
                    Id = notification.Id,
                    appointmentid = notification.Appointmentid,
                    NotificationId = notification.NotificationNavigation.Notificationid,
                    CreationDate =notification.Createddate,
                    Text = notification.NotificationNavigation.Title
                });
            }
            return Ok(result);
            
        }
        [HttpGet("notificationcount/{userId}")]
        public IActionResult GetnotificationCountById(int userId)
        {
            int notificationcount = _service.GetUserNotificationCount(userId);
            return Ok(notificationcount);

        }
        [HttpPut("updateNotification/{notificationId}")]
        public IActionResult updateNotificationToRead(int notificationId)
        {
            _service.SetUserNotificationAsRead(notificationId);
            return Ok();
        }
    }
}

