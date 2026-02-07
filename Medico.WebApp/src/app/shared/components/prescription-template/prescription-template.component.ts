import { AfterViewInit, Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { AuthService } from 'src/app/auth.service';
import { AppointmentModel } from '../../../patient/models/appointments-model';
import { PatientPrescriptionModel } from '../../../patient/models/patient-prescription-model';

@Component({
  selector: 'app-prescription-template',
  templateUrl: './prescription-template.component.html',
  styleUrls: ['./prescription-template.component.css']
})
export class PrescriptionTemplateComponent implements OnInit {
  prescriptionId: number;
  prescription: PatientPrescriptionModel;
  appointmentDetails: AppointmentModel;
  temp:any=[];
  rows: any = [];  
  totalCount: Number = 0;  
  closeResult: string;  
  
  dataParams: any = {  
      page_num: '',  
      page_size: ''  
  };  
  
  constructor(private auth: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.prescriptionId = parseInt(params["id"]);
      this.getPrescriptionDetails();
      this.dataParams.page_num = 1;  
      this.dataParams.page_size = 10;
      this.rows=this.prescription.medicinDetails;
      this.temp=this.rows;
      this.totalCount=this.prescription.medicinDetails.length;
    });
  }
  getPrescriptionDetails() {
    this.auth.getPrescriptionById(this.prescriptionId).subscribe(pr => {
      this.prescription=pr;
      this.getAppointmentDetails(pr.appointmentid);
      console.log(this.appointmentDetails);
    });
  }
  
  downloadPRescription() {
    let data = document.getElementById('contentToConvert');
    html2canvas(data as any).then(canvas => {
      var imgWidth = 210;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      const contentDataURL = canvas.toDataURL('image/png');
      let pdfData = new jsPDF('p', 'mm', 'a4');
      var position = 0;
      pdfData.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdfData.save(`${this.appointmentDetails.patient.person.firstname}_${new Date(this.appointmentDetails.apptdate).toDateString()}.pdf`);
    });
  }
  getAppointmentDetails(appointmentid:number) {
    this.auth.getAppointmentById(appointmentid).subscribe((appt: AppointmentModel) => {
      this.appointmentDetails = appt;
      console.log(this.appointmentDetails);
    });
  }

}
