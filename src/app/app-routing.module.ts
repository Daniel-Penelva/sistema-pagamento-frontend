import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { LoadEstudantesComponent } from './load-estudantes/load-estudantes.component';
import { LoadPagamentosComponent } from './load-pagamentos/load-pagamentos.component';
import { EstudantesComponent } from './estudantes/estudantes.component';
import { PagamentosComponent } from './pagamentos/pagamentos.component';
import { AdminTemplateComponent } from './admin-template/admin-template.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'loadEstudantes', component: LoadEstudantesComponent },
  { path: 'loadPagamentos', component: LoadPagamentosComponent },
  { path: 'estudantes', component: EstudantesComponent },
  { path: 'pagamentos', component: PagamentosComponent },
  { path: 'admin', component: AdminTemplateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
