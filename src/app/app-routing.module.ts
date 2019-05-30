import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListaDeAnalisisComponent } from './lista-analisis/lista-analisis.component';
import { ListaDeConsultasComponent } from './lista-consultas/lista-consultas.component';
import { ListaDeDiagnosticosComponent } from './lista-diagnosticos/lista-diagnosticos.component';
import { ListaDeTratamientosComponent } from './lista-tratamientos/lista-tratamientos.component';
import { HistorialComponent } from './historial/historial.component';
import { RegistrarAnalisisComponent } from './registrar-analisis/registrar-analisis.component';
import { RegistrarConsultaComponent } from './registrar-consulta/registrar-consulta.component';
import { RegistrarDiagnosticoComponent } from './registrar-diagnostico/registrar-diagnostico.component';
import { RegistrarTratamientoComponent } from './registrar-tratamiento/registrar-tratamiento.component';
import { EditarAnalisisComponent } from './editar-analisis/editar-analisis.component';
import { EditarConsultaComponent } from './editar-consulta/editar-consulta.component';
import { EditarTratamientoComponent } from './editar-tratamiento/editar-tratamiento.component';
import { EditarDiagnosticoComponent } from './editar-diagnostico/editar-diagnostico.component';
import { LoginComponent } from './login/login.component';
import { AuthAccountGuard } from './guards/authAccount.guard';
import { RegistrarUsuarioComponent } from './registrar-usuario/registrar-usuario.component';
import { AuthUserGuard } from './guards/authUser.guard';
import { MostrarUsuarioComponent } from './ver-usuario/ver-usuario.component';
const routes: Routes = [
  { path: '', redirectTo: '/historial', pathMatch: 'full', canActivate: [AuthAccountGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'listaDeAnalisis', component: ListaDeAnalisisComponent },
  { path: 'listaDeConsultas', component: ListaDeConsultasComponent },
  { path: 'listaDeDiagnosticos', component: ListaDeDiagnosticosComponent },
  { path: 'listaDeTratamientos', component: ListaDeTratamientosComponent },
  { path: 'registrarUsuario', component: RegistrarUsuarioComponent },
  { path: 'registrarAnalisis', component: RegistrarAnalisisComponent },
  { path: 'registrarConsulta', component: RegistrarConsultaComponent },
  { path: 'registrarDiagnostico', component: RegistrarDiagnosticoComponent },
  { path: 'registrarTratamiento', component: RegistrarTratamientoComponent },
  { path: 'verUsuario', component: MostrarUsuarioComponent },
  { path: 'editarAnalisis/:iden', component: EditarAnalisisComponent },
  { path: 'editarConsulta/:iden', component: EditarConsultaComponent },
  { path: 'editarTratamiento/:iden', component: EditarTratamientoComponent },
  { path: 'editarDiagnostico/:iden', component: EditarDiagnosticoComponent },
  { path: 'historial', component: HistorialComponent, canActivate: [AuthAccountGuard] },
  //{ path: 'viewUser/:id', component: UserDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
