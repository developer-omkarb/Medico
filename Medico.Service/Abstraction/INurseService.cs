using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Medico.Service.Abstraction
{
    public interface INurseService
    {
        string[] GetDashboardCardsInfo(int nurseUserId);
        public IDictionary<int, string> GetAllNursesIdNamesForDropDowns();
    }
}
