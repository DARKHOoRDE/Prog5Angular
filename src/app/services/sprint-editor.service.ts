import { Injectable } from '@angular/core';
import { Project } from '../types/Project';

@Injectable({
  providedIn: 'root'
})
export class SprintEditorService {

  constructor() { }


  proj!:Project;


  SetProject(pr:Project){
    this.proj = pr;
  }

  GetProject(){
    return this.proj;
  }


}
