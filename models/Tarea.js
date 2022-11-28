const { v4: uuidv4 } = require('uuid');

class Tarea{
    id = '';
    descripcion = '';
    completadoEn = ''; //null o fecha
    constructor( descripcion ){
        this.descripcion = descripcion;
        this.completadoEn = null;
        this.id = uuidv4();
    }
}
module.exports = Tarea;