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
      this.listaDeConsultas=[];
      let usuarioLogeado = JSON.parse(localStorage.getItem("UserLogged"));
      consulta.forEach((element:any) => {
        if(element.auth == usuarioLogeado.auth) this.listaDeConsultas.push(element);
      });
      this.verificarOrden(this.verificarOrden);
    });
  }
  

  verificarOrden(consultas:any){
    let aux;
    for(let i=0;i<consultas.length-1;i++){
      for(let j=i+1;j<consultas.length;j++){
        if(this.parsearFecha(consultas[i].fecha)<this.parsearFecha(consultas[j].fecha)){
          aux=consultas[i];
          consultas[i]=consultas[j];
          consultas[j]=aux;
        }
      } 
    }
  }

  parsearFecha(fecha:any){
    let dia;
    let mes;
    let anio;
    dia = fecha.substring(fecha.indexOf("/")+1,fecha.lastIndexOf("/"));
    if(dia.length==1)
      dia = "0"+dia;
    mes = fecha.substring(0, fecha.indexOf("/"));
    if(mes.length==1)
    mes = "0"+mes;
    anio = fecha.substring(fecha.lastIndexOf("/")+1,fecha.length);
    return parseInt(anio+mes+dia);
  }

  agregarConsulta(){
    this.router.navigateByUrl('/registrarConsulta');
  }

  editarConsulta(consulta:any){
    this.router.navigate(['/editarConsulta', consulta.iden])
  }

  borrarConsulta(consulta){
    this.conexionService.eliminarConsulta(consulta);
  }

  back() {
    this.router.navigateByUrl('/historial');
  }
  RedirectTo(value:any){
    switch(value){
      case "usuario":
      this.router.navigateByUrl('/verUsuario')
      break;
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
  logout(){
    if (localStorage.getItem('UserLogged'))
    localStorage.removeItem('UserLogged');
    this.router.navigateByUrl('/login');
  }
}
