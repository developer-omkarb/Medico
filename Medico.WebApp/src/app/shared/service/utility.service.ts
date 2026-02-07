import { Injectable } from '@angular/core';
import { LoaderService } from './loader.service';
import { ToasterService } from './toaster.service';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(public toastService: ToasterService,public loader:LoaderService) {}
  
  getUserFromSession(): any {
    return JSON.parse(sessionStorage.getItem('user'))
  }
  showPopover(target: HTMLElement) {
    const errorDivElement = target.nextElementSibling;
    const errorToBeLoaded = "#" + errorDivElement.id;
    target.setAttribute('data-container', "html");
    target.setAttribute('data-html', "true");
    target.setAttribute('data-placement', "bottom");
    target.setAttribute('data-content', $(errorToBeLoaded).html());
    $(target).popover('show')
  }
  initializePopover() {
    $('[data-toggle="popover"]').popover({
      trigger: 'focus',
      animation: true,
      html: true,
      placement: 'bottom',
      container: 'html'
    });
  }
  
  showPopoverCopy(event:Event,errParentNode : HTMLElement){

    const target = event.target as HTMLElement

    const errorNode = errParentNode.lastElementChild



    target.setAttribute('data-container',"html");

    target.setAttribute('data-html',"true");

    target.setAttribute('data-placement',"bottom");

    target.setAttribute('data-content',$(errorNode).html());

    $(target).popover('show')

  }

  showSuccess(successText) {
    this.toastService.show(successText, { classname: 'bg-success text-light'});
  }

  showDanger(errorText) {
    this.toastService.show(errorText, { classname: 'bg-danger text-light'});
  }

  showWarning(warningText) {
    this.toastService.show(warningText, { classname: 'bg-warning text-dark'});
  }

  showOrRemoveLoader(loaderFlag : boolean){
    this.loader.toggleLoader(loaderFlag);
  }
  getStrDate(date:Date) {
    console.log(typeof(date))
  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1; // Months start at 0!
  var dd = date.getDate();
  console.log(dd)
  let ddd,mmm
  if (dd < 10){ddd = '0' + dd;} else{ddd =dd;}
  if (mm < 10){mmm = '0' + mm;} else{mmm =mm;}

  const retdate = ddd + '-' + mmm + '-' + yyyy;
  console.log(retdate)
  return retdate
    }
  dateTransform(date:string) {
    const dateval =new Date(date.replace(/-/g, '\/').replace(/T.+/, ''))
    dateval.setTime(dateval.getTime() + 86400000 );
    return ((dateval)).toISOString().substring(0,10)
  }
}
