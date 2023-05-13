import { Component, Input } from '@angular/core';
import { DepartamentoModel } from '../models/departamentoModel';
import { RecompensaModel } from '../models/recompensaModel';
import { DepartamentoService } from '../services/departamento.service';
import { RecompensaService } from '../services/recompensa.service';
import { DashboardModel } from '../models/dashboardModel';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  departamentos: DepartamentoModel[] = [];
  recompensas: RecompensaModel[] = [];
  departamentosDashboard: DashboardModel[] = [];
  contador: number = 1;
  pontuacaoMaxima: number = 1;

  constructor(
    private departamentoService: DepartamentoService,
    private recompensaService: RecompensaService,
  ){}
  ngOnInit() {
    this.getDepartamentos();   
    this.getRecompensas();   
  }

  getDepartamentos(){
    this.departamentoService.getAll()
      .subscribe(data => {  
        if(data.sucesso){
          this.departamentos = data.retorno;
          this.departamentosDashboard = this.departamentos
          .map(departamento => new DashboardModel(departamento))
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
