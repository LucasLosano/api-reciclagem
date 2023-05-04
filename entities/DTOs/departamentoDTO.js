class departamentoDTO{
    constructor(departamento){
        this.id = departamento.id;
        this.nome = departamento.nome;
        this.pesagens = departamento.pesagens;
    }
}

module.exports = departamentoDTO;