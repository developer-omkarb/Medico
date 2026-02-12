using Medico.Data.Entities;
using Medico.Service.Abstraction;
using Medico.WebAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Medico.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IUserService _userService;
        private ILogger<LoginController> _logger;

        public LoginController(IConfiguration config,
            IUserService userService, ILogger<LoginController> logger)
        {
            this._config = config;
            this._userService = userService;
            _logger = logger;
        }
        /// <summary>
        /// Authenticate user
        /// </summary>
        /// <param name="userLogin">send username and password of the user</param>
        /// <returns></returns>
        [HttpPost("login")]
        public IActionResult Login([FromBody] UserModel userLogin)
        {
            var validUser = _userService.verifyAndGetUser(userLogin.username, userLogin.Password);
            int attempt = _userService.ManageLoginAttempts(userLogin.username, validUser != null ? true : false);
            if (validUser != null)
            {
                if (validUser.Roleid != 4)
                {
                    if (validUser.Statusid == 2)
                        return StatusCode(StatusCodes.Status410Gone);
                    else if (validUser.Statusid == 3)
                        return StatusCode(StatusCodes.Status423Locked);
                }
                var token = GenerateAuthToken(validUser);
                UserModel usermodel = new UserModel()
                {
                    Token = token,
                    username = validUser.Email,
                    FullName = validUser.Person.Firstname + " " + validUser.Person.Lastname,
                    Role = validUser.Role.Name,
                    userid = validUser.Userid,
                    isFirstLogin = (bool)validUser.Isfirstlogin,
                    email = validUser.Email
                };
                return Ok(usermodel);
            }
            else
                if (attempt == 3)
                return StatusCode(StatusCodes.Status423Locked);
            else
                if (attempt == 111)
                return StatusCode(StatusCodes.Status401Unauthorized);
            else
                return NotFound();
        }
        /// <summary>
        /// Generate JW token for authentication. 
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        private string GenerateAuthToken(User user)
        {
            var securitykey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securitykey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.PrimarySid,user.Userid.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.GivenName, user.Person.Firstname + " "+user.Person.Lastname),
                new Claim(ClaimTypes.Role, user.Role.Name),
            };
            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: credentials);

            _logger.LogError($"jwt token checking {_config["Jwt:Issuer"]} {_config["Jwt:Audience"]}");
            _logger.LogError($"Environment {_config["myenvrn:uenvrn"]}");

            return new JwtSecurityTokenHandler().WriteToken(token);


        }
    }
}
