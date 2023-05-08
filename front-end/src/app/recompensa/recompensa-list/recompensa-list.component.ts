import { Component } from '@angular/core';
import { RecompensaModel } from 'src/app/models/recompensaModel';
import { RecompensaService } from 'src/app/services/recompensa.service';

@Component({
  selector: 'app-recompensa-list',
  templateUrl: './recompensa-list.component.html',
  styleUrls: ['./recompensa-list.component.css']
})
export class RecompensaListComponent {
  recompensas: RecompensaModel[] = [];
  errorMessage: string = "";
  formFlag: boolean = false;
  recompensaSelect?: RecompensaModel;

  constructor(
    private recompensaService: RecompensaService
  ) {
  }

  cancelar(){
    this.formFlag = false;
    this.recompensaSelect = undefined;
  }

  edit(recompensa: RecompensaModel){
    this.recompensaSelect = recompensa;
    this.formFlag = true;
  }

  delete(id: number){
    console.log(id + " Antes do método");
    this.recompensaService.deleteById(id)
      .subscribe(data => {        
        if(!data.sucesso)
          this.errorMessage = data.error;
      })
  }

  ngOnInit() {
    this.recompensaService.getAll()
      .subscribe(data => {        
        if(data.sucesso)
          this.recompensas = data.retorno;
        else
          this.errorMessage = data.error;
      })
  }
}
