import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { NewProjectPopupComponent } from '../popups/new-project-popup/new-project-popup.component';
import { EntityHandlerService } from '../services/entity-handler.service';
import { Project } from '../types/Project';
import { EditProjectPageComponent } from '../popups/edit-project-page/edit-project-page.component';
import { Subscription } from 'rxjs';
import { SprintEditorService } from '../services/sprint-editor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-project-page',
  standalone: true,
  imports: [HeaderComponent,NgForOf,NgIf,CommonModule],
  templateUrl: './new-project-page.component.html',
  styleUrl: './new-project-page.component.css'
})
export class NewProjectPageComponent implements OnInit, OnDestroy {


  constructor(private dialog:MatDialog,
              private entityServ:EntityHandlerService,
              private sprintServ:SprintEditorService,
              private router:Router
  ){}
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  ngOnInit(): void {

    let sub = this.entityServ.userData$.subscribe((data)=>{
      let asd = data
      console.log(asd)
    })

    this.subscriptions.add(sub)

    this.projects = this.entityServ.GetProjectsForUser();
    this.projects.map(p=>{
      if(p.status == "Finished"){
        this.finishedProjects.push(p);

      }
    })
    this.projects = this.projects.filter(p=>p.status!="Finished")
    console.log(this.finishedProjects)
  }

  subscriptions = new Subscription();
  finishedProjects:Project[] = [];

projects: Project[] = [];
showPopup: boolean=false;
errorMsg:string = "";


addProject() {

  this.entityServ.GetUsers().subscribe(
    resp=>{
      let dial = this.dialog.open(NewProjectPopupComponent,{
        width:"100px",
        height:"100px",
        data:resp
      })
      dial.afterClosed().subscribe(
        (result)=>{
          if(result){
            console.log(result);
            let sub = this.entityServ.CreateProject(result).subscribe();

            this.subscriptions.add(sub);
          }
        }
      );
    }
    
  );
  

  
}
openSprintEditor(proj:Project){
  this.sprintServ.SetProject(proj);
  this.router.navigate(["sprintEditor"]);
}

finishProject(proj: Project) {
  this.entityServ.FinishProject(proj.id).subscribe();
}
editProject(proj: Project) {
    let dial =  this.dialog.open(EditProjectPageComponent,{
        width:"200px",
        height:"200px",
        data:proj
      })

    dial.afterClosed().subscribe(
      (resp)=>{
        if(resp){
          let sub = this.entityServ.CreateNewSprint(resp).subscribe(
            result=>{
              this.projects = this.projects.map(p=>{
                if(p.id == resp.projId){
                  return{
                    ...p,
                    sprints: [...(p.sprints ?? []),result]
                  }
                }
                return p;
              })
            }
          );
          this.subscriptions.add(sub)
        }
      }
    );
}

toggleFinishedProjects(){
  
    this.showPopup = !this.showPopup
  
}

}
