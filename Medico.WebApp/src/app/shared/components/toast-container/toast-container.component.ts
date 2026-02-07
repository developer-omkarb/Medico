import { Component, TemplateRef } from '@angular/core';
import { ToasterService } from '../../service/toaster.service';

@Component({
  selector: 'app-toast-container',
  templateUrl:'./toast-container.component.html' ,
  styleUrls: ['./toast-container.component.css'],
  host: {
    class: 'toast-container position-fixed top-0 end-0 p-3',
    style: 'z-index: 1200',
  },
})
export class ToastContainerComponent {

  constructor(public toastService: ToasterService) { }

  

  isTemplate(toast) {
    return toast.textOrTpl instanceof TemplateRef;
  }

}
