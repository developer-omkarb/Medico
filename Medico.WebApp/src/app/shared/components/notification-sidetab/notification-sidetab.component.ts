import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-notification-sidetab',
  templateUrl: './notification-sidetab.component.html',
  styleUrls: ['./notification-sidetab.component.css']
})
export class NotificationSidetabComponent implements OnInit {
  @Output() notificaionCountEvent = new EventEmitter<Number>()
  totalNotificationCount:number = 0
  notifications:Array<any>=[]
  constructor(private authService:AuthService) { }


  ngOnInit(): void {
    this.LoadNotificaions()    
  }
  markAsRead(appointmentid:Number){
    this.authService.SetUserNotificaionAsRead(appointmentid).subscribe(
      res=>{
        this.LoadNotificaions()
      }
    )
  }
  LoadNotificaions(){
    this.authService.GetNotificationForUser().subscribe((res:Array<any>)=>{
      this.notifications = res
      console.log(res)
      this.GetNotificationCount()
    })
  }
  GetNotificationCount(){
    this.authService.GetUserNotificaionCount().subscribe((res:number)=>{
      console.log('Noification count',res)
      this.totalNotificationCount = res
      this.EmitReadedEvent()
    })
  }
  EmitReadedEvent(){
    console.log('Noification count',this.totalNotificationCount)
    this.notificaionCountEvent.emit(this.totalNotificationCount)
  }
}
