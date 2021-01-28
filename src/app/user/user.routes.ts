import { UsersComponent } from './users/users.component';
import { Routes } from '@angular/router';

export const user_routes: Routes = [
    { path: '', component: UsersComponent },
    { path: '**', redirectTo: '' }
]