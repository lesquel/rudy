import { Component, createSignal, createEffect, For } from "solid-js";
import PouchDB from "pouchdb";

const db = new PouchDB("procesos");

interface Proceso {
  _id?: string;
  _rev?: string;
  descripcion: string;
}

const Procesos: Component = () => {
  const [procesos, setProcesos] = createSignal<Proceso[]>([]);
  const [descripcion, setDescripcion] = createSignal("");

  const cargarProcesos = async () => {
    try {
      const result = await db.allDocs<Proceso>({ include_docs: true });
      setProcesos(result.rows.map((row) => row.doc as Proceso));
    } catch (error) {
      console.error("Error al cargar procesos:", error);
    }
  };

  const agregarProceso = async () => {
    if (descripcion()) {
      try {
        await db.post({ descripcion: descripcion() });
        setDescripcion("");
        cargarProcesos();
      } catch (error) {
        console.error("Error al agregar proceso:", error);
      }
    }
  };

  const eliminarProceso = async (id: string, rev: string) => {
    try {
      await db.remove({ _id: id, _rev: rev });
      cargarProcesos();
    } catch (error) {
      console.error("Error al eliminar proceso:", error);
    }
  };

  createEffect(() => {
    cargarProcesos();
  });

  return (
    <div class="bg-white p-5">
      <h1 class="text-2xl font-bold mb-4">Gestión de Procesos</h1>
      <div class="mb-4">
        <input
          type="text"
          placeholder="Descripción del proceso"
          value={descripcion()}
          onInput={(e) => setDescripcion(e.currentTarget.value)}
          class="border p-2 mr-2"
        />
        <button
          onClick={agregarProceso}
          class="bg-green-500 text-white px-4 py-2 rounded"
        >
          Agregar Proceso
        </button>
      </div>
      <ul class="space-y-2">
        <For each={procesos()}>
          {(proceso) => (
            <li class="flex items-center justify-between bg-gray-100 p-2 rounded">
              <span>{proceso.descripcion}</span>
              <button
                onClick={() => proceso._id && proceso._rev && eliminarProceso(proceso._id, proceso._rev)}
                class="bg-red-500 text-white px-2 py-1 rounded"
              >
                Eliminar
              </button>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
};

export default Procesos;

