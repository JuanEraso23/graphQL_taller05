const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const { buildSchema } = require("graphql");
const { createHandler } = require("graphql-http/lib/use/express");
const { ruruHTML } = require("ruru/server");

const app = express();
const PORT = 4000;

// Permite solicitudes desde el frontend de React.
app.use(cors());

// Configuración de la conexión con MariaDB de XAMPP.
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "graphql_taller05",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Definición del esquema GraphQL.
const schema = buildSchema(`
  type Usuario {
    id: ID!
    nombre: String!
    correo: String!
    edad: Int!
  }

  input UsuarioInput {
    nombre: String!
    correo: String!
    edad: Int!
  }

  type Query {
    usuarios: [Usuario!]!
    usuario(id: ID!): Usuario
  }

  type Mutation {
    crearUsuario(input: UsuarioInput!): Usuario!
    actualizarUsuario(id: ID!, input: UsuarioInput!): Usuario
    eliminarUsuario(id: ID!): Boolean!
  }
`);

// Funciones que atienden las consultas y mutaciones.
const root = {
  usuarios: async () => {
    const [filas] = await pool.query(
      "SELECT id, nombre, correo, edad FROM usuarios ORDER BY id"
    );

    return filas;
  },

  usuario: async ({ id }) => {
    const [filas] = await pool.execute(
      "SELECT id, nombre, correo, edad FROM usuarios WHERE id = ?",
      [id]
    );

    return filas[0] || null;
  },

  crearUsuario: async ({ input }) => {
    const { nombre, correo, edad } = input;

    const [resultado] = await pool.execute(
      "INSERT INTO usuarios (nombre, correo, edad) VALUES (?, ?, ?)",
      [nombre, correo, edad]
    );

    return {
      id: resultado.insertId,
      nombre,
      correo,
      edad,
    };
  },

  actualizarUsuario: async ({ id, input }) => {
    const { nombre, correo, edad } = input;

    const [resultado] = await pool.execute(
      `UPDATE usuarios
       SET nombre = ?, correo = ?, edad = ?
       WHERE id = ?`,
      [nombre, correo, edad, id]
    );

    if (resultado.affectedRows === 0) {
      return null;
    }

    return {
      id,
      nombre,
      correo,
      edad,
    };
  },

  eliminarUsuario: async ({ id }) => {
    const [resultado] = await pool.execute(
      "DELETE FROM usuarios WHERE id = ?",
      [id]
    );

    return resultado.affectedRows > 0;
  },
};

// Endpoint de la API GraphQL.
app.all(
  "/graphql",
  createHandler({
    schema,
    rootValue: root,
  })
);

// Interfaz gráfica Ruru para probar GraphQL.
app.get("/", (_req, res) => {
  res.type("html");
  res.send(
    ruruHTML({
      endpoint: "/graphql",
    })
  );
});

// Comprueba la conexión antes de iniciar el servidor.
async function iniciarServidor() {
  try {
    const conexion = await pool.getConnection();
    console.log("Conexión exitosa con MariaDB.");
    conexion.release();

    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
      console.log(`API GraphQL disponible en http://localhost:${PORT}/graphql`);
    });
  } catch (error) {
    console.error("No fue posible conectar con MariaDB.");
    console.error(error.message);
    process.exit(1);
  }
}

iniciarServidor();