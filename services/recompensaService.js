const recompensas = require('../entities/recompensa');
const recompensaDTO = require('../entities/DTOs/recompensaDTO');

class recompensaService{
    constructor(){
        this.recompensas = new Map();        
        this.recompensas.set(10, new recompensas({ 'id':10, 'nome':'Caneca' , 'pontosNecessarios': 30}));
        this.recompensas.set(12, new recompensas({ 'id':12, 'nome':'Caderno' , 'pontosNecessarios': 50 }));
    }
    getRecompensa(){
        return Array.from(this.recompensas.values()).map(recompensa => new recompensaDTO(recompensa));
    }

    getRecompensaId(id){
        return new recompensaDTO(this.recompensas.get(parseInt(id)));
    }

    addRecompensa(recompensaNova){
        return this.recompensas.set(recompensa.id, new recompensa(recompensaNova));
    }

    updateRecompensa(recompensaAtulizada){
        return this.recompensas.set(recompensa.id, new recompensa(recompensaAtulizada));
    }

    deleteRecompensa(id){
        return this.recompensas.delete(id);
    }
}

module.exports = recompensaService;