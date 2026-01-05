// services/api.ts - VERSIÓN COMPATIBLE CON AZURE
// Esta versión usa SOLO endpoints básicos que existen en Azure
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

    // ========================================
    // ACTUALIZAR PERFIL - USANDO PUT CON OBJETO COMPLETO
    // ========================================
    actualizar: async (idUsuario: number, datosActualizados: any) => {
      const url = `${BASE_URL}/Usuarios/${idUsuario}`;

      try {
        console.log('🔄 Paso 1: Obteniendo datos actuales del usuario...');
        const usuarioActual = await api.usuarios.obtenerPorId(idUsuario);

        if (!usuarioActual) {
          throw new Error('No se pudo obtener el usuario actual');
        }

        console.log('✅ Usuario actual obtenido:', usuarioActual.nombre);

        // Combinar datos actuales con los nuevos
        // IMPORTANTE: Mantener TODOS los campos del usuario
        const usuarioCompleto = {
          IdUsuario: usuarioActual.idUsuario,
          Nombre: datosActualizados.Nombre || datosActualizados.nombre || usuarioActual.nombre,
          Apellido: datosActualizados.Apellido || datosActualizados.apellido || usuarioActual.apellido,
          Matricula: usuarioActual.matricula,
          Correo: usuarioActual.correo,
          Contrasena: usuarioActual.contrasena, // ⚠️ MANTENER la contraseña actual
          Telefono: datosActualizados.Telefono || datosActualizados.telefono || usuarioActual.telefono,
          Genero: datosActualizados.Genero || datosActualizados.genero || usuarioActual.genero,
          Clabe: datosActualizados.Clabe || datosActualizados.clabe || usuarioActual.clabe,
          FotoPerfil: datosActualizados.FotoPerfil || datosActualizados.fotoPerfil || usuarioActual.fotoPerfil,
          Activo: usuarioActual.activo,
          FechaRegistro: usuarioActual.fechaRegistro,
        };

        console.log('🔄 Paso 2: Enviando actualización completa...');
        logRequest('PUT', url, usuarioCompleto);

        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(usuarioCompleto),
        });

        console.log(`📊 Response Status: ${response.status}`);
        console.log(`📊 Response Status Text: ${response.statusText}`);

        if (!response.ok) {
          let errorMessage = `Error ${response.status}`;

          try {
            const contentType = response.headers.get('content-type');

            if (contentType && contentType.includes('application/json')) {
              const errorData = await response.json();
              errorMessage = errorData.message || errorData.error || errorMessage;
            } else {
              const errorText = await response.text();
              errorMessage = errorText || errorMessage;
            }
          } catch (parseError) {
            console.error('❌ Error parseando respuesta de error:', parseError);
          }

          throw new Error(errorMessage);
        }

        // Manejar respuesta exitosa
        let data;
        if (response.status === 204) {
          console.log('✅ Actualización exitosa (204 No Content)');
          data = { success: true, message: 'Perfil actualizado correctamente' };
        } else {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const responseText = await response.text();
            if (responseText && responseText.trim() !== '') {
              data = JSON.parse(responseText);
            } else {
              data = { success: true, message: 'Perfil actualizado correctamente' };
            }
          } else {
            data = { success: true, message: 'Perfil actualizado correctamente' };
          }
        }

        logResponse(url, response.status, data);
        return data;
      } catch (error) {
        logError(url, error);
        throw error;
      }
    },

    // ========================================
    // CAMBIAR CONTRASEÑA - USANDO PUT CON OBJETO COMPLETO
    // ========================================
    cambiarContrasena: async (
      idUsuario: number,
      contrasenaActual: string,
      contrasenaNueva: string
    ) => {
      const url = `${BASE_URL}/Usuarios/${idUsuario}`;

      try {
        console.log('🔄 Paso 1: Obteniendo datos actuales del usuario...');
        const usuarioActual = await api.usuarios.obtenerPorId(idUsuario);

        if (!usuarioActual) {
          throw new Error('No se pudo obtener el usuario actual');
        }

        console.log('✅ Usuario actual obtenido:', usuarioActual.nombre);
        console.log('🔐 Verificando contraseña actual...');

        // Verificar contraseña actual EN EL FRONTEND
        if (usuarioActual.contrasena !== contrasenaActual) {
          console.log('❌ La contraseña actual es incorrecta');
          throw new Error('La contraseña actual es incorrecta');
        }

        console.log('✅ Contraseña actual verificada');

        // Validar nueva contraseña
        if (!contrasenaNueva || contrasenaNueva.trim() === '') {
          throw new Error('La nueva contraseña no puede estar vacía');
        }

        if (contrasenaNueva.length < 8) {
          throw new Error('La nueva contraseña debe tener al menos 8 caracteres');
        }

        // Crear objeto completo con la nueva contraseña
        const usuarioConNuevaContrasena = {
          IdUsuario: usuarioActual.idUsuario,
          Nombre: usuarioActual.nombre,
          Apellido: usuarioActual.apellido,
          Matricula: usuarioActual.matricula,
          Correo: usuarioActual.correo,
          Contrasena: contrasenaNueva, // ⚠️ ACTUALIZAR la contraseña
          Telefono: usuarioActual.telefono,
          Genero: usuarioActual.genero,
          Clabe: usuarioActual.clabe,
          FotoPerfil: usuarioActual.fotoPerfil,
          Activo: usuarioActual.activo,
          FechaRegistro: usuarioActual.fechaRegistro,
        };

        console.log('🔄 Paso 2: Enviando actualización de contraseña...');
        logRequest('PUT', url, { ...usuarioConNuevaContrasena, Contrasena: '***' });

        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(usuarioConNuevaContrasena),
        });

        console.log(`📊 Response Status: ${response.status}`);
        console.log(`📊 Response Status Text: ${response.statusText}`);

        if (!response.ok) {
          let errorMessage = 'Error al cambiar contraseña';

          try {
            const contentType = response.headers.get('content-type');

            if (contentType && contentType.includes('application/json')) {
              const errorData = await response.json();
              errorMessage = errorData.message || errorMessage;
            } else {
              const errorText = await response.text();
              errorMessage = errorText || errorMessage;
            }
          } catch (parseError) {
            console.error('❌ Error parseando respuesta de error:', parseError);
          }

          throw new Error(errorMessage);
        }

        // Manejar respuesta exitosa
        let data;
        if (response.status === 204) {
          console.log('✅ Contraseña actualizada (204 No Content)');
          data = {
            success: true,
            message: 'Contraseña actualizada correctamente'
          };
        } else {
          const contentType = response.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const responseText = await response.text();
            if (responseText && responseText.trim() !== '') {
              data = JSON.parse(responseText);
            } else {
              data = {
                success: true,
                message: 'Contraseña actualizada correctamente'
              };
            }
          } else {
            data = {
              success: true,
              message: 'Contraseña actualizada correctamente'
            };
          }
        }

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
        // Primero obtener el usuario completo
        const usuarioActual = await api.usuarios.obtenerPorId(idUsuario);

        if (!usuarioActual) {
          throw new Error('No se pudo obtener el usuario actual');
        }

        // Actualizar solo la foto
        const usuarioCompleto = {
          IdUsuario: usuarioActual.idUsuario,
          Nombre: usuarioActual.nombre,
          Apellido: usuarioActual.apellido,
          Matricula: usuarioActual.matricula,
          Correo: usuarioActual.correo,
          Contrasena: usuarioActual.contrasena,
          Telefono: usuarioActual.telefono,
          Genero: usuarioActual.genero,
          Clabe: usuarioActual.clabe,
          FotoPerfil: fotoBase64, // ⚠️ ACTUALIZAR foto
          Activo: usuarioActual.activo,
          FechaRegistro: usuarioActual.fechaRegistro,
        };

        logRequest('PUT', url, { ...usuarioCompleto, FotoPerfil: 'base64...' });

        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(usuarioCompleto),
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

  // SERVICIOS DE PRODUCTOS (Sin cambios)
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