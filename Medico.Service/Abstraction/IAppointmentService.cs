using Medico.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Medico.Service.Abstraction
{
    public enum Timeslots
    {

       
    }
    public interface IAppointmentService
    {
        int getUserByAppointmentId(int appointmentid);
        List<AppointmentTimeslotsMaster> GetAvaiableAppointment(int phyid, DateTime appDate);
        void CreateAppointment(int userId, string appointmentTitle, int phyId, DateTime date, int selectedSlotId);
        IEnumerable<Appointment> GetPatientAppointments(int patientId, DateTime startDate, DateTime endDate);
        IEnumerable<Appointment> GetAppointmentsPerWeekByDate(DateTime weekDayDate, int userId);
        string GetPhysicianNameByPK(int? phyId);
        IEnumerable<Appointment> GetAppointmentDetails(int userId, string role);
        IDictionary<int, string> GetAllAppointmentSlotsForDropDown();
        IDictionary<int, string> GetAllAppointmentStatusForDropDown(int userid, int appointmentId);
        IDictionary<int, string> GetAllAppointmentActionsForDropDown(int userid, int appointmentId);
        bool UpdateAppointment(Appointment app);
        void CancelAppointment(int appointmentId, int userid);
        public bool savePatientDiagnosisDetails(PatientDiagnosis[] diagnosisDetails);
        public bool saveProcedureDetails(PatientProcedureDetails[] procedureetails);
        public bool saveVitalSignDetails(PatientVisitDetails patientVisitDetails);
        public bool AddPrescriptionDetails(PatientPrescription prescription);
        KeyValuePair<int, string> CheckAppointmentStatusForCancellation(int appointmentId);
        IEnumerable<Appointment> GetAllAppointmentList(int userid);

        bool DeleteAppointment(int appointmentid,int statusid);

        Appointment GetAppointmentById(int appointmentId);
        PatientPrescription GetPrescriptionDetailsById(int prescriptionId);
        DemographicDetails GetDemographicDetailsById(int employeeid);
        public string GetFullNameByEmployeeId(int empid);
        IEnumerable<Appointment> GetPatientVisitHistory(int patientId);
        public PatientVisitDetails getVitalSignDetailsbyAppointmentId(int appointmentId);
        public IEnumerable<PatientDiagnosis> GetDiagnosisDetailsbyAppointmentId(int appointmentId);
        public IEnumerable<PatientProcedureDetails> GetProcedureDetailsbyAppointmentId(int appointmentId);
        public PatientPrescription GetPrescriptionDetailsbyAppointmentId(int appointmentId);
        public bool isProfileComplete(int userid);
        bool CheckAppointmentConflict(DateTime searchDateVal, int selectedslotid);
    }
}
