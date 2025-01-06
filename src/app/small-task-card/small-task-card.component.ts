import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../types/Task';
import { CommonModule } from '@angular/common';
import { EntityHandlerService } from '../services/entity-handler.service';

@Component({
  selector: 'app-small-task-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './small-task-card.component.html',
  styleUrl: './small-task-card.component.css'
})
export class SmallTaskCardComponent {

  constructor(private entServ:EntityHandlerService){}

 @Input() task!:Task
 @Output() taskDeleted = new EventEmitter<string>();

 show:boolean=false;
showDesc() {
  this.show = !this.show
}
removeTile() {
    this.entServ.DeleteTask(this.task).subscribe(
      resp=>{
        this.taskDeleted.emit(this.task.id);
      }
    );
}

}
