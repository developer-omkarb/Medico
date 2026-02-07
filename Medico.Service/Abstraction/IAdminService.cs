using Medico.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Medico.Service.Abstraction
{
    public interface IAdminService
    {
        string GetNewEmployeeCode();

        int GetTotalUserCount(int role);
        int GetTotalAppointmentCount(bool isToday);
        IEnumerable<Appointment> GetAppointmentList();


        IEnumerable<Data.Entities.User> GetHospitalUsers();

        IEnumerable<Data.Entities.User> GetPatientUsers();

        string GetRole(int roleId);

        bool ManageUserAccount(int userId, int value, string randomstring, string randomstring2);

        void UpdateUser(User user);
        User GetUserById(int userId);
        IEnumerable<User> GetAllUsers();
    }
}
