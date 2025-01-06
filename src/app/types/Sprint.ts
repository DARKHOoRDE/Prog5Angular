import { Task } from "./Task";

export interface Sprint{
    id:string,
    name:string,
    projectId:string,
    tasks:Task[],
    description:string,
    startDate:Date,
    endDate:Date | null
}