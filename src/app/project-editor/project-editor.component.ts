import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CommonModule, NgForOf } from '@angular/common';
import { EntityHandlerService } from '../services/entity-handler.service';
import { Subscription } from 'rxjs';
import { UserData } from '../types/UserData';
import { Project } from '../types/Project';
import { UserSelectEntity } from '../types/UserSelectEntity';

@Component({
  selector: 'app-project-editor',
  standalone: true,
  imports: [HeaderComponent, NgForOf, CommonModule],
  templateUrl: './project-editor.component.html',
  styleUrl: './project-editor.component.css'
})
export class ProjectEditorComponent implements OnInit, OnDestroy {

  constructor(private entityHandler:EntityHandlerService){

  }

  projects:Project[] = []; 
  finishedProjects:Project[] = []
  userList:UserSelectEntity[]=[];
  mainData!:UserData
  private subscription = new Subscription();

  ngOnInit(): void {
    let subs = this.entityHandler.GetOverview().subscribe(
      (resp)=>{
        
        this.mainData = resp;
        this.entityHandler.SetUserData(resp)
        this.entityHandler.SetUserRoles(this.mainData.roles);
        this.projects = this.mainData.projects.filter(p=>p.status == "Open")
        this.finishedProjects = this.mainData.projects.filter(p=>p.status == "Finished")
      }
    );





    this.subscription.add(subs);
  }


  



  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
