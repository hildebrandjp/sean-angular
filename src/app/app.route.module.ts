import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { guardGuard } from './guard.guard';
import { StudentViewComponent } from './student-view/student-view.component';
import { ErrorPageComponent } from './error-page/error-page.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent,  canActivate: [guardGuard]},
  { path: 'student/:studentId', component: StudentViewComponent},
  { path: 'nopage', component: ErrorPageComponent},
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: '**', pathMatch: 'full', redirectTo: 'nopage'}
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
