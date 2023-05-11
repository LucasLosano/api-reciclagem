import { Component } from '@angular/core';
import { DepartamentoService } from 'src/app/services/departamento.service';
import { DepartamentoModel } from 'src/app/models/departamentoModel';

@Component({
  selector: 'app-departamento-list',
  templateUrl: './departamento-list.component.html',
  styleUrls: ['./departamento-list.component.css']
})
export class DepartamentoListComponent {
  departamentos: DepartamentoModel[] = [];
  errorMessage: string = "";
  formFlag: boolean = false;
  departamentoSelect?: DepartamentoModel;

  constructor(
    private departamentoService: DepartamentoService
  ) {
  }

  cancelar(){
    this.formFlag = false;
    this.departamentoSelect = undefined;
  }

  edit(departamento: DepartamentoModel){
    this.departamentoSelect = departamento;
    this.formFlag = true;
  }

  delete(id: number){
    this.departamentoService.deleteById(id)
      .subscribe(data => {        
        this.errorMessage = data.erro;      
        if(data.sucesso)
          window.location.reload();    
      })
  }

  ngOnInit() {
    this.atualizarLista();   
  }

  atualizarLista(){
    this.departamentoService.getAll()
      .subscribe(data => {  
        this.errorMessage = data.erro;   
        if(data.sucesso)
          this.departamentos = data.retorno;
      })
  }
}
