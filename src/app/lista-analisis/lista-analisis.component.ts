import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConexionService } from '../services/conexion.service';

@Component({
  selector: 'lista-analisis',
  templateUrl: './lista-analisis.component.html',
  styleUrls: ['./lista-analisis.component.css']
})
export class ListaDeAnalisisComponent implements OnInit {

  private listaDeAnalisis: any=[];

  private income:any={}
  private expenses: any=[];
  private incomes: any=[];
  private balance: any={};
  private totalIncomes: any;
  private totalExpenses: any;
  private totalServices:number;
  private totalFood:number;
  private totalOthers:number;
  constructor(private router: Router,private conexionService: ConexionService) { }

  ngOnInit() {
    this.conexionService.listaDeAnalisis().subscribe(analisis=>{
      this.listaDeAnalisis =analisis;
      this.verificarOrden(this.listaDeAnalisis);
    });
  }
  

  verificarOrden(historial:any){
    console.log("fecha",historial)
    let aux;
    for(let i=0;i<historial.length-1;i++){
      for(let j=i+1;j<historial.length;j++){
        if(this.parsearFecha(historial[i].fecha)<this.parsearFecha(historial[j].fecha)){
          aux=historial[i];
          historial[i]=historial[j];
          historial[j]=aux;
        }
      } 
    }
  }

  parsearFecha(fecha:any){
    let dia;
    let mes;
    let anio;
    console.log("this",fecha)
    dia = fecha.substring(fecha.indexOf("/")+1,fecha.lastIndexOf("/"));
    if(dia.length==1)
      dia = "0"+dia;
    mes = fecha.substring(0, fecha.indexOf("/"));
    if(mes.length==1)
    mes = "0"+mes;
    anio = fecha.substring(fecha.lastIndexOf("/")+1,fecha.length);
    return parseInt(anio+mes+dia);
  }

  agregarAnalisis(){
    this.router.navigateByUrl('/registrarAnalisis');
  }

  back() {
    this.router.navigateByUrl('/historial');
  }

  editarAnalisis(analisis:any){
    this.router.navigate(['/editarAnalisis', analisis.auth])
  }
  RedirectTo(value:any){
    switch(value){
      case "historial":
      this.router.navigateByUrl('/historial')
      break;
      case "listaDeAnalisis":
      this.router.navigateByUrl('/listaDeAnalisis');
      break;
      case "listaDeConsultas":
      this.router.navigateByUrl('/listaDeConsultas');
      break;
      case "listaDeDiagnosticos":
      this.router.navigateByUrl('/listaDeDiagnosticos');
      break;
      case "listaDeTratamientos":
      this.router.navigateByUrl('/listaDeTratamientos');
      break;
    }
  }
}
