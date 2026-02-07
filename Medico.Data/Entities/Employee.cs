using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace Medico.Data.Entities
{
    public partial class Employee
    {
        public Employee()
        {
            AppointmentNurse = new HashSet<Appointment>();
            AppointmentPhysician = new HashSet<Appointment>();
            User = new HashSet<User>();
        }

        public int Employeeid { get; set; }
        public string Code { get; set; }
        public int? Departmentid { get; set; }
        public int[] Spacilities { get; set; }
        public string Createdby { get; set; }
        public DateTime Createddate { get; set; }
        public string Modifiedby { get; set; }
        public DateTime? Modifieddate { get; set; }
        public float? Experience { get; set; }
        public string Worklocation { get; set; }

        public virtual DepartmentMaster Department { get; set; }
        public virtual ICollection<Appointment> AppointmentNurse { get; set; }
        public virtual ICollection<Appointment> AppointmentPhysician { get; set; }
        public virtual ICollection<User> User { get; set; }
    }
}
