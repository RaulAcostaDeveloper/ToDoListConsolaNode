require('colors');
const { guardarBD, leerBD } = require('./helpers/CrearArchivoDB');
const { inquirerMenu, inquirerPausa, solicitarDescripcionTarea,menuCompletarElementos, menuBorrarElemento, confirmar } = require('./helpers/InquirerMensajesSalida');
const Tareas = require('./models/Tareas');
console.clear();

const main = async()=>{
    let opcionMenu = '';
    const tareas = new Tareas();
    const dataBD = leerBD();
    if (dataBD) {
        tareas.cargarTareas(dataBD);  
    }    
    
    do {
        opcionMenu = await inquirerMenu();
        switch (opcionMenu) {
            case '1':
                const desc = await solicitarDescripcionTarea();
                tareas.crearTarea(desc);
                break;
            case '2':
                tareas.imprimirTareas();
                await inquirerPausa(); 
                break;
            case '3':
                tareas.imprimirTareas('Completadas');
                await inquirerPausa(); 
                break;
            case '4':
                tareas.imprimirTareas('Pendientes');
                await inquirerPausa();
                break;
            case '5':
                const ids = await menuCompletarElementos(tareas.listadoArreglo);
                tareas.completarElementos(ids);
                await inquirerPausa();
                break;
            case '6':
                const idBorrar = await menuBorrarElemento(tareas.listadoArreglo);
                if (idBorrar !=='0') {
                    const opcion = await confirmar('¿Seguro que desea eliminar la tarea?');
                    if (opcion) {
                        console.log('SE BORRÓ LA TAREA');
                        tareas.borrarTarea(idBorrar);
                    }
                } //Se saldrá del menú
                await inquirerPausa();
                break;
            case '0':
                await inquirerPausa(); 

                break;
            default:
                break;
        }
        guardarBD(tareas.listadoArreglo);
    } while (opcionMenu!=='0');
}
main();