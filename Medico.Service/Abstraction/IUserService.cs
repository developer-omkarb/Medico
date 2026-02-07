using Medico.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Medico.Service.Abstraction
{
   public  interface IUserService
    {
        void RegisterUser(User user);
        bool IsUserExists(string email);
        public User GetUserDetails(int userId);
        public bool VerifyChangePassword(int userId, string pwd);
        public bool ChangePassword(User user);
        public bool IsPasswordValid(User user, string newPassword);
        public bool BlockUserAccount(int userId);
        public bool verifyUser(string username, string pwd);
        public User verifyAndGetUser(string username, string pwd);
        bool CheckUniqueKeyExist(string key);
        public string GetChangePassReqByUniqueKey(string key);
        public User GetUserByUsername(string username);
        public void CreateLoginHistory(LoginHistory loginHistory);
        public int ManageLoginAttempts(string username,bool isvaliduser);
        public bool ChangePasswordWithoutUserId(User user);
        void RemovePasswordChangeRequestByUniqueId(string uniqueKey);

        User GetUserById(int userId);
    }
}
