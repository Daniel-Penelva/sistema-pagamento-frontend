import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AdminTemplateComponent } from './admin-template/admin-template.component';
import { AppMaterialModule } from './angular-material/app-material.module';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { LoadEstudantesComponent } from './load-estudantes/load-estudantes.component';
import { LoadPagamentosComponent } from './load-pagamentos/load-pagamentos.component';
import { LoginComponent } from './login/login.component';
import { PagamentosComponent } from './pagamentos/pagamentos.component';
import { EstudantesComponent } from './estudantes/estudantes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './guards/auth.guard';
import { AuthorizationGuard } from './guards/authorization.guard';
import { HttpClientModule } from '@angular/common/http';
import { EnumFormatPipe } from './pipe/enum-format.pipe';
import { EstudanteDetailsComponent } from './estudante-details/estudante-details.component';
import { NewPagamentoComponent } from './new-pagamento/new-pagamento.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminTemplateComponent,
    HomeComponent,
    ProfileComponent,
    LoadEstudantesComponent,
    LoadPagamentosComponent,
    LoginComponent,
    PagamentosComponent,
    EstudantesComponent,
    DashboardComponent,
    EnumFormatPipe,
    EstudanteDetailsComponent,
    NewPagamentoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    provideAnimationsAsync(),
    AuthGuard,
    AuthorizationGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
