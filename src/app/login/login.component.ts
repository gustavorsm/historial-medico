import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ConexionService } from '../services/conexion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  
  private edited:boolean;
  private usuario: any = {};
  private listaDeUsuarios:any=[];
  private accountId:any;
  

  constructor(private route: ActivatedRoute,private conexionService: ConexionService,private router: Router) { }

  ngOnInit() {
    this.initializeAccounts();
    this.usuario = {
      nombre: "",
      contrasena: ""
    }
  }

  initializeAccounts(){
    this.conexionService.listaDeUsuarios().subscribe(usuario=>{
      this.listaDeUsuarios = usuario;
    });
  }

  login() {
    this.conexionService.listaDeUsuarios().subscribe(usuario=>{
      let usuarioLogeado = {};
      this.listaDeUsuarios = usuario;
      for(let i = 0 ; i < this.listaDeUsuarios.length ; i++){
        if(this.listaDeUsuarios[i].nombre == this.usuario.nombre && this.listaDeUsuarios[i].contrasena == this.usuario.contrasena){
          usuarioLogeado = {
            auth : this.listaDeUsuarios[i].auth,
            nombre : this.listaDeUsuarios[i].nombre
          }
          localStorage.setItem("UserLogged", JSON.stringify(usuarioLogeado));
          this.router.navigateByUrl('/historial');
        }
      }
    });
  }
}