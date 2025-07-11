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
import { AuthGuard } from './guards/auth.guard';
import { AuthorizationGuard } from './guards/authorization.guard';
import { EstudanteDetailsComponent } from './estudante-details/estudante-details.component';
import { NewPagamentoComponent } from './new-pagamento/new-pagamento.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin', component: AdminTemplateComponent, canActivate: [AuthGuard], children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'home', component: HomeComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'loadEstudantes', component: LoadEstudantesComponent, canActivate: [AuthorizationGuard], data: {roles: ['ADMIN']} },
      { path: 'loadPagamentos', component: LoadPagamentosComponent, canActivate: [AuthorizationGuard], data: {roles: ['ADMIN']} },
      { path: 'estudantes', component: EstudantesComponent },
      { path: 'pagamentos', component: PagamentosComponent },
      { path: 'estudante-detalhes/:codigo', component: EstudanteDetailsComponent },
      { path: 'new-pagamento/:codigoEstudante', component: NewPagamentoComponent },
    ]
  },
];

// canActivate: [AuthGuard] é usado para proteger as rotas, garantindo que apenas usuários autenticados possam acessá-las.
// canActivate: [AuthorizationGuard], data: {roles: ['ADMIN']} é usado para proteger as rotas, garantindo que apenas usuários com o papel de ADMIN possam acessá-las.

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
