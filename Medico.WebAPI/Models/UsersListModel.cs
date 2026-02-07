using System;

namespace Medico.WebAPI.Models
{
    public class UsersListModel
    {
        public int userid { get; set; }

        public string Username { get; set; }

        public string Role { get; set; }

        public string Name { get; set; }

        //public string Lastname { get; set; }

        public bool Islocked { get; set; }
        public string Createdby { get; set; }
        public DateTime Createddate { get; set; }

        public string Employeecode { get; set; }

        public string password { get; set; }

        public bool Isactive { get; set; }

        public string status { get; set; }
    }
}
