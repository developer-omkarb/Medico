using LoggerService;
using Medico.Data.DBContext;
using Medico.Data.Entities;
using Medico.Repository;
using Medico.Service.Abstraction;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Medico.Service.Implementation
{
    public class AdminService : IAdminService
    {
        private IRepository<Employee> _repo;

        private MedicoContext _context;

        private ILogger _logger;
        private IRepository<User> _userRepo;
   
        private IUserService _userService;
        public AdminService(IRepository<Employee> repo, MedicoContext context, IUserService userService,ILogger logger)

        {
            _repo = repo;
            _logger = logger;
            
            _context = context;
            _userService = userService;

        }

        public IEnumerable<User> GetHospitalUsers()
        {
            //var userList = _userRepo.GetAllByProperty();
            var userList = _context.User.Where(x => x.Roleid != 1)
                .Include(x => x.Status)
                .Include(x => x.Person).
                Include(x => x.Patient).
                Include(x => x.Employee)
                .Include(x => x.Role).OrderByDescending(x => x.Createddate);

                return userList;
          }

        public IEnumerable<User> GetPatientUsers()
        {
           
            var userList = _context.User.Where(x => x.Roleid == 1)
                .Include(x => x.Status)
                .Include(x => x.Person).
                Include(x => x.Patient).
                Include(x => x.Employee)
                .Include(x => x.Role).OrderByDescending(x => x.Createddate);

            return userList;
        }

        public string GetNewEmployeeCode()
        {
            string code = "";
            try
            {
                var empCount = _repo.GetAll().Count();
                code = empCount == 0 ? "MD1" : "MD" + (empCount + 1).ToString();
            }
            catch (Exception ex)
            {
                _logger.LogException(typeof(AdminService).Name, nameof(IAdminService.GetNewEmployeeCode), "Error: " + ex.Message + " StackTrace: " + ex.StackTrace, (int)LogType.Service);



            }
            return code;
        }

        public string GetRole(int roleId)
        {
            var role = "";

            try
            {
                role = _context.RoleMaster.Where(x => x.Roleid == roleId).FirstOrDefault().Name;
                return role;
            }
            catch(Exception ex)
            {
                _logger.LogException(typeof(AdminService).Name, nameof(IAdminService.GetRole), "Error: " + ex.Message + " StackTrace: " + ex.StackTrace, (int)LogType.Service);
            }
            return role;

        }

        public User GetUserById(int userId)
        {
            var userList = new User();
            try
            {
             
                userList = _context.User.Where(x => x.Userid == userId).Include(x => x.Person).ThenInclude(y => y.Title).Include(x => x.Employee).FirstOrDefault();
                return userList;
            }

            catch (Exception ex)
            {
                _logger.LogException(typeof(AdminService).Name, nameof(IAdminService.GetUserById), "Error: " + ex.Message + " StackTrace: " + ex.StackTrace, (int)LogType.Service);
            }

            return userList;

        }

        public bool ManageUserAccount(int userId, int value, string randomstring, string passInEmail)
        {
            try
            {
                var selectedUser = _context.User.Where(x => x.Userid == userId).FirstOrDefault();
                selectedUser.Statusid = value;
                _context.SaveChanges();
                if (value == 1)
                {
                    IEmailService service = new EmailService();
                    service.sendEmployeeActivatedMail(userId, randomstring, passInEmail);
                }
            }
            catch (Exception ex)
            {
                _logger.LogException(typeof(AdminService).Name, nameof(IAdminService.ManageUserAccount), "Error: " + ex.Message + " StackTrace: " + ex.StackTrace, (int)LogType.Service);
            }
            return true;
        }

        public void UpdateUser(User user)
        {
            try
            {
             
                var userToUpdate = _context.User.Where(x => x.Userid == user.Userid).FirstOrDefault();
                userToUpdate.Email = user.Email;
                userToUpdate.Roleid = user.Roleid;
                userToUpdate.Person = user.Person;
                userToUpdate.Employee = user.Employee;
                userToUpdate.Createddate = user.Createddate;
                userToUpdate.Createdby = user.Createdby;

                _context.SaveChanges();

            }

            catch (Exception ex)
            {
                _logger.LogException(typeof(AdminService).Name, nameof(IAdminService.UpdateUser), "Error: " + ex.Message + " StackTrace: " + ex.StackTrace, (int)LogType.Service);
            }


        }
        public int GetTotalAppointmentCount(bool isToday)
        {
            return isToday == true ? _context.Appointment.Count(a => a.Apptdate == DateTime.Now) : _context.Appointment.Count();
        }

        public int GetTotalUserCount(int role)
        {
            int count = 0;
            try
            {
                if (role == 0)
                {
                    count = _context.User.Count(x => x.Roleid != 1);
                }
                else
                {
                    count = _context.User.Count(x => x.Roleid == role);
                }
            }
            catch (Exception ex)
            {
                _logger.LogException(typeof(AdminService).Name, nameof(IAdminService.GetTotalUserCount), "Error: " + ex.Message + " StackTrace: " + ex.StackTrace, (int)LogType.Service);
            }
            return count;
        }
        public IEnumerable<Appointment> GetAppointmentList()
        {
            List<Appointment> list = new List<Appointment>();
            try
            {
                list = _context.Appointment.Where(x => x.Createddate.Year == DateTime.Now.Year).ToList();
            }
            catch (Exception ex)
            {
                _logger.LogException(typeof(AdminService).Name, nameof(IAdminService.GetAppointmentList), "Error: " + ex.Message + " StackTrace: " + ex.StackTrace, (int)LogType.Service);
            }
            return list;
        }

        public IEnumerable<User> GetAllUsers()
        {
            var userList = new List<User>();
            try
            {
                userList = _context.User.Include(x => x.Person).
                 Include(x => x.Patient).
                 Include(x => x.Employee).ThenInclude(x=>x.Spacilities)
                 .Include(x => x.Role).ToList();
            }
            catch(Exception ex)
            {
                _logger.LogException(typeof(AdminService).Name, nameof(IAdminService.GetAllUsers), "Error: " + ex.Message + " StackTrace: " + ex.StackTrace, (int)LogType.Service);
            }
            return userList;
        }
    }
}
