import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaDeConsultasComponent } from './lista-consultas/lista-consultas.component';
import { ListaDeAnalisisComponent } from './lista-analisis/lista-analisis.component';
import { ListaDeDiagnosticosComponent } from './lista-diagnosticos/lista-diagnosticos.component';
import { ListaDeTratamientosComponent } from './lista-tratamientos/lista-tratamientos.component';
import { HistorialComponent } from './historial/historial.component';
import { RegistrarAnalisisComponent } from './registrar-analisis/registrar-analisis.component';
import { RegistrarConsultaComponent } from './registrar-consulta/registrar-consulta.component';
import { RegistrarDiagnosticoComponent } from './registrar-diagnostico/registrar-diagnostico.component';
import { RegistrarTratamientoComponent } from './registrar-tratamiento/registrar-tratamiento.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ConexionService } from './services/conexion.service';

@NgModule({
  declarations: [
    AppComponent,
    ListaDeConsultasComponent,
    ListaDeAnalisisComponent,
    ListaDeDiagnosticosComponent,
    ListaDeTratamientosComponent,
    HistorialComponent,
    RegistrarAnalisisComponent,
    RegistrarConsultaComponent,
    RegistrarDiagnosticoComponent,
    RegistrarTratamientoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule // imports firebase/storage only needed for storage features
  ],
  providers: [ConexionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
