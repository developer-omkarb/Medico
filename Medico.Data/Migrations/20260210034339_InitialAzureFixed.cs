using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Medico.Data.Migrations
{
    /// <inheritdoc />
    public partial class InitialAzureFixed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "master");

            migrationBuilder.EnsureSchema(
                name: "appointment");

            migrationBuilder.EnsureSchema(
                name: "person");

            migrationBuilder.EnsureSchema(
                name: "users");

            migrationBuilder.EnsureSchema(
                name: "hospital");

            migrationBuilder.CreateTable(
                name: "allergy_master",
                schema: "master",
                columns: table => new
                {
                    Allergyid = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Source = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Partialsequences = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Allerginicity = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Createdby = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Createddate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Modifiedby = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Modfieddate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_allergy_master", x => x.Allergyid);
                });

            migrationBuilder.CreateTable(
                name: "appointment_action_master",
                schema: "master",
                columns: table => new
                {
                    Actionid = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_appointment_action_master", x => x.Actionid);
                });

            migrationBuilder.CreateTable(
                name: "appointment_timeslots_master",
                schema: "master",
                columns: table => new
                {
                    Timeslotid = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_appointment_timeslots_master", x => x.Timeslotid);
                });

            migrationBuilder.CreateTable(
                name: "configuration",
                schema: "master",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Pairfor = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Key = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_configuration", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "country_master",
                schema: "master",
                columns: table => new
                {
                    Countryid = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Countrycode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_country_master", x => x.Countryid);
                });

            migrationBuilder.CreateTable(
                name: "department_master",
                schema: "master",
                columns: table => new
                {
                    Departmentid = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_department_master", x => x.Departmentid);
                });

            migrationBuilder.CreateTable(
                name: "diagnosis_master",
                schema: "master",
                columns: table => new
                {
                    Diagnosisid = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsDeprecated = table.Column<bool>(type: "bit", nullable: true, defaultValueSql: "((0))"),
                    Createdby = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Createddate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Modifiedby = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Modfieddate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_diagnosis_master", x => x.Diagnosisid);
                });

            migrationBuilder.CreateTable(
                name: "emails",
                schema: "users",
                columns: table => new
                {
                    Emailid = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Subject = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Sender = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Receiver = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Body = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Sentdate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Issent = table.Column<bool>(type: "bit", nullable: true),
                    Purpose = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_emails", x => x.Emailid);
                });

            migrationBuilder.CreateTable(
                name: "emailtemplates",
                schema: "master",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Screen = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Purpose = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Html = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Subject = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_emailtemplates", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ethenicity_master",
                schema: "master",
                columns: table => new
                {
                    Ethenicityid = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ethenicity_master", x => x.Ethenicityid);
                });

            migrationBuilder.CreateTable(
                name: "language_master",
                schema: "master",
                columns: table => new
                {
                    Languageid = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_language_master", x => x.Languageid);
                });

            migrationBuilder.CreateTable(
                name: "medicin_master",
                schema: "master",
                columns: table => new
                {
                    Medicinid = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Appno = table.Column<int>(type: "int", nullable: false),
                    Medicinnumber = table.Column<int>(type: "int", nullable: false),
                    Form = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Strength = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Referencedrug = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Drugname = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Activeingredient = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsDeprecated = table.Column<bool>(type: "bit", nullable: true, defaultValueSql: "((0))"),
                    Createdby = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Createddate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Modifiedby = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Modfieddate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_medicin_master", x => x.Medicinid);
                });

            migrationBuilder.CreateTable(
                name: "notification_templates",
                schema: "master",
                columns: table => new
                {
                    Notificationid = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Isdeprecated = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_notification_templates", x => x.Notificationid);
                });

            migrationBuilder.CreateTable(
                name: "password_change_requests",
                schema: "users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Randomhashid = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Time = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Userid = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_password_change_requests", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "procedure_master",
                schema: "master",
                columns: table => new
                {
                    Procedureid = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Approach = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsDeprecated = table.Column<bool>(type: "bit", nullable: true, defaultValueSql: "((0))"),
                    Createdby = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Createddate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Modifiedby = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Modfieddate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_procedure_master", x => x.Procedureid);
                });

            migrationBuilder.CreateTable(
                name: "role_master",
                schema: "master",
                columns: table => new
                {
                    Roleid = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_role_master", x => x.Roleid);
                });

            migrationBuilder.CreateTable(
                name: "status_master",
                schema: "master",
                columns: table => new
                {
                    Statusid = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_status_master", x => x.Statusid);
                });

            migrationBuilder.CreateTable(
                name: "title_master",
                schema: "master",
                columns: table => new
                {
                    Titleid = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_title_master", x => x.Titleid);
                });

            migrationBuilder.CreateTable(
                name: "vital_signs_master",
                schema: "master",
                columns: table => new
                {
                    Vitalsignid = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Unit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Imgurl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Createdby = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Createddate = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "(getdate())"),
                    Modifiedby = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Modifieddate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_vital_signs_master", x => x.Vitalsignid);
                });

            migrationBuilder.CreateTable(
                name: "dialcode_master",
                schema: "master",
                columns: table => new
                {
                    Dialcodeid = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Countryid = table.Column<int>(type: "int", nullable: false),
                    Dialcode = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_dialcode_master", x => x.Dialcodeid);
                    table.ForeignKey(
                        name: "FK_dialcode_master_country_master_Countryid",
                        column: x => x.Countryid,
                        principalSchema: "master",
                        principalTable: "country_master",
                        principalColumn: "Countryid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "state_master",
                schema: "master",
                columns: table => new
                {
                    Stateid = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Countryid = table.Column<int>(type: "int", nullable: false),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_state_master", x => x.Stateid);
                    table.ForeignKey(
                        name: "FK_state_master_country_master_Countryid",
                        column: x => x.Countryid,
                        principalSchema: "master",
                        principalTable: "country_master",
                        principalColumn: "Countryid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "employee",
                schema: "hospital",
                columns: table => new
                {
                    Employeeid = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Departmentid = table.Column<int>(type: "int", nullable: true),
                    Spacilities = table.Column<string>(type: "json", nullable: true),
                    Createdby = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Createddate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Modifiedby = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Modifieddate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Experience = table.Column<float>(type: "real", nullable: true),
                    Worklocation = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_employee", x => x.Employeeid);
                    table.ForeignKey(
                        name: "FK_employee_department_master_Departmentid",
                        column: x => x.Departmentid,
                        principalSchema: "master",
                        principalTable: "department_master",
                        principalColumn: "Departmentid");
                });

            migrationBuilder.CreateTable(
                name: "appointment_status_master",
                schema: "master",
                columns: table => new
                {
                    Appointmentstatusid = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Roleid = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_appointment_status_master", x => x.Appointmentstatusid);
                    table.ForeignKey(
                        name: "FK_appointment_status_master_role_master_Roleid",
                        column: x => x.Roleid,
                        principalSchema: "master",
                        principalTable: "role_master",
                        principalColumn: "Roleid");
                });

            migrationBuilder.CreateTable(
                name: "speciality_master",
                schema: "master",
                columns: table => new
                {
                    Specialityid = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Roleid = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_speciality_master", x => x.Specialityid);
                    table.ForeignKey(
                        name: "FK_speciality_master_role_master_Roleid",
                        column: x => x.Roleid,
                        principalSchema: "master",
                        principalTable: "role_master",
                        principalColumn: "Roleid");
                });

            migrationBuilder.CreateTable(
                name: "city_master",
                schema: "master",
                columns: table => new
                {
                    Cityid = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Stateid = table.Column<int>(type: "int", nullable: false),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_city_master", x => x.Cityid);
                    table.ForeignKey(
                        name: "FK_city_master_state_master_Stateid",
                        column: x => x.Stateid,
                        principalSchema: "master",
                        principalTable: "state_master",
                        principalColumn: "Stateid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "demographic_details",
                schema: "person",
                columns: table => new
                {
                    Personid = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Titleid = table.Column<int>(type: "int", nullable: false),
                    Firstname = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Lastname = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Dob = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Gender = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Cityid = table.Column<int>(type: "int", nullable: true),
                    Race = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Ethnicity = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Contactnumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Dialcode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Age = table.Column<int>(type: "int", nullable: true),
                    Languageknown = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_demographic_details", x => x.Personid);
                    table.ForeignKey(
                        name: "FK_demographic_details_city_master_Cityid",
                        column: x => x.Cityid,
                        principalSchema: "master",
                        principalTable: "city_master",
                        principalColumn: "Cityid");
                    table.ForeignKey(
                        name: "FK_demographic_details_title_master_Titleid",
                        column: x => x.Titleid,
                        principalSchema: "master",
                        principalTable: "title_master",
                        principalColumn: "Titleid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "user",
                schema: "users",
                columns: table => new
                {
                    Userid = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Personid = table.Column<int>(type: "int", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Roleid = table.Column<int>(type: "int", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Employeeid = table.Column<int>(type: "int", nullable: true),
                    Lastchangepassword = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Islocked = table.Column<bool>(type: "bit", nullable: false),
                    Createdby = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Createddate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Modifiedby = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Modifieddate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Isfirstlogin = table.Column<bool>(type: "bit", nullable: true, defaultValueSql: "((1))"),
                    Statusid = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user", x => x.Userid);
                    table.ForeignKey(
                        name: "FK_user_demographic_details_Personid",
                        column: x => x.Personid,
                        principalSchema: "person",
                        principalTable: "demographic_details",
                        principalColumn: "Personid",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_user_employee_Employeeid",
                        column: x => x.Employeeid,
                        principalSchema: "hospital",
                        principalTable: "employee",
                        principalColumn: "Employeeid");
                    table.ForeignKey(
                        name: "FK_user_role_master_Roleid",
                        column: x => x.Roleid,
                        principalSchema: "master",
                        principalTable: "role_master",
                        principalColumn: "Roleid",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_user_status_master_Statusid",
                        column: x => x.Statusid,
                        principalSchema: "master",
                        principalTable: "status_master",
                        principalColumn: "Statusid");
                });

            migrationBuilder.CreateTable(
                name: "login_history",
                schema: "users",
                columns: table => new
                {
                    Loginhistoryid = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Userid = table.Column<int>(type: "int", nullable: false),
                    Logindatetime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Ipaddress = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Loggedoutsuccessfully = table.Column<bool>(type: "bit", nullable: true),
                    Attempts = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_login_history", x => x.Loginhistoryid);
                    table.ForeignKey(
                        name: "FK_login_history_user_Userid",
                        column: x => x.Userid,
                        principalSchema: "users",
                        principalTable: "user",
                        principalColumn: "Userid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "patient",
                schema: "hospital",
                columns: table => new
                {
                    Patientid = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Personid = table.Column<int>(type: "int", nullable: false),
                    Userid = table.Column<int>(type: "int", nullable: false),
                    Allergies = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Emergencycontacts = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Allergiesdescription = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_patient", x => x.Patientid);
                    table.ForeignKey(
                        name: "fk_patient_person",
                        column: x => x.Personid,
                        principalSchema: "person",
                        principalTable: "demographic_details",
                        principalColumn: "Personid",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "fk_patient_user",
                        column: x => x.Userid,
                        principalSchema: "users",
                        principalTable: "user",
                        principalColumn: "Userid",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "appointment",
                schema: "appointment",
                columns: table => new
                {
                    Appointmentid = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Appointmentstatusid = table.Column<int>(type: "int", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Patientid = table.Column<int>(type: "int", nullable: true),
                    Physicianid = table.Column<int>(type: "int", nullable: true),
                    Nurseid = table.Column<int>(type: "int", nullable: true),
                    Createdby = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Createddate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Modifiedby = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Modifieddate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Apptdate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Timeslotid = table.Column<int>(type: "int", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RejectCancelReason = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_appointment", x => x.Appointmentid);
                    table.ForeignKey(
                        name: "FK_appointment_appointment_status_master_Appointmentstatusid",
                        column: x => x.Appointmentstatusid,
                        principalSchema: "master",
                        principalTable: "appointment_status_master",
                        principalColumn: "Appointmentstatusid");
                    table.ForeignKey(
                        name: "FK_appointment_appointment_timeslots_master_Timeslotid",
                        column: x => x.Timeslotid,
                        principalSchema: "master",
                        principalTable: "appointment_timeslots_master",
                        principalColumn: "Timeslotid");
                    table.ForeignKey(
                        name: "fk_nurseid",
                        column: x => x.Nurseid,
                        principalSchema: "hospital",
                        principalTable: "employee",
                        principalColumn: "Employeeid");
                    table.ForeignKey(
                        name: "fk_patientid",
                        column: x => x.Patientid,
                        principalSchema: "hospital",
                        principalTable: "patient",
                        principalColumn: "Patientid");
                    table.ForeignKey(
                        name: "fk_physicianid",
                        column: x => x.Physicianid,
                        principalSchema: "hospital",
                        principalTable: "employee",
                        principalColumn: "Employeeid");
                });

            migrationBuilder.CreateTable(
                name: "emergency_cont_info",
                schema: "person",
                columns: table => new
                {
                    Emergencycontactid = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Firstname = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Lastname = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Contactnumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Relationship = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Allowedaccess = table.Column<bool>(type: "bit", nullable: false),
                    Dialcode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Patientid = table.Column<int>(type: "int", nullable: true),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_emergency_cont_info", x => x.Emergencycontactid);
                    table.ForeignKey(
                        name: "FK_emergency_cont_info_patient_Patientid",
                        column: x => x.Patientid,
                        principalSchema: "hospital",
                        principalTable: "patient",
                        principalColumn: "Patientid");
                });

            migrationBuilder.CreateTable(
                name: "notification",
                schema: "users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Notificationid = table.Column<int>(type: "int", nullable: true),
                    Userid = table.Column<int>(type: "int", nullable: false),
                    Appointmentid = table.Column<int>(type: "int", nullable: false),
                    Isread = table.Column<bool>(type: "bit", nullable: true),
                    Createddate = table.Column<DateTime>(type: "datetime2", nullable: true, defaultValueSql: "(getdate())"),
                    NotificationNavigationNotificationid = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_notification", x => x.Id);
                    table.ForeignKey(
                        name: "FK_notification_appointment_Appointmentid",
                        column: x => x.Appointmentid,
                        principalSchema: "appointment",
                        principalTable: "appointment",
                        principalColumn: "Appointmentid",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_notification_notification_templates_NotificationNavigationNotificationid",
                        column: x => x.NotificationNavigationNotificationid,
                        principalSchema: "master",
                        principalTable: "notification_templates",
                        principalColumn: "Notificationid");
                    table.ForeignKey(
                        name: "FK_notification_user_Userid",
                        column: x => x.Userid,
                        principalSchema: "users",
                        principalTable: "user",
                        principalColumn: "Userid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "patient_diagnosis",
                schema: "appointment",
                columns: table => new
                {
                    Patientdiagnosisid = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Diagnosisid = table.Column<int>(type: "int", nullable: true),
                    Diagnosisnote = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Appointmentid = table.Column<int>(type: "int", nullable: true),
                    Createdby = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Createddate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Modifiedby = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Modifieddate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_patient_diagnosis", x => x.Patientdiagnosisid);
                    table.ForeignKey(
                        name: "FK_patient_diagnosis_appointment_Appointmentid",
                        column: x => x.Appointmentid,
                        principalSchema: "appointment",
                        principalTable: "appointment",
                        principalColumn: "Appointmentid");
                    table.ForeignKey(
                        name: "FK_patient_diagnosis_diagnosis_master_Diagnosisid",
                        column: x => x.Diagnosisid,
                        principalSchema: "master",
                        principalTable: "diagnosis_master",
                        principalColumn: "Diagnosisid");
                });

            migrationBuilder.CreateTable(
                name: "patient_prescription",
                schema: "appointment",
                columns: table => new
                {
                    Patientprescriptionid = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Appointmentid = table.Column<int>(type: "int", nullable: false),
                    Createdby = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Createddate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Modifiedby = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Modifieddate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_patient_prescription", x => x.Patientprescriptionid);
                    table.ForeignKey(
                        name: "FK_patient_prescription_appointment_Appointmentid",
                        column: x => x.Appointmentid,
                        principalSchema: "appointment",
                        principalTable: "appointment",
                        principalColumn: "Appointmentid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "patient_procedure_details",
                schema: "appointment",
                columns: table => new
                {
                    Patientprocedureid = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Procedureid = table.Column<int>(type: "int", nullable: true),
                    Procedurenote = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Appointmentid = table.Column<int>(type: "int", nullable: false),
                    Createdby = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Createddate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Modifiedby = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Modifieddate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_patient_procedure_details", x => x.Patientprocedureid);
                    table.ForeignKey(
                        name: "FK_patient_procedure_details_appointment_Appointmentid",
                        column: x => x.Appointmentid,
                        principalSchema: "appointment",
                        principalTable: "appointment",
                        principalColumn: "Appointmentid",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_patient_procedure_details_procedure_master_Procedureid",
                        column: x => x.Procedureid,
                        principalSchema: "master",
                        principalTable: "procedure_master",
                        principalColumn: "Procedureid");
                });

            migrationBuilder.CreateTable(
                name: "patient_visit_details",
                schema: "appointment",
                columns: table => new
                {
                    Patientvisitdetailid = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Appointmentid = table.Column<int>(type: "int", nullable: true),
                    Vitalsigns = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Createdby = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Createddate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Modifiedby = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Modifieddate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_patient_visit_details", x => x.Patientvisitdetailid);
                    table.ForeignKey(
                        name: "FK_patient_visit_details_appointment_Appointmentid",
                        column: x => x.Appointmentid,
                        principalSchema: "appointment",
                        principalTable: "appointment",
                        principalColumn: "Appointmentid");
                });

            migrationBuilder.CreateTable(
                name: "medicin_details",
                schema: "appointment",
                columns: table => new
                {
                    Medicindetailid = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Patientprescriptionid = table.Column<int>(type: "int", nullable: false),
                    Medicinid = table.Column<int>(type: "int", nullable: false),
                    Dosagedetails = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Prescriptionnote = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_medicin_details", x => x.Medicindetailid);
                    table.ForeignKey(
                        name: "FK_medicin_details_medicin_master_Medicinid",
                        column: x => x.Medicinid,
                        principalSchema: "master",
                        principalTable: "medicin_master",
                        principalColumn: "Medicinid",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_medicin_details_patient_prescription_Patientprescriptionid",
                        column: x => x.Patientprescriptionid,
                        principalSchema: "appointment",
                        principalTable: "patient_prescription",
                        principalColumn: "Patientprescriptionid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_appointment_Appointmentstatusid",
                schema: "appointment",
                table: "appointment",
                column: "Appointmentstatusid");

            migrationBuilder.CreateIndex(
                name: "IX_appointment_Nurseid",
                schema: "appointment",
                table: "appointment",
                column: "Nurseid");

            migrationBuilder.CreateIndex(
                name: "IX_appointment_Patientid",
                schema: "appointment",
                table: "appointment",
                column: "Patientid");

            migrationBuilder.CreateIndex(
                name: "IX_appointment_Physicianid",
                schema: "appointment",
                table: "appointment",
                column: "Physicianid");

            migrationBuilder.CreateIndex(
                name: "IX_appointment_Timeslotid",
                schema: "appointment",
                table: "appointment",
                column: "Timeslotid");

            migrationBuilder.CreateIndex(
                name: "IX_appointment_status_master_Roleid",
                schema: "master",
                table: "appointment_status_master",
                column: "Roleid");

            migrationBuilder.CreateIndex(
                name: "IX_city_master_Stateid",
                schema: "master",
                table: "city_master",
                column: "Stateid");

            migrationBuilder.CreateIndex(
                name: "IX_demographic_details_Cityid",
                schema: "person",
                table: "demographic_details",
                column: "Cityid");

            migrationBuilder.CreateIndex(
                name: "IX_demographic_details_Titleid",
                schema: "person",
                table: "demographic_details",
                column: "Titleid");

            migrationBuilder.CreateIndex(
                name: "IX_dialcode_master_Countryid",
                schema: "master",
                table: "dialcode_master",
                column: "Countryid");

            migrationBuilder.CreateIndex(
                name: "IX_emergency_cont_info_Patientid",
                schema: "person",
                table: "emergency_cont_info",
                column: "Patientid");

            migrationBuilder.CreateIndex(
                name: "IX_employee_Departmentid",
                schema: "hospital",
                table: "employee",
                column: "Departmentid");

            migrationBuilder.CreateIndex(
                name: "IX_login_history_Userid",
                schema: "users",
                table: "login_history",
                column: "Userid");

            migrationBuilder.CreateIndex(
                name: "IX_medicin_details_Medicinid",
                schema: "appointment",
                table: "medicin_details",
                column: "Medicinid");

            migrationBuilder.CreateIndex(
                name: "IX_medicin_details_Patientprescriptionid",
                schema: "appointment",
                table: "medicin_details",
                column: "Patientprescriptionid");

            migrationBuilder.CreateIndex(
                name: "IX_notification_Appointmentid",
                schema: "users",
                table: "notification",
                column: "Appointmentid");

            migrationBuilder.CreateIndex(
                name: "IX_notification_NotificationNavigationNotificationid",
                schema: "users",
                table: "notification",
                column: "NotificationNavigationNotificationid");

            migrationBuilder.CreateIndex(
                name: "IX_notification_Userid",
                schema: "users",
                table: "notification",
                column: "Userid");

            migrationBuilder.CreateIndex(
                name: "IX_patient_Personid",
                schema: "hospital",
                table: "patient",
                column: "Personid");

            migrationBuilder.CreateIndex(
                name: "IX_patient_Userid",
                schema: "hospital",
                table: "patient",
                column: "Userid");

            migrationBuilder.CreateIndex(
                name: "IX_patient_diagnosis_Appointmentid",
                schema: "appointment",
                table: "patient_diagnosis",
                column: "Appointmentid");

            migrationBuilder.CreateIndex(
                name: "IX_patient_diagnosis_Diagnosisid",
                schema: "appointment",
                table: "patient_diagnosis",
                column: "Diagnosisid");

            migrationBuilder.CreateIndex(
                name: "IX_patient_prescription_Appointmentid",
                schema: "appointment",
                table: "patient_prescription",
                column: "Appointmentid");

            migrationBuilder.CreateIndex(
                name: "IX_patient_procedure_details_Appointmentid",
                schema: "appointment",
                table: "patient_procedure_details",
                column: "Appointmentid");

            migrationBuilder.CreateIndex(
                name: "IX_patient_procedure_details_Procedureid",
                schema: "appointment",
                table: "patient_procedure_details",
                column: "Procedureid");

            migrationBuilder.CreateIndex(
                name: "IX_patient_visit_details_Appointmentid",
                schema: "appointment",
                table: "patient_visit_details",
                column: "Appointmentid");

            migrationBuilder.CreateIndex(
                name: "IX_speciality_master_Roleid",
                schema: "master",
                table: "speciality_master",
                column: "Roleid");

            migrationBuilder.CreateIndex(
                name: "IX_state_master_Countryid",
                schema: "master",
                table: "state_master",
                column: "Countryid");

            migrationBuilder.CreateIndex(
                name: "IX_user_Employeeid",
                schema: "users",
                table: "user",
                column: "Employeeid");

            migrationBuilder.CreateIndex(
                name: "IX_user_Personid",
                schema: "users",
                table: "user",
                column: "Personid");

            migrationBuilder.CreateIndex(
                name: "IX_user_Roleid",
                schema: "users",
                table: "user",
                column: "Roleid");

            migrationBuilder.CreateIndex(
                name: "IX_user_Statusid",
                schema: "users",
                table: "user",
                column: "Statusid");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "allergy_master",
                schema: "master");

            migrationBuilder.DropTable(
                name: "appointment_action_master",
                schema: "master");

            migrationBuilder.DropTable(
                name: "configuration",
                schema: "master");

            migrationBuilder.DropTable(
                name: "dialcode_master",
                schema: "master");

            migrationBuilder.DropTable(
                name: "emails",
                schema: "users");

            migrationBuilder.DropTable(
                name: "emailtemplates",
                schema: "master");

            migrationBuilder.DropTable(
                name: "emergency_cont_info",
                schema: "person");

            migrationBuilder.DropTable(
                name: "ethenicity_master",
                schema: "master");

            migrationBuilder.DropTable(
                name: "language_master",
                schema: "master");

            migrationBuilder.DropTable(
                name: "login_history",
                schema: "users");

            migrationBuilder.DropTable(
                name: "medicin_details",
                schema: "appointment");

            migrationBuilder.DropTable(
                name: "notification",
                schema: "users");

            migrationBuilder.DropTable(
                name: "password_change_requests",
                schema: "users");

            migrationBuilder.DropTable(
                name: "patient_diagnosis",
                schema: "appointment");

            migrationBuilder.DropTable(
                name: "patient_procedure_details",
                schema: "appointment");

            migrationBuilder.DropTable(
                name: "patient_visit_details",
                schema: "appointment");

            migrationBuilder.DropTable(
                name: "speciality_master",
                schema: "master");

            migrationBuilder.DropTable(
                name: "vital_signs_master",
                schema: "master");

            migrationBuilder.DropTable(
                name: "medicin_master",
                schema: "master");

            migrationBuilder.DropTable(
                name: "patient_prescription",
                schema: "appointment");

            migrationBuilder.DropTable(
                name: "notification_templates",
                schema: "master");

            migrationBuilder.DropTable(
                name: "diagnosis_master",
                schema: "master");

            migrationBuilder.DropTable(
                name: "procedure_master",
                schema: "master");

            migrationBuilder.DropTable(
                name: "appointment",
                schema: "appointment");

            migrationBuilder.DropTable(
                name: "appointment_status_master",
                schema: "master");

            migrationBuilder.DropTable(
                name: "appointment_timeslots_master",
                schema: "master");

            migrationBuilder.DropTable(
                name: "patient",
                schema: "hospital");

            migrationBuilder.DropTable(
                name: "user",
                schema: "users");

            migrationBuilder.DropTable(
                name: "demographic_details",
                schema: "person");

            migrationBuilder.DropTable(
                name: "employee",
                schema: "hospital");

            migrationBuilder.DropTable(
                name: "role_master",
                schema: "master");

            migrationBuilder.DropTable(
                name: "status_master",
                schema: "master");

            migrationBuilder.DropTable(
                name: "city_master",
                schema: "master");

            migrationBuilder.DropTable(
                name: "title_master",
                schema: "master");

            migrationBuilder.DropTable(
                name: "department_master",
                schema: "master");

            migrationBuilder.DropTable(
                name: "state_master",
                schema: "master");

            migrationBuilder.DropTable(
                name: "country_master",
                schema: "master");
        }
    }
}
