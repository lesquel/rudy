import { Outlet } from "solid-app-router";
import type { Component } from "solid-js";
import { Link } from "solid-app-router";

const Home: Component = () => {
  return (
    <div class="bg-white p-5">
      <h1 class="text-2xl font-bold mb-4">Gestión de Usuarios y Procesos</h1>
      <nav class="mb-4">
        <Link href="/usuarios" class="bg-green-500 text-white px-4 py-2 rounded mr-2">
          Gestión de Usuarios
        </Link>
        <Link href="/procesos" class="bg-green-500 text-white px-4 py-2 rounded">
          Gestión de Procesos
        </Link>
      </nav>
      <Outlet />
    </div>
  );
};

export default Home;

