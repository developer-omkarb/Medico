using LoggerService;
using Medico.Data.DBContext;
using Medico.Repository;
using Medico.Service.Abstraction;
using Medico.Service.Implementation;
using Medico.WebAPI.Middlewares;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

namespace Medico.WebAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            #region JwtToken Code
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(option => {
                option.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = Configuration["Jwt:Issuer"],
                    ValidAudience = Configuration["Jwt:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]))
                };
            });
            services.AddMvc();
            
            services.AddControllers().AddNewtonsoftJson(options =>
   options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
);
            #endregion

            services.AddControllers();
            services.AddScoped<IMasterService, MasterService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IAdminService, AdminService>();
            services.AddScoped<IEmailService, Medico.Service.Implementation.EmailService>();
            services.AddScoped<IPhysicianService, PhysicianService>();
            services.AddScoped<IAppointmentService, AppointmentService>();
            services.AddScoped<IAllergyService, AllergyService>();
            services.AddScoped<IDiagnosisService, DiagnosisService>();
            services.AddScoped<IProcedureService, ProcedureService>();
            services.AddScoped<IMedicineService, MedicineService>();
            services.AddScoped<IVitalSignsService, VitalSignsService>();
            services.AddScoped<INurseService, NurseService>();
            services.AddScoped<IPatientService, PatientService>();
            services.AddScoped<NotificationService, NotificationService>();
            services.AddScoped<ILogger, Logger>();
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Medico.WebAPI", Version = "v1" });
            });
            services.AddDbContext<MedicoContext>(options => {
                options.UseNpgsql(this.Configuration.GetConnectionString("DbConnection"));
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Medico.WebAPI v1"));
            }
            app.UseCors(x => x
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseAuthentication();    
            app.UseAuthorization();

            app.UseCustomAuthentication();
            
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
