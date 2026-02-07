using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace Medico.Data.Entities
{
    public partial class MedicinDetails
    {
        public int Medicindetailid { get; set; }
        public int Patientprescriptionid { get; set; }
        public int Medicinid { get; set; }
        public string Dosagedetails { get; set; }
        public string Prescriptionnote { get; set; }

        public virtual MedicinMaster Medicin { get; set; }
        public virtual PatientPrescription Patientprescription { get; set; }
    }
}
