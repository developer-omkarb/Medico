using Medico.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Medico.Service.Abstraction
{
    public interface IDiagnosisService
    {
        IEnumerable<DiagnosisMaster> GetAllDiagnosis();
        DiagnosisMaster GetDiagnosisById(int Id);
        void AddDiagnosisData(DiagnosisMaster diagnosisMaster);
        int UpdateDiagnosisData(DiagnosisMaster diagnosisMaster);
    }
}
