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
    public class AllergyService : IAllergyService
    {
        private IRepository<AllergyMaster> _repo;
        private MedicoContext _context;
        private ILogger _logger;
        public AllergyService(IRepository<AllergyMaster> repo,MedicoContext context,ILogger logger)
        {
            _repo = repo;
            _context = context;
            _logger = logger;
        }
        public void AddAllergyData(AllergyMaster allergyMaster)
        {
            try
            {
                _repo.Create(allergyMaster);
            }

            catch (Exception ex)
            {
                _logger.LogException(typeof(AllergyService).Name, nameof(IAllergyService.AddAllergyData), "Error: " + ex.Message + " StackTrace: " + ex.StackTrace, (int)LogType.Service);
            }
           
        }

        public IEnumerable<AllergyMaster> GetAllAllergy()
        {
            IEnumerable<AllergyMaster> allergies = Enumerable.Empty<AllergyMaster>();

            try
            {
                allergies =  _repo.GetAll().OrderByDescending(x=>x.Createddate);
                return allergies;
            }

            catch(Exception ex)
            {
                _logger.LogException(typeof(AllergyService).Name, nameof(IAllergyService.AddAllergyData), "Error: " + ex.Message + " StackTrace: " + ex.StackTrace, (int)LogType.Service);
            }

            return allergies;
        }

        public AllergyMaster GetAllergyById(int Id)
        {
            AllergyMaster allergy = new AllergyMaster();

            try
            {
                allergy = _repo.GetByProperty(x => x.Allergyid == Id);
                return allergy;
            }
            catch(Exception ex)
            {
                _logger.LogException(typeof(AllergyService).Name, nameof(IAllergyService.GetAllergyById), "Error: " + ex.Message + " StackTrace: " + ex.StackTrace, (int)LogType.Service);
            }
            return allergy;
           
        }

        public int UpdateAllergyData(AllergyMaster allergyMaster)
        {
            int rows = 0;
            try
            {
                _context.AllergyMaster.Update(allergyMaster);
                 rows = _context.SaveChanges();
                return rows;
            }
            catch(Exception ex)
            {
                _logger.LogException(typeof(AllergyService).Name, nameof(IAllergyService.UpdateAllergyData), "Error: " + ex.Message + " StackTrace: " + ex.StackTrace, (int)LogType.Service);
            }

            return rows;
           }
    }
}
