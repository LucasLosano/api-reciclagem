import { DepartamentoModel } from "./departamentoModel";

export class DashboardModel{
    nome: string;
    pontuacao: number = 0;

    constructor(departamentoModel: DepartamentoModel, materiaisMap: Map<number, number>){
        this.nome = departamentoModel.nome;
        departamentoModel.pesagens.forEach(pesagem => { 
            const materialId = pesagem.materialId;
            console.log(materialId);
            console.log(materiaisMap.get(materialId));
            const quantidade = materiaisMap.get(materialId) || 0;
            this.pontuacao += pesagem.peso * quantidade;
        });
    }
}