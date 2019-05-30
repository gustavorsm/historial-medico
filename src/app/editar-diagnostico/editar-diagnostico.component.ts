import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ConexionService } from '../services/conexion.service';

@Component({
  selector: 'app-editar-diagnostico',
  templateUrl: './editar-diagnostico.component.html',
  styleUrls: ['./editar-diagnostico.component.css']
})
export class EditarDiagnosticoComponent implements OnInit {
  private diagnostico:any={};
  private listaDeDiagnosticos:any=[];
  private edited:boolean;
  private diagnosticoId:any;
  constructor(private route: ActivatedRoute,private conexionService: ConexionService,private router: Router) { }

  ngOnInit() {
    this.inizializarAnalisis();
    let found = this.route.params.subscribe(params => {
      let auth = +params['iden'];
      this.diagnosticoId=auth;
   });
   this.edited=false;
  }
  inizializarAnalisis(){
    this.conexionService.listaDeDiagnosticos().subscribe(diagnostico=>{
      this.listaDeDiagnosticos = diagnostico;
      this.searchExpense();
    });
  }
  searchExpense(){
    for(let i = 0; i<this.listaDeDiagnosticos.length;i++)
      if(this.listaDeDiagnosticos[i].iden==this.diagnosticoId){
        this.diagnostico = this.listaDeDiagnosticos[i];
      }
  }

  back() {
    this.router.navigateByUrl('/listaDeDiagnosticos');
  }

  editarDiagnostico(){
    this.conexionService.editarDiagnostico(this.diagnostico);
    this.router.navigateByUrl('/listaDeDiagnosticos');
  }

  clear(){
    this.diagnostico={};
  }


}
