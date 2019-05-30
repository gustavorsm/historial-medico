import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ConexionService } from '../services/conexion.service';

@Component({
  selector: 'app-editar-analisis',
  templateUrl: './editar-analisis.component.html',
  styleUrls: ['./editar-analisis.component.css']
})
export class EditarAnalisisComponent implements OnInit {
  private analisis:any={};
  private listaDeAnalisis:any=[];
  private edited:boolean;
  private analisisId:any;
  constructor(private route: ActivatedRoute,private conexionService: ConexionService,private router: Router) { }

  ngOnInit() {
    this.inizializarAnalisis();
    let found = this.route.params.subscribe(params => {
      let auth = +params['iden'];
      this.analisisId=auth;
   });
   this.edited=false;
  }
  inizializarAnalisis(){
    this.conexionService.listaDeAnalisis().subscribe(analisis=>{
      this.listaDeAnalisis = analisis;
      this.searchExpense();
    });
  }
  searchExpense(){
    for(let i = 0; i<this.listaDeAnalisis.length;i++)
      if(this.listaDeAnalisis[i].iden==this.analisisId){
        this.analisis = this.listaDeAnalisis[i];
      }
  }

  back() {
    this.router.navigateByUrl('/listaDeAnalisis');
  }

  editarAnalisis(){
    this.conexionService.editarAnalisis(this.analisis);
    this.router.navigateByUrl('/listaDeAnalisis');
  }

  clear(){
    this.analisis={};
  }


}
