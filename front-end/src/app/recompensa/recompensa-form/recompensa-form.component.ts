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
    this.recompensaService.create(this.recompensaNovo!)
    .subscribe(data => {        
      this.errorMessage = data.erro;      
      if(data.sucesso)
        window.location.reload();  
    });
  }
  alterar(){
    this.recompensaService.put(this.recompensaEdit!)
    .subscribe(data => {        
      this.errorMessage = data.erro;      
      if(data.sucesso)
        window.location.reload();  
    });
  }
}
