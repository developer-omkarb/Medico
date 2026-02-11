using Microsoft.Extensions.Logging;
using Medico.Data.DBContext;
using Medico.Data.Entities;
using Medico.Repository;
using Medico.Service.Abstraction;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Medico.Service.Implementation
{
    public class ProcedureService:IProcedureService
    {
    private IRepository<ProcedureMaster> _repo;
    private MedicoContext _context;
    private ILogger<ProcedureService> _logger;
    public ProcedureService(IRepository<ProcedureMaster> repo,MedicoContext context,ILogger<ProcedureService> logger)
        {
            _repo = repo;
            _context = context;
            _logger = logger;

        }

        public void AddProcedureData(ProcedureMaster procedureMaster)
        {
            try
            {
                _repo.Create(procedureMaster);
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, typeof(ProcedureService).Name, nameof(IProcedureService.AddProcedureData));
            }
            
        }

        public IEnumerable<ProcedureMaster> GetAllProcedure()
        {
            IEnumerable<ProcedureMaster> procedures = Enumerable.Empty<ProcedureMaster>();
            try
            {
               procedures =  _repo.GetAll();
                return procedures;
            }

            catch(Exception ex)
            {
                _logger.LogError(ex, typeof(ProcedureService).Name, nameof(IProcedureService.GetAllProcedure));
            }

            return procedures;
         
        }

        public ProcedureMaster GetProcedureById(int Id)
        {
            ProcedureMaster procedure = new ProcedureMaster();

            try
            {
                procedure = _repo.GetByProperty(x => x.Procedureid == Id);
                return procedure;
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, typeof(ProcedureService).Name, nameof(IProcedureService.GetProcedureById));
            }

            return procedure;
           
        }

        public int UpdateProcedureData(ProcedureMaster procedureMaster)
        {
            int rows = 0;
            try
            {
                _context.ProcedureMaster.Update(procedureMaster);
                rows = _context.SaveChanges();
                return rows;

            }
            catch(Exception ex)
            {
                _logger.LogError(ex, typeof(ProcedureService).Name, nameof(IProcedureService.UpdateProcedureData));
            }

            return rows;
          
        }
    }
}
