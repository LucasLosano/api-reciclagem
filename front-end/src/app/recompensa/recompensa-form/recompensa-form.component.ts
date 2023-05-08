import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { RecompensaModel } from 'src/app/models/recompensaModel';
import { RecompensaService } from 'src/app/services/recompensa.service';

@Component({
  selector: 'app-recompensa-form',
  templateUrl: './recompensa-form.component.html',
  styleUrls: ['./recompensa-form.component.css']
})
export class RecompensaFormComponent {
  @Input() recompensaEdit?: RecompensaModel = undefined;
  errorMessage: string = "";
  recompensaNovo: RecompensaModel = {} as RecompensaModel;

  constructor(
    private recompensaService: RecompensaService
  ) {
  }

  adicionar(){
    console.log(this.recompensaNovo)
    this.recompensaService.create(this.recompensaNovo!)
    .subscribe(data => {        
      if(!data.sucesso)        
        this.errorMessage = data.error;
      
        window.location.reload();
    });
  }
  alterar(){
    this.recompensaService.put(this.recompensaEdit!)
    .subscribe(data => {        
      if(!data.sucesso)        
        this.errorMessage = data.error;
      
        window.location.reload();
    });
  }
}
