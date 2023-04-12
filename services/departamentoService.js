const departamento = require('../entities/departamento');
const departamentoDTO = require('../entities/DTOs/departamentoDTO');
const pesagemService = require('../services/pesagemService');

class departamentoService{
    static departamentos = new Map([
        [1, new departamento({ 'id':1, 'nome':'TI'})],
        [2, new departamento({ 'id':2, 'nome':'RH'})],
        [3, new departamento({ 'id':3, 'nome':'Operação'})]]
    );
    static getDepartamentos(){
        return Array.from(this.departamentos.values()).map(
            departamento => {
                departamento.pesagens = pesagemService.getPesagemByDepartamentoId(departamento.id);
                return new departamentoDTO(departamento)
            }
        );
    }

    static getDepartamentoById(id){
        let departamento = this.departamentos.get(id);
        if (departamento === undefined)
            throw {'status': 404,'mensagem':'Departamento não existe ou não foi encontrado'};

        return new departamentoDTO(departamento);
    }

    static addDepartamento(departamentoNovo){
        let auxDepartamento = this.departamentos.get(departamentoNovo.id);

        if(auxDepartamento !== undefined)
            throw {'status': 400,'mensagem':'Um departamento com esse Id já foi criado'};

        this.departamentos.set(departamentoNovo.id, new departamento(departamentoNovo));

        return this.getDepartamentoById(departamentoNovo.id);
    }

    static updateDepartamento(departamentoAtualizado){
        let auxDepartamento = this.departamentos.get(departamentoAtualizado.id);
        if (auxDepartamento === undefined)
            throw {'status': 404,'mensagem':'Departamento não existe ou não foi encontrado'};

        this.departamentos.set(departamentoAtualizado.id, new departamento(departamentoAtualizado));

        return this.getDepartamentoById(departamentoAtualizado.id);
    }

    static deleteDepartamento(id){
        let departamento = this.departamentos.get(id);
        if (departamento === undefined)
            throw {'status': 404,'mensagem':'Departamento não existe ou não foi encontrado'};

        return this.departamentos.delete(id);
    }
}

module.exports = departamentoService;