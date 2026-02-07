using Medico.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Medico.Service.Abstraction
{
    public interface IMedicineService
    {
        IEnumerable<MedicinMaster> GetAllMedicin();
        MedicinMaster GetMedicinById(int Id);
        void AddMedicineData(MedicinMaster medicinMaster);
        int UpdateMedicineData(MedicinMaster medicinMaster);
    }
}
