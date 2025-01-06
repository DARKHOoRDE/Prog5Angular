import { CommonModule, NgForOf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { EntityHandlerService } from '../services/entity-handler.service';
import { UserData } from '../types/UserData';
import { Project } from '../types/Project';
import { Sprint } from '../types/Sprint';
import { Subscription } from 'rxjs';
import { Task } from '../types/Task';
import { error } from 'node:console';

@Component({
  selector: 'app-sprint-handler-page',
  standalone: true,
  imports: [CommonModule, HeaderComponent,NgForOf],
  templateUrl: './sprint-handler-page.component.html',
  styleUrl: './sprint-handler-page.component.css'
})
export class SprintHandlerPageComponent implements OnInit,OnDestroy {


  constructor(private entityServ:EntityHandlerService){}

  stages = ['Assigned', 'In Progress', 'Testing', 'Finished'];

  ngOnDestroy(): void {
   this.subscribs.unsubscribe()
  }
  subscribs = new Subscription();
  userData!:UserData
  projects:Project[] = []
  sprints:Sprint[] = []
  completedTasks:number=0;
  selectedSprint!: Sprint;
  showKanban:boolean = false;
  errorMsg:string = "";
ngOnInit(): void {
  let sub = this.entityServ.userData$.subscribe(
    resp=>{
      this.userData = resp
      this.projects = this.userData.projects.filter(p=>p.status != "Finished");
      this.projects.forEach(p=>{
        if(p.sprints.length > 0){
          this.sprints.push(p.sprints.sort((a,b)=>new Date(b.startDate).getTime()-new Date(a.startDate).getTime())[0] ?? []);
        }
        
        
        
      })
      console.log(this.sprints)
    }
  )
  this.subscribs.add(sub);
}

getTasksForStage(stage:string):Task[]{
  return this.selectedSprint.tasks.filter(t=>t.status == stage);
}

showDetail(){
  this.showKanban = !this.showKanban
}

selectSprint(sprint:Sprint){
  this.selectedSprint = sprint;
}

getCount(sprint:Sprint): number {
  if(sprint.tasks){
    return sprint.tasks.filter(t => t.finishedOn).length;
  }
  return 0;
}

isOwner(task:Task):boolean{

  if(this.userData.username == task.assignedTo){
    return true
  }
  return false;
}

isManager():boolean{
  return this.userData.roles.some(r=>r.name == "ROLE_MANAGER");
}

moveTask(task:Task,stage:string,level:string) {

    
    

    var nextStage = level == "next" ? this.stages[this.stages.indexOf(stage) + 1] : this.stages[this.stages.indexOf(stage) - 1]
    

    task.status = nextStage;
    let sub = this.entityServ.MoveTaskInKanban(task).subscribe(
      resp=>{
        let index = this.selectedSprint.tasks.findIndex(t=>t.id == task.id);
        this.selectedSprint.tasks[index] = resp;
      }
    );

    this.subscribs.add(sub);
}

unassignTask(task:Task){
  let sub = this.entityServ.UnassignTask(task).subscribe(
    resp=>{

      let index = this.selectedSprint.tasks.findIndex(t=>t.id == task.id);
      this.selectedSprint.tasks[index] = resp;
    }
  );

  this.subscribs.add(sub);
}


assignTask(task:Task) {
  task.assignedTo = this.userData.username;
  let sub = this.entityServ.AssignTask(task).subscribe(
    resp=>{

      let index = this.selectedSprint.tasks.findIndex(t=>t.id == task.id);
      this.selectedSprint.tasks[index] = resp;
    },
    error=>{

      this.errorMsg = error.error;
      setTimeout(()=>{
        this.errorMsg = ""
      },2000)
    }
  );

  this.subscribs.add(sub);
}


}
