import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Analisis { descripcion: string,costo:number,fecha:string,categoria:string }
export interface Consulta { descripcion: string,costo:number,fecha:string,categoria:string }
export interface Diagnostico { descripcion: string,fecha:string,categoria:string }
export interface Tratamiento { descripcion: string,costo:number,fecha:string,categoria:string }

@Injectable({
  providedIn: 'root'
})
export class ConexionService {
  private analisisDoc: AngularFirestoreDocument<Analisis>;
  private consultasDoc: AngularFirestoreDocument<Consulta>;
  private diagnosticosDoc: AngularFirestoreDocument<Diagnostico>;
  private tratamientosDoc: AngularFirestoreDocument<Tratamiento>;
  private analisisColecction : AngularFirestoreCollection<Analisis>;
  private consultasColecction : AngularFirestoreCollection<Consulta>;
  private diagnosticosColecction : AngularFirestoreCollection<Diagnostico>;
  private tratamientosColecction : AngularFirestoreCollection<Tratamiento>;
  analisis : Observable<Analisis[]>;
  consultas : Observable<Consulta[]>;
  diagnosticos : Observable<Diagnostico[]>;
  tratamientos : Observable<Tratamiento[]>;
  

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
  
}
