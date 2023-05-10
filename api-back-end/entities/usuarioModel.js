class usuarioModel {
    constructor(objeto) {
        if (typeof objeto !== 'object' ||
            typeof objeto.username !== 'string' ||
            typeof objeto.password !== 'string') {
            throw {'status': 400,'mensagem':'Parâmetros inválidos'};
        }

        this.username = objeto.username;
        this.password = objeto.password;
    }
}

module.exports = usuarioModel;