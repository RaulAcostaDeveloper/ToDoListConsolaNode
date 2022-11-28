const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            { value: '1', name:`${'1._'.green} Crear tarea`},
            { value: '2', name:`${'2._'.green} Listar tareas`},
            { value: '3', name:`${'3._'.green} Listar tareas completadas`},
            { value: '4', name:`${'4._'.green} Listar tareas pendientes`},
            { value: '5', name:`${'5._'.green} Completar tarea(s)`},
            { value: '6', name:`${'6._'.green} Borrar tarea`},
            { value: '0', name:`${'0._'.green} Salir`}
        ]
    }
];
const inquirerMenu = async ()=>{
    console.clear();
    console.log('-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.');
    console.log('-.-.-.-.-.-.-.-.-.-.-.-RAUL ACOSTA.-.-.-.-.-.-.-.-.-.-.-.-.-');
    console.log('-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.\n');
    console.log('============================='.green);
    console.log('    Seleccione una opción'.green);
    console.log('=============================\n'.green);
    const opcion = await inquirer.prompt(preguntas);
    return opcion.opcion;
}

const inquirerPausa = async()=>{
    const pregunta = [
        {
            type: 'input',
            name: 'respuesta',
            message: `\nPrecione ${'ENTER'.blue} para continuar`,
        }
    ]
    await inquirer.prompt(pregunta);
    console.clear();
}
const solicitarDescripcionTarea = async ()=>{
    const pregunta = [
        {
            type: 'input',
            name: 'descripcion',
            message: 'Escriba la descripción de la tarea:',
            validate: (resp) => {
                if (resp.length<=0) {
                    return 'Por favor escriba la descripción'
                }
                return true;
            }
        }
    ]
    const { descripcion } = await inquirer.prompt(pregunta);
    return descripcion;
}
const menuBorrarElemento = async( tareas = []) => {
    const opciones = tareas.map((tarea, index)=>{
        return {
            value: tarea.id,
            name: `${(index +1 +'._').green} ${tarea.descripcion}`,
        }
    });
    opciones.unshift({
        value:'0',
        name:`${'0._'.green} Regresar al menú principal`,
    })
    const pregunta = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione la tarea a eliminar:',
            choices: opciones
        }
    ]
    const { id } = await inquirer.prompt(pregunta);
    return id;
}
const menuCompletarElementos = async( tareas = []) => {
    const opciones = tareas.map((tarea, index)=>{
        return {
            value: tarea.id,
            name: `${(index +1 +'._').green} ${tarea.descripcion}`,
            checked: (tarea.completadoEn)? true:false,
        }
    });
    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccion(es):',
            choices: opciones
        }
    ]
    const { ids } = await inquirer.prompt(pregunta);
    return ids;
}
const confirmar = async (message = '?')=>{
    const pregunta = [
        {
            type: 'confirm',
            name: 'opcion',
            message
        }
    ]
    const { opcion } = await inquirer.prompt(pregunta);
    return opcion;
}
module.exports = {
    inquirerMenu,
    inquirerPausa,
    solicitarDescripcionTarea,
    menuBorrarElemento,
    confirmar,
    menuCompletarElementos
}