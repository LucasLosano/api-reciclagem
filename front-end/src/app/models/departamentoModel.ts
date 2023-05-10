import { PesagemModel } from "./pesagemModel";

export interface DepartamentoModel{
    id: number;
    nome: string;
    pesagens: PesagemModel[];
}