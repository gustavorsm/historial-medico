import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConexionService } from '../services/conexion.service';

@Component({
  selector: 'registrar-analisis',
  templateUrl: './registrar-analisis.component.html',
  styleUrls: ['./registrar-analisis.component.css']
})
export class RegistrarAnalisisComponent implements OnInit {
  private edited: boolean;
  private analisis: any={};
  private categories: any=["Fatal","Saludable","Normal"];
  constructor(private router: Router,private conexionService: ConexionService) { }

  ngOnInit() {
    this.edited=false;
  }

  back() {
    this.router.navigateByUrl('/listaDeAnalisis');
  }

  agregarAnalisis(){
      let usuarioLogeado = JSON.parse(localStorage.getItem("UserLogged"));
      this.analisis.auth= usuarioLogeado.auth;
      this.conexionService.anadirAnalisis(this.analisis);
      this.router.navigateByUrl('/listaDeAnalisis');
  }

  clear(){
    this.analisis={};
  }

}
