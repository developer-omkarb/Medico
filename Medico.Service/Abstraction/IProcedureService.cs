using Medico.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Medico.Service.Abstraction
{
    public interface IProcedureService
    {
        void AddProcedureData(ProcedureMaster procedureMaster);
        int UpdateProcedureData(ProcedureMaster procedureMaster);
        IEnumerable<ProcedureMaster> GetAllProcedure();
        ProcedureMaster GetProcedureById(int Id);
    }
}
