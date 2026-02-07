import { Observable } from 'rxjs';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PatientProfileModel } from '../models/patient-profile-model';
import { ResponseModel } from 'src/app/user/models/response-model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private baseUrl: string = environment.JsonServerUrl;
  

  constructor(private httpClient: HttpClient) { }

  saveProfile(patientdata : PatientProfileModel){
    console.log("inside service for HTTP CALL: ",patientdata)
    console.log("BASE URL IS: ",this.baseUrl)
    let response: ResponseModel = { isError: false, Message:"" };
      this.httpClient.post(`${this.baseUrl}/patient-profile`, patientdata).subscribe();
    console.log("HTTP CALL DONE DATA SAVED profile repsonse: ", response);
    return response;
  }
}
