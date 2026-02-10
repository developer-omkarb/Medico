using Medico.WebAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Medico.WebAPI.Middlewares
{
    public class CustomAuthentication
    {
        private readonly RequestDelegate _next;

        // You can keep this for legacy paths, but AllowAnonymous is now the primary driver
        private readonly List<string> allowedPaths = new List<string>()
        {
            "api/user/IsUserNameExists",
            "api/Login/login",
            "/api/user/register",
            "/api/master/title",
            "/api/master/role",
            "/api/mail/forgetPassword/"
        };

        public CustomAuthentication(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext httpContext)
        {
            // 1. Check if the endpoint has [AllowAnonymous] metadata
            var endpoint = httpContext.GetEndpoint();
            if (endpoint?.Metadata?.GetMetadata<IAllowAnonymous>() != null)
            {
                await _next(httpContext);
                return;
            }

            var identity = httpContext.User.Identity as ClaimsIdentity;

            // 2. If user is authenticated via JWT
            if (identity != null && identity.Claims.Any())
            {
                var userClaims = identity.Claims;
                // Populating the model (Optional: depends on if you use this model later in the context)
                var model = new UserModel
                {
                    userid = int.Parse(userClaims.FirstOrDefault(o => o.Type == ClaimTypes.PrimarySid)?.Value ?? "0"),
                    username = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Email)?.Value,
                    FullName = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.GivenName)?.Value,
                    Role = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Role)?.Value,
                };

                await _next(httpContext);
            }
            else
            {
                // 3. Fallback check for hardcoded allowed paths
                string url = httpContext.Request.GetDisplayUrl();
                bool allowed = CheckPathAllowd(url);

                if (!allowed)
                {
                    httpContext.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                    return;
                }

                await _next(httpContext);
            }
        }

        private bool CheckPathAllowd(string url)
        {
            return allowedPaths.Any(path => url.Contains(path));
        }
    }

    public static class CustomAuthenticationExtensions
    {
        public static IApplicationBuilder UseCustomAuthentication(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<CustomAuthentication>();
        }
    }
}