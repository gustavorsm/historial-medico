import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConexionService } from '../services/conexion.service';

@Component({
  selector: 'registrar-consulta',
  templateUrl: './registrar-consulta.component.html',
  styleUrls: ['./registrar-consulta.component.css']
})
export class RegistrarConsultaComponent implements OnInit {
  private edited: boolean;
  private consulta: any={};
  private categories: any=["Viveres","Servicios Basicos","Otros"];
  constructor(private router: Router,private conexionService: ConexionService) { }

  ngOnInit() {
    this.edited=false;
  }

  back() {
    this.router.navigateByUrl('/listaDeConsultas');
  }

  generateId() {
    return Math.floor(Math.random() * 100000) + 100;
  }
  agregarConsulta(){
      let usuarioLogeado = JSON.parse(localStorage.getItem("UserLogged"));
      this.consulta.auth= usuarioLogeado.auth;
      this.consulta.iden= this.generateId();
      this.conexionService.anadirConsulta(this.consulta);
      this.router.navigateByUrl('/listaDeConsultas');
  }

  clear(){
    this.consulta={};
  }

}
