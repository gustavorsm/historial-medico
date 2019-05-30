import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { containerRefreshEnd } from '@angular/core/src/render3';

export interface Analisis { doctor:string, descripcion: string,fecha:string, resultados:string,auth:number }
export interface Consulta { doctor:string, sintomas:string, descripcion: string,fecha:string,auth:number }
export interface Diagnostico { descripcion: string,fecha:string,doctor:string,padecimiento:string,auth:number }
export interface Tratamiento { descripcion: string,fecha:string,observacion:string,doctor:string,auth:number }
export interface Usuario { nombre: string,apellido:string; correo:string, fecha:string, contraseña:string,auth:number }

@Injectable({
  providedIn: 'root'
})
export class ConexionService {
  private analisisDoc: AngularFirestoreDocument<Analisis>;
  private consultasDoc: AngularFirestoreDocument<Consulta>;
  private diagnosticosDoc: AngularFirestoreDocument<Diagnostico>;
  private tratamientosDoc: AngularFirestoreDocument<Tratamiento>;
  private usuariosDoc: AngularFirestoreDocument<Usuario>;
  private analisisColecction : AngularFirestoreCollection<Analisis>;
  private consultasColecction : AngularFirestoreCollection<Consulta>;
  private diagnosticosColecction : AngularFirestoreCollection<Diagnostico>;
  private tratamientosColecction : AngularFirestoreCollection<Tratamiento>;
  private usuariosColecction : AngularFirestoreCollection<Usuario>;
  analisis : Observable<Analisis[]>;
  consultas : Observable<Consulta[]>;
  diagnosticos : Observable<Diagnostico[]>;
  tratamientos : Observable<Tratamiento[]>;
  usuarios : Observable<Usuario[]>;
  

  constructor(private afs : AngularFirestore) {
  }

  listaDeAnalisis(){
    this.analisisColecction = this.afs.collection<Analisis>('ListaDeAnalisis');
    this.analisis = this.analisisColecction.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Analisis;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.analisis;
  }
  listaDeDiagnosticos(){
    this.diagnosticosColecction = this.afs.collection<Diagnostico>('ListaDeDiagnosticos');
    this.diagnosticos = this.diagnosticosColecction.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Diagnostico;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.diagnosticos;
  }
  listaDeTratamientos(){
    this.tratamientosColecction = this.afs.collection<Tratamiento>('ListaDeTratamientos');
    this.tratamientos = this.tratamientosColecction.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Tratamiento;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.tratamientos;
  }
  listaDeConsultas(){
    this.consultasColecction = this.afs.collection<Consulta>('ListaDeConsultas');
    this.consultas = this.consultasColecction.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Consulta;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.consultas;
  }
  listaDeUsuarios(){
    this.usuariosColecction = this.afs.collection<Usuario>('ListaDeUsuarios');
    this.usuarios = this.usuariosColecction.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Usuario;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.usuarios;
  }
  anadirUsuario(usuario : Usuario){
    this.usuariosColecction.add(usuario);
  }
  anadirAnalisis(analisis : Analisis){
    this.analisisColecction.add(analisis);
  }
  anadirConsulta(consulta : Consulta){
    this.consultasColecction.add(consulta);
  }
  anadirDiagnostico(diagnostico : Diagnostico){
    this.diagnosticosColecction.add(diagnostico);
  }
  anadirTratamiento(tratamiento : Tratamiento){
    this.tratamientosColecction.add(tratamiento);
  }
  editarAnalisis(analisis){
    this.analisisDoc = this.afs.doc<Analisis>(`ListaDeAnalisis/${analisis.id}`);
    this.analisisDoc.update(analisis);
  }
  editarUsuarios(usuario){
    this.usuariosDoc = this.afs.doc<Usuario>(`ListaDeUsuarios/${usuario.id}`);
    this.usuariosDoc.update(usuario);
  }
  editarConsulta(consulta){
    this.consultasDoc= this.afs.doc<Consulta>(`ListaDeConsultas/${consulta.id}`);
    this.consultasDoc.update(consulta);
  }
  editarTratamiento(tratamiento){
    this.tratamientosDoc = this.afs.doc<Tratamiento>(`ListaDeTratamientos/${tratamiento.id}`);
    this.tratamientosDoc.update(tratamiento);
  }
  editarDiagnostico(diagnostico){
    this.diagnosticosDoc = this.afs.doc<Diagnostico>(`ListaDeDiagnosticos/${diagnostico.id}`);
    this.diagnosticosDoc.update(diagnostico);
  }
  eliminarAnalisis(analisis){
    this.analisisDoc = this.afs.doc<Analisis>(`ListaDeAnalisis/${analisis.id}`);
    this.analisisDoc.delete();
  }
  eliminarConsulta(consulta){
    this.consultasDoc = this.afs.doc<Consulta>(`ListaDeConsultas/${consulta.id}`);
    this.consultasDoc.delete();
  }
  eliminarTratamiento(tratamiento){
    this.tratamientosDoc = this.afs.doc<Tratamiento>(`ListaDeTratamientos/${tratamiento.id}`);
    this.tratamientosDoc.delete();
  }
  eliminarDiagnostico(diagnostico){
    this.diagnosticosDoc = this.afs.doc<Diagnostico>(`ListaDeDiagnosticos/${diagnostico.id}`);
    this.diagnosticosDoc.delete();
  }
}
