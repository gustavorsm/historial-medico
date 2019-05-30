import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConexionService } from '../services/conexion.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  private listaDeConsultas: any=[];
  private listaDeAnalisis: any=[];
  private listaDeDiagnosticos: any=[];
  private listaDeTratamientos: any=[];
  private historial: any=[];
  
  constructor(private router: Router,private conexionService: ConexionService) { }

  ngOnInit() {
    this.iniciarHistorial();
    let usuarioLogeado = JSON.parse(localStorage.getItem("UserLogged"));
    this.conexionService.listaDeConsultas().subscribe(consulta=>{
      this.listaDeConsultas=[];
      consulta.forEach((element:any) => {
        if(element.auth == usuarioLogeado.auth) this.listaDeConsultas.push(element);
      });
      this.conexionService.listaDeAnalisis().subscribe(analisis=>{
        this.listaDeAnalisis=[];
        analisis.forEach((element:any) => {
          if(element.auth == usuarioLogeado.auth) this.listaDeAnalisis.push(element);
        });
        this.conexionService.listaDeDiagnosticos().subscribe(diagnostico=>{
          this.listaDeDiagnosticos=[];
          diagnostico.forEach((element:any) => {
            if(element.auth == usuarioLogeado.auth) this.listaDeDiagnosticos.push(element);
          });
          this.conexionService.listaDeTratamientos().subscribe(tratamiento=>{
            this.listaDeTratamientos=[];
            tratamiento.forEach((element:any) => {
              if(element.auth == usuarioLogeado.auth) this.listaDeTratamientos.push(element);
            });
            this.crearHistorial();
            this.verificarOrden(this.historial);
          })
        })
      });
    })
  }
  
  iniciarHistorial(){
    this.listaDeTratamientos = [];
    this.listaDeAnalisis = [];
    this.listaDeConsultas = [];
    this.listaDeDiagnosticos = [];
    this.historial = [];
  }
  crearHistorial(){
    this.listaDeAnalisis.forEach((element:any) => {
      element.tipo = "analisis";
      this.historial.push(element)
    });
    this.listaDeConsultas.forEach((element:any) => {
      element.tipo = "consulta";
      this.historial.push(element)
    });
    this.listaDeTratamientos.forEach((element:any) => {
      element.tipo = "tratamiento";
      this.historial.push(element)
    });
    this.listaDeDiagnosticos.forEach((element:any) => {
      element.tipo = "diagnostico";
      this.historial.push(element)
    });
  }

  verificarOrden(historial:any){
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
    dia = fecha.substring(fecha.indexOf("/")+1,fecha.lastIndexOf("/"));
    if(dia.length==1)
      dia = "0"+dia;
    mes = fecha.substring(0, fecha.indexOf("/"));
    if(mes.length==1)
    mes = "0"+mes;
    anio = fecha.substring(fecha.lastIndexOf("/")+1,fecha.length);
    return parseInt(anio+mes+dia);
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
