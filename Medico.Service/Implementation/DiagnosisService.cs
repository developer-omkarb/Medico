using LoggerService;
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
    public class DiagnosisService : IDiagnosisService
    {
        private IRepository<DiagnosisMaster> _repo;
        private MedicoContext _context;
        private ILogger _logger;
        public DiagnosisService(IRepository<DiagnosisMaster> repo,MedicoContext context)
        {
            _repo = repo;
            _context = context;
        }
        public void AddDiagnosisData(DiagnosisMaster diagnosisMaster)
        {
            try
            {
                _repo.Create(diagnosisMaster);
            }
            catch(Exception ex)
            {
                _logger.LogException(typeof(DiagnosisService).Name, nameof(IDiagnosisService.AddDiagnosisData), "Error: " + ex.Message + " StackTrace: " + ex.StackTrace, (int)LogType.Service);
            }
           
        }

        public IEnumerable<DiagnosisMaster> GetAllDiagnosis()
        {
            IEnumerable<DiagnosisMaster> diagnosisData = Enumerable.Empty<DiagnosisMaster>();
            try
            {
               
                diagnosisData =  _repo.GetAll();
                return diagnosisData;
            }

            catch(Exception ex)
            {
                _logger.LogException(typeof(DiagnosisService).Name, nameof(IDiagnosisService.GetAllDiagnosis), "Error: " + ex.Message + " StackTrace: " + ex.StackTrace, (int)LogType.Service);
            }

            return diagnosisData;
            
        }

        public DiagnosisMaster GetDiagnosisById(int Id)
        {
            DiagnosisMaster diagnosis = new DiagnosisMaster();

            try
            {
                diagnosis = _repo.GetByProperty(x => x.Diagnosisid == Id);
                return diagnosis;
            }
            catch(Exception ex)
            {
                _logger.LogException(typeof(DiagnosisService).Name, nameof(IDiagnosisService.GetDiagnosisById), "Error: " + ex.Message + " StackTrace: " + ex.StackTrace, (int)LogType.Service);
            }
            return diagnosis;
        }

        public int UpdateDiagnosisData(DiagnosisMaster diagnosisMaster)
        {
            int rows = 0;
            try
            {
                _context.DiagnosisMaster.Update(diagnosisMaster);
                rows = _context.SaveChanges();
            }

            catch(Exception ex)
            {
                _logger.LogException(typeof(DiagnosisService).Name, nameof(IDiagnosisService.UpdateDiagnosisData), "Error: " + ex.Message + " StackTrace: " + ex.StackTrace, (int)LogType.Service);
            }

            
            return rows;
        }
    }
}
