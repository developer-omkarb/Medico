import { Input, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { AuthService } from 'src/app/auth.service';
import { AppointmentModel } from '../../models/appointments-model';

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.css']
})
export class PrescriptionsComponent implements OnInit {
  @Input()
  appointment:AppointmentModel;
  temp:any=[];
  rows: any = [];  
  totalCount: Number = 0;  
  closeResult: string;  
  
  dataParams: any = {  
      page_num: '',  
      page_size: ''  
  };  
  
  @ViewChild('medTable') medTable: DatatableComponent;
  constructor(private auth: AuthService,private route:Router) { }

  ngOnInit(): void {
    this.getMedicineDetails();
  }
  getMedicineDetails() {
      this.dataParams.page_num = 1;  
      this.dataParams.page_size = 10;
      this.rows=this.appointment.patientPrescription;
      this.temp=this.rows;
      this.totalCount=this.appointment.patientPrescription.length;
      this.appointment.patientPrescription.forEach(pr=>{
        if(pr.medicinDetails!=null && pr.medicinDetails.length!=0)
        {
          pr.medicinDetails.forEach(md=>{
            this.auth.getMedicineById(md.medicinid).subscribe(res=>{
              md.medicin=res;
            });
          });  
        }
        
      });
    // this.auth.getMedicineDetails().subscribe((res: MedicineDetails[]) => {
    //   let meds: string = "";
    //   this.prescriptions.forEach((pr) => {
    //     meds = "";
    //     this.medicines = res.filter(x => x.patientprescriptionid == pr.patientprescriptionid);
    //     this.medicines.forEach((med) => {
    //       var selectedmed = this.medicinemaster.find(x => x.drugid == med.medicineid);
    //       meds += selectedmed.drugName + ",";
    //     });
    //     pr.medicines = this.medicines;
    //     pr.allmedicine = meds;
    //   });
    // });
  }
  redirectToPrescription(id:number)
  {
    this.route.navigate(['/patient/view-prescription/'+id])
  }
}
