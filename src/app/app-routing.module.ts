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
const routes: Routes = [
  { path: '', redirectTo: '/historial', pathMatch: 'full', canActivate: [] },
  { path: 'listaDeAnalisis', component: ListaDeAnalisisComponent },
  { path: 'listaDeConsultas', component: ListaDeConsultasComponent },
  { path: 'listaDeDiagnosticos', component: ListaDeDiagnosticosComponent },
  { path: 'listaDeTratamientos', component: ListaDeTratamientosComponent },
  { path: 'registrarAnalisis', component: RegistrarAnalisisComponent },
  { path: 'registrarConsulta', component: RegistrarConsultaComponent },
  { path: 'registrarDiagnostico', component: RegistrarDiagnosticoComponent },
  { path: 'registrarTratamiento', component: RegistrarTratamientoComponent },
  { path: 'editarAnalisis/:auth', component: EditarAnalisisComponent },
  { path: 'historial', component: HistorialComponent, canActivate: [] },
  //{ path: 'viewUser/:id', component: UserDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
