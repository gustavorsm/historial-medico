import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ConexionService } from '../services/conexion.service';

@Component({
  selector: 'app-ver-usuario',
  templateUrl: './ver-usuario.component.html',
  styleUrls: ['./ver-usuario.component.css']
})
export class MostrarUsuarioComponent implements OnInit {
  private usuario:any={};
  private isEdit:any;
  private edited:any;
  private isDisabled:any;
  constructor(private route: ActivatedRoute,private conexionService: ConexionService,private router: Router) { }

  ngOnInit() {
    this.isEdit = false;
    this.isDisabled = true;
    this.inizializarAnalisis();
  }
  inizializarAnalisis(){
    let usuarioLogeado = JSON.parse(localStorage.getItem("UserLogged"));
    this.conexionService.listaDeUsuarios().subscribe(usuario=>{
      usuario.forEach((element:any) => {
        if(element.auth == usuarioLogeado.auth) this.usuario = element;
      });
    });
  }
  editarUsuario(){
    this.conexionService.editarUsuarios(this.usuario);
    let usuarioLogeado = {
      auth : this.usuario.auth,
      nombre : this.usuario.nombre
    }
    localStorage.setItem("UserLogged", JSON.stringify(usuarioLogeado));
    this.isEdit = false;
    this.isDisabled = true;
    this.edited = false;
  }
  logout(){
    if (localStorage.getItem('UserLogged'))
    localStorage.removeItem('UserLogged');
    this.router.navigateByUrl('/login');
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

}
