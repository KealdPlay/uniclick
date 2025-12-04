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
    }
  },
};