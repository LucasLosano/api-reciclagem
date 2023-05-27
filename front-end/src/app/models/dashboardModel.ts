import { DepartamentoModel } from "./departamentoModel";

export class DashboardModel{
    nome: string;
    pontuacao: number = 0;

    constructor(departamentoModel: DepartamentoModel, materiaisMap: Map<number, number>){
        this.nome = departamentoModel.nome;
        departamentoModel.pesagens.forEach(pesagem => { 
            const materialId = pesagem.materialId;
            const quantidade = materiaisMap.get(materialId) || 1;
            this.pontuacao += pesagem.peso * quantidade;
        });
    }
}