import { DetailComponent } from './detail/detail.component';
import { UsersComponent } from './users/users.component';
import { Routes } from '@angular/router';

export const user_routes: Routes = [
    { path: '', component: UsersComponent },
    { path: 'user/:id', component: DetailComponent },
    { path: '**', redirectTo: '' }
]