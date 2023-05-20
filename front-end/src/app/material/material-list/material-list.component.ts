import { Component } from '@angular/core';
import { MaterialModel } from 'src/app/models/materialModel';
import { MaterialService } from 'src/app/services/material.service';

@Component({
  selector: 'app-material-list',
  templateUrl: './material-list.component.html',
  styleUrls: ['./material-list.component.css']
})

export class MaterialListComponent {
  materiais: MaterialModel[] = [];
  errorMessage: string = "";
  formFlag: boolean = false;
  recompensaSelect?: MaterialModel;

  constructor(
    private materialService: MaterialService
  ) {
  }

  cancelar(){
    this.formFlag = false;
    this.recompensaSelect = undefined;
  }

  edit(recompensa: MaterialModel){
    this.recompensaSelect = recompensa;
    this.formFlag = true;
  }

  delete(id: number){
    this.materialService.deleteById(id)
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
    this.materialService.getAll()
      .subscribe(data => {        
        this.errorMessage = data.erro;      
        if(data.sucesso)
          this.materiais = data.retorno; 
      })
  }
}
