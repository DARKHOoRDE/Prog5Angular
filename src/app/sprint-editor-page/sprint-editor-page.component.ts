import { CommonModule, NgForOf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SprintEditorService } from '../services/sprint-editor.service';
import { Project } from '../types/Project';
import { HeaderComponent } from "../header/header.component";
import { Sprint } from '../types/Sprint';
import { MatDialog } from '@angular/material/dialog';
import { TaskCreatorPopupComponent } from '../popups/task-creator-popup/task-creator-popup.component';
import { EntityHandlerService } from '../services/entity-handler.service';
import { SmallTaskCardComponent } from "../small-task-card/small-task-card.component";

@Component({
  selector: 'app-sprint-editor-page',
  standalone: true,
  imports: [NgForOf, HeaderComponent, CommonModule, SmallTaskCardComponent],
  templateUrl: './sprint-editor-page.component.html',
  styleUrl: './sprint-editor-page.component.css'
})
export class SprintEditorPageComponent implements OnInit {


  constructor(private sprintServ:SprintEditorService,
              private dialog:MatDialog,
              private entServ:EntityHandlerService
  ){}


  proj!:Project
  activeSprint!:Sprint



ngOnInit(): void {
  this.proj = this.sprintServ.GetProject();
  if(this.proj.sprints.length > 0){
    this.activeSprint = this.proj.sprints.reduce((latestSprint,sprint)=>{
      let spDate = new Date(sprint.startDate);
      let latestDate = new Date(latestSprint.startDate)
      return spDate < latestDate ? latestSprint : sprint;
    })
    if(this.activeSprint.tasks == null){
      this.activeSprint.tasks = [];
    }
  }

  console.log(this.activeSprint)
  console.log(this.proj)
}

getFinishedTaskNumber():number{
  return this.activeSprint.tasks.filter(t=>t.finishedOn).length;
}

handleDeletedTask(task:string){
  this.activeSprint.tasks = this.activeSprint.tasks.filter(t=>t.id != task)
}
showDesc(){

}
addTile() {
    let dial =  this.dialog.open(TaskCreatorPopupComponent,{
        height:"200px",
        width:"200px",
        data:this.activeSprint.id
      })

      dial.afterClosed().subscribe(
        resp=>{
          if(resp){
            this.entServ.CreateNewTask(resp).subscribe(
              resp=>{
                console.log(resp)
                this.activeSprint.tasks.push(resp);
              }
            );
          }
        }
      )
}

}
