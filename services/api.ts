// URL del Backend en Azure
const BASE_URL = 'https://uniclick-back-b2e7agdteab2hcam.eastus2-01.azurewebsites.net/api';

export const api = {
  usuarios: {
    // FUNCIÓN DE REGISTRO
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

    // FUNCIÓN DE LOGIN
    login: async (matricula: string, contrasena: string) => {
      try {
        // Bajamos la lista de usuarios para buscar
        console.log("🔍 Buscando usuario...");
        const response = await fetch(`${BASE_URL}/Usuarios`);

        if (!response.ok) {
          throw new Error("No se pudo conectar con el servidor");
        }

        const usuarios = await response.json();

        // Buscamos si existe uno que coincida con matrícula Y contraseña
        // Nota: idealmente esto se hace en el servidor
        const usuarioEncontrado = usuarios.find((u: any) =>
          u.matricula === matricula && u.contrasena === contrasena
        );

        return usuarioEncontrado; // Si lo encuentra regresa el objeto, si no regresa undefined

      } catch (error) {
        console.error("Error en el login:", error);
        throw error;
      }
    },
    // ========================================
    // NUEVO: FUNCIÓN PARA OBTENER USUARIO POR ID
    // ========================================
    obtenerPorId: async (idUsuario: number) => {
      try {
        console.log("🔍 Obteniendo usuario por ID:", idUsuario);
        const response = await fetch(`${BASE_URL}/Usuarios/${idUsuario}`, {
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
  // ========================================
  // SERVICIOS DE PRODUCTOS
  // ========================================
  productos: {
    // Obtener todos los productos
    obtenerTodos: async () => {
      try {
        console.log("📦 Obteniendo todos los productos...");
        const response = await fetch(`${BASE_URL}/Productos`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener productos");
        }

        const productos = await response.json();
        return productos;

      } catch (error) {
        console.error("Error al obtener productos:", error);
        throw error;
      }
    },

    // Obtener producto por ID
    obtenerPorId: async (idProducto: number) => {
      try {
        console.log("🔍 Obteniendo producto ID:", idProducto);
        const response = await fetch(`${BASE_URL}/Productos/${idProducto}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error("Producto no encontrado");
        }

        const producto = await response.json();
        return producto;

      } catch (error) {
        console.error("Error al obtener producto:", error);
        throw error;
      }
    },

    // Crear nuevo producto
    crear: async (datosProducto: any) => {
      try {
        console.log("➕ Creando nuevo producto...");
        const response = await fetch(`${BASE_URL}/Productos`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(datosProducto),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Error al crear producto");
        }

        return await response.json();

      } catch (error) {
        console.error("Error al crear producto:", error);
        throw error;
      }
    },

    // Actualizar producto
    actualizar: async (idProducto: number, datosActualizados: any) => {
      try {
        console.log("📝 Actualizando producto ID:", idProducto);
        const response = await fetch(`${BASE_URL}/Productos/${idProducto}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(datosActualizados),
        });

        if (!response.ok) {
          throw new Error("Error al actualizar producto");
        }

        return response;

      } catch (error) {
        console.error("Error al actualizar producto:", error);
        throw error;
      }
    },

    // Eliminar producto
    eliminar: async (idProducto: number) => {
      try {
        console.log("🗑️ Eliminando producto ID:", idProducto);
        const response = await fetch(`${BASE_URL}/Productos/${idProducto}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error("Error al eliminar producto");
        }

        return response;

      } catch (error) {
        console.error("Error al eliminar producto:", error);
        throw error;
      }
    },

    // Buscar productos (filtrado del lado del cliente)
    buscar: async (query: string) => {
      try {
        console.log("🔎 Buscando productos:", query);
        const productos = await api.productos.obtenerTodos();

        if (!query.trim()) {
          return productos;
        }

        const queryLower = query.toLowerCase();
        return productos.filter((p: any) =>
          p.nombreProducto?.toLowerCase().includes(queryLower) ||
          p.descripcion?.toLowerCase().includes(queryLower) ||
          p.categoria?.toLowerCase().includes(queryLower)
        );

      } catch (error) {
        console.error("Error en búsqueda:", error);
        throw error;
      }
    },
  },
};