using EmailSenderService;
using Medico.Service.Abstraction;
using Medico.WebAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace Medico.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class MailController : ControllerBase
    {
        private readonly IEmailService service;
        private readonly IUserService userService;

        public MailController(IEmailService service,
            IUserService userService)
        {
            this.service = service;
            this.userService = userService;
        }
        /// <summary>
        /// Send email when patient clicks on forget password
        /// </summary>
        /// <param name="useremail">email of registered user</param>
        /// <returns></returns>
        [HttpGet("forgetPassword/{useremail}")]
        [AllowAnonymous]
        public IActionResult PatientForgotPasswordEmail(string useremail)
        {
            if (userService.IsUserExists(useremail))
            {
                return SendMail(useremail,"FORGOT_PASSWORD");
            }
            return NotFound();
        }
        /// <summary>
        /// Send email after user gets registered
        /// </summary>
        /// <param name="useremail">email of user who have been registered</param>
        /// <returns></returns>
        [HttpGet("registered")]
        [Authorize(Roles = "admin")]
        [Authorize(Roles = "nurse")]
        [Authorize(Roles = "doctor")]
        public IActionResult UserRegistrationEmailNotification(string useremail)
        {
           return SendMail(useremail,"USER_REGISTRAION");
        }

        /// <summary>
        /// Send email when admin resets password of the user
        /// </summary>
        /// <param name="useremail">email of registered user</param>
        /// <returns></returns>
        [HttpGet("reset")]
        [Authorize(Roles ="patient")]
        public IActionResult SendPasswordResetMail(string useremail)
        {
            return SendMail(useremail, "RESET_PASSWORD");
        }
        /// <summary>
        /// Send actual mail by calling email service
        /// </summary>
        /// <param name="from">source email id</param>
        /// <param name="mailfor">purpose of the email</param>
        /// <returns></returns>
        private IActionResult SendMail(string from, string mailfor)
        {
            Dictionary<string, string> data = service.GetEmailTemplate(from, templateFor: mailfor);
            foreach (KeyValuePair<string, string> val in data)
            {
                //key = SUBJECT , value = HtmlBody
                MailSenderService _service = new MailSenderService(from, val.Key, val.Value);
                try
                {
                    _service.SendMail();
                }
                catch (Exception ex)
                {
                    return NoContent();
                }
            }
            return Unauthorized();
        }
        
    }
}

