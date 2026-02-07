using EmailSenderService;
using Medico.Data.DBContext;
using Medico.Data.Entities;
using Medico.Service.Abstraction;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Medico.Service.Implementation
{
    public class EmailService : IEmailService
    {
        private MedicoContext context;
        public EmailService()
        {
            this.context = new MedicoContext();
        }
        public Dictionary<string,string> GetEmailTemplate(string username, string templateFor,string Role = "patient")
        {
            Dictionary<string,string> dictionary = new Dictionary<string, string>();
            string template;
            Emailtemplates templateRow = context.Emailtemplates.FirstOrDefault(t => t.Screen == templateFor && t.Role == Role);
            template = templateRow.Html;
            
            if (templateFor == "RESET_PASSWORD")
            {
                string resetLinkUrl = GetLinkForEmail(username, "RESET_PASSWORD");
                template = template.Replace("%USERNAME%", username);
                template = template.Replace("%URL%", resetLinkUrl);
            }
            else if (templateFor == "FORGOT_PASSWORD")
            {
                string resetLinkUrl = GetLinkForEmail(username, "FORGOT_PASSWORD");
                template = template.Replace("%USERNAME%", username);
                template = template.Replace("%URL%", resetLinkUrl);
            }
            dictionary.Add(templateRow.Subject, template);
            return dictionary;
        }

        private string GetLinkForEmail(string username,string templateFor)
        {
            if(templateFor == "RESET_PASSWORD")
            {
                string randomString = RandomString(25);
                context.PasswordChangeRequests.Add(new PasswordChangeRequests()
                {
                    Randomhashid = randomString,
                    Time = System.DateTime.Now,
                    Userid = username
                });
                context.SaveChanges();
                return "http://localhost:4200/user/changePassword?key=" + randomString;
            }
            else if (templateFor == "FORGOT_PASSWORD")
            {
                string randomString = RandomString(25);
                PasswordChangeRequests req = context.PasswordChangeRequests.FirstOrDefault(x=>x.Userid == username);
                
                if(req!=null)
                    context.PasswordChangeRequests.Remove(req);

                context.PasswordChangeRequests.Add(new PasswordChangeRequests()
                {
                    Randomhashid = randomString,
                    Time = System.DateTime.Now,
                    Userid = username
                });
                context.SaveChanges();
                return "http://localhost:4200/user/changePassword?key="+ randomString;
            }
            return "";
        }
        public static string RandomString(int length)
        {
            const string valid = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
            StringBuilder res = new StringBuilder();
            using (RNGCryptoServiceProvider rnd = new RNGCryptoServiceProvider())
            {
                while (length-- > 0)
                {
                    res.Append(valid[GetInt(rnd, valid.Length)]);
                }
            }
            return res.ToString();
        }
        public static int GetInt(RNGCryptoServiceProvider rnd, int max)
        {
            byte[] r = new byte[4];
            int value;
            do
            {
                rnd.GetBytes(r);
                value = BitConverter.ToInt32(r, 0) & Int32.MaxValue;
            } while (value >= max * (Int32.MaxValue / max));
            return value % max;
        }
        void IEmailService.sendEmployeeActivatedMail(int userId, string OneTimepassword, string passInEmail)
        {
            var user = context.User.Include(x => x.Person).FirstOrDefault(x => x.Userid == userId);

            user.Password = OneTimepassword;
            user.Isfirstlogin = true;
            context.SaveChanges();
            var mail = context.Emailtemplates.FirstOrDefault(x => x.Id == 3);
            string template = mail.Html;
            template = template.Replace("%USERNAME%", user.Person.Firstname + " " + user.Person.Lastname);
            template = template.Replace("%ONETIMEPASSWORD%", passInEmail);

            MailSenderService _service = new MailSenderService(user.Person.Email, mail.Subject, template);
            try
            {
                _service.SendMail();
            }
            catch (Exception ex)
            {

            }

        }
    }
}
