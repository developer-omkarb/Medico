using LoggerService;
using Medico.Data.DBContext;
using Medico.Data.Entities;
using Medico.Repository;
using Medico.Service.Abstraction;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;

namespace Medico.Service.Implementation
{
    public class UserService : IUserService
    {
        private IRepository<User> userRepository;
        private MedicoContext _context;
        private IRepository<DemographicDetails> _demoRepo;
        private ILogger _logger;
        public UserService(IRepository<User> userRepository,
            IRepository<DemographicDetails> demoRepo,
            MedicoContext context,ILogger logger)
        {
            this.userRepository = userRepository;
            this._context = context;
            _demoRepo = demoRepo;
            _logger = logger;
        }

        public bool IsUserExists(string email)
        {
            var user = userRepository.GetByProperty(x => x.Email.ToLower() == email.ToLower());
            return user != null;
        }

        public void RegisterUser(User user)
        {

            user.Statusid = 1; 
            try
            {
                if (user != null)
                    _demoRepo.Create(user.Person);

                user.Person = _demoRepo.GetByProperty(x => x.Email.ToLower() == user.Email.ToLower());
                if (user.Patient.Count() != 0)
                {
                    foreach (var p in user.Patient)
                    {
                        p.Personid = user.Person.Personid;
                        p.Userid = user.Userid;
                    }

                    user.Patient = user.Patient;
                    userRepository.Update(user);
                }
                userRepository.Create(user);
            }

            catch (Exception ex)
            {
                _logger.LogException(typeof(UserService).Name, nameof(IUserService.RegisterUser), "Error: " + ex.Message + " StackTrace: " + ex.StackTrace, (int)LogType.Service);
            }

        }
        public User GetUserDetails(int userId)
        {
            User user = new User();
            try
            {
                user = this.userRepository.GetByProperty(x => x.Userid == userId);
            }
            catch (Exception ex)
            {
                _logger.LogException(typeof(UserService).Name, nameof(IUserService.GetUserDetails), "Error: " + ex.Message + " StackTrace: " + ex.StackTrace, (int)LogType.Service);
            }
            return user;
        }

        public bool VerifyChangePassword(int userId, string pwd)
        {
            bool isVerified = false;
            try
            {
                var user = GetUserDetails(userId);
                if (user != null)
                {
                    isVerified = user.Password == pwd ? true : false;
                }
            }
            catch (Exception ex)
            {
                _logger.LogException(typeof(UserService).Name, nameof(IUserService.VerifyChangePassword), "Error: " + ex.Message + " StackTrace: " + ex.StackTrace, (int)LogType.Service);
            }
            return isVerified;
        }

        public bool ChangePasswordWithoutUserId(User user)
        {
            bool IsUpdated = false;
            try
            {
                User userd = _context.User.FirstOrDefault(x=>x.Email.ToLower() == user.Email.ToLower());
                userd.Password = user.Password;
                _context.User.Update(userd);
                _context.SaveChanges();
                IsUpdated = true;
            }
            catch (Exception ex)
            {
                _logger.LogException(typeof(UserService).Name, nameof(IUserService.ChangePasswordWithoutUserId), "Error: " + ex.Message + " StackTrace: " + ex.StackTrace, (int)LogType.Service);
            }
            return IsUpdated;
        }
        public bool IsPasswordValid(User user, string newPassword)
        {
            bool isValid = true;
            try
            {
                if(user.Lastchangepassword != null)
                    isValid = user.Lastchangepassword == newPassword ? false : true;
            }
            catch (Exception ex)
            {
                _logger.LogException(typeof(UserService).Name, nameof(IUserService.IsPasswordValid), "Error: " + ex.Message + " StackTrace: " + ex.StackTrace, (int)LogType.Service);
            }
            return isValid;
        }
        public bool BlockUserAccount(int userId)
        {
            try
            {
                var selectedUser = GetUserDetails(userId);
                selectedUser.Statusid = 3;
                userRepository.Update(selectedUser);
            }
            catch (Exception ex)
            {
                _logger.LogException(typeof(UserService).Name, nameof(IUserService.BlockUserAccount), "Error: " + ex.Message + " StackTrace: " + ex.StackTrace, (int)LogType.Service);
            }
            return true;
        }
        public bool verifyUser(string username, string pwd)
        {
            bool isVerified = false;
            try
            {
                var user = GetUserDetailsbyUsername(username);
                if (user != null)
                {
                    isVerified = user.Password == pwd ? true : false;
                }
            }
            catch (Exception ex)
            {
                _logger.LogException(typeof(UserService).Name, nameof(IUserService.verifyUser), "Error: " + ex.Message + " StackTrace: " + ex.StackTrace, (int)LogType.Service);
            }
            return isVerified;
        }   

        public User verifyAndGetUser(string username, string pwd)
        {
            bool isVerified = false;
            try
            {
                var user = GetUserDetailsbyUsername(username);
                if (user != null)
                {
                    isVerified = user.Password == pwd ? true : false;
                    if (isVerified)
                        return user;
                    else
                        return user = null;
                }
                return null;
            }
            catch (Exception ex)
            {
                _logger.LogException(typeof(UserService).Name, nameof(IUserService.verifyAndGetUser), "Error: " + ex.Message + " StackTrace: " + ex.StackTrace, (int)LogType.Service);
            }
            return null;
        }
        public User GetUserDetailsbyUsername(string username)
        {
            var user = _context.User.Include(x => x.Person).Include(x => x.Role).Include(x=>x.LoginHistory).FirstOrDefault(u => u.Email.ToLower() == username.ToLower());
            if (user != null)
                    return user;
            return null;
        }

        public bool CheckUniqueKeyExist(string key)
        {
            var requests = _context.PasswordChangeRequests.Where(x => x.Randomhashid == key).Select(x => new  { x.Randomhashid,x.Time,x.Userid});
            if (requests != null)
            {
                foreach (var item in requests)
                {
                    DateTime currentTime = DateTime.Now;
                    DateTime mailsenton = (DateTime)item.Time;
                    TimeSpan ts = currentTime - mailsenton;
                    
                    if(ts.TotalMinutes <= Constants.MaxUniqueKeyExipirationTime)
                    {
                        return true;
                    }
                    return false;
                }
            }
            return false;
        }

        public string GetChangePassReqByUniqueKey(string key)
        {
            var requests = _context.PasswordChangeRequests.FirstOrDefault(x => x.Randomhashid == key);
            if (requests != null)
            {
                return requests.Userid;
            }
            return null;
        }

        public User GetUserByUsername(string username)
        {
            var user = userRepository.GetByProperty(x=>x.Email.ToLower() == username.ToLower());
            if (user != null)
                return user;
            return null;
        }
        private User GetUserLoginHistoryByUsername(string username)
        {
            var user = _context.User.Include(x => x.LoginHistory).FirstOrDefault(u =>u.Email.ToLower() == username.ToLower());
            if (user != null)
                return user;
            return null;
        }
        public void CreateLoginHistory(LoginHistory loginHistory)
        {
            _context.LoginHistory.Add(loginHistory);
            _context.SaveChanges();
        }
        public int ManageLoginAttempts(string username, bool isvaliduser)
        {
            User userwithhistory = GetUserLoginHistoryByUsername(username);


            if (userwithhistory.LoginHistory.Count != 0)
            {
                var history = _context.LoginHistory.FirstOrDefault(x => x.Userid == userwithhistory.Userid);

                if (!isvaliduser && history.Attempts >= Constants.NoOfLoginAtempts)
                {
                    User user = _context.User.FirstOrDefault(x => x.Userid == userwithhistory.Userid);
                    user.Statusid = 3;
                }
                else
                {
                    history.Attempts += 1;
                    if (history.Attempts >= 4)
                    {
                        User user = _context.User.FirstOrDefault(x => x.Userid == userwithhistory.Userid);
                        user.Statusid = 3;
                        _context.User.Update(user);
                    }
                    else
                    {
                        _context.LoginHistory.Update(history);
                    }
                    _context.SaveChanges();
                }
                if (userwithhistory.Statusid == 3)
                {
                    _context.LoginHistory.Remove(history);
                    _context.SaveChanges();
                    return 111;
                }
                else
                    return history.Attempts;
            }
            else
            {
                if (userwithhistory.Statusid == 3)
                {
                    return 111;
                }
                if (!isvaliduser)
                {
                    _context.LoginHistory.Add(new LoginHistory() { Userid = userwithhistory.Userid, Logindatetime = DateTime.Now, Attempts = 1 });
                    _context.SaveChanges();
                    return 1;
                }
                return 0;
            }
        }

        public bool ChangePassword(User user)
        {
            bool IsUpdated = false;
            try
            {
                userRepository.Update(user);
                IsUpdated = true;
            }
            catch (Exception ex)
            {
                _logger.LogException(typeof(UserService).Name, nameof(IUserService.ChangePassword), "Error: " + ex.Message + " StackTrace: " + ex.StackTrace, (int)LogType.Service);

            }
            return IsUpdated;
        }

        public void RemovePasswordChangeRequestByUniqueId(string uniqueKey)
        {
            PasswordChangeRequests request = _context.PasswordChangeRequests.FirstOrDefault(x=>x.Randomhashid == uniqueKey);
            _context.PasswordChangeRequests.Remove(request);
            _context.SaveChanges();

        }

        public User GetUserById(int userId)
        {
            
            var data = _context.User.Where(x => x.Userid == userId).Include(x=>x.Person).FirstOrDefault();

            return data;
        }
    }
}
