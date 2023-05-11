import { DepartamentoModel } from "./departamentoModel";

export class DashboardModel{
    nome: string;
    pontuacao: number = 0;

    constructor(departamentoModel: DepartamentoModel){
        this.nome = departamentoModel.nome;
        departamentoModel.pesagens.forEach(pesagem => this.pontuacao += pesagem.peso);
    }
}