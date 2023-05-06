class recompensaDTO{
    constructor(recompensa){
        this.id = recompensa.id;
        this.nome = recompensa.nome;
        this.pontosNecessarios = recompensa.pontosNecessarios;
    }
}

module.exports = recompensaDTO;