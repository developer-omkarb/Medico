using Medico.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Medico.Service.Abstraction
{
    public interface IVitalSignsService
    {
        IEnumerable<VitalSignsMaster> GetAllVitalSigns();
        VitalSignsMaster GetVitalSignsById(int Id);
        void AddVitalSignData(VitalSignsMaster vitalSignsMaster);
        int UpdateVitalSignsData(VitalSignsMaster vitalSignsMaster);
    }
}
