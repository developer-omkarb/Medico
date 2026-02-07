using Medico.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Medico.Service.Abstraction
{
    public interface IMasterService
    {
        IEnumerable<TitleMaster> GetAllTitles();
        TitleMaster GetTitleById(int Id);
        IEnumerable<EthenicityMaster> GetAllEthinicity();
        EthenicityMaster GetEthinicityById(int Id);
        IEnumerable<LanguageMaster> GetAllLanguage();
        LanguageMaster GetLanguageById(int Id);
        IEnumerable<DialcodeMaster> GetAllDialcode();
        DialcodeMaster GetDialcodeById(int Id);
        IEnumerable<DepartmentMaster> GetAllDepartment();
        DepartmentMaster GetDepartmentById(int Id);
        IEnumerable<RoleMaster> GetAllRole();
        RoleMaster GetRoleById(int Id);
        IEnumerable<AppointmentTimeslotsMaster> GetAllAppointmentTimeslots();
        AppointmentTimeslotsMaster GetAppointmentTimeslotsById(int Id);
        IEnumerable<SpecialityMaster> GetAllSpeciality();
        SpecialityMaster GetSpecialityById(int Id);
        IEnumerable<AllergyMaster> GetAllAllergy();
        AllergyMaster GetAllergyById(int Id);
        IEnumerable<VitalSignsMaster> GetAllVitalSigns();
        VitalSignsMaster GetVitalSignsById(int Id);
        IEnumerable<AppointmentStatusMaster> GetAllAppointmentStatus();
        AppointmentStatusMaster GetAppointmentStatusById(int Id);
        IEnumerable<MedicinMaster> GetAllMedicin();
        MedicinMaster GetMedicinById(int Id);
        IEnumerable<ProcedureMaster> GetAllProcedure();
        ProcedureMaster GetProcedureById(int Id);
        IEnumerable<DiagnosisMaster> GetAllDiagnosis();
        DiagnosisMaster GetDiagnosisById(int Id);
    }
}
