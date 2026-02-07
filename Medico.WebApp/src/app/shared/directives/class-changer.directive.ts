import { HostBinding } from '@angular/core';
import { Input } from '@angular/core';
import { HostListener } from '@angular/core';
import { Directive } from '@angular/core';

@Directive({
  selector: '[appClassChanger]'
})
export class ClassChangerDirective {

  @Input() isFormLabel = true;

  @HostBinding('class')
  class: any;

  //HostListener class will listne to all the html events
  @HostListener('focus')
  onFocus() {
    this.class = "labeltransform";
  }

  @HostListener('blur')
  onBlur() {
    this.class = "form-label";
  }
}
