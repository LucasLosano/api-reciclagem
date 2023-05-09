import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { DepartamentoModel } from 'src/app/models/departamentoModel';
import { DepartamentoService } from 'src/app/services/departamento.service';

@Component({
  selector: 'app-departamento-form',
  templateUrl: './departamento-form.component.html',
  styleUrls: ['./departamento-form.component.css']
})
export class DepartamentoFormComponent {
  @Input() departamentoEdit?: DepartamentoModel = undefined;
  @Input() departamentos: DepartamentoModel[] = [];
  errorMessage: string = "";
  departamentoNovo: DepartamentoModel = {} as DepartamentoModel;

  constructor(
    private departamentoService: DepartamentoService
  ) {
  }

  adicionar(){
    this.departamentoService.create(this.departamentoNovo!)
    .subscribe(data => {        
      if(!data.sucesso)        
        this.errorMessage = data.error;
      
      console.log("Inside subscriber")
      this.atualizarLista()
    });
  }
  alterar(){
    this.departamentoService.put(this.departamentoEdit!)
    .subscribe(data => {        
      if(!data.sucesso)        
        this.errorMessage = data.error;
      
      this.atualizarLista()
    });
  }

  atualizarLista(){
    this.departamentoService.getAll()
      .subscribe(data => {      
        console.log("Atualizar" + data.retorno)  
        if(data.sucesso)
          this.departamentos = data.retorno;
        else
          this.errorMessage = data.error;
      })
  }
}
