import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
showHideSpinner : boolean = false

  toggleLoader(loaderFlag : boolean){
    this.showHideSpinner = loaderFlag
  }
}
