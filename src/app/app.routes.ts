import { Routes } from '@angular/router';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { ProjectEditorComponent } from './project-editor/project-editor.component';
import { NewProjectPageComponent } from './new-project-page/new-project-page.component';
import { SprintEditorPageComponent } from './sprint-editor-page/sprint-editor-page.component';
import { SprintHandlerPageComponent } from './sprint-handler-page/sprint-handler-page.component';

export const routes: Routes = [
    {
        path:"",
        component:AuthPageComponent,
        title:"Auth Page"
    },
    {
        path:"editor",
        component:ProjectEditorComponent,
        title:"Project Editor"
    },
    {
        path:"creator",
        component:NewProjectPageComponent,
        title:"Project Creator"
    },
    {
        path:"sprintEditor",
        component:SprintEditorPageComponent,
        title:"Sprint Editor"
    },
    {
        path:"kanban",
        component:SprintHandlerPageComponent,
        title:"Sprint Handler"
    }
];
