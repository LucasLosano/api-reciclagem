import { Component, Input } from '@angular/core';
import { DepartamentoModel } from '../models/departamentoModel';
import { MaterialModel } from '../models/materialModel';
import { RecompensaModel } from '../models/recompensaModel';
import { DepartamentoService } from '../services/departamento.service';
import { MaterialService } from '../services/material.service';
import { RecompensaService } from '../services/recompensa.service';
import { DashboardModel } from '../models/dashboardModel';
import { map } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  departamentos: DepartamentoModel[] = [];
  recompensas: RecompensaModel[] = [];
  materiais : MaterialModel[] = [];
  departamentosDashboard: DashboardModel[] = [];
  contador: number = 1;
  pontuacaoMaxima: number = 1;

  constructor(
    private departamentoService: DepartamentoService,
    private materialService: MaterialService,
    private recompensaService: RecompensaService,
  ){}
  ngOnInit() {
    this.getDepartamentos();   
    this.getRecompensas();   
  }

  getDepartamentos(){
    var mapMaterialToPoints = new Map();
    this.materialService.getAll()
    .subscribe(data => {  
      if(data.sucesso){
        console.log(data.retorno);
        this.materiais = data.retorno;
        this.materiais.forEach(opcao => {
          console.log(opcao);
          mapMaterialToPoints.set( opcao.id, opcao.pontuacaoPorKg );
        })
      }
    })
    
    this.departamentoService.getAll()
      .subscribe(data => {  
      console.log(mapMaterialToPoints);
        if(data.sucesso){
          console.log(data.retorno);
          
          this.departamentos = data.retorno;
          this.departamentosDashboard = this.departamentos
          .map(departamento => new DashboardModel(departamento, mapMaterialToPoints))
          .sort(departamento => departamento.pontuacao);
        }
      })
  }

  getRecompensas(){
    this.recompensaService.getAll()
      .subscribe(data => {  
        if(data.sucesso){
          this.recompensas = data.retorno;
          this.pontuacaoMaxima = Math.max(...this.recompensas.map(recompensa => recompensa.pontosNecessarios))
        }
      })
  }
}
