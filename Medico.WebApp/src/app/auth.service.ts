import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DialCodeModel, LoginHistory, Person, RoleModel, TitleModel, UserModel } from './user/models/user-model';
import { Login } from './user/models/login-model';
import { PatientModel } from './patient/models/patient-model';
import { PatientDetailModel } from './patient/models/patient-details-model';
import { HospitalUsers, UsersListModel } from './admin/models/hospital-user-model';
import { ChangePasswordRequest } from './user/models/change-password-model';
import { AppointmentModel, Appointmnents, Diagnosis, MedicineDetails, Prescriptions, Procedures, VitalSigns } from './patient/models/appointments-model';
import { AllergyModel } from './admin/models/allergy-model';
import { ProcedureModel } from './admin/models/procedure-model';
import { DiagnosisModel } from './admin/models/diagnosis-model';
import { MedicineModel } from './admin/models/medicine-model';
import { VitalSignsModel } from './admin/models/vital-signs-model';
import { AppointmentsViewModel } from './nurse/models/appointmentsview.model';
import { UtilService } from './shared/service/utility.service';
import { diagnosisDetails} from './patient/models/diagnosis-details-model'
import { PatientPrescriptionModel } from './patient/models/patient-prescription-model';
import { procedureDetails } from './patient/models/procedure-details-model';
import { PatientVitalSigns } from './patient/models/patient-vital-signs-model';
import { PatientAppointmentsViewModel } from './patient/models/patientappointmentsview.model';
import { AppointmnentsEditModel } from './shared/models/appointmnentsedit.model';
import { KeyValModel } from './shared/models/keyval.model';
import { ViewScheduleModel } from './physician/models/view-schedule.model';





@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private baseUrl: string = environment.JsonServerUrl;
  private apibaseURL : string = environment.ApiServerUrl;
  private reqHeader : any;
  private user:any
  constructor(private httpClient: HttpClient, private utilService:UtilService) {
    this.user = utilService.getUserFromSession()

    if (this.user != null) {
      this.reqHeader = new HttpHeaders({
        'Content-Type': 'application/json'
      });
    }
   }

  //loginHistory(details: LoginHistory) {
  //  return this.httpClient.post(`${this.apibaseURL}/loginHistory`, details);
  //}
  //getUsers(): Observable<UserModel[]> {
  //  return this.httpClient.get<UserModel[]>(`${this.apibaseURL}/users`);
  //}
  getUserById(id: number): Observable<UserModel> {
    return this.httpClient.get<UserModel>(`${this.apibaseURL}/user/GetUserById/${id}`);
  }
  //getPatients(): Observable<PatientModel[]> {
  //  return this.httpClient.get<PatientModel[]>(`${this.apibaseURL}/patients`);
  //}
  //getPatientByUserId(userId: string): PatientModel {
  //  let patient: PatientModel;
  //  //this.httpClient.get<PatientModel[]>(`${this.apibaseURL}/patients`).subscribe(res => {
  //  //  patient = res.find(x => x.userid == userId);
  //  //});
  //  return patient;
  //}
  //getEmployeeByUserId(userId: string) {
    // let emp: Employee;
    // ng this.httpClient.get<EmployeeModel[]>(`${this.apibaseURL}/employees`).subscribe(res => {
    //    emp = res.find(x => x.userId == userId);
    //  });
    // return emp;
  //}
  //getIPAddress() {
  //  return this.httpClient.get("http://api.ipify.org/?format=json");
  //}
  //getLoginHistory(): Observable<LoginHistory[]> {
  //  return this.httpClient.get<LoginHistory[]>(`${this.apibaseURL}/user/loginHistory`);
  //}
  //addLoginHistory(loginHistory: LoginHistory) {
  //  return this.httpClient.post(`${this.apibaseURL}/user/loginHistory`, loginHistory);
  //}

  //getProceduresMaster() {
  //  return this.httpClient.get<ProcedureMaster[]>(`${this.apibaseURL}/master/proceduresmaster`);
  //}

  //getDiagnosisMaster() {
  //  return this.httpClient.get<DiagnosisMaster[]>(`${this.apibaseURL}/master/diagnosismaster`);
  //}

  //getMedicineMaster() {
  //  return this.httpClient.get<MedicineMaster[]>(`${this.apibaseURL}/master/medicinemaster`);
  //}

  getPrecriptionDetails() {
    return this.httpClient.get<Prescriptions[]>(`${this.apibaseURL}/appointment/prescriptionDetails`);
  }
  getMedicineDetails() {
    return this.httpClient.get<MedicineDetails[]>(`${this.apibaseURL}/appointment/medicinedetails`);
  }
  getDiagnosisDetails() {
    return this.httpClient.get<Diagnosis[]>(`${this.apibaseURL}/appointment/diagnosisdetails`);
  }
  getProcedureDetails() {
    return this.httpClient.get<Procedures[]>(`${this.apibaseURL}/appointment/proceduredetails`);
  }
    ///++++++++++++++++++WEB API CODE+++++++++++++++++
  updatePatientDetails(patientDetails: PatientDetailModel) {
    return this.httpClient.post(`${this.apibaseURL}/Patient/updatePatientDetails`, patientDetails,this.reqHeader);
  }

  getPatientDetailById(userid: Number):Observable<PatientDetailModel> {
    return this.httpClient.get<PatientDetailModel>(`${this.apibaseURL}/Patient/getPatientDetails/${userid}`);
  }
  getAllergyDetails(): Observable<AllergyModel[]> {
    return this.httpClient.get<AllergyModel[]>(`${this.apibaseURL}/Master/allergy`);
  }
  getAllergyDetailsById(allergyDetail: AllergyModel) {
    return this.httpClient.get<AllergyModel>(`${this.apibaseURL}/Master/allergy/${allergyDetail.allergyid}`);
  }

  saveDiagnosisDetails(diagnosisDetails : diagnosisDetails[]){
    return this.httpClient.post(`${this.apibaseURL}/Appointment/saveDiagnosisDetails/`, diagnosisDetails,this.reqHeader);
  }   

  saveProcedureDetails(procedureDetails : procedureDetails[]){
    return this.httpClient.post(`${this.apibaseURL}/Appointment/saveProcedureDetails/`, procedureDetails,this.reqHeader);
  }   

  saveVitalSignDetails(vitalSignDetails : PatientVitalSigns){
    return this.httpClient.post(`${this.apibaseURL}/Appointment/saveVitalSignDetails/`, vitalSignDetails,this.reqHeader);
  }   
    
  //getAppointmentById(id: number) {
  //  return this.httpClient.get<Appointmnents>(`${this.apibaseURL}/patient/appointment/` + id);
  //}
  //getAppointments(): Observable<Appointmnents[]> {
  //  return this.httpClient.get<Appointmnents[]>(`${this.apibaseURL}/patient/appointment`);
  //}
  //getPatientById(id: number) {
  //   return this.httpClient.get<PatientModel>(`${this.apibaseURL}/patient/` + id);
  //}
  getDoctorById(id: number) {
    return this.httpClient.get<PatientModel>(`${this.apibaseURL}/user/GetUserById` + id);
  }
  //getDoctors() {
  //  return this.httpClient.get<HospitalUsers[]>(`${this.apibaseURL}/doctor`);
  //}
  getTitle(): Observable<TitleModel[]> {
    return this.httpClient.get<TitleModel[]>(`${this.apibaseURL}/master/title`);
  }
  //getVitalSignsMaster() {
  //  return this.httpClient.get<VitalSignsMaster[]>(`${this.apibaseURL}/master/vitalsign`);
  //}
  //getVitalSigns() {
  //  return this.httpClient.get<VitalSigns[]>(`${this.apibaseURL}/patient/vitalsigns`);
  //}
  getDialCodes(): Observable<DialCodeModel[]> {
    return this.httpClient.get<DialCodeModel[]>(`${this.apibaseURL}/master/dialcode`);
  }

  getRoles(): Observable<RoleModel[]> {
    return this.httpClient.get<RoleModel[]>(`${this.apibaseURL}/master/role`);
  }

  register(user: UserModel) {
    return this.httpClient.post(`${this.apibaseURL}/user/register`, user, this.reqHeader);
  }
  verifyPassword(request:ChangePasswordRequest){
    return this.httpClient.get(`${this.apibaseURL}/user/verifypassword/${request.userId}/${request.oldPassword}`);
  }
  changePassword(request: ChangePasswordRequest) {
    return this.httpClient.put(`${this.apibaseURL}/user/changepassword/`, request, this.reqHeader);
  }
  blockUser(userId:number){
    return this.httpClient.put(`${this.apibaseURL}/user/blockuser/`, userId, this.reqHeader);
  }
  
  loginUser(request: Login) {
    return this.httpClient.post(`${this.apibaseURL}/Login/login/`, request, this.reqHeader);
  }
  logout(){
    localStorage.removeItem("TokenInfo") 
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('cpAttempts')
    window.open("/user/login", "_self");
  }
  //addLoginHistoryM(loginHistory: LoginHistory) {
  //  return this.httpClient.post(`${this.apibaseURL}/loginHistory`, loginHistory, this.reqHeader);
  //}
  sendEmailForgotPassword(username:string){
    return this.httpClient.get(`${this.apibaseURL}/mail/forgetPassword/${username}`);
  }
  isUserNameExists(email:string){
    return this.httpClient.get(`${this.apibaseURL}/user/IsUserNameExists/${email}`);
  }
  getNewEmployeeCode()
  {
    return this.httpClient.get<string>(`${this.apibaseURL}/admin/GetNewEmployeeCode`);
  }
  checkuniqueKeyTimeOut(uniqueKey : string ){
    return this.httpClient.get(`${this.apibaseURL}/user/checkUniqueKeyExist/${uniqueKey}`);
  }

  getTotalUserCount(role: number) {
    return this.httpClient.get(`${this.apibaseURL}/admin/GetTotalUserCount/${role}`);
  }

  getTotalAppintmentCount(isToday: boolean) {
    return this.httpClient.get(`${this.apibaseURL}/admin/GetTotalAppointmentCount/${isToday}`);
  }

  getAppointmentsList(): Observable<Appointmnents[]> {
    return this.httpClient.get<Appointmnents[]>(`${this.apibaseURL}/admin/GetAppointmentList`);
  }
  getUserList(): Observable<UserModel[]> {
    return this.httpClient.get<UserModel[]>(`${this.apibaseURL}/admin/GetAllUsers`);
  }


  getHospitalUsers(): Observable<UsersListModel[]> {
    return this.httpClient.get<UsersListModel[]>(`${this.apibaseURL}/admin/GetHospitalUsers`);
  }

  getPatientUsers(): Observable<UsersListModel[]> {
    return this.httpClient.get<UsersListModel[]>(`${this.apibaseURL}/admin/GetPatientUsers`);
  }

  getUser(id: number): Observable<UserModel> {
    return this.httpClient.get<UserModel>(`${this.apibaseURL}/admin/GetUserById/${id}`);
  }

  manageUser(userid: number, value: number,randomstring:string,passforemail:string) {
    console.log('manageuserCalled')
    if(randomstring ==''){randomstring ="XX"}
    if(passforemail ==''){passforemail ="XX"}
    return this.httpClient.put(`${this.apibaseURL}/admin/manageUser/${userid}/${value}/${randomstring}/${passforemail}`, { headers: this.reqHeader });
  }

  updateUser(user: UserModel) {
    return this.httpClient.put(`${this.apibaseURL}/admin/EditUser`, user, { headers: this.reqHeader });
  }

  getSpacialities(){
    return this.httpClient.get(`${this.apibaseURL}/Master/speciality`);
  }
  GetPhyInfo() {
    return this.httpClient.get(`${this.apibaseURL}/physician/info`);
  }
  GetPhyInfoBySearch(searchtxtboxval: string, searchdrpdownval: string, physicianid: number) {
    if(searchtxtboxval==''){searchtxtboxval='undefined'}
    if(searchdrpdownval==''){searchdrpdownval='undefined'}
    return this.httpClient.get(`${this.apibaseURL}/physician/info/${searchtxtboxval}/${searchdrpdownval}/${physicianid}`,);
  }
  GetAvaiableAppointment(phyId,appdate) {
    return this.httpClient.get(`${this.apibaseURL}/appointment/timeslots/${phyId}/${appdate}`);
  }
  createAppointment(appDetails :any):Promise<any>  {
    return this.httpClient.post(`${this.apibaseURL}/Appointment/appointment`,appDetails,this.reqHeader).toPromise();
  }
  getAllAllergies(): Observable<AllergyModel[]> {
    return this.httpClient.get<AllergyModel[]>(`${this.apibaseURL}/Allergy/GetAllAllergies`, { headers: this.reqHeader });
  }
  getAllergyById(id: number): Observable<AllergyModel> {
    return this.httpClient.get<AllergyModel>(`${this.apibaseURL}/allergy/GetAllergyById/${id}`, { headers: this.reqHeader });
  }
  addAllergy(request: AllergyModel) {
    return this.httpClient.post(`${this.apibaseURL}/allergy/AddAllergy`, request, { headers: this.reqHeader });
  }
  updateAllergy(request: AllergyModel) {
    return this.httpClient.put(`${this.apibaseURL}/allergy/UpdateAllergy`, request, { headers: this.reqHeader });
  }
  getAllDiagnosis(): Observable<DiagnosisModel[]> {
    return this.httpClient.get<DiagnosisModel[]>(`${this.apibaseURL}/Diagnosis/GetAllDiagnosis`, { headers: this.reqHeader });
  }
  getDiagnosisById(id: number): Observable<DiagnosisModel> {
    return this.httpClient.get<DiagnosisModel>(`${this.apibaseURL}/Diagnosis/GetDiagnosisById/${id}`, { headers: this.reqHeader });
  }
  addDiagnosis(request: DiagnosisModel) {
    return this.httpClient.post(`${this.apibaseURL}/Diagnosis/AddDiagnosis`, request, { headers: this.reqHeader });
  }
  updateDiagnosis(request: DiagnosisModel) {
    return this.httpClient.put(`${this.apibaseURL}/Diagnosis/UpdateDiagnosis`, request, { headers: this.reqHeader });
  }
  getAllProcedures(): Observable<ProcedureModel[]> {
    return this.httpClient.get<ProcedureModel[]>(`${this.apibaseURL}/Procedure/GetAllProcedures`, { headers: this.reqHeader });
  }
  getProcedureById(id: number): Observable<ProcedureModel> {
    return this.httpClient.get<ProcedureModel>(`${this.apibaseURL}/Procedure/GetProcedureById/${id}`, { headers: this.reqHeader });
  }
  addProcedure(request: ProcedureModel) {
    return this.httpClient.post(`${this.apibaseURL}/Procedure/AddProcedure`, request, { headers: this.reqHeader });
  }
  updateProcedure(request: ProcedureModel) {
    return this.httpClient.put(`${this.apibaseURL}/Procedure/UpdateProcedure`, request, { headers: this.reqHeader });
  }
  getAllMedicines(): Observable<MedicineModel[]> {
    return this.httpClient.get<MedicineModel[]>(`${this.apibaseURL}/Medicine/GetAllMedicines`, { headers: this.reqHeader });
  }
  getMedicineById(id: number): Observable<MedicineModel> {
    return this.httpClient.get<MedicineModel>(`${this.apibaseURL}/Medicine/GetMedicineById/${id}`, { headers: this.reqHeader });
  }
  addMedicine(request: MedicineModel) {
    return this.httpClient.post(`${this.apibaseURL}/Medicine/AddMedicine`, request, { headers: this.reqHeader });
  }
  updateMedicine(request: MedicineModel) {
    return this.httpClient.put(`${this.apibaseURL}/Medicine/UpdateMedicine`, request, { headers: this.reqHeader });
  }
  getAllVitalSigns(): Observable<VitalSignsModel[]> {
    return this.httpClient.get<VitalSignsModel[]>(`${this.apibaseURL}/VitalSigns/GetAllVitalSigns`, { headers: this.reqHeader });
  }
  getVitalSignById(id: number): Observable<VitalSignsModel> {
    return this.httpClient.get<VitalSignsModel>(`${this.apibaseURL}/VitalSigns/GetVitalSignById/${id}`, { headers: this.reqHeader });
  }
  addVitalSign(request: VitalSignsModel) {
    return this.httpClient.post(`${this.apibaseURL}/VitalSigns/AddVitalSign`, request, { headers: this.reqHeader });
  }
  updateVitalSign(request: VitalSignsModel) {
    return this.httpClient.put(`${this.apibaseURL}/VitalSigns/UpdateVitalSign`, request, { headers: this.reqHeader });
  }
  //NURSE MODULE
  getAppointmentsByWeekDay(weekDayDateStr:string): Observable<AppointmnentsEditModel[]> {
    return this.httpClient.get<AppointmnentsEditModel[]>(`${this.apibaseURL}/appointment/appointment/${weekDayDateStr}/${Number(this.user.userid)}`);
  }
  nursedashboardcardsInfo() {
    return this.httpClient.get(`${this.apibaseURL}/Nurse/dashboardcardinfo/${Number(this.user.userid)}`);
  }
  GetAllNursesForDropDown(){
    return this.httpClient.get(`${this.apibaseURL}/Nurse/nursesfordropdown`);
  }
  //MASTER MODULE
  
  //PATIENT MODULE
  GetAllPatientsForDropDown(){
    return this.httpClient.get(`${this.apibaseURL}/Patient/patientsfordropdown`);
  }
  checkIfPatientProfileCompleted(userid: string):Promise<any> {
    return this.httpClient.get(`${this.apibaseURL}/Patient/isProfileComplete/${Number(userid)}`).toPromise();
  }
  //PHYSICIAN MODULE
  GetAllPhysiciansForDropDown(){
    return this.httpClient.get(`${this.apibaseURL}/Physician/physiciansfordropdown`);
  }
  getPatientAppointmentsByWeekDay(weekDayDateStr:string): Observable<PatientAppointmentsViewModel[]> {
    return this.httpClient.get<PatientAppointmentsViewModel[]>(`${this.apibaseURL}/patient/weeklyappointment/${Number(this.user.userid)}/${weekDayDateStr}`);
  }
  
  patientdashboardcardsInfo() {
    return this.httpClient.get(`${this.apibaseURL}/Patient/dashboardcardinfo/${Number(this.user.userid)}`);
  }
  getPatientAppointmentsById(): Observable<PatientAppointmentsViewModel[]>{
    return this.httpClient.get<PatientAppointmentsViewModel[]>(`${this.apibaseURL}/Patient/appointments/${Number(this.user.userid)}`);
  }
  //APPOINTMENT MODULE
  getAppointmentsForEdit(): Observable<AppointmnentsEditModel[]> {
    return this.httpClient.get<AppointmnentsEditModel[]>(`${this.apibaseURL}/Appointment/appointments/${Number(this.user.userid)}/${this.user.role}`);
  }
  GetAllAppointmentSlotsForDropDown() {
    return this.httpClient.get(`${this.apibaseURL}/appointment/timeslotsfordropdown`);
  }
  GetAllappointmentActionsForDropDown(appointmentId){
    return this.httpClient.get(`${this.apibaseURL}/appointment/appointmentactionsfordropdown/${Number(this.user.userid)}/${Number(appointmentId)}`);
  }
  UpdateAppointmentDetails(tempAppointmentDetailsforSubmission: AppointmnentsEditModel) {
    return this.httpClient.put(`${this.apibaseURL}/appointment/appointment`, tempAppointmentDetailsforSubmission, { headers: this.reqHeader });
  }
  checkAppointmentStatusForCancellation(appointmentId: number) {
    return this.httpClient.get(`${this.apibaseURL}/appointment/appointmentstatusforcancellation/${appointmentId}`);
  }
  CancelAppointment(appointmentId:number) {
    return this.httpClient.put(`${this.apibaseURL}/appointment/appointmentcancellation/${Number(this.user.userid)}/${appointmentId}`, { headers: this.reqHeader });
  }
  addPatientPrescription(request: PatientPrescriptionModel) {
    return this.httpClient.post(`${this.apibaseURL}/Appointment/AddPatientPrescription`, request,this.reqHeader);
  }

  getAllAppointments(userId:number): Observable<ViewScheduleModel[]> {
    return this.httpClient.get<ViewScheduleModel[]>(`${this.apibaseURL}/appointment/GetAllAppointmentList/${userId}`, { headers: this.reqHeader });
  }

 
  DeleteAppointment(appointmentid: number, statusid: number) {
    return this.httpClient.put(`${this.apibaseURL}/appointment/delete/${appointmentid}/${statusid}`, { headers: this.reqHeader });
  }

  getAppointmentById(appointmentid: number) {

    return this.httpClient.get(`${this.apibaseURL}/Appointment/getById/${appointmentid}`);

  }

  getUserByAppointmentId(appointmentid: number){
    return this.httpClient.get(`${this.apibaseURL}/Appointment/getUserByAppointmentId/${appointmentid}`);
  }

 
  getPrescriptionById(prescriptionid: number): Observable<PatientPrescriptionModel> {
    return this.httpClient.get<PatientPrescriptionModel>(`${this.apibaseURL}/Appointment/GetPrescriptionById/${prescriptionid}`);
  }



  getDemographicDetailsById(employeeId: number) {

    return this.httpClient.get<Person>(`${this.apibaseURL}/Appointment/GetDemographicDetailsById/${employeeId}`);
    
  }
  
  getVitalSignDetailsById(appointmentId : number){
    return this.httpClient.get<PatientVitalSigns>(`${this.apibaseURL}/Appointment/GetVitalSignDetails/${appointmentId}`);
  }

  getDiagnosisDetailsById(appointmentId : number){
    return this.httpClient.get<DiagnosisModel[]>(`${this.apibaseURL}/Appointment/GetDiagnosisDetails/${appointmentId}`);
  }
  
  getProcedureDetailsById(appointmentId : number){
    return this.httpClient.get<ProcedureModel[]>(`${this.apibaseURL}/Appointment/GetProcedureDetails/${appointmentId}`);
  }

  getPrescriptionMedicationDetailsById(appointmentId : number){
    return this.httpClient.get<PatientPrescriptionModel>(`${this.apibaseURL}/Appointment/GetPrescriptionDetails/${appointmentId}`);
  }
  getPatientVisitHistory(patientId: number) {
    return this.httpClient.get<AppointmentModel[]>(`${this.apibaseURL}/Appointment/GetPatientVisitHistory/${patientId}`);
  }
  GetRandomStringFromAPI() {
    return this.httpClient.get(`${this.apibaseURL}/Admin/common/getrandomstring`);
  }
  GetNotificationForUser() {
    return this.httpClient.get(`${this.apibaseURL}/User/notifications/${Number(this.user.userid)}`);
  }
  GetUserNotificaionCount() {
    return this.httpClient.get(`${this.apibaseURL}/User/notificationcount/${Number(this.user.userid)}`);
  }
  SetUserNotificaionAsRead(notificationId:any) {
    return this.httpClient.put(`${this.apibaseURL}/User/updateNotification/${Number(notificationId)}`, { headers: this.reqHeader });
  }
  CheckAppointmentConflict(searchDateVal: string, selectedslotid: number) {
    return this.httpClient.get(`${this.apibaseURL}/Appointment/checkappointmentconflict/${searchDateVal}/${Number(selectedslotid)}`);
  }
}
