const departamento = require('../entities/departamento');
const departamentoDTO = require('../entities/DTOs/departamentoDTO');

class departamentoService{
    constructor(){
        this.departamentos = new Map();        
        this.departamentos.set(1, new departamento({ 'id':1, 'nome':'TI'}));
        this.departamentos.set(2, new departamento({ 'id':2, 'nome':'RH'}));
    }
    getDepartamentos(){
        return Array.from(this.departamentos.values()).map(departamento => new departamentoDTO(departamento));
    }

    getDepartamentoById(id){
        return new departamentoDTO(this.departamentos.get(parseInt(id)));
    }

    addDepartamento(departamentoNovo){
        return this.departamentos.set(departamento.id, new departamento(departamentoNovo));
    }

    updateDepartamento(departamentoAtualizado){
        return this.departamentos.set(departamento.id, new departamento(departamentoAtualizado));
    }

    deleteDepartamento(id){
        return this.departamentos.delete(id);
    }
}

module.exports = departamentoService;