import { Project } from "./Project";
import { Role } from "./Role";
import { Task } from "./Task";

export interface UserData{
    id:string,
    username:string,
    roles:Role[],
    projects:Project[],
    tasks:Task[]
}