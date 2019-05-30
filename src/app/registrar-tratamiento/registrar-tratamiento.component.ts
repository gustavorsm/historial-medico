import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConexionService } from '../services/conexion.service';

@Component({
  selector: 'registrar-tratamiento',
  templateUrl: './registrar-tratamiento.component.html',
  styleUrls: ['./registrar-tratamiento.component.css']
})
export class RegistrarTratamientoComponent implements OnInit {
  private edited: boolean;
  private tratamiento: any={};
  private categories: any=["Diario","Semanal","Mensual"];
  constructor(private router: Router,private conexionService: ConexionService) { }

  ngOnInit() {
    this.edited=false;
  }

  back() {
    this.router.navigateByUrl('/listaDeTratamientos');
  }

  generateId() {
    return Math.floor(Math.random() * 100000) + 100;
  }

  agregarTratamiento(){
      let usuarioLogeado = JSON.parse(localStorage.getItem("UserLogged"));
      this.tratamiento.auth= usuarioLogeado.auth;
      this.tratamiento.iden= this.generateId();
      this.conexionService.anadirTratamiento(this.tratamiento);
      this.router.navigateByUrl('/listaDeTratamientos');
  }

  clear(){
    this.tratamiento={};
  }

}
