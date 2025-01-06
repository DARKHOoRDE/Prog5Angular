export interface Task{
    id:string,
    title:string,
    sprintId:string,
    description:string,
    version:number,
    finishedOn:Date | null,
    assignedTo:string,
    status:string
}