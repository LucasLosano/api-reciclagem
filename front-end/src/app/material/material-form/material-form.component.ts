import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { MaterialModel } from 'src/app/models/materialModel';
import { MaterialService } from 'src/app/services/material.service';

@Component({
  selector: 'app-material-form',
  templateUrl: './material-form.component.html',
  styleUrls: ['./material-form.component.css']
})

export class MaterialFormComponent {
  @Input() materialEdit?: MaterialModel = undefined;
  errorMessage: string = "";
  materialNovo: MaterialModel = {} as MaterialModel;

  constructor(
    private materialService: MaterialService
  ) {
  }

  adicionar(){
    this.materialService.create(this.materialNovo!)
    .subscribe(data => {        
      this.errorMessage = data.erro;      
      if(data.sucesso)
        window.location.reload();  
    });
  }

  alterar(){
    this.materialService.put(this.materialEdit!)
    .subscribe(data => {        
      this.errorMessage = data.erro;      
      if(data.sucesso)
        window.location.reload();  
    });
  }
}
