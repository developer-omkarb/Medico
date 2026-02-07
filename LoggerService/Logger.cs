using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LoggerService
{
    public class Logger : ILogger
    {
        public void LogException(string className, string methodName, string message,int logType)
        {
            var file = logType ==(int) LogType.Api ? "ApiLogs" + DateTime.Now.ToString("ddMMyyyy", CultureInfo.InvariantCulture) + ".txt" : "ServiceLogs" + DateTime.Now.ToString("ddMMyyyy", CultureInfo.InvariantCulture) + ".txt";
            var str = new StringBuilder();
            FileStream fileStream = new FileStream("Logs/"+file, FileMode.Append, FileAccess.Write);
            StreamWriter writer = new StreamWriter(fileStream);
            str.AppendLine("Timestamp: "+DateTime.Now);
            str.AppendLine("Class: "+className+"   Method: "+methodName);
            str.AppendLine("Message: "+message);
            str.AppendLine("******************************************************************************");
            str.AppendLine("******************************************************************************");
            writer.WriteLine(str);
            writer.Close();
        }
    }
}
