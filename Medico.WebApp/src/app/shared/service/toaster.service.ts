import { AfterViewChecked, AfterViewInit, Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToasterService{
 

  toasts: any[] = [];

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toasterId) {
    this.toasts = this.toasts.filter(t => t?.options?.id == toasterId);
  }
}
