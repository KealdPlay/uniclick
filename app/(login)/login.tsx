import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, router } from 'expo-router';
import React, { useState } from 'react';

import {
  ActivityIndicator // Importamos el Loader
  ,



  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import { styles } from '@/constants/loginStyle';
import { api } from '@/services/api'; // Importamos el servicio de API

export default function LoginScreen() {
  // Cambiamos 'email' por 'matricula' para ser consistentes con EL backend
  const [matricula, setMatricula] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    // Validaciones
    if (!matricula || !contrasena) {
      if (Platform.OS === 'web') {
        window.alert("Por favor ingresa tu matrícula y contraseña");
      } else {
        Alert.alert("Campos vacíos", "Por favor ingresa tu matrícula y contraseña");
      }
      return;
    }

    setIsLoading(true);

    try {
      console.log("Intentando login con:", matricula);
      
      // Llamamos a la api servicio de login
      const usuario = await api.usuarios.login(matricula, contrasena);

      if (usuario) {
        // LOGIN EXITOSO
        console.log("Login exitoso, bienvenido:", usuario.nombre);
        
        // Aquí podrías guardar el usuario en AsyncStorage si quisieras mantener sesión
        // Por ahora, solo navegamos al Home
        router.replace('/(tabs)/home'); 

      } else {
        // LOGIN FALLIDO
        if (Platform.OS === 'web') {
          window.alert("Credenciales incorrectas. Revisa tu matrícula o contraseña.");
        } else {
          Alert.alert("Error", "Matrícula o contraseña incorrectas.");
        }
      }

    } catch (error) {
      console.error(error);
      Alert.alert("Error de conexión", "No pudimos conectar con el servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require('@/assets/images/register_bg.png')}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
        blurRadius={Platform.OS === 'web' ? 0 : 2}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <GlassContainer>
              <View style={styles.glassContent}>
                <Text style={styles.title}>Inicie Sesión</Text>
                <Text style={styles.subtitle}>Ingrese con su cuenta</Text>

                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    // Ajustamos el placeholder para que sepan que es la matrícula
                    placeholder="Matrícula (Ej. 000000)" 
                    placeholderTextColor="#999"
                    value={matricula}
                    onChangeText={setMatricula}
                    keyboardType="default"
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    placeholderTextColor="#999"
                    value={contrasena}
                    onChangeText={setContrasena}
                    secureTextEntry
                  />
                </View>

                <TouchableOpacity 
                  style={styles.forgotButton}
                  onPress={() => router.push('/recuperacion')}
                >
                  <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.submitButton, isLoading && { opacity: 0.7 }]}
                  onPress={handleLogin} // <--- Conectamos la función
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.submitButtonText}>Continuar</Text>
                  )}
                </TouchableOpacity>

                <TouchableOpacity style={styles.registerButton}>
                  <Text style={styles.registerText}>
                    ¿Nuevo en la plataforma?{' '}
                    <Link href="/register" style={styles.registerHighlight}>
                      Regístrate
                    </Link>
                  </Text>
                </TouchableOpacity>
              </View>
            </GlassContainer>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}

const GlassContainer = ({ children, style }: any) => {
  if (Platform.OS === 'web') {
    return <View style={[styles.glassContainerWeb, style]}>{children}</View>;
  } else {
    return (
      <View style={[styles.glassContainer, style]}>
        <BlurView
          intensity={Platform.OS === 'ios' ? 80 : 100}
          tint="light"
          experimentalBlurMethod="dimezisBlurView"
          style={styles.glassEffect}
        />
        <View style={styles.glassColor} />
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.5)', 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.glassShine}
        />
        {children}
      </View>
    );
  }
};