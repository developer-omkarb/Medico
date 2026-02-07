using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LoggerService
{
    public enum LogType
    {
        Service=1,
        Api=2
    }
    public interface ILogger
    {
        void LogException(string className,string methodName,string message,int logtype);
    }
}
