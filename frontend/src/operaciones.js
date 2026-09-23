import { gql } from "@apollo/client";

export const OBTENER_USUARIOS = gql`
  query ObtenerUsuarios {
    usuarios {
      id
      nombre
      correo
      edad
    }
  }
`;

export const CREAR_USUARIO = gql`
  mutation CrearUsuario($input: UsuarioInput!) {
    crearUsuario(input: $input) {
      id
      nombre
      correo
      edad
    }
  }
`;

export const ACTUALIZAR_USUARIO = gql`
  mutation ActualizarUsuario($id: ID!, $input: UsuarioInput!) {
    actualizarUsuario(id: $id, input: $input) {
      id
      nombre
      correo
      edad
    }
  }
`;

export const ELIMINAR_USUARIO = gql`
  mutation EliminarUsuario($id: ID!) {
    eliminarUsuario(id: $id)
  }
`;
