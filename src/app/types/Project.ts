import { Sprint } from "./Sprint";

export interface Project{
    id:string,
    name:string,
    sprints:Sprint[],
    createdOn:Date,
    finishedOn:Date,
    createdBy:string,
    status:string,
    
}