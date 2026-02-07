using Medico.Data.DBContext;
using Medico.Data.Entities;
using Medico.Service.Abstraction;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Medico.Service.Implementation
{
    public class PhysicianService : IPhysicianService
    {
        private MedicoContext _context;
        public PhysicianService(MedicoContext context)
        {
            this._context = context;
        }
        public List<User> GetPhysicianBySearch(string searchtxtboxval, string searchdrpdownval, int physicianid)
        {
            int maxRows = 10;
            if (searchtxtboxval == "undefined" && searchdrpdownval != "undefined")
            {
                int allergyId = int.Parse(searchdrpdownval);
                var data = (from phy in _context.User.Include(x => x.Employee).Include(x => x.Person)
                    .Where(x => x.Roleid == 2)
                            select phy).ToList();
                var userToReturn = new List<User>();
                foreach (var item in data)
                {
                    foreach (int spId in item.Employee.Spacilities)
                    {
                        if (spId == allergyId)
                        {
                            userToReturn.Add(item);
                            break;
                        }
                    }
                }
                return userToReturn;
            }
            else if (searchtxtboxval != "undefined" && searchdrpdownval == "undefined")
            {
                return (from phy in _context.User.Include(x => x.Employee).Include(x => x.Person)
                    .Where(x => x.Roleid == 2 &&
                    x.Person.Firstname.ToLower().Contains(searchtxtboxval.ToLower()))
                        select phy).ToList();
            }
            else if (searchtxtboxval != "undefined" && searchdrpdownval != "undefined")
            {
                int allergyId = int.Parse(searchdrpdownval);
                var data = (from phy in _context.User.Include(x => x.Employee).Include(x => x.Person)
                    .Where(x => x.Roleid == 2 &&
                     (x.Person.Firstname + " " + x.Person.Lastname).ToLower().Contains(searchtxtboxval.ToLower()))
                            select phy).ToList();
                var userToReturn = new List<User>();
                foreach (var item in data)
                {
                    foreach (int spId in item.Employee.Spacilities)
                    {
                        if (spId == allergyId)
                        {
                            userToReturn.Add(item);
                            break;
                        }
                    }
                }
                return userToReturn;
            }
            else
            {
                return (from phy in _context.User.Include(x => x.Employee).Include(x => x.Person)
                        .Where(x => x.Roleid == 2)
                        select phy).ToList();
            }
        }

        public List<User> GetPhysicianInfo()
        {
            return (from phy in _context.User.Include(x => x.Employee).Include(x => x.Person)
                    .Where(x => x.Roleid == 2)
                    select phy).ToList();
        }

        public IDictionary<int, string> GetAllPhysiciansIdNamesForDropDowns()
        {
            IDictionary<int, string> dict = new Dictionary<int, string>();
            var userdata = from p in _context.User.Include(x => x.Person).Where(x => x.Roleid == 2)
                           select p;
            foreach (var user in userdata)
            {
                dict.Add(new KeyValuePair<int, string>((int)user.Employeeid,
                    user.Person.Firstname + " " + user.Person.Lastname));
            }
            return dict;
        }
    }
}
