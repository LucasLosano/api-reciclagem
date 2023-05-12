class materialModel{
    static materialTipo = new Map([
    [0, 'Plastico'],
    [1, 'Papel'],
    [2, 'Vidro'],
    [3, 'Organico'],
    [4, 'Metal'],
    [5, 'NaoReciclavel']]);

    static getTipoById(id) {
        return this.materialTipo.get(parseInt(id));
    }
    static getByValue(material) {
        for (let [key, value] of this.materialTipo.entries()) {
            if (value === material)
            return key;
        }
    }
}

module.exports = materialModel;