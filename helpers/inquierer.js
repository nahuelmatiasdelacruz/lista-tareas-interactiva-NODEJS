import inquirer from "inquirer";
import "colors";

const menuOpts = [
    {
        type: "list",
        name: "opcion",
        message: "¿Qué desea hacer?",
        choices: [
            { value: "1", name: `${"1".yellow}. Crear tarea` },
            { value: "2", name: `${"2".yellow}. Listar tareas` },
            { value: "3", name: `${"3".yellow}. Listar tareas completadas` },
            { value: "4", name: `${"4".yellow}. Listar tareas pendientes` },
            { value: "5", name: `${"5".yellow}. Completar tarea(s)` },
            { value: "6", name: `${"6".yellow}. Borrar tarea` },
            { value: "0", name: `${"0".yellow}. Salir` },
        ],
    },
];

const inquirerMenu = async () => {
    console.clear();
    console.log("========================".green);
    console.log(" Seleccione una opción: ".white);
    console.log("========================\n".green);
    const prompt = inquirer.createPromptModule();
    const { opcion } = await prompt(menuOpts);
    return opcion;
};

const pausa = async () => {
    const question = [
        {
            type: "input",
            name: "enter",
            message: `Presione ${"ENTER".green} para continuar..`,
        },
    ];
    console.log("\n");
    const prompt = inquirer.createPromptModule();
    await prompt(question);
};

const leerInput = async (message) => {
    const question = [
        {
            type: "input",
            name: "desc",
            message,
            validate(value) {
                if (value.length === 0) {
                    return "Por favor, ingrese un valor";
                }
                return true;
            },
        },
    ];
    const prompt = inquirer.createPromptModule();
    const { desc } = await prompt(question);
    return desc;
};

const listadoTareasBorrar = async (tareas = []) => {
    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.description}`,
        };
    });

    choices.unshift({
        value: "0",
        name: "0.".green + " Cancelar",
    });

    const preguntas = [
        {
            type: "list",
            name: "id",
            message: "Borrar",
            choices,
        },
    ];
    const prompt = inquirer.createPromptModule();
    const { id } = await prompt(preguntas);
    return id;
};

const mostrarTareasChecklist = async (tareas = []) => {
    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.description}`,
            checked: (tarea.completadoEn) ? true : false
        };
    });

    const pregunta = [
        {
            type: "checkbox",
            name: "ids",
            message: "Seleccione",
            choices,
        },
    ];
    const prompt = inquirer.createPromptModule();
    const { ids } = await prompt(pregunta);
    return ids;
};

const confirmar = async (message) => {
    const question = [
        {
            type: "confirm",
            name: "ok",
            message,
        },
    ];
    const prompt = inquirer.createPromptModule();
    const { ok } = await prompt(question);
    return ok;
};

export { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarTareasChecklist };
