import { EventEmitter } from '@angular/core';
import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-view-patient-visit-history',
  templateUrl: './view-patient-visit-history.component.html',
  styleUrls: ['./view-patient-visit-history.component.css']
})
export class ViewPatientVisitHistoryComponent implements OnInit {
  @Input() patientId: number;
  @Input() patientName: string;

  @Output() closeEvent = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }
  closePopUp() {
    this.closeEvent.emit();
  }
}
