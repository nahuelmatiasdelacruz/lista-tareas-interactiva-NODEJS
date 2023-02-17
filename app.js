import {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarTareasChecklist
} from "./helpers/inquierer.js";
import { guardarDB, leerDB } from "./helpers/guardarArchivo.js";
import "colors";
import Tareas from "./models/tareas.js";
console.clear();

const main = async () => {
    const tareas = new Tareas();
    const tareasDB = await leerDB();
    let opt = "";
    if (tareasDB) {
        tareas.cargarTareasFromArray(tareasDB);
    }
    do {
        opt = await inquirerMenu();
        switch (opt) {
            case "1":
                const desc = await leerInput("Descripcion: ");
                tareas.crearTarea(desc);
                break;
            case "2":
                tareas.listadoCompleto();
                break;
            case "3":
                tareas.listarPendientesCompletadas(true);
                break;
            case "4":
                tareas.listarPendientesCompletadas(false);
                break;
            case "5":
                const ids = await mostrarTareasChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;
            case "6":
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id !== "0") {
                    const ok = await confirmar(
                        "¿Está seguro de que desea borrar la tarea?"
                    );
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log("Tarea borrada!");
                    }
                }
                break;
        }
        guardarDB(tareas.listadoArr);
        await pausa();
    } while (opt !== "0");
};

main();
