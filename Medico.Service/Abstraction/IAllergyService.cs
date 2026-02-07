using Medico.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Medico.Service.Abstraction
{
    public interface IAllergyService
    {
        IEnumerable<AllergyMaster> GetAllAllergy();
        AllergyMaster GetAllergyById(int Id);
        void AddAllergyData(AllergyMaster allergyMaster);
        int UpdateAllergyData(AllergyMaster allergyMaster);
    }
}
