using System.Collections.Generic;

namespace EmailSenderService
{
    class Email
    {
        protected internal Email(string to, string subject, string body)
        {
            this.To = to;
            this.Subject = subject;
            this.MailBody = body;
        }
        protected internal Email(string to, IEnumerable<string> cc, string subject, string body) : this(to, subject, body)
        {
            this.CC = cc;
        }
        protected internal Email(string to, IEnumerable<string> cc, IEnumerable<string> bcc, string subject, string body) : this(to, cc, subject, body)
        {
            this.Bcc = bcc;
        }

        protected internal string To { get; set; }
        protected internal IEnumerable<string> CC { get; set; }
        protected internal IEnumerable<string> Bcc { get; set; }
        protected internal string Subject { get; set; }
        protected internal string MailBody { get; set; }
    }
}
