import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConexionService } from '../services/conexion.service';

@Component({
  selector: 'lista-consultas',
  templateUrl: './lista-consultas.component.html',
  styleUrls: ['./lista-consultas.component.css']
})
export class ListaDeConsultasComponent implements OnInit {

  private listaDeConsultas: any=[];

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
    this.conexionService.listaDeConsultas().subscribe(consulta=>{
      this.listaDeConsultas =consulta;
      this.verificarOrden(this.verificarOrden);
    });
  }
  

  verificarOrden(consultas:any){
    let aux;
    for(let i=0;i<consultas.length-1;i++){
      for(let j=i+1;j<consultas.length;j++){
        if(this.parsearFecha(consultas[i].date)<this.parsearFecha(consultas[j].date)){
          aux=consultas[i];
          consultas[i]=consultas[j];
          consultas[j]=aux;
        }
      } 
    }
  }

  parsearFecha(date:any){
    let dia;
    let mes;
    let anio;
    dia = date.substring(date.indexOf("/")+1,date.lastIndexOf("/"));
    if(dia.length==1)
      dia = "0"+dia;
    mes = date.substring(0, date.indexOf("/"));
    if(mes.length==1)
    mes = "0"+mes;
    anio = date.substring(date.lastIndexOf("/")+1,date.length);
    return parseInt(anio+mes+dia);
  }

  agregarConsulta(){
    this.router.navigateByUrl('/registrarConsulta');
  }

  back() {
    this.router.navigateByUrl('/historial');
  }
}
