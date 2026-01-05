// URL del Backend en Azure
const BASE_URL = 'https://uniclick-back-b2e7agdteab2hcam.eastus2-01.azurewebsites.net/api';

// Función auxiliar para logging detallado
const logRequest = (method: string, url: string, data?: any) => {
  console.log('='.repeat(50));
  console.log(`🌐 ${method} ${url}`);
  if (data) console.log('📦 Body:', JSON.stringify(data, null, 2));
  console.log('='.repeat(50));
};

const logResponse = (url: string, status: number, data?: any) => {
  console.log('='.repeat(50));
  console.log(`✅ Response from ${url}`);
  console.log(`📊 Status: ${status}`);
  if (data) console.log('📦 Data:', JSON.stringify(data, null, 2));
  console.log('='.repeat(50));
};

const logError = (url: string, error: any) => {
  console.error('='.repeat(50));
  console.error(`❌ Error en ${url}`);
  console.error('Tipo:', error.name);
  console.error('Mensaje:', error.message);
  if (error.response) {
    console.error('Status:', error.response.status);
    console.error('Data:', error.response.data);
  }
  console.error('='.repeat(50));
};

export const api = {
  usuarios: {
    // FUNCIÓN DE REGISTRO
    registrar: async (datosUsuario: any) => {
      const url = `${BASE_URL}/Usuarios`;
      try {
        logRequest('POST', url, datosUsuario);

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(datosUsuario),
        });

        const data = await response.json();
        logResponse(url, response.status, data);

        if (!response.ok) {
          throw new Error(data.message || 'Error en el registro');
        }

        return data;
      } catch (error) {
        logError(url, error);
        throw error;
      }
    },

    // FUNCIÓN DE LOGIN
    login: async (matricula: string, contrasena: string) => {
      const url = `${BASE_URL}/Usuarios`;
      try {
        logRequest('GET', url);

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("No se pudo conectar con el servidor");
        }

        const usuarios = await response.json();
        logResponse(url, response.status, { count: usuarios.length });

        const usuarioEncontrado = usuarios.find((u: any) =>
          u.matricula === matricula && u.contrasena === contrasena
        );

        if (!usuarioEncontrado) {
          console.log('❌ Usuario no encontrado con esas credenciales');
        } else {
          console.log('✅ Usuario encontrado:', usuarioEncontrado.nombre);
        }

        return usuarioEncontrado;
      } catch (error) {
        logError(url, error);
        throw error;
      }
    },

    // OBTENER USUARIO POR ID
    obtenerPorId: async (idUsuario: number) => {
      const url = `${BASE_URL}/Usuarios/${idUsuario}`;
      try {
        logRequest('GET', url);

        const response = await fetch(url, {
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
        logResponse(url, response.status, usuario);

        return usuario;
      } catch (error) {
        logError(url, error);
        throw error;
      }
    },

    // ACTUALIZAR PERFIL - VOLVER A PUT TEMPORALMENTE
    actualizar: async (idUsuario: number, datosActualizados: any) => {
      const url = `${BASE_URL}/Usuarios/${idUsuario}`;

      // Asegurar que los nombres de propiedades estén correctos
      const payload = {
        Nombre: datosActualizados.Nombre || datosActualizados.nombre,
        Apellido: datosActualizados.Apellido || datosActualizados.apellido,
        Telefono: datosActualizados.Telefono || datosActualizados.telefono,
        Genero: datosActualizados.Genero || datosActualizados.genero,
        Clabe: datosActualizados.Clabe || datosActualizados.clabe,
        FotoPerfil: datosActualizados.FotoPerfil || datosActualizados.fotoPerfil,
      };

      try {
        logRequest('PUT', url, payload);

        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        console.log(`📊 Response Status: ${response.status}`);
        console.log(`📊 Response Status Text: ${response.statusText}`);

        if (!response.ok) {
          let errorData;
          let errorText = '';

          try {
            errorText = await response.text();
            console.log('📄 Response Text:', errorText);

            try {
              errorData = JSON.parse(errorText);
            } catch {
              errorData = { message: errorText || `Error ${response.status}` };
            }
          } catch {
            errorData = { message: `Error ${response.status}: ${response.statusText}` };
          }

          throw new Error(errorData.message || "Error al actualizar");
        }

        const data = await response.json();
        logResponse(url, response.status, data);
        return data;
      } catch (error) {
        logError(url, error);
        throw error;
      }
    },

    // CAMBIAR CONTRASEÑA
    cambiarContrasena: async (
      idUsuario: number,
      contrasenaActual: string,
      contrasenaNueva: string
    ) => {
      const url = `${BASE_URL}/Usuarios/${idUsuario}/cambiar-contrasena`;
      const body = {
        ContrasenaActual: contrasenaActual,
        ContrasenaNueva: contrasenaNueva,
      };

      try {
        logRequest('POST', url, body);

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Error al cambiar contraseña");
        }

        const data = await response.json();
        logResponse(url, response.status, data);

        return data;
      } catch (error) {
        logError(url, error);
        throw error;
      }
    },

    // ACTUALIZAR FOTO DE PERFIL
    actualizarFotoPerfil: async (idUsuario: number, fotoBase64: string) => {
      const url = `${BASE_URL}/Usuarios/${idUsuario}`;
      try {
        logRequest('PUT', url, { FotoPerfil: 'base64...' });

        const response = await fetch(url, {
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

        logResponse(url, response.status);
        return { success: true };
      } catch (error) {
        logError(url, error);
        throw error;
      }
    },
  },

  // SERVICIOS DE PRODUCTOS
  productos: {
    obtenerTodos: async () => {
      const url = `${BASE_URL}/Productos`;
      try {
        logRequest('GET', url);

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener productos");
        }

        const productos = await response.json();
        logResponse(url, response.status, { count: productos.length });

        return productos;
      } catch (error) {
        logError(url, error);
        throw error;
      }
    },

    obtenerPorId: async (idProducto: number) => {
      const url = `${BASE_URL}/Productos/${idProducto}`;
      try {
        logRequest('GET', url);

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error("Producto no encontrado");
        }

        const producto = await response.json();
        logResponse(url, response.status, producto);

        return producto;
      } catch (error) {
        logError(url, error);
        throw error;
      }
    },

    crear: async (datosProducto: any) => {
      const url = `${BASE_URL}/Productos`;
      try {
        logRequest('POST', url, datosProducto);

        const response = await fetch(url, {
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

        const data = await response.json();
        logResponse(url, response.status, data);

        return data;
      } catch (error) {
        logError(url, error);
        throw error;
      }
    },

    actualizar: async (idProducto: number, datosActualizados: any) => {
      const url = `${BASE_URL}/Productos/${idProducto}`;
      try {
        logRequest('PUT', url, datosActualizados);

        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(datosActualizados),
        });

        if (!response.ok) {
          throw new Error("Error al actualizar producto");
        }

        logResponse(url, response.status);
        return { success: true };
      } catch (error) {
        logError(url, error);
        throw error;
      }
    },

    eliminar: async (idProducto: number) => {
      const url = `${BASE_URL}/Productos/${idProducto}`;
      try {
        logRequest('DELETE', url);

        const response = await fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error("Error al eliminar producto");
        }

        logResponse(url, response.status);
        return { success: true };
      } catch (error) {
        logError(url, error);
        throw error;
      }
    },

    buscar: async (query: string) => {
      try {
        console.log('🔎 Buscando productos:', query);
        const productos = await api.productos.obtenerTodos();

        if (!query.trim()) {
          return productos;
        }

        const queryLower = query.toLowerCase();
        const resultados = productos.filter((p: any) =>
          p.nombreProducto?.toLowerCase().includes(queryLower) ||
          p.descripcion?.toLowerCase().includes(queryLower) ||
          p.categoria?.toLowerCase().includes(queryLower)
        );

        console.log(`✅ ${resultados.length} productos encontrados`);
        return resultados;
      } catch (error) {
        console.error('❌ Error en búsqueda:', error);
        throw error;
      }
    },
  },
};