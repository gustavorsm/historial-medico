import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConexionService } from '../services/conexion.service';

export interface Usuario { nombre: string, contrasena:string, contrasenaConfirmar:string }

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {

  private firstTime: boolean;
  private usuario: any = {};
  private errorMensaje: string;
  private carga: boolean = false;

  private usuarioErronea: boolean;
  private contrasenaErronea: boolean;
  private contrasenaConfirmacionErronea: boolean;
  private usuarioValida: boolean;
  private contrasenaValida: boolean;
  private confirmacionValida: boolean;

  constructor(private router: Router,private conexionService: ConexionService) { }

  ngOnInit() {
    this.usuario = {
      nombre: "",
      apellido:"",
      correo:"",
      fecha:"",
      contrasena: "",
    }
  }
 
  agregarUsuario(){
    this.usuario.auth=this.generateId();
    this.conexionService.anadirUsuario(this.usuario);
    this.router.navigateByUrl('/login');
}

  generateId() {
    return Math.floor(Math.random() * 100000) + 100;
  }

}
