using Medico.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Medico.Service.Abstraction
{
    public interface IPhysicianService
    {
        List<User> GetPhysicianInfo();
        List<User> GetPhysicianBySearch(string searchtxtboxval,string searchdrpdownval, int physicianid);
        IDictionary<int, string> GetAllPhysiciansIdNamesForDropDowns();
    }
}
