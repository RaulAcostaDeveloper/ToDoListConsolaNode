const Tarea = require("./Tarea");
require('colors');

class Tareas{
    _listadoTareas = {};
    constructor(){
        this._listadoTareas = {};
    }
    crearTarea( descripcion = '' ){
        const tarea = new Tarea(descripcion);
        this._listadoTareas[tarea.id] = tarea;
    }
    get listadoArreglo() {
        const listado = [];
        Object.keys(this._listadoTareas).forEach( key => {
            listado.push( this._listadoTareas[key])
        });
        return listado;
    }
    cargarTareas( tareas = [] ){
        tareas.forEach( tarea =>{
            this._listadoTareas[tarea.id] = tarea;
        })
    }
    imprimirTareas( opcion = '' ){
        console.clear();
        let counter = 1;
        console.log('============================='.green);
        console.log('    Listado de tareas'.green);
        console.log('============================='.green);
        this.listadoArreglo.forEach((tarea)=>{
            if (opcion==='Completadas') {
                if (tarea.completadoEn) {
                    console.log(`${(counter+'._').green} ${tarea.descripcion} :: ${tarea.completadoEn.green}`);
                    counter++;
                }
                return null;
            } else if(opcion === 'Pendientes'){
                if (!tarea.completadoEn) {
                    console.log(`${(counter+'._').green} ${tarea.descripcion} :: ${'Pendiente'.red}`);
                    counter++;
                }
                return null;
            }
            console.log(`${(counter+'._').green} ${tarea.descripcion} :: ${(tarea.completadoEn)? 'Completado'.green:'Pendiente'.red}`);
            counter++;
        });
    }
    borrarTarea( id = '' ){
        if (id) {
            if (this._listadoTareas[id]) {
                delete this._listadoTareas[id];
            } else{
                console.log('No existe la tarea');
            }
        }
    }
    completarElementos(ids=[]){
        ids.forEach(id=>{
            //Para que no cambie la fecha cada vez 
            if (!this._listadoTareas[id].completadoEn) { 
                this._listadoTareas[id].completadoEn = new Date().toISOString();
            }
        });
        this.listadoArreglo.forEach( tarea => {
            if (!ids.includes(tarea.id) ) {
                this._listadoTareas[tarea.id].completadoEn = null;
            }
        })
    }
}
module.exports = Tareas;