using Medico.WebAPI.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Medico.WebAPI.Middlewares
{
    // You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
    public class CustomAuthentication
    {
        private readonly RequestDelegate _next;
        private readonly List<string> allowedPaths = new List<string>() { "api/user/IsUserNameExists",
            "api/Login/login", "/api/user/register",
        "/api/master/title","/api/master/role",
        "/api/mail/forgetPassword/"};
        public CustomAuthentication(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            var identity = httpContext.Request.HttpContext.User.Identity as ClaimsIdentity;

            if (identity != null &&
                identity.Claims.ToList().Count != 0)
            {
                var userClaims = identity.Claims;
                var model = new UserModel
                {
                    userid = int.Parse(userClaims.FirstOrDefault(o => o.Type == ClaimTypes.PrimarySid)?.Value),
                    username = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Email)?.Value,
                    FullName = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.GivenName)?.Value,
                    Role = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Role)?.Value,
                    
                };
            }
            else
            {
                string url = httpContext.Request.GetDisplayUrl();
                bool allowed = CheckPathAllowd(url);

                if (!allowed)
                {
                    httpContext.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                    return;
                }
            }
            await _next(httpContext);
        }

        private bool CheckPathAllowd(string url)
        {
            foreach (string path in allowedPaths)
            {
                if (url.Contains(path))
                {
                    return true;
                }
            }
            return false;
        }
    }

    // Extension method used to add the middleware to the HTTP request pipeline.
    public static class CustomAuthenticationExtensions
    {
        public static IApplicationBuilder UseCustomAuthentication(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<CustomAuthentication>();
        }
    }
}
