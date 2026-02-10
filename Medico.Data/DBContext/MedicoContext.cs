using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Medico.Data.Entities;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

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

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseNpgsql("Host=localhost;Database=Medico;Username=postgres;Password=root"); //uses localhost postgres
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AllergyMaster>(entity =>
            {
                entity.HasKey(e => e.Allergyid)
                    .HasName("allergy_master_pkey");

                entity.ToTable("allergy_master", "master");

                entity.Property(e => e.Allergyid).HasColumnName("allergyid");

                entity.Property(e => e.Allerginicity)
                    .IsRequired()
                    .HasColumnName("allerginicity")
                    .HasMaxLength(100);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(50);

                entity.Property(e => e.Partialsequences)
                    .IsRequired()
                    .HasColumnName("partialsequences")
                    .HasMaxLength(100);

                entity.Property(e => e.Source)
                    .IsRequired()
                    .HasColumnName("source")
                    .HasMaxLength(100);

                entity.Property(e => e.Type)
                    .IsRequired()
                    .HasColumnName("type")
                    .HasMaxLength(20);

                entity.Property(e => e.Createdby)
                .HasColumnName("createdby");

                entity.Property(e => e.Createddate)
                .HasColumnName("createddate");

                entity.Property(e => e.Modifiedby)
                .HasColumnName("modifiedby");

                entity.Property(e => e.Modfieddate)
                .HasColumnName("modifieddate");
            });

            modelBuilder.Entity<Appointment>(entity =>
            {
                entity.ToTable("appointment", "appointment");

                entity.Property(e => e.Appointmentid).HasColumnName("appointmentid");

                entity.Property(e => e.Appointmentstatusid).HasColumnName("appointmentstatusid");

                entity.Property(e => e.Apptdate)
                    .HasColumnName("apptdate")
                    .HasColumnType("date");

                entity.Property(e => e.Createdby)
                    .IsRequired()
                    .HasColumnName("createdby")
                    .HasMaxLength(50);

                entity.Property(e => e.Createddate)
                    .HasColumnName("createddate")
                    .HasColumnType("date");

                entity.Property(e => e.Description)
                    .HasColumnName("description")
                    .HasMaxLength(200);

                entity.Property(e => e.Modifiedby)
                    .HasColumnName("modifiedby")
                    .HasMaxLength(50);

                entity.Property(e => e.Modifieddate)
                    .HasColumnName("modifieddate")
                    .HasColumnType("date");

                entity.Property(e => e.Nurseid).HasColumnName("nurseid");

                entity.Property(e => e.Patientid).HasColumnName("patientid");

                entity.Property(e => e.Physicianid).HasColumnName("physicianid");

                entity.Property(e => e.RejectCancelReason)
                    .HasColumnName("reject_cancel_reason")
                    .HasMaxLength(200);

                entity.Property(e => e.Timeslotid).HasColumnName("timeslotid");

                entity.Property(e => e.Title)
                    .HasColumnName("title")
                    .HasMaxLength(50);

                entity.HasOne(d => d.Appointmentstatus)
                    .WithMany(p => p.Appointment)
                    .HasForeignKey(d => d.Appointmentstatusid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_appointmentstatusid");

                entity.HasOne(d => d.Nurse)
                    .WithMany(p => p.AppointmentNurse)
                    .HasForeignKey(d => d.Nurseid)
                    .HasConstraintName("fk_nurseid");

                entity.HasOne(d => d.Patient)
                    .WithMany(p => p.Appointment)
                    .HasForeignKey(d => d.Patientid)
                    .HasConstraintName("fk_patientid");

                entity.HasOne(d => d.Physician)
                    .WithMany(p => p.AppointmentPhysician)
                    .HasForeignKey(d => d.Physicianid)
                    .HasConstraintName("fk_physicianid");

                entity.HasOne(d => d.Timeslot)
                    .WithMany(p => p.Appointment)
                    .HasForeignKey(d => d.Timeslotid)
                    .HasConstraintName("appointment_timeslotid_fkey");
            });

            modelBuilder.Entity<AppointmentActionMaster>(entity =>
            {
                entity.HasKey(e => e.Actionid)
                    .HasName("appointment_action_master_pkey");

                entity.ToTable("appointment_action_master", "master");

                entity.Property(e => e.Actionid).HasColumnName("actionid");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<AppointmentStatusMaster>(entity =>
            {
                entity.HasKey(e => e.Appointmentstatusid)
                    .HasName("appointment_status_master_pkey");

                entity.ToTable("appointment_status_master", "master");

                entity.Property(e => e.Appointmentstatusid).HasColumnName("appointmentstatusid");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(50);

                entity.Property(e => e.Roleid).HasColumnName("roleid");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.AppointmentStatusMaster)
                    .HasForeignKey(d => d.Roleid)
                    .HasConstraintName("fk_roleid");
            });

            modelBuilder.Entity<AppointmentTimeslotsMaster>(entity =>
            {
                entity.HasKey(e => e.Timeslotid)
                    .HasName("appointment_timeslots_master_pkey");

                entity.ToTable("appointment_timeslots_master", "master");

                entity.Property(e => e.Timeslotid).HasColumnName("timeslotid");

                entity.Property(e => e.Value)
                    .IsRequired()
                    .HasColumnName("value")
                    .HasMaxLength(20);
            });

            modelBuilder.Entity<CityMaster>(entity =>
            {
                entity.HasKey(e => e.Cityid)
                    .HasName("city_master_pkey");

                entity.ToTable("city_master", "master");

                entity.Property(e => e.Cityid).HasColumnName("cityid");

                entity.Property(e => e.Code)
                    .IsRequired()
                    .HasColumnName("code")
                    .HasMaxLength(50);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(50);

                entity.Property(e => e.Stateid).HasColumnName("stateid");

                entity.HasOne(d => d.State)
                    .WithMany(p => p.CityMaster)
                    .HasForeignKey(d => d.Stateid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_stateid");
            });

            modelBuilder.Entity<Configuration>(entity =>
            {
                entity.ToTable("configuration", "master");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Key)
                    .IsRequired()
                    .HasColumnName("key")
                    .HasMaxLength(50);

                entity.Property(e => e.Pairfor)
                    .IsRequired()
                    .HasColumnName("pairfor")
                    .HasMaxLength(50);

                entity.Property(e => e.Value)
                    .IsRequired()
                    .HasColumnName("value")
                    .HasMaxLength(200);
            });

            modelBuilder.Entity<CountryMaster>(entity =>
            {
                entity.HasKey(e => e.Countryid)
                    .HasName("country_master_pkey");

                entity.ToTable("country_master", "master");

                entity.Property(e => e.Countryid).HasColumnName("countryid");

                entity.Property(e => e.Countrycode)
                    .IsRequired()
                    .HasColumnName("countrycode")
                    .HasMaxLength(10);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<DemographicDetails>(entity =>
            {
                entity.HasKey(e => e.Personid)
                    .HasName("demographic_details_pkey");

                entity.ToTable("demographic_details", "person");

                entity.Property(e => e.Personid).HasColumnName("personid");

                entity.Property(e => e.Address)
                    .HasColumnName("address")
                    .HasMaxLength(200);

                entity.Property(e => e.Age).HasColumnName("age");

                entity.Property(e => e.Cityid).HasColumnName("cityid");

                entity.Property(e => e.Contactnumber)
                    .IsRequired()
                    .HasColumnName("contactnumber")
                    .HasMaxLength(15);

                entity.Property(e => e.Dialcode)
                    .HasColumnName("dialcode")
                    .HasMaxLength(10);

                entity.Property(e => e.Dob)
                    .HasColumnName("dob")
                    .HasColumnType("date");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("email")
                    .HasMaxLength(50);

                entity.Property(e => e.Ethnicity)
                    .HasColumnName("ethnicity")
                    .HasMaxLength(20);

                entity.Property(e => e.Firstname)
                    .IsRequired()
                    .HasColumnName("firstname")
                    .HasMaxLength(20);

                entity.Property(e => e.Gender)
                    .IsRequired()
                    .HasColumnName("gender")
                    .HasMaxLength(10);

                entity.Property(e => e.Languageknown)
                    .HasColumnName("languageknown")
                    .HasColumnType("character varying(100)[]");

                entity.Property(e => e.Lastname)
                    .HasColumnName("lastname")
                    .HasMaxLength(20);

                entity.Property(e => e.Race)
                    .HasColumnName("race")
                    .HasMaxLength(20);

                entity.Property(e => e.Titleid).HasColumnName("titleid");

                entity.HasOne(d => d.City)
                    .WithMany(p => p.DemographicDetails)
                    .HasForeignKey(d => d.Cityid)
                    .HasConstraintName("fk_cityid");

                entity.HasOne(d => d.Title)
                    .WithMany(p => p.DemographicDetails)
                    .HasForeignKey(d => d.Titleid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_titleid");
            });

            modelBuilder.Entity<DepartmentMaster>(entity =>
            {
                entity.HasKey(e => e.Departmentid)
                    .HasName("department_master_pkey");

                entity.ToTable("department_master", "master");

                entity.Property(e => e.Departmentid).HasColumnName("departmentid");

                entity.Property(e => e.Code)
                    .IsRequired()
                    .HasColumnName("code")
                    .HasMaxLength(10);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<DiagnosisMaster>(entity =>
            {
                entity.HasKey(e => e.Diagnosisid)
                    .HasName("diagnosis_master_pkey");

                entity.ToTable("diagnosis_master", "master");

                entity.Property(e => e.Diagnosisid).HasColumnName("diagnosisid");

                entity.Property(e => e.Code)
                    .IsRequired()
                    .HasColumnName("code")
                    .HasMaxLength(10);

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasColumnName("description")
                    .HasMaxLength(200);

                entity.Property(e => e.IsDeprecated)
                    .HasColumnName("isdeprecated")
                    .HasDefaultValueSql("false");

                entity.Property(e => e.Createdby)
                .HasColumnName("createdby");

                entity.Property(e => e.Createddate)
                .HasColumnName("createddate");

                entity.Property(e => e.Modifiedby)
                .HasColumnName("modifiedby");

                entity.Property(e => e.Modfieddate)
                .HasColumnName("modifieddate");
            });

            modelBuilder.Entity<DialcodeMaster>(entity =>
            {
                entity.HasKey(e => e.Dialcodeid)
                    .HasName("dialcode_master_pkey");

                entity.ToTable("dialcode_master", "master");

                entity.Property(e => e.Dialcodeid).HasColumnName("dialcodeid");

                entity.Property(e => e.Countryid).HasColumnName("countryid");

                entity.Property(e => e.Dialcode)
                    .IsRequired()
                    .HasColumnName("dialcode")
                    .HasColumnType("character varying");

                entity.HasOne(d => d.Country)
                    .WithMany(p => p.DialcodeMaster)
                    .HasForeignKey(d => d.Countryid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_countryid");
            });

            modelBuilder.Entity<Emails>(entity =>
            {
                entity.HasKey(e => e.Emailid)
                    .HasName("emails_pkey");

                entity.ToTable("emails", "users");

                entity.Property(e => e.Emailid).HasColumnName("emailid");

                entity.Property(e => e.Body)
                    .HasColumnName("body")
                    .HasMaxLength(2000);

                entity.Property(e => e.Issent).HasColumnName("issent");

                entity.Property(e => e.Purpose)
                    .HasColumnName("purpose")
                    .HasMaxLength(50);

                entity.Property(e => e.Receiver)
                    .HasColumnName("receiver")
                    .HasMaxLength(20);

                entity.Property(e => e.Sender)
                    .HasColumnName("sender")
                    .HasMaxLength(20);

                entity.Property(e => e.Sentdate)
                    .HasColumnName("sentdate")
                    .HasColumnType("date");

                entity.Property(e => e.Subject)
                    .HasColumnName("subject")
                    .HasMaxLength(200);
            });

            modelBuilder.Entity<Emailtemplates>(entity =>
            {
                entity.ToTable("emailtemplates", "master");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Html)
                    .HasColumnName("html")
                    .HasMaxLength(8000);

                entity.Property(e => e.Purpose)
                    .HasColumnName("purpose")
                    .HasMaxLength(200);

                entity.Property(e => e.Role)
                    .HasColumnName("role")
                    .HasMaxLength(50);

                entity.Property(e => e.Screen)
                    .HasColumnName("screen")
                    .HasMaxLength(20);

                entity.Property(e => e.Subject)
                    .HasColumnName("subject")
                    .HasMaxLength(200);
            });

            modelBuilder.Entity<EmergencyContInfo>(entity =>
            {
                entity.HasKey(e => e.Emergencycontactid)
                    .HasName("emergency_cont_info_pkey");

                entity.ToTable("emergency_cont_info", "person");

                entity.Property(e => e.Emergencycontactid).HasColumnName("emergencycontactid");

                entity.Property(e => e.Address)
                    .HasColumnName("address")
                    .HasMaxLength(200);

                entity.Property(e => e.Allowedaccess).HasColumnName("allowedaccess");

                entity.Property(e => e.Contactnumber)
                    .IsRequired()
                    .HasColumnName("contactnumber")
                    .HasMaxLength(20);

                entity.Property(e => e.Dialcode)
                    .HasColumnName("dialcode")
                    .HasMaxLength(10);

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("email")
                    .HasMaxLength(20);

                entity.Property(e => e.Firstname)
                    .IsRequired()
                    .HasColumnName("firstname")
                    .HasMaxLength(20);

                entity.Property(e => e.Lastname)
                    .HasColumnName("lastname")
                    .HasMaxLength(20);

                entity.Property(e => e.Patientid).HasColumnName("patientid");

                entity.Property(e => e.Relationship)
                    .IsRequired()
                    .HasColumnName("relationship")
                    .HasMaxLength(20);

                entity.Property(e => e.Title)
                    .HasColumnName("title")
                    .HasMaxLength(4);

                entity.HasOne(d => d.Patient)
                    .WithMany(p => p.EmergencyContInfo)
                    .HasForeignKey(d => d.Patientid)
                    .HasConstraintName("fk_patientid");
            });

            modelBuilder.Entity<Employee>(entity =>
            {
                entity.ToTable("employee", "hospital");

                entity.Property(e => e.Employeeid).HasColumnName("employeeid");

                entity.Property(e => e.Code)
                    .IsRequired()
                    .HasColumnName("code")
                    .HasMaxLength(50);

                entity.Property(e => e.Createdby)
                    .IsRequired()
                    .HasColumnName("createdby")
                    .HasMaxLength(50);

                entity.Property(e => e.Createddate)
                    .HasColumnName("createddate")
                    .HasColumnType("date");

                entity.Property(e => e.Departmentid).HasColumnName("departmentid");

                entity.Property(e => e.Experience).HasColumnName("experience");

                entity.Property(e => e.Modifiedby)
                    .HasColumnName("modifiedby")
                    .HasMaxLength(50);

                entity.Property(e => e.Modifieddate)
                    .HasColumnName("modifieddate")
                    .HasColumnType("date");

                entity.Property(e => e.Spacilities).HasColumnName("spacilities");

                entity.Property(e => e.Worklocation)
                    .HasColumnName("worklocation")
                    .HasMaxLength(50);

                entity.HasOne(d => d.Department)
                    .WithMany(p => p.Employee)
                    .HasForeignKey(d => d.Departmentid)
                    .HasConstraintName("fk_departmentid");
            });

            modelBuilder.Entity<EthenicityMaster>(entity =>
            {
                entity.HasKey(e => e.Ethenicityid)
                    .HasName("ethenicity_master_pkey");

                entity.ToTable("ethenicity_master", "master");

                entity.Property(e => e.Ethenicityid).HasColumnName("ethenicityid");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<LanguageMaster>(entity =>
            {
                entity.HasKey(e => e.Languageid)
                    .HasName("language_master_pkey");

                entity.ToTable("language_master", "master");

                entity.Property(e => e.Languageid).HasColumnName("languageid");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<LoginHistory>(entity =>
            {
                entity.ToTable("login_history", "users");

                entity.Property(e => e.Loginhistoryid).HasColumnName("loginhistoryid");

                entity.Property(e => e.Attempts).HasColumnName("attempts");

                entity.Property(e => e.Ipaddress)
                    .HasColumnName("ipaddress")
                    .HasMaxLength(10);

                entity.Property(e => e.Loggedoutsuccessfully).HasColumnName("loggedoutsuccessfully");

                entity.Property(e => e.Logindatetime)
                    .HasColumnName("logindatetime")
                    .HasColumnType("date");

                entity.Property(e => e.Userid).HasColumnName("userid");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.LoginHistory)
                    .HasForeignKey(d => d.Userid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_userid");
            });

            modelBuilder.Entity<MedicinDetails>(entity =>
            {
                entity.HasKey(e => e.Medicindetailid)
                    .HasName("medicin_details_pkey");

                entity.ToTable("medicin_details", "appointment");

                entity.Property(e => e.Medicindetailid).HasColumnName("medicindetailid");

                entity.Property(e => e.Dosagedetails)
                    .HasColumnName("dosagedetails")
                    .HasMaxLength(200);

                entity.Property(e => e.Medicinid).HasColumnName("medicinid");

                entity.Property(e => e.Patientprescriptionid).HasColumnName("patientprescriptionid");

                entity.Property(e => e.Prescriptionnote)
                    .HasColumnName("prescriptionnote")
                    .HasMaxLength(200);

                entity.HasOne(d => d.Medicin)
                    .WithMany(p => p.MedicinDetails)
                    .HasForeignKey(d => d.Medicinid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_medicinid");

                entity.HasOne(d => d.Patientprescription)
                    .WithMany(p => p.MedicinDetails)
                    .HasForeignKey(d => d.Patientprescriptionid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_patientprescriptionid");
            });

            modelBuilder.Entity<MedicinMaster>(entity =>
            {
                entity.HasKey(e => e.Medicinid)
                    .HasName("medicin_master_pkey");

                entity.ToTable("medicin_master", "master");

                entity.Property(e => e.Medicinid).HasColumnName("medicinid");

                entity.Property(e => e.Activeingredient)
                    .IsRequired()
                    .HasColumnName("activeingredient")
                    .HasMaxLength(100);

                entity.Property(e => e.Appno).HasColumnName("appno");

                entity.Property(e => e.Drugname)
                    .IsRequired()
                    .HasColumnName("drugname")
                    .HasMaxLength(100);

                entity.Property(e => e.Form)
                    .IsRequired()
                    .HasColumnName("form")
                    .HasMaxLength(30);

                entity.Property(e => e.IsDeprecated)
                    .HasColumnName("isdeprecated")
                    .HasDefaultValueSql("false");

                entity.Property(e => e.Medicinnumber).HasColumnName("medicinnumber");

                entity.Property(e => e.Referencedrug)
                    .IsRequired()
                    .HasColumnName("referencedrug")
                    .HasMaxLength(50);

                entity.Property(e => e.Strength)
                    .IsRequired()
                    .HasColumnName("strength")
                    .HasMaxLength(20);

                entity.Property(e => e.Createdby)
                .HasColumnName("createdby");

                entity.Property(e => e.Createddate)
                .HasColumnName("createddate");

                entity.Property(e => e.Modifiedby)
                .HasColumnName("modifiedby");

                entity.Property(e => e.Modfieddate)
                .HasColumnName("modifieddate");
            });

            modelBuilder.Entity<Notification>(entity =>
            {
                entity.ToTable("notification", "users");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Appointmentid).HasColumnName("appointmentid");

                entity.Property(e => e.Createddate)
                    .HasColumnName("createddate")
                    .HasDefaultValueSql("now()");

                entity.Property(e => e.Isread)
                    .HasColumnName("isread")
                    .HasDefaultValueSql("false");

                entity.Property(e => e.Notificationid).HasColumnName("notificationid");

                entity.Property(e => e.Userid).HasColumnName("userid");

                entity.HasOne(d => d.Appointment)
                    .WithMany(p => p.Notification)
                    .HasForeignKey(d => d.Appointmentid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_appointmentid");

                entity.HasOne(d => d.NotificationNavigation)
                    .WithMany(p => p.Notification)
                    .HasForeignKey(d => d.Notificationid)
                    .HasConstraintName("fk_notificationid");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Notification)
                    .HasForeignKey(d => d.Userid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_userid");
            });

            modelBuilder.Entity<NotificationTemplates>(entity =>
            {
                entity.HasKey(e => e.Notificationid)
                    .HasName("notification_templates_pkey");

                entity.ToTable("notification_templates", "master");

                entity.Property(e => e.Notificationid).HasColumnName("notificationid");

                entity.Property(e => e.Description)
                    .HasColumnName("description")
                    .HasMaxLength(200);

                entity.Property(e => e.Isdeprecated)
                    .HasColumnName("isdeprecated")
                    .HasDefaultValueSql("false");

                entity.Property(e => e.Title)
                    .HasColumnName("title")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<PasswordChangeRequests>(entity =>
            {
                entity.ToTable("password_change_requests", "users");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Randomhashid)
                    .HasColumnName("randomhashid")
                    .HasMaxLength(100);

                entity.Property(e => e.Time).HasColumnName("time");

                entity.Property(e => e.Userid)
                    .HasColumnName("userid")
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<Patient>(entity =>
            {
                entity.ToTable("patient", "hospital");

                entity.Property(e => e.Patientid).HasColumnName("patientid");

                entity.Property(e => e.Allergies).HasColumnName("allergies");

                entity.Property(e => e.Allergiesdescription).HasColumnName("allergiesdescription");

                entity.Property(e => e.Emergencycontacts).HasColumnName("emergencycontacts");

                entity.Property(e => e.Personid).HasColumnName("personid");

                entity.Property(e => e.Userid).HasColumnName("userid");

                entity.HasOne(d => d.Person)
                    .WithMany(p => p.Patient)
                    .HasForeignKey(d => d.Personid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_personid");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Patient)
                    .HasForeignKey(d => d.Userid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_userid");
            });

            modelBuilder.Entity<PatientDiagnosis>(entity =>
            {
                entity.ToTable("patient_diagnosis", "appointment");

                entity.Property(e => e.Patientdiagnosisid).HasColumnName("patientdiagnosisid");

                entity.Property(e => e.Appointmentid).HasColumnName("appointmentid");

                entity.Property(e => e.Createdby)
                    .IsRequired()
                    .HasColumnName("createdby")
                    .HasMaxLength(10);

                entity.Property(e => e.Createddate)
                    .HasColumnName("createddate")
                    .HasColumnType("date");

                entity.Property(e => e.Diagnosisid).HasColumnName("diagnosisid");

                entity.Property(e => e.Diagnosisnote)
                    .IsRequired()
                    .HasColumnName("diagnosisnote")
                    .HasMaxLength(200);

                entity.Property(e => e.Modifiedby)
                    .HasColumnName("modifiedby")
                    .HasMaxLength(10);

                entity.Property(e => e.Modifieddate)
                    .HasColumnName("modifieddate")
                    .HasColumnType("date");

                entity.HasOne(d => d.Appointment)
                    .WithMany(p => p.PatientDiagnosis)
                    .HasForeignKey(d => d.Appointmentid)
                    .HasConstraintName("fk_appointmentid");

                entity.HasOne(d => d.Diagnosis)
                    .WithMany(p => p.PatientDiagnosis)
                    .HasForeignKey(d => d.Diagnosisid)
                    .HasConstraintName("fk_diagnosisid");
            });

            modelBuilder.Entity<PatientPrescription>(entity =>
            {
                entity.ToTable("patient_prescription", "appointment");

                entity.Property(e => e.Patientprescriptionid).HasColumnName("patientprescriptionid");

                entity.Property(e => e.Appointmentid).HasColumnName("appointmentid");

                entity.Property(e => e.Createdby)
                    .IsRequired()
                    .HasColumnName("createdby")
                    .HasMaxLength(10);

                entity.Property(e => e.Createddate)
                    .HasColumnName("createddate")
                    .HasColumnType("date");

                entity.Property(e => e.Modifiedby)
                    .HasColumnName("modifiedby")
                    .HasMaxLength(10);

                entity.Property(e => e.Modifieddate)
                    .HasColumnName("modifieddate")
                    .HasColumnType("date");

                entity.HasOne(d => d.Appointment)
                    .WithMany(p => p.PatientPrescription)
                    .HasForeignKey(d => d.Appointmentid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_appointmentid");
            });

            modelBuilder.Entity<PatientProcedureDetails>(entity =>
            {
                entity.HasKey(e => e.Patientprocedureid)
                    .HasName("patient_procedure_details_pkey");

                entity.ToTable("patient_procedure_details", "appointment");

                entity.Property(e => e.Patientprocedureid).HasColumnName("patientprocedureid");

                entity.Property(e => e.Appointmentid).HasColumnName("appointmentid");

                entity.Property(e => e.Createdby)
                    .IsRequired()
                    .HasColumnName("createdby")
                    .HasMaxLength(50);

                entity.Property(e => e.Createddate)
                    .HasColumnName("createddate")
                    .HasColumnType("date");

                entity.Property(e => e.Modifiedby)
                    .HasColumnName("modifiedby")
                    .HasMaxLength(50);

                entity.Property(e => e.Modifieddate)
                    .HasColumnName("modifieddate")
                    .HasColumnType("date");

                entity.Property(e => e.Procedureid).HasColumnName("procedureid");

                entity.Property(e => e.Procedurenote)
                    .IsRequired()
                    .HasColumnName("procedurenote")
                    .HasMaxLength(200);

                entity.HasOne(d => d.Appointment)
                    .WithMany(p => p.PatientProcedureDetails)
                    .HasForeignKey(d => d.Appointmentid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_appointmentid");

                entity.HasOne(d => d.Procedure)
                    .WithMany(p => p.PatientProcedureDetails)
                    .HasForeignKey(d => d.Procedureid)
                    .HasConstraintName("fk_procedureid");
            });

            modelBuilder.Entity<PatientVisitDetails>(entity =>
            {
                entity.HasKey(e => e.Patientvisitdetailid)
                    .HasName("patient_visit_details_pkey");

                entity.ToTable("patient_visit_details", "appointment");

                entity.Property(e => e.Patientvisitdetailid).HasColumnName("patientvisitdetailid");

                entity.Property(e => e.Appointmentid).HasColumnName("appointmentid");

                entity.Property(e => e.Createdby)
                    .IsRequired()
                    .HasColumnName("createdby")
                    .HasMaxLength(10);

                entity.Property(e => e.Createddate)
                    .HasColumnName("createddate")
                    .HasColumnType("date");

                entity.Property(e => e.Modifiedby)
                    .HasColumnName("modifiedby")
                    .HasMaxLength(10);

                entity.Property(e => e.Modifieddate)
                    .HasColumnName("modifieddate")
                    .HasColumnType("date");

                entity.Property(e => e.Vitalsigns)
                    .IsRequired()
                    .HasColumnName("vitalsigns")
                    .HasColumnType("json");

                entity.HasOne(d => d.Appointment)
                    .WithMany(p => p.PatientVisitDetails)
                    .HasForeignKey(d => d.Appointmentid)
                    .HasConstraintName("fk_appointmentid");
            });

            modelBuilder.Entity<ProcedureMaster>(entity =>
            {
                entity.HasKey(e => e.Procedureid)
                    .HasName("procedure_master_pkey");

                entity.ToTable("procedure_master", "master");

                entity.Property(e => e.Procedureid).HasColumnName("procedureid");

                entity.Property(e => e.Approach)
                    .IsRequired()
                    .HasColumnName("approach")
                    .HasMaxLength(200);

                entity.Property(e => e.Code)
                    .IsRequired()
                    .HasColumnName("code")
                    .HasMaxLength(10);

                entity.Property(e => e.IsDeprecated)
                    .HasColumnName("isdeprecated")
                    .HasDefaultValueSql("false");

                entity.Property(e => e.Createdby)
                .HasColumnName("createdby");

                entity.Property(e => e.Createddate)
                .HasColumnName("createddate");

                entity.Property(e => e.Modifiedby)
                .HasColumnName("modifiedby");

                entity.Property(e => e.Modfieddate)
                .HasColumnName("modifieddate");
            });

            modelBuilder.Entity<RoleMaster>(entity =>
            {
                entity.HasKey(e => e.Roleid)
                    .HasName("role_master_pkey");

                entity.ToTable("role_master", "master");

                entity.Property(e => e.Roleid).HasColumnName("roleid");

                entity.Property(e => e.Code)
                    .IsRequired()
                    .HasColumnName("code")
                    .HasMaxLength(10);

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<SpecialityMaster>(entity =>
            {
                entity.HasKey(e => e.Specialityid)
                    .HasName("speciality_master_pkey");

                entity.ToTable("speciality_master", "master");

                entity.Property(e => e.Specialityid).HasColumnName("specialityid");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(20);

                entity.Property(e => e.Roleid).HasColumnName("roleid");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.SpecialityMaster)
                    .HasForeignKey(d => d.Roleid)
                    .HasConstraintName("fk_roleid");
            });

            modelBuilder.Entity<StateMaster>(entity =>
            {
                entity.HasKey(e => e.Stateid)
                    .HasName("state_master_pkey");

                entity.ToTable("state_master", "master");

                entity.Property(e => e.Stateid).HasColumnName("stateid");

                entity.Property(e => e.Code)
                    .IsRequired()
                    .HasColumnName("code")
                    .HasMaxLength(50);

                entity.Property(e => e.Countryid).HasColumnName("countryid");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(50);

                entity.HasOne(d => d.Country)
                    .WithMany(p => p.StateMaster)
                    .HasForeignKey(d => d.Countryid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_countryid");
            });

            modelBuilder.Entity<StatusMaster>(entity =>
            {
                entity.HasKey(e => e.Statusid)
                    .HasName("status_master_pkey");

                entity.ToTable("status_master", "master");

                entity.Property(e => e.Statusid).HasColumnName("statusid");

                entity.Property(e => e.Value)
                    .IsRequired()
                    .HasColumnName("value")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<TitleMaster>(entity =>
            {
                entity.HasKey(e => e.Titleid)
                    .HasName("title_master_pkey");

                entity.ToTable("title_master", "master");

                entity.Property(e => e.Titleid).HasColumnName("titleid");

                entity.Property(e => e.Value)
                    .IsRequired()
                    .HasColumnName("value")
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("user", "users");

                entity.Property(e => e.Userid).HasColumnName("userid");

                entity.Property(e => e.Createdby)
                    .IsRequired()
                    .HasColumnName("createdby")
                    .HasMaxLength(50);

                entity.Property(e => e.Createddate)
                    .HasColumnName("createddate")
                    .HasColumnType("date");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("email")
                    .HasMaxLength(50);

                entity.Property(e => e.Employeeid).HasColumnName("employeeid");

                entity.Property(e => e.Isfirstlogin)
                    .HasColumnName("isfirstlogin")
                    .HasDefaultValueSql("true");

                entity.Property(e => e.Islocked).HasColumnName("islocked");

                entity.Property(e => e.Lastchangepassword)
                    .HasColumnName("lastchangepassword")
                    .HasMaxLength(100);

                entity.Property(e => e.Modifiedby)
                    .HasColumnName("modifiedby")
                    .HasMaxLength(50);

                entity.Property(e => e.Modifieddate)
                    .HasColumnName("modifieddate")
                    .HasColumnType("date");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnName("password")
                    .HasMaxLength(100);

                entity.Property(e => e.Personid).HasColumnName("personid");

                entity.Property(e => e.Roleid).HasColumnName("roleid");

                entity.Property(e => e.Statusid).HasColumnName("statusid");

                entity.HasOne(d => d.Employee)
                    .WithMany(p => p.User)
                    .HasForeignKey(d => d.Employeeid)
                    .HasConstraintName("fk_employeeid");

                entity.HasOne(d => d.Person)
                    .WithMany(p => p.User)
                    .HasForeignKey(d => d.Personid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_personid");

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.User)
                    .HasForeignKey(d => d.Roleid)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_roleid");

                entity.HasOne(d => d.Status)
                    .WithMany(p => p.User)
                    .HasForeignKey(d => d.Statusid)
                    .HasConstraintName("fk_statusid");
            });

            modelBuilder.Entity<VitalSignsMaster>(entity =>
            {
                entity.HasKey(e => e.Vitalsignid)
                    .HasName("vital_signs_master_pkey");

                entity.ToTable("vital_signs_master", "master");

                entity.Property(e => e.Vitalsignid).HasColumnName("vitalsignid");

                entity.Property(e => e.Createdby)
                    .IsRequired()
                    .HasColumnName("createdby")
                    .HasMaxLength(50)
                    .HasDefaultValueSql("now()");

                entity.Property(e => e.Createddate)
                    .HasColumnName("createddate")
                    .HasColumnType("date")
                    .HasDefaultValueSql("now()");

                entity.Property(e => e.Imgurl)
                    .HasColumnName("imgurl")
                    .HasMaxLength(100);

                entity.Property(e => e.Modifiedby)
                    .HasColumnName("modifiedby")
                    .HasMaxLength(50);

                entity.Property(e => e.Modifieddate)
                    .HasColumnName("modifieddate")
                    .HasColumnType("date");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasMaxLength(50);

                entity.Property(e => e.Unit)
                    .IsRequired()
                    .HasColumnName("unit")
                    .HasMaxLength(20);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
