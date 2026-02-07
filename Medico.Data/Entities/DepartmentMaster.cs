using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace Medico.Data.Entities
{
    public partial class DepartmentMaster
    {
        public DepartmentMaster()
        {
            Employee = new HashSet<Employee>();
        }

        public int Departmentid { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Employee> Employee { get; set; }
    }
}
