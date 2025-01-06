import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewTask } from '../../types/NewTask';

@Component({
  selector: 'app-task-creator-popup',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './task-creator-popup.component.html',
  styleUrl: './task-creator-popup.component.css'
})
export class TaskCreatorPopupComponent {

constructor(private dialog:MatDialogRef<TaskCreatorPopupComponent>,
            @Inject(MAT_DIALOG_DATA) data:any
){
  this.newTask = {description:"",sprintId:data,title:""};
}


newTask!:NewTask;

isPopupOpen: any;
closePopup() {
 this.dialog.close();
}
taskTitle: any;
taskDescription: any;
createTask() {
  this.dialog.close(this.newTask);
}

}
