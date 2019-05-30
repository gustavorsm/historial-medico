import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConexionService } from '../services/conexion.service';

@Component({
  selector: 'lista-tratamientos',
  templateUrl: './lista-tratamientos.component.html',
  styleUrls: ['./lista-tratamientos.component.css']
})
export class ListaDeTratamientosComponent implements OnInit {

  private listaDeTratamientos: any=[];

  constructor(private router: Router,private conexionService: ConexionService) { }

  ngOnInit() {
    this.conexionService.listaDeTratamientos().subscribe(tratamiento=>{
      this.listaDeTratamientos=[];
      let usuarioLogeado = JSON.parse(localStorage.getItem("UserLogged"));
      tratamiento.forEach((element:any) => {
        if(element.auth == usuarioLogeado.auth) this.listaDeTratamientos.push(element);
      });
      this.verificarOrden(this.listaDeTratamientos);
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
  agregarTratamiento(){
    this.router.navigateByUrl('/registrarTratamiento');
  }

  editarTratamiento(tratamiento:any){
    this.router.navigate(['/editarTratamiento', tratamiento.iden])
  }
  borrarTratamiento(tratamiento){
    this.conexionService.eliminarTratamiento(tratamiento);
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
