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
        let departamento = this.departamentos.get(id);
        if (departamento === undefined)
            throw {'status': 404,'mensagem':'Departamento não existe ou não foi encontrado'};

        return new departamentoDTO(departamento);
    }

    addDepartamento(departamentoNovo){
        let auxDepartamento = this.departamentos.get(departamentoNovo.id);

        if(auxDepartamento !== undefined)
            throw {'status': 400,'mensagem':'Um departamento com esse Id já foi criado'};

        this.departamentos.set(departamentoNovo.id, new departamento(departamentoNovo));

        return this.getDepartamentoById(departamentoNovo.id);
    }

    updateDepartamento(departamentoAtualizado){
        let auxDepartamento = this.departamentos.get(departamentoAtualizado.id);
        if (auxDepartamento === undefined)
            throw {'status': 404,'mensagem':'Departamento não existe ou não foi encontrado'};

        this.departamentos.set(departamentoAtualizado.id, new departamento(departamentoAtualizado));

        return this.getDepartamentoById(departamentoAtualizado.id);
    }

    deleteDepartamento(id){
        let departamento = this.departamentos.get(id);
        if (departamento === undefined)
            throw {'status': 404,'mensagem':'Departamento não existe ou não foi encontrado'};

        return this.departamentos.delete(id);
    }
}

module.exports = departamentoService;