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
    public class VitalSignsService:IVitalSignsService
    {
        private IRepository<VitalSignsMaster> _repo;
        private MedicoContext _context;
        public VitalSignsService(IRepository<VitalSignsMaster> repo,MedicoContext context)
        {
            _repo = repo;
            _context = context;
        }

        public void AddVitalSignData(VitalSignsMaster vitalSignsMaster)
        {
            _repo.Create(vitalSignsMaster);
        }

        public IEnumerable<VitalSignsMaster> GetAllVitalSigns()
        {
            return _repo.GetAll();
        }

        public VitalSignsMaster GetVitalSignsById(int Id)
        {
            return _repo.GetByProperty(x => x.Vitalsignid == Id);
        }

        public int UpdateVitalSignsData(VitalSignsMaster vitalSignsMaster)
        {
            _context.VitalSignsMaster.Update(vitalSignsMaster);
            var rows = _context.SaveChanges();
            return rows;
        }
    }
}
