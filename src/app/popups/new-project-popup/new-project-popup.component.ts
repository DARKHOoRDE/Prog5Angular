import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserSelectEntity } from '../../types/UserSelectEntity';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NewProject } from '../../types/NewProject';

@Component({
  selector: 'app-new-project-popup',
  standalone: true,
  imports: [NgForOf,FormsModule,MatSelectModule,CommonModule],
  templateUrl: './new-project-popup.component.html',
  styleUrl: './new-project-popup.component.css'
})
export class NewProjectPopupComponent {

constructor(private dialog:MatDialogRef<NewProjectPopupComponent>,
            @Inject(MAT_DIALOG_DATA) private data:any
){
  this.users = data
}

newProj:NewProject={
  name:"",
  userIds:[]
};






SubmitProject(){
  
  this.dialog.close(this.newProj);
}
onClose() {
  this.dialog.close();
}
users: UserSelectEntity[] = [];
backlogs: any;

}
