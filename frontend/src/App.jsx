import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import {
  ACTUALIZAR_USUARIO,
  CREAR_USUARIO,
  ELIMINAR_USUARIO,
  OBTENER_USUARIOS,
} from "./operaciones";
import "./App.css";

const formularioInicial = {
  nombre: "",
  correo: "",
  edad: "",
};

function App() {
  const [formulario, setFormulario] = useState(formularioInicial);
  const [idEdicion, setIdEdicion] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const { loading, error, data } = useQuery(OBTENER_USUARIOS);

  const [crearUsuario, { loading: creando }] = useMutation(CREAR_USUARIO, {
    refetchQueries: [{ query: OBTENER_USUARIOS }],
  });

  const [actualizarUsuario, { loading: actualizando }] = useMutation(
    ACTUALIZAR_USUARIO,
    {
      refetchQueries: [{ query: OBTENER_USUARIOS }],
    }
  );

  const [eliminarUsuario, { loading: eliminando }] = useMutation(
    ELIMINAR_USUARIO,
    {
      refetchQueries: [{ query: OBTENER_USUARIOS }],
    }
  );

  const manejarCambio = (evento) => {
    const nombreCampo = evento.target.name;
    const nuevoValor = evento.target.value;

    if (nombreCampo === "nombre") {
      setFormulario((estadoAnterior) => ({
        ...estadoAnterior,
        nombre: nuevoValor,
      }));
    }

    if (nombreCampo === "correo") {
      setFormulario((estadoAnterior) => ({
        ...estadoAnterior,
        correo: nuevoValor,
      }));
    }

    if (nombreCampo === "edad") {
      setFormulario((estadoAnterior) => ({
        ...estadoAnterior,
        edad: nuevoValor,
      }));
    }
  };

  const limpiarFormulario = () => {
    setFormulario(formularioInicial);
    setIdEdicion(null);
  };

  const manejarEnvio = async (evento) => {
    evento.preventDefault();
    setMensaje("");

    const input = {
      nombre: formulario.nombre.trim(),
      correo: formulario.correo.trim(),
      edad: Number(formulario.edad),
    };

    try {
      if (idEdicion) {
        await actualizarUsuario({
          variables: {
            id: idEdicion,
            input,
          },
        });

        setMensaje("Usuario actualizado correctamente.");
      } else {
        await crearUsuario({
          variables: {
            input,
          },
        });

        setMensaje("Usuario creado correctamente.");
      }

      limpiarFormulario();
    } catch (errorMutation) {
      setMensaje(`Error: ${errorMutation.message}`);
    }
  };

  const prepararEdicion = (usuario) => {
    setIdEdicion(usuario.id);

    setFormulario({
      nombre: usuario.nombre,
      correo: usuario.correo,
      edad: String(usuario.edad),
    });

    setMensaje("");
  };

  const manejarEliminacion = async (id) => {
    const confirmar = window.confirm(
      "¿Estás seguro de que deseas eliminar este usuario?"
    );

    if (!confirmar) {
      return;
    }

    try {
      await eliminarUsuario({
        variables: { id },
      });

      if (idEdicion === id) {
        limpiarFormulario();
      }

      setMensaje("Usuario eliminado correctamente.");
    } catch (errorMutation) {
      setMensaje(`Error: ${errorMutation.message}`);
    }
  };

  if (loading) {
    return <p className="estado">Cargando usuarios...</p>;
  }

  if (error) {
    return (
      <div className="estado error">
        <h2>No fue posible consultar los usuarios</h2>
        <p>{error.message}</p>
        <p>Comprueba que el backend esté activo en el puerto 4000.</p>
      </div>
    );
  }

  return (
    <main className="contenedor">
      <header className="encabezado">
        <p className="etiqueta">React + Apollo Client + GraphQL</p>
        <h1>Administración de usuarios</h1>
        <p>CRUD conectado con MariaDB mediante una API GraphQL.</p>
      </header>

      <section className="panel">
        <h2>{idEdicion ? "Editar usuario" : "Registrar usuario"}</h2>

        <form className="formulario" onSubmit={manejarEnvio}>
          <label>
            Nombre
            <input
              type="text"
              name="nombre"
              value={formulario.nombre}
              onChange={manejarCambio}
              required
            />
          </label>

          <label>
            Correo
            <input
              type="email"
              name="correo"
              value={formulario.correo}
              onChange={manejarCambio}
              required
            />
          </label>

          <label>
            Edad
            <input
              type="number"
              name="edad"
              value={formulario.edad}
              onChange={manejarCambio}
              min="1"
              required
            />
          </label>

          <div className="acciones-formulario">
            <button
              type="submit"
              disabled={creando || actualizando || eliminando}
            >
              {idEdicion ? "Guardar cambios" : "Crear usuario"}
            </button>

            {idEdicion && (
              <button
                type="button"
                className="secundario"
                onClick={limpiarFormulario}
              >
                Cancelar edición
              </button>
            )}
          </div>
        </form>

        {mensaje && <p className="mensaje">{mensaje}</p>}
      </section>

      <section className="panel">
        <div className="titulo-listado">
          <h2>Usuarios registrados</h2>
          <span>{data.usuarios.length} usuarios</span>
        </div>

        {data.usuarios.length === 0 ? (
          <p>No hay usuarios registrados.</p>
        ) : (
          <div className="tabla-contenedor">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Edad</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {data.usuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>{usuario.id}</td>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.correo}</td>
                    <td>{usuario.edad}</td>

                    <td className="acciones-tabla">
                      <button
                        type="button"
                        className="editar"
                        onClick={() => prepararEdicion(usuario)}
                      >
                        Editar
                      </button>

                      <button
                        type="button"
                        className="eliminar"
                        onClick={() => manejarEliminacion(usuario.id)}
                        disabled={eliminando}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;