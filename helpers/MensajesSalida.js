require('colors');
const seleccionarOpcionMenu = () =>{
    console.clear();
    return new Promise ( resolve => {
        console.log('============================='.green);
        console.log('    Seleccione una opción'.green);
        console.log('=============================\n'.green);
        console.log(`${'1._'.green} Crear tarea`);
        console.log(`${'2._'.green} Listar tareas`);
        console.log(`${'3._'.green} Listar tareas completadas`);
        console.log(`${'4._'.green} Listar tareas pendientes`);
        console.log(`${'5._'.green} Completar tarea(s)`);
        console.log(`${'6._'.green} Borrar tarea`);
        console.log(`${'0._'.green} Salir`);
        const readline = require ('readline').createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        readline.question(`Seleccione una opción: `,(option)=>{
            console.log(option);
            readline.close();
            resolve(option)
        })
    })
}

const pausa = ()=>{
    return new Promise ( resolve =>{
        const readline = require ('readline').createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        readline.question(`\nPrecione ${'ENTER'.blue} para continuar`,(option)=>{
            console.log(option);
            readline.close();
            resolve(option);
            console.clear();
        })
    })
}

module.exports = {
    seleccionarOpcionMenu,
    pausa,
}