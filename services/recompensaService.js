const recompensa = require('../entities/recompensa');
const recompensaDTO = require('../entities/DTOs/recompensaDTO');

class recompensaService{
    static recompensas = new Map([
        [10, new recompensa({ 'id':10, 'nome':'Caneca', 'pontosNecessarios': 30})],
        [12, new recompensa({ 'id':12, 'nome':'Caderno', 'pontosNecessarios': 50 })]
    ]
    );
    static getRecompensa(){
        let recompensas = Array.from(this.recompensas.values()).map(recompensa => new recompensaDTO(recompensa));

        return recompensas;
    }

    static getRecompensaId(id){
        let recompensa = this.recompensas.get(parseInt(id));
        if (recompensa === undefined)
            throw {'status': 404,'mensagem':'Recompensa não existe ou não foi encontrado'};

        return new recompensaDTO(recompensa);
    }

    static addRecompensa(recompensaNova){
        let auxRecompensa = this.recompensas.get(recompensaNova.id);

        if(auxRecompensa !== undefined)
            throw {'status': 400,'mensagem':'Um recompensa com esse Id já foi criado'};

        this.recompensas.set(recompensaNova.id, new recompensa(recompensaNova));

        return this.getRecompensaId(recompensaNova.id);
    }

    static updateRecompensa(recompensaAtualizada){
        let auxRecompensa = this.recompensas.get(parseInt(recompensaAtualizada.id));

        if (auxRecompensa === undefined)
            throw {'status': 404,'mensagem':'Recompensa não existe ou não foi encontrado'};
        this.recompensas.set(auxRecompensa.id, new recompensa(recompensaAtualizada));

        return this.getRecompensaId(recompensaAtualizada.id);
    }

    static deleteRecompensa(id){
        let recompensa = this.recompensas.get(parseInt(id));
        if (recompensa === undefined)
            throw {'status': 404,'mensagem':'Recompensa não existe ou não foi encontrado'};
        return this.recompensas.delete(id);
    }
}

module.exports = recompensaService;