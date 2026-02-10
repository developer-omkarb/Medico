using System;
using Microsoft.EntityFrameworkCore;
using Medico.Data.Entities;

namespace Medico.Data.DBContext
{
    public partial class MedicoContext : DbContext
    {
        public MedicoContext()
        {
        }

        public MedicoContext(DbContextOptions<MedicoContext> options)
            : base(options)
        {
        }

        // All DbSets from your project
        public virtual DbSet<AllergyMaster> AllergyMaster { get; set; }
        public virtual DbSet<Appointment> Appointment { get; set; }
        public virtual DbSet<AppointmentActionMaster> AppointmentActionMaster { get; set; }
        public virtual DbSet<AppointmentStatusMaster> AppointmentStatusMaster { get; set; }
        public virtual DbSet<AppointmentTimeslotsMaster> AppointmentTimeslotsMaster { get; set; }
        public virtual DbSet<CityMaster> CityMaster { get; set; }
        public virtual DbSet<Configuration> Configuration { get; set; }
        public virtual DbSet<CountryMaster> CountryMaster { get; set; }
        public virtual DbSet<DemographicDetails> DemographicDetails { get; set; }
        public virtual DbSet<DepartmentMaster> DepartmentMaster { get; set; }
        public virtual DbSet<DiagnosisMaster> DiagnosisMaster { get; set; }
        public virtual DbSet<DialcodeMaster> DialcodeMaster { get; set; }
        public virtual DbSet<Emails> Emails { get; set; }
        public virtual DbSet<Emailtemplates> Emailtemplates { get; set; }
        public virtual DbSet<EmergencyContInfo> EmergencyContInfo { get; set; }
        public virtual DbSet<Employee> Employee { get; set; }
        public virtual DbSet<EthenicityMaster> EthenicityMaster { get; set; }
        public virtual DbSet<LanguageMaster> LanguageMaster { get; set; }
        public virtual DbSet<LoginHistory> LoginHistory { get; set; }
        public virtual DbSet<MedicinDetails> MedicinDetails { get; set; }
        public virtual DbSet<MedicinMaster> MedicinMaster { get; set; }
        public virtual DbSet<Notification> Notification { get; set; }
        public virtual DbSet<NotificationTemplates> NotificationTemplates { get; set; }
        public virtual DbSet<PasswordChangeRequests> PasswordChangeRequests { get; set; }
        public virtual DbSet<Patient> Patient { get; set; }
        public virtual DbSet<PatientDiagnosis> PatientDiagnosis { get; set; }
        public virtual DbSet<PatientPrescription> PatientPrescription { get; set; }
        public virtual DbSet<PatientProcedureDetails> PatientProcedureDetails { get; set; }
        public virtual DbSet<PatientVisitDetails> PatientVisitDetails { get; set; }
        public virtual DbSet<ProcedureMaster> ProcedureMaster { get; set; }
        public virtual DbSet<RoleMaster> RoleMaster { get; set; }
        public virtual DbSet<SpecialityMaster> SpecialityMaster { get; set; }
        public virtual DbSet<StateMaster> StateMaster { get; set; }
        public virtual DbSet<StatusMaster> StatusMaster { get; set; }
        public virtual DbSet<TitleMaster> TitleMaster { get; set; }
        public virtual DbSet<User> User { get; set; }
        public virtual DbSet<VitalSignsMaster> VitalSignsMaster { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // --- 1. PRIMARY KEY MAPPINGS (Resolves "Primary Key required" errors) ---
            modelBuilder.Entity<AllergyMaster>(e => { e.HasKey(x => x.Allergyid); e.ToTable("allergy_master", "master"); });
            modelBuilder.Entity<AppointmentActionMaster>(e => { e.HasKey(x => x.Actionid); e.ToTable("appointment_action_master", "master"); });
            modelBuilder.Entity<AppointmentStatusMaster>(e => { e.HasKey(x => x.Appointmentstatusid); e.ToTable("appointment_status_master", "master"); });
            modelBuilder.Entity<AppointmentTimeslotsMaster>(e => { e.HasKey(x => x.Timeslotid); e.ToTable("appointment_timeslots_master", "master"); });
            modelBuilder.Entity<CityMaster>(e => { e.HasKey(x => x.Cityid); e.ToTable("city_master", "master"); });
            modelBuilder.Entity<Configuration>(e => { e.HasKey(x => x.Id); e.ToTable("configuration", "master"); });
            modelBuilder.Entity<CountryMaster>(e => { e.HasKey(x => x.Countryid); e.ToTable("country_master", "master"); });
            modelBuilder.Entity<DepartmentMaster>(e => { e.HasKey(x => x.Departmentid); e.ToTable("department_master", "master"); });
            modelBuilder.Entity<DiagnosisMaster>(e => { e.HasKey(x => x.Diagnosisid); e.ToTable("diagnosis_master", "master"); e.Property(x => x.IsDeprecated).HasDefaultValueSql("((0))"); });
            modelBuilder.Entity<DialcodeMaster>(e => { e.HasKey(x => x.Dialcodeid); e.ToTable("dialcode_master", "master"); });
            modelBuilder.Entity<Emails>(e => { e.HasKey(x => x.Emailid); e.ToTable("emails", "users"); });
            modelBuilder.Entity<Emailtemplates>(e => { e.HasKey(x => x.Id); e.ToTable("emailtemplates", "master"); });
            modelBuilder.Entity<EmergencyContInfo>(e => { e.HasKey(x => x.Emergencycontactid); e.ToTable("emergency_cont_info", "person"); });
            modelBuilder.Entity<Employee>(e => { e.HasKey(x => x.Employeeid); e.ToTable("employee", "hospital"); });
            modelBuilder.Entity<EthenicityMaster>(e => { e.HasKey(x => x.Ethenicityid); e.ToTable("ethenicity_master", "master"); });
            modelBuilder.Entity<LanguageMaster>(e => { e.HasKey(x => x.Languageid); e.ToTable("language_master", "master"); });
            modelBuilder.Entity<LoginHistory>(e => { e.HasKey(x => x.Loginhistoryid); e.ToTable("login_history", "users"); });
            modelBuilder.Entity<MedicinDetails>(e => { e.HasKey(x => x.Medicindetailid); e.ToTable("medicin_details", "appointment"); });
            modelBuilder.Entity<MedicinMaster>(e => { e.HasKey(x => x.Medicinid); e.ToTable("medicin_master", "master"); e.Property(x => x.IsDeprecated).HasDefaultValueSql("((0))"); });
            modelBuilder.Entity<Notification>(e => { e.HasKey(x => x.Id); e.ToTable("notification", "users"); e.Property(x => x.Createddate).HasDefaultValueSql("(getdate())"); });
            modelBuilder.Entity<NotificationTemplates>(e => { e.HasKey(x => x.Notificationid); e.ToTable("notification_templates", "master"); });
            modelBuilder.Entity<PasswordChangeRequests>(e => { e.HasKey(x => x.Id); e.ToTable("password_change_requests", "users"); });
            modelBuilder.Entity<Patient>(entity =>
            {
                entity.HasKey(x => x.Patientid);
                entity.ToTable("patient", "hospital");

                entity.Property(e => e.Allergies).HasColumnType("nvarchar(max)");
                entity.Property(e => e.Emergencycontacts).HasColumnType("nvarchar(max)");
                entity.Property(e => e.Allergiesdescription).HasColumnType("nvarchar(max)");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Patient)
                    .HasForeignKey(d => d.Userid)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("fk_patient_user");

                entity.HasOne(d => d.Person)
                    .WithMany(p => p.Patient)
                    .HasForeignKey(d => d.Personid)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("fk_patient_person");
            });
            modelBuilder.Entity<PatientDiagnosis>(e => { e.HasKey(x => x.Patientdiagnosisid); e.ToTable("patient_diagnosis", "appointment"); });
            modelBuilder.Entity<PatientPrescription>(e => { e.HasKey(x => x.Patientprescriptionid); e.ToTable("patient_prescription", "appointment"); });
            modelBuilder.Entity<PatientProcedureDetails>(e => { e.HasKey(x => x.Patientprocedureid); e.ToTable("patient_procedure_details", "appointment"); });
            modelBuilder.Entity<ProcedureMaster>(e => { e.HasKey(x => x.Procedureid); e.ToTable("procedure_master", "master"); e.Property(x => x.IsDeprecated).HasDefaultValueSql("((0))"); });
            modelBuilder.Entity<RoleMaster>(e => { e.HasKey(x => x.Roleid); e.ToTable("role_master", "master"); });
            modelBuilder.Entity<SpecialityMaster>(e => { e.HasKey(x => x.Specialityid); e.ToTable("speciality_master", "master"); });
            modelBuilder.Entity<StateMaster>(e => { e.HasKey(x => x.Stateid); e.ToTable("state_master", "master"); });
            modelBuilder.Entity<StatusMaster>(e => { e.HasKey(x => x.Statusid); e.ToTable("status_master", "master"); });
            modelBuilder.Entity<TitleMaster>(e => { e.HasKey(x => x.Titleid); e.ToTable("title_master", "master"); });
            modelBuilder.Entity<VitalSignsMaster>(e => { e.HasKey(x => x.Vitalsignid); e.ToTable("vital_signs_master", "master"); e.Property(x => x.Createddate).HasDefaultValueSql("(getdate())"); });

            // --- 2. RELATIONSHIP MAPPINGS (Resolves Navigation/Relationship errors) ---
            modelBuilder.Entity<Appointment>(entity =>
            {
                entity.HasKey(e => e.Appointmentid);
                entity.ToTable("appointment", "appointment");

                entity.HasOne(d => d.Nurse).WithMany(p => p.AppointmentNurse).HasForeignKey(d => d.Nurseid).HasConstraintName("fk_nurseid");
                entity.HasOne(d => d.Physician).WithMany(p => p.AppointmentPhysician).HasForeignKey(d => d.Physicianid).HasConstraintName("fk_physicianid");
                entity.HasOne(d => d.Patient).WithMany(p => p.Appointment).HasForeignKey(d => d.Patientid).HasConstraintName("fk_patientid");
                entity.HasOne(d => d.Appointmentstatus).WithMany(p => p.Appointment).HasForeignKey(d => d.Appointmentstatusid).OnDelete(DeleteBehavior.ClientSetNull);
            });

            modelBuilder.Entity<PatientVisitDetails>(e => {
                e.HasKey(x => x.Patientvisitdetailid);
                e.ToTable("patient_visit_details", "appointment");
                e.Property(x => x.Vitalsigns).HasColumnType("nvarchar(max)");
            });

            modelBuilder.Entity<DemographicDetails>(e => {
                e.HasKey(x => x.Personid);
                e.ToTable("demographic_details", "person");
                e.Property(x => x.Languageknown).HasColumnType("nvarchar(max)");
            });

            modelBuilder.Entity<User>(e => {
                e.HasKey(x => x.Userid);
                e.ToTable("user", "users");
                e.Property(x => x.Isfirstlogin).HasDefaultValueSql("((1))");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}