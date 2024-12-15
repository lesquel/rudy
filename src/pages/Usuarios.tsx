import { Component, createSignal, createEffect, For } from "solid-js";
import PouchDB from "pouchdb";

const db = new PouchDB("usuarios");

interface Usuario {
  _id?: string;
  _rev?: string;
  nombre: string;
}

const Usuarios: Component = () => {
  const [usuarios, setUsuarios] = createSignal<Usuario[]>([]);
  const [nombre, setNombre] = createSignal("");

  const cargarUsuarios = async () => {
    try {
      const result = await db.allDocs<Usuario>({ include_docs: true });
      setUsuarios(result.rows.map((row) => row.doc as Usuario));
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    }
  };

  const agregarUsuario = async () => {
    if (nombre()) {
      try {
        await db.post({ nombre: nombre() });
        setNombre("");
        cargarUsuarios();
      } catch (error) {
        console.error("Error al agregar usuario:", error);
      }
    }
  };

  const eliminarUsuario = async (id: string, rev: string) => {
    try {
      await db.remove({ _id: id, _rev: rev });
      cargarUsuarios();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  createEffect(() => {
    cargarUsuarios();
  });

  return (
    <div class="bg-white p-5">
      <h1 class="text-2xl font-bold mb-4">Gestión de Usuarios</h1>
      <div class="mb-4">
        <input
          type="text"
          placeholder="Nombre del usuario"
          value={nombre()}
          onInput={(e) => setNombre(e.currentTarget.value)}
          class="border p-2 mr-2"
        />
        <button
          onClick={agregarUsuario}
          class="bg-green-500 text-white px-4 py-2 rounded"
        >
          Agregar Usuario
        </button>
      </div>
      <ul class="space-y-2">
        <For each={usuarios()}>
          {(usuario) => (
            <li class="flex items-center justify-between bg-gray-100 p-2 rounded">
              <span>{usuario.nombre}</span>
              <button
                onClick={() => usuario._id && usuario._rev && eliminarUsuario(usuario._id, usuario._rev)}
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

export default Usuarios;

