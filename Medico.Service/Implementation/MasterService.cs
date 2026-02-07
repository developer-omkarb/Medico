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
    public class MasterService : IMasterService
    {
        private IRepository<TitleMaster> _TitleRepo;
        private IRepository<AppointmentStatusMaster> _appointmentStatusRepo;
        private IRepository<AppointmentTimeslotsMaster> _appointmentTimeslotsRepo;
        private IRepository<DepartmentMaster> _departmentRepo;
        private IRepository<DiagnosisMaster> _diagnosisRepo;
        private IRepository<DialcodeMaster> _dialcodeRepo;
        private IRepository<AllergyMaster> _allergyRepo;
        private IRepository<VitalSignsMaster> _vitalSignsRepo;
        private IRepository<EthenicityMaster> _ethenicityRepo;
        private IRepository<LanguageMaster> _languageRepo;
        private IRepository<MedicinMaster> _medicinRepo;
        private IRepository<ProcedureMaster> _procedureRepo;
        private IRepository<RoleMaster> _roleRepo;
        private IRepository<SpecialityMaster> _specialityRepo;


        public MasterService(IRepository<TitleMaster> titleRepo,
        IRepository<AppointmentStatusMaster> appointmentStatusRepo,
        IRepository<DepartmentMaster> departmentRepo,
        IRepository<DiagnosisMaster> diagnosisRepo,
        IRepository<DialcodeMaster> dialcodeRepo,
        IRepository<AllergyMaster> allergyRepo,
        IRepository<VitalSignsMaster> vitalSignsRepo,
        IRepository<AppointmentTimeslotsMaster> appointmentTimeslotsRepo,
        IRepository<EthenicityMaster> ethenicityRepo,
        IRepository<LanguageMaster> languageRepo,
        IRepository<MedicinMaster> medicinRepo,
        IRepository<ProcedureMaster> procedureRepo,
        IRepository<RoleMaster> roleRepo,
        IRepository<SpecialityMaster> specialityRepo)
        {
            this._TitleRepo = titleRepo;
            this._appointmentStatusRepo = appointmentStatusRepo;
            this._appointmentTimeslotsRepo = appointmentTimeslotsRepo;
            this._departmentRepo = departmentRepo;
            this._diagnosisRepo = diagnosisRepo;
            this._dialcodeRepo = dialcodeRepo;
            this._allergyRepo = allergyRepo;
            this._vitalSignsRepo = vitalSignsRepo;
            this._ethenicityRepo = ethenicityRepo;
            this._languageRepo = languageRepo;
            this._medicinRepo = medicinRepo;
            this._procedureRepo = procedureRepo;
            this._roleRepo = roleRepo;
            this._specialityRepo = specialityRepo;
        }

        public IEnumerable<AllergyMaster> GetAllAllergy()
        {
            return _allergyRepo.GetAll();
        }

        public IEnumerable<AppointmentStatusMaster> GetAllAppointmentStatus()
        {
            return _appointmentStatusRepo.GetAll();
        }

        public IEnumerable<AppointmentTimeslotsMaster> GetAllAppointmentTimeslots()
        {
            return _appointmentTimeslotsRepo.GetAll();
        }

        public IEnumerable<DepartmentMaster> GetAllDepartment()
        {
            return _departmentRepo.GetAll();
        }

        public IEnumerable<DiagnosisMaster> GetAllDiagnosis()
        {
            return _diagnosisRepo.GetAll();
        }

        public IEnumerable<DialcodeMaster> GetAllDialcode()
        {
            return _dialcodeRepo.GetAll();
        }

        public AllergyMaster GetAllergyById(int Id)
        {
            var data = _allergyRepo.GetByProperty(x => x.Allergyid == Id);
            return data; 
        }

        public IEnumerable<EthenicityMaster> GetAllEthinicity()
        {
            return _ethenicityRepo.GetAll();
        }

        public IEnumerable<LanguageMaster> GetAllLanguage()
        {
            return _languageRepo.GetAll();
        }

        public IEnumerable<MedicinMaster> GetAllMedicin()
        {
            return _medicinRepo.GetAll();
        }

        public IEnumerable<ProcedureMaster> GetAllProcedure()
        {
            return _procedureRepo.GetAll();
        }

        public IEnumerable<RoleMaster> GetAllRole()
        {
            return _roleRepo.GetAll();
        }

        public IEnumerable<SpecialityMaster> GetAllSpeciality()
        {
            return _specialityRepo.GetAll();
        }

        public IEnumerable<TitleMaster> GetAllTitles()
        {
            return _TitleRepo.GetAll();
        }

        public IEnumerable<VitalSignsMaster> GetAllVitalSigns()
        {
            return _vitalSignsRepo.GetAll();
        }

        public AppointmentStatusMaster GetAppointmentStatusById(int Id)
        {
            var data = _appointmentStatusRepo.GetByProperty(x => x.Appointmentstatusid == Id);
            return data;
        }

        public AppointmentTimeslotsMaster GetAppointmentTimeslotsById(int Id)
        {
            var data = _appointmentTimeslotsRepo.GetByProperty(x => x.Timeslotid == Id);
            return data;
        }

        public DepartmentMaster GetDepartmentById(int Id)
        {
            var data = _departmentRepo.GetByProperty(x => x.Departmentid == Id);
            return data;
        }

        public DiagnosisMaster GetDiagnosisById(int Id)
        {
            var data = _diagnosisRepo.GetByProperty(x => x.Diagnosisid == Id);
            return data;
        }

        public DialcodeMaster GetDialcodeById(int Id)
        {
            var data = _dialcodeRepo.GetByProperty(x => x.Dialcodeid == Id);
            return data;
        }

        public EthenicityMaster GetEthinicityById(int Id)
        {
            var data = _ethenicityRepo.GetByProperty(x => x.Ethenicityid == Id); return data;
        }

        public LanguageMaster GetLanguageById(int Id)
        {
            var data = _languageRepo.GetByProperty(x => x.Languageid == Id);
            return data;
        }

        public MedicinMaster GetMedicinById(int Id)
        {
            var data = _medicinRepo.GetByProperty(x => x.Medicinid == Id);
            return data;
        }

        public ProcedureMaster GetProcedureById(int Id)
        {
            var data = _procedureRepo.GetByProperty(x => x.Procedureid == Id);
            return data;
        }

        public RoleMaster GetRoleById(int Id)
        {
            var data = _roleRepo.GetByProperty(x => x.Roleid == Id);
            return data;
        }

        public SpecialityMaster GetSpecialityById(int Id)
        {
            var data = _specialityRepo.GetByProperty(x => x.Specialityid == Id);
            return data;
        }

        public TitleMaster GetTitleById(int Id)
        {
            return _TitleRepo.GetByProperty(x => x.Titleid == Id);
        }

        public VitalSignsMaster GetVitalSignsById(int Id)
        {
            return _vitalSignsRepo.GetByProperty(x => x.Vitalsignid == Id);
        }
    }
}
