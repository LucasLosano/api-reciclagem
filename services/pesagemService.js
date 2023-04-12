const pesagem = require('../entities/pesagem');
const pesagemDTO = require('../entities/DTOs/pesagemDTO');

const departamentoService = require('../services/departamentoService');

class pesagemService {
    static pesagens = new Map([
        [1, new pesagem({ 'id': 1, 'peso': 10.25, 'tipoMaterial': 1, 'departamentoId': 1 })],
        [2, new pesagem({ 'id': 2, 'peso': 50.10, 'tipoMaterial': 2, 'departamentoId': 1 })],
        [3, new pesagem({ 'id': 3, 'peso': 23.10, 'tipoMaterial': 3, 'departamentoId': 2 })],
        [4, new pesagem({ 'id': 4, 'peso': 100.2, 'tipoMaterial': 4, 'departamentoId': 2 })],
        [5, new pesagem({ 'id': 5, 'peso': 45.6, 'tipoMaterial': 5, 'departamentoId': 2 })],
        [6, new pesagem({ 'id': 6, 'peso': 45.1, 'tipoMaterial': 2, 'departamentoId': 1 })],
        [7, new pesagem({ 'id': 7, 'peso': 11.5, 'tipoMaterial': 3, 'departamentoId': 1 })]
    ]
    );

    static addPesagem(pesagemNova) {
        let auxPesagem = this.pesagens.get(pesagemNova.id);
        departamentos.getDepartamentoById(pesagemNova.departamentoId);

        if (auxPesagem !== undefined)
            throw { 'status': 400, 'mensagem': 'Um pesagem com esse Id já foi criado' };


        this.pesagens.set(pesagemNova.id, new pesagem(pesagemNova));

        return this.getPesagemById(pesagemNova.id);
    }

    static getPesagem() {
        let pesagens = Array.from(this.pesagens.values()).map(pesagem => new pesagemDTO(pesagem));
        return pesagens;
    }

    static getPesagemById(id) {
        let pesagem = this.pesagens.get(parseInt(id));
        if (pesagem === undefined)
            throw { 'status': 404, 'mensagem': 'Pesagem não existe ou não foi encontrado' };

        return new pesagemDTO(pesagem);
    }

    static getPesagemByDepartamentoId(departamentotId) {
        let pesagens = Array.from(this.pesagens.values())
            .filter(peasagem => peasagem.departamentoId == departamentotId)
            .map(pesagem => new pesagemDTO(pesagem));
        return pesagens;
    }
}

module.exports = pesagemService;