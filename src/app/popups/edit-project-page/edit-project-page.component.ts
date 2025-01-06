import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from '../../types/Project';
import { EntityHandlerService } from '../../services/entity-handler.service';
import { UserSelectEntity } from '../../types/UserSelectEntity';
import { NewSprint } from '../../types/NewSprint';
import { SprintEditorService } from '../../services/sprint-editor.service';
import { Sprint } from '../../types/Sprint';

@Component({
  selector: 'app-edit-project-page',
  standalone: true,
  imports: [NgForOf,CommonModule,FormsModule,NgIf],
  templateUrl: './edit-project-page.component.html',
  styleUrl: './edit-project-page.component.css'
})
export class EditProjectPageComponent {

constructor(private dialog:MatDialogRef<EditProjectPageComponent>,
            @Inject(MAT_DIALOG_DATA) data:any,
            private entServ:EntityHandlerService
            
){
  this.proj = data;
  this.entServ.GetParticipantsForProj(this.proj.id).subscribe(
    resp=>{
      this.userList = resp;
    }
  );
  console.log(this.proj.sprints)
  this.newSprint = {name:"",description:"",endDate:new Date(),startDate:new Date(),projId:this.proj.id}
}

newSprint!:NewSprint
userList:UserSelectEntity[]=[];
proj!:Project;

showPopup: boolean=false;

getFinishedProjects(sprint:Sprint):number{
  if(sprint.tasks == null){
    return 0;
  }
  else{
    return sprint.tasks.filter(t=>t.finishedOn).length
  }

}

newSprintSubmit() {
  
  this.dialog.close(this.newSprint);

}
project: any;
closePopup() {
  this.dialog.close();
}
togglePopup(){
  this.showPopup = !this.showPopup
}
}
