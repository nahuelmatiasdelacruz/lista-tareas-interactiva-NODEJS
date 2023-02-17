import Tarea from "./tarea.js";

class Tareas {
    listado = {
        "abc":123
    };

    get listadoArr() {
        const lista = [];
        Object.keys(this.listado).forEach(key => {
            const tarea = this.listado[key];
            lista.push(tarea);
        })
        return lista;
    }

    constructor(){
        this.listado = {};
    }
    borrarTarea(id=""){
        if(this.listado[id]){
            delete this.listado[id];
        }
    }
    cargarTareasFromArray(tareas){
        const tareasArr = Object.values(tareas);
        tareasArr.forEach(tarea=>{
            this.listado[tarea.id] = tarea;
        })
    }
    crearTarea(desc = ""){
        const tarea = new Tarea(desc);
        this.listado[tarea.id] = tarea;
    }
    listadoCompleto(){
        this.listadoArr.forEach((tarea,index)=>{
            const idx = `${index+1}`.green;
            const {description,completadoEn} = tarea;
            const estado = (completadoEn) ? `Completada`.green : `Pendiente`.red;
            console.log(`${idx} ${description} :: ${estado}`);
        });
    }
    listarPendientesCompletadas(completadas = true){
        let contador = 0;
        this.listadoArr.forEach(tarea=>{
            const {description,completadoEn} = tarea;
            const estado = (completadoEn) ? `Completada`.green : `Pendiente`.red;
            if(completadas){
                if(completadoEn){
                    contador += 1;
                    console.log(`${(contador.toString() + ".").green} ${description} :: ${estado}`);
                }
            }else{
                if(!completadoEn){
                    contador += 1;
                    console.log(`${(contador.toString() + ".").green} ${description} :: ${estado}`);
                }
            }
        });
    }
    toggleCompletadas(ids = []){
        ids.forEach(id => {
            const tarea = this.listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
        });
        this.listadoArr.forEach(tarea=>{
            if(!ids.includes(tarea.id)){
                this.listado[tarea.id].completadoEn = null;
            }
        })
    }
}

export default Tareas;