using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Medico.Service.Abstraction
{
    public interface IEmailService
    {
        public Dictionary<string, string> GetEmailTemplate(string username,string templateFor, string Role = "patient");
        void sendEmployeeActivatedMail(int userId, string OneTimepassword, string passInEmail);
    }
}
