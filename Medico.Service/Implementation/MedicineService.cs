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
    public class MedicineService:IMedicineService
    {
        private IRepository<MedicinMaster> _repo;
        private MedicoContext _context;
        private ILogger _logger;
        public MedicineService(IRepository<MedicinMaster> repo,MedicoContext context, ILogger logger)
        {
            _repo = repo;
            _context = context;
            _logger = logger;

        }

        public void AddMedicineData(MedicinMaster medicinMaster)
        {

            try
            {
                _repo.Create(medicinMaster);
            }
            catch(Exception ex)
            {
                _logger.LogException(typeof(MedicineService).Name, nameof(IMedicineService.AddMedicineData), "Error: " + ex.Message + " StackTrace: " + ex.StackTrace, (int)LogType.Service);
            }
            
        }

        public IEnumerable<MedicinMaster> GetAllMedicin()
        {
            IEnumerable<MedicinMaster> medicins = Enumerable.Empty<MedicinMaster>();

            try
            {
                medicins =  _repo.GetAll();

                return medicins;
            }
           catch(Exception ex)
            {
                _logger.LogException(typeof(MedicineService).Name, nameof(IMedicineService.GetAllMedicin), "Error: " + ex.Message + " StackTrace: " + ex.StackTrace, (int)LogType.Service);
            }
            return medicins;
        }

        public MedicinMaster GetMedicinById(int Id)
        {
            MedicinMaster medicin = new MedicinMaster();

            try
            {
                medicin = _repo.GetByProperty(x => x.Medicinid == Id);
                return medicin;
            }
            catch(Exception ex)
            {
                _logger.LogException(typeof(MedicineService).Name, nameof(IMedicineService.GetMedicinById), "Error: " + ex.Message + " StackTrace: " + ex.StackTrace, (int)LogType.Service);
            }
            return medicin;
        }

        public int UpdateMedicineData(MedicinMaster medicinMaster)
        {
            int rows = 0;

            try
            {
                _context.MedicinMaster.Update(medicinMaster);
                rows = _context.SaveChanges();
                return rows;
            }
            catch(Exception ex)
            {
                _logger.LogException(typeof(MedicineService).Name, nameof(IMedicineService.UpdateMedicineData), "Error: " + ex.Message + " StackTrace: " + ex.StackTrace, (int)LogType.Service);
            }
            return rows;
        }
    }
}
