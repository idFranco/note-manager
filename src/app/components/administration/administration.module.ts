import { Routes } from '@angular/router';
import { AdministrationComponent } from './administration.component';
import { ListNoteComponent } from './list-note/list-note.component';
import { AuthGuard } from '../../core/guards/auth.guard';
import { AddNoteComponent } from './record-note/record/add-note.component';

export const admnistrationRoutes: Routes = [
  {
    path: '',
    component: AdministrationComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'list', component: ListNoteComponent },
      { path: 'add', component: AddNoteComponent },
      { path: '', redirectTo: 'list', pathMatch: 'full' }
    ]
  }
];
