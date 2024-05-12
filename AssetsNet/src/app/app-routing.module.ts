import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/account/login/login.component';
import { RegisterComponent } from './components/account/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { PasswordComponent } from './components/account/restore-password/restore-password.component';
import { MessagesThreadComponent } from './messages-thread/messages-thread.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './_/guards/auth/auth.guard';
import { StockTickerComponent } from './stock-ticker/stock-ticker.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'analysis', component: SearchComponent },
  { path: 'restore-password', component: PasswordComponent },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'analysis', component: SearchComponent },
      { path: 'users/:id', component: UserProfileComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }