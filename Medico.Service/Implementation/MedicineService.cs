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
    public class MedicineService:IMedicineService
    {
        private IRepository<MedicinMaster> _repo;
        private MedicoContext _context;
        private ILogger<MedicineService> _logger;
        public MedicineService(IRepository<MedicinMaster> repo,MedicoContext context, ILogger<MedicineService> logger)
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
                _logger.LogError(ex, typeof(MedicineService).Name + ":" + nameof(IMedicineService.AddMedicineData));
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
                _logger.LogError(ex, typeof(MedicineService).Name + ":" + nameof(IMedicineService.GetAllMedicin));
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
                _logger.LogError(ex, typeof(MedicineService).Name + ":" + nameof(IMedicineService.GetMedicinById));
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
                _logger.LogError(ex, typeof(MedicineService).Name + ":" + nameof(IMedicineService.UpdateMedicineData));
            }
            return rows;
        }
    }
}
