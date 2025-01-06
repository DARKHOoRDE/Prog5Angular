import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Role } from '../types/Role';
import { NewProject } from '../types/NewProject';
import { Project } from '../types/Project';
import { UserData } from '../types/UserData';
import { NewSprint } from '../types/NewSprint';
import { NewTask } from '../types/NewTask';
import { Task } from '../types/Task';

@Injectable({
  providedIn: 'root'
})
export class EntityHandlerService {

  constructor(private http:HttpClient) { }

  private userRoles = new BehaviorSubject<Role[]>([]);
  userRoles$ = this.userRoles.asObservable();

  private userData = new BehaviorSubject<UserData>({id:"",username:"",projects:[],roles:[],tasks:[]});
  userData$ = this.userData.asObservable();
  
  GetUserData(){
    this.GetOverview().subscribe(
      resp=>{
        this.SetUserData(resp);
      }
    )
    
  }

  SetUserData(usData:UserData){
    this.userData.next(usData);
  }

  SetUserRoles(roles:Role[]){
    this.userRoles.next(roles)
  }

  GetProjectsForUser():Project[]{
    let projs = this.userData.getValue();
    if(projs.projects.length == 0){

    }

    return projs.projects;
  }

  MoveTaskInKanban(task:Task):Observable<any>{
    return this.http.put<Task>("/api/entity/moveTask",task,{headers:this.GetHeader()});
  }

  UnassignTask(task:Task){
    return this.http.put<Task>("/api/entity/unassignTask",task,{headers:this.GetHeader()})
  }

  AssignTask(task:Task):Observable<any>{
    return this.http.post<Task>("/api/entity/assignToUser",task,{headers:this.GetHeader()});
  }

  DeleteTask(task:Task):Observable<any>{
    let taskId = task.id;
    let sprintId = task.sprintId;
    return this.http.delete(`/api/entity/deleteTask/${taskId}/${sprintId}`,{headers:this.GetHeader()})
  }

  CreateNewTask(tsk:NewTask):Observable<any>{
    return this.http.post<Task>("/api/entity/createNewTask",tsk,{headers:this.GetHeader()});
  }

  CreateNewSprint(nSp:NewSprint):Observable<any>{
    return this.http.post("/api/entity/createNewSprint",nSp,{headers:this.GetHeader()});
  }

  GetParticipantsForProj(projId:string):Observable<any>{
    return this.http.post("/api/overview/getProjParticipants",{projId},{headers:this.GetHeader()})
  }
  

  FinishProject(projId:string){
    return this.http.post("/api/entity/finishProject",{projId},{headers:this.GetHeader()})
  }

  GetUsers():Observable<any>{
    let header = this.GetHeader();
    return this.http.get("/api/overview/getUsers",{headers:header});
  }

  CreateProject(newProj:NewProject):Observable<any>{
    return this.http.post("/api/entity/createProj",newProj,{headers:this.GetHeader()})
  }

  GetOverview():Observable<any>{
    let headers = this.GetHeader();
    return this.http.get("/api/overview/getOverview",{headers:headers})
  }


  private GetHeader():HttpHeaders{
    let token = localStorage.getItem("token")
       return new HttpHeaders({
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json', 
          'Accept': 'application/json' 
        });
  }

}
