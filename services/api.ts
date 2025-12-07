// services/api.ts
// URL del Backend en Azure
const BASE_URL = 'https://uniclick-back-b2e7agdteab2hcam.eastus2-01.azurewebsites.net/api';

export const api = {
  usuarios: {
    // ========================================
    // FUNCIÓN DE REGISTRO
    // ========================================
    registrar: async (datosUsuario: any) => {
      try {
        console.log("📡 Enviando registro a:", `${BASE_URL}/Usuarios`);
        const response = await fetch(`${BASE_URL}/Usuarios`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(datosUsuario),
        });
        return response;
      } catch (error) {
        console.error("Error en el registro:", error);
        throw error;
      }
    },

    // ========================================
    // FUNCIÓN DE LOGIN
    // ========================================
    login: async (correo: string, contrasena: string) => {
      try {
        console.log("🔍 Intentando login...");
        const response = await fetch(`${BASE_URL}/Usuarios/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Correo: correo,
            Contrasena: contrasena,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Error en el login");
        }

        const usuario = await response.json();
        return usuario;

      } catch (error) {
        console.error("Error en el login:", error);
        throw error;
      }
    },

    // ========================================
    // NUEVO: FUNCIÓN PARA OBTENER USUARIO POR MATRÍCULA
    // ========================================
    obtenerPorMatricula: async (matricula: string) => {
      try {
        console.log("🔍 Obteniendo usuario por matrícula:", matricula);
        const response = await fetch(`${BASE_URL}/Usuarios/matricula/${matricula}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Usuario no encontrado");
        }

        const usuario = await response.json();
        return usuario;

      } catch (error) {
        console.error("Error al obtener usuario:", error);
        throw error;
      }
    },

    // ========================================
    // FUNCIÓN PARA ACTUALIZAR PERFIL
    // ========================================
    actualizar: async (idUsuario: number, datosActualizados: any) => {
      try {
        console.log("📝 Actualizando usuario ID:", idUsuario);

        const response = await fetch(`${BASE_URL}/Usuarios/${idUsuario}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(datosActualizados),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Error al actualizar");
        }

        return response;

      } catch (error) {
        console.error("Error al actualizar usuario:", error);
        throw error;
      }
    },

    // ========================================
    // NUEVO: FUNCIÓN PARA CAMBIAR CONTRASEÑA
    // ========================================
    cambiarContrasena: async (
      idUsuario: number,
      contrasenaActual: string,
      contrasenaNueva: string
    ) => {
      try {
        console.log("🔐 Cambiando contraseña para usuario ID:", idUsuario);

        const response = await fetch(`${BASE_URL}/Usuarios/${idUsuario}/cambiar-contrasena`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ContrasenaActual: contrasenaActual,
            ContrasenaNueva: contrasenaNueva,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Error al cambiar contraseña");
        }

        return await response.json();

      } catch (error) {
        console.error("Error al cambiar contraseña:", error);
        throw error;
      }
    },

    // ========================================
    // FUNCIÓN PARA SUBIR FOTO DE PERFIL
    // ========================================
    actualizarFotoPerfil: async (idUsuario: number, fotoBase64: string) => {
      try {
        console.log("📸 Actualizando foto de perfil para usuario ID:", idUsuario);

        const response = await fetch(`${BASE_URL}/Usuarios/${idUsuario}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            FotoPerfil: fotoBase64,
          }),
        });

        if (!response.ok) {
          throw new Error("Error al actualizar foto");
        }

        return response;

      } catch (error) {
        console.error("Error al actualizar foto:", error);
        throw error;
      }
    },
  },
};