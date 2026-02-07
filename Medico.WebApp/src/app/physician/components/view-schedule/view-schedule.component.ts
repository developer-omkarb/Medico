import { Component,ChangeDetectionStrategy,ViewChild,TemplateRef,} from '@angular/core';
import { startOfDay,endOfDay,subDays,addDays,endOfMonth,isSameDay, isSameMonth, addHours} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CalendarEvent,CalendarEventAction,CalendarEventTimesChangedEvent,CalendarView } from 'angular-calendar';
import { AuthService } from '../../../auth.service';
import { SidemenudummyData, SidemenuItem } from '../../../shared/models/sidemenu.model';
import { startOfHour } from 'date-fns/fp';
import { UtilService } from '../../../shared/service/utility.service';
import { AppointmnentsEditModel } from '../../../shared/models/appointmnentsedit.model';
import { AppointmentModel } from '../../../patient/models/appointments-model';
import { OnInit } from '@angular/core';
import { AfterViewInit } from '@angular/core';


const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};


@Component({
  selector: 'app-view-schedule.',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './view-schedule.component.html',
  styleUrls: ['./view-schedule.component.css']
})
export class ViewScheduleComponent implements OnInit {
  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;
  showPopUp: boolean;
  CalendarView = CalendarView;
  sidemenu_items: Array<SidemenuItem> = SidemenudummyData
  viewDate: Date = new Date();
  appointments: any;
  selctedData: any;
  appointmentEvent: CalendarEvent[] = [];
  userId: number;
  showAppointmenEditDialog: boolean = false;
  appointmentDetail: any;
  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Deleted', event);
      },

    },
    {
      label: '<i class="fa fa-eye" aria-hidden="true"></i></i>',
      a11yLabel: 'View',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('View', event);
      },

    },
  ];

  refresh = new Subject<void>();

  events: CalendarEvent[] = [];


  activeDayIsOpen: boolean = true;

  constructor(private modal: NgbModal, private auth: AuthService, private util: UtilService) {
  }

  ngOnInit(): void {
    var user = JSON.parse(sessionStorage.getItem("user"));
    this.userId = user.userid;
    console.log("user", user);
    this.sidemenu_items = SidemenudummyData.filter(x => x.role == "physician");
    //this.getAllAppointments();
   
  }

  ngAfterViewInit() {
    this.getAllAppointments();
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    if (action == "Deleted") {
      this.showPopUp = false;
      this.modal.open(this.modalContent, { size: 'sm' });

      this.selctedData = event;
    }
    else if (action == "View") {
      this.selctedData = event;
      this.showPopUp = true;


    }
    else if (action == "Edited") {
      this.selctedData = event;
      this.auth.getAppointmentById(this.selctedData.appointmentid).subscribe((appt: AppointmentModel) => {
        console.log("APPT", appt);
        this.appointmentDetail = {
          appointmentDate: appt.apptdate.toString(),
          appointmentId: appt.appointmentid,
          appointmentStatus: appt.appointmentstatus.name,
          appointmentStatusId: appt.appointmentstatusid,
          appointmentTitle: appt.title,
          description: appt.description,
          appointmentTime: appt.timeslot.value,
          nurseId: appt.nurseid,
          patientId: appt.patientid,
          physicianId: appt.physicianid,
          timeslotId: appt.timeslotid,
          createdBy: appt.createdby,
          createdDate: appt.createddate.toString(),
          physicianName: "",
          nurseName: "",
          modifiedBy: appt.modifiedby,
          modifiedDate: appt.modifieddate,
          patientName: "",
          rejectCancelReason:""
        };
       // this.appointmentDetail = apptDetail;
        console.log("data", this.appointmentDetail);
        this.showAppointmenEditDialog = true;
      });
     
    }
    this.modalData = { event, action };
  
  }
    setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  getAllAppointments() {
    this.auth.getAllAppointments(this.userId).subscribe(res => {

      this.appointments = res;
      if (this.appointments.length == 0) {
        this.util.showWarning("You have no appointments at this moment");
        this.events.length = 0;
        this.refresh.next();
      }
      else {

      this.appointments.forEach(item => {
        item.start = new Date(item.start);
        item.end = new Date(item.end);
        item.title = item.patientname;
        item.actions = this.actions;
        item.color = colors.red
        item.resizable = {
          beforeStart: true,
          afterEnd: true,
        };
        //item.draggable = true,
        this.viewDate = item.start;
        this.events.push(item);
        this.refresh.next();
      });
       
     
      console.log(this.appointments, "Apppointments");
      }
     
    });
    }

  Delete() {
    this.auth.DeleteAppointment(this.selctedData.appointmentid, this.selctedData.appointmentstatusid).subscribe(res => {
      if (res == true) {
        this.modal.dismissAll();
        this.util.showWarning("Appointment is successfully Deleted");
      }

      this.events.length = 0;
      this.getAllAppointments();

    });
  }

  closePopUp(event: any) {
    this.showPopUp = false;
    this.events;
  }

  onCloseAppointmentPromptEvent(value) {
    this.showAppointmenEditDialog = false;
  }

 
}
