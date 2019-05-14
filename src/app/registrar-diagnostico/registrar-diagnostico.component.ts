import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConexionService } from '../services/conexion.service';

@Component({
  selector: 'registrar-diagnostico',
  templateUrl: './registrar-diagnostico.component.html',
  styleUrls: ['./registrar-diagnostico.component.css']
})
export class RegistrarDiagnosticoComponent implements OnInit {
  private edited: boolean;
  private diagnostico: any={};
  private categories: any=["Malo","Bueno"];
  constructor(private router: Router,private conexionService: ConexionService) { }

  ngOnInit() {
    this.edited=false;
  }

  back() {
    this.router.navigateByUrl('/listaDeDiagnosticos');
  }
  generateId() {
    return Math.floor(Math.random() * 100000) + 100;
  }

  agregarDiagnostico(){
      this.diagnostico.auth=this.generateId();
      this.conexionService.anadirDiagnostico(this.diagnostico);
      this.router.navigateByUrl('/listaDeDiagnosticos');
  }

  clear(){
    this.diagnostico={};
  }

}
