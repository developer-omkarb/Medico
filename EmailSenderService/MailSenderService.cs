using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmailSenderService
{
    public class MailSenderService
    {
        private string To { get; set; }
        private string Subject { get; set; }
        private string Body { get; set; }
        public MailSenderService(string To, string subject, string htmlBody)
        {
            this.To = To;
            this.Subject = subject;
            this.Body = htmlBody;
        }
        public string SendMail()
        {
            try
            {
                Email mail = new Email(To, Subject, Body);
                EmailSender sender = new EmailSender(mail);
                sender.Send();
                return "success";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
    }
}
