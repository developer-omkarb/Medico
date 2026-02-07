using Medico.Data.DBContext;
using System;
using System.Linq;
using System.Net;
using System.Net.Mail;

namespace EmailSenderService
{
    class EmailSender
    {
        private readonly Email _mail;
        protected internal EmailSender(Email mail)
        {
            this._mail = mail;
        }
        protected internal string Send()
        {
            try
            {
                MedicoContext _context = new MedicoContext();
                var config = _context.Configuration.FirstOrDefault(c => c.Pairfor == "email");
                string From = config.Key;
                string Pwd = config.Value;
                MailMessage message = new MailMessage();
                SmtpClient smtp = new SmtpClient();
                message.From = new MailAddress(From);
                message.To.Add(new MailAddress(_mail.To));
                message.Subject = _mail.Subject;
                message.IsBodyHtml = true; //to make message body as html  
                message.Body = _mail.MailBody;
                smtp.Port = 587;
                smtp.Host = "smtp.gmail.com"; //for gmail host  
                smtp.EnableSsl = true;
                smtp.UseDefaultCredentials = false;
                smtp.Credentials = new NetworkCredential(From, Pwd);
                smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                smtp.Send(message);
                return "success";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
    }
}
