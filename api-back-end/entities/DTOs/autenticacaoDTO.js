var jwt = require('jsonwebtoken');

class autenticacaoDTO{
    constructor(usuario){
        this.id = usuario._id;
        this.token = jwt.sign({ sub: usuario._id }, process.env.SECRET)
    }
}

module.exports = autenticacaoDTO;