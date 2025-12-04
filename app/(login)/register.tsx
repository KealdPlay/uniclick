import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
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
import { api } from '@/services/api';

export default function RegistroScreen() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    genero: '',
    matricula: '',
    contrasena: '',
    celular: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showGeneroOptions, setShowGeneroOptions] = useState(false);
  const generoOptions = ['Masculino', 'Femenino', 'Otro', 'Prefiero no decir'];

  const handleSubmit = async () => {
    // Validaciones básicas
    if (!formData.nombre || !formData.matricula || !formData.contrasena) {
      if (Platform.OS === 'web') {
        window.alert("Campos incompletos: Por favor llena todos los campos obligatorios.");
      } else {
        Alert.alert("Campos incompletos", "Por favor llena al menos nombre, matrícula y contraseña.");
      }
      return;
    }

    setIsLoading(true);

    try {
      const datosParaElBack = {
        Nombre: formData.nombre,
        Apellido: formData.apellidos, 
        Matricula: formData.matricula,
        Correo: `${formData.matricula}@utags.edu.mx`, 
        Contrasena: formData.contrasena,
        Telefono: formData.celular,
        Genero: formData.genero,
        Activo: true
      };

      const response = await api.usuarios.registrar(datosParaElBack);

      if (response.ok) {
        const data = await response.json();
        
        if (Platform.OS === 'web') {
          window.alert("¡Éxito! Tu cuenta ha sido creada correctamente.");
        } else {
          Alert.alert("¡Éxito!", "Tu cuenta ha sido creada correctamente.");
        }
        
        // Navegar a verificación
        router.push({
          pathname: '/verificacionView',
          params: { matricula: formData.matricula }
        });

      } else {
        const errorData = await response.text();
        if (Platform.OS === 'web') {
          window.alert("No se pudo registrar. Es posible que la matrícula ya exista.");
        } else {
          Alert.alert("Error al registrar", "Es posible que la matrícula ya exista o hubo un error en el servidor.");
        }
      }

    } catch (error) {
      console.error(error);
      if (Platform.OS === 'web') {
        window.alert("Error de conexión. Revisa tu internet.");
      } else {
        Alert.alert("Error de conexión", "No pudimos conectar con el servidor. Revisa tu internet.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.push('/login');
  };

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require('@/assets/images/register_bg.png')}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
        blurRadius={Platform.OS === 'web' ? 0 : 3}>
        
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="chevron-back" size={32} color="#fff" />
        </TouchableOpacity>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            bounces={false}>

            <GlassContainer>
              <View style={styles.glassContent}>
                <Text style={styles.title}>Registro</Text>
                <Text style={styles.subtitle}>Ingrese sus datos</Text>

                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Nombre(s)"
                    placeholderTextColor="#999"
                    value={formData.nombre}
                    onChangeText={(text) => setFormData({ ...formData, nombre: text })}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Apellidos"
                    placeholderTextColor="#999"
                    value={formData.apellidos}
                    onChangeText={(text) => setFormData({ ...formData, apellidos: text })}
                  />
                </View>

                {/* SELECT DE GÉNERO */}
                <View style={[styles.inputContainer, showGeneroOptions && styles.inputContainerActive]}>
                  <TouchableOpacity
                    style={styles.selectButton}
                    onPress={() => setShowGeneroOptions(!showGeneroOptions)}>
                    <Text style={formData.genero ? styles.selectedText : styles.placeholderText}>
                      {formData.genero || 'Género'}
                    </Text>
                    <Text style={styles.chevron}>▼</Text>
                  </TouchableOpacity>

                  {showGeneroOptions && (
                    <View style={styles.optionsWrapper}>
                        <View style={styles.optionsContent}>
                           {generoOptions.map((option, index) => (
                             <TouchableOpacity
                               key={option}
                               style={[styles.option, index < generoOptions.length - 1 && styles.optionBorder]}
                               onPress={() => {
                                 setFormData({ ...formData, genero: option });
                                 setShowGeneroOptions(false);
                               }}>
                               <Text style={styles.optionText}>{option}</Text>
                             </TouchableOpacity>
                           ))}
                        </View>
                    </View>
                  )}
                </View>

                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Matrícula"
                    placeholderTextColor="#999"
                    value={formData.matricula}
                    onChangeText={(text) => setFormData({ ...formData, matricula: text })}
                    keyboardType="default"
                    autoCapitalize="none"
                  />
                </View>

                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    placeholderTextColor="#999"
                    value={formData.contrasena}
                    onChangeText={(text) => setFormData({ ...formData, contrasena: text })}
                    secureTextEntry
                  />
                </View>

                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Número de Celular"
                    placeholderTextColor="#999"
                    value={formData.celular}
                    onChangeText={(text) => setFormData({ ...formData, celular: text })}
                    keyboardType="phone-pad"
                  />
                </View>

                <TouchableOpacity 
                    style={[styles.submitButton, isLoading && { opacity: 0.7 }]}
                    onPress={handleSubmit}
                    disabled={isLoading}
                >
                  {isLoading ? (
                      <ActivityIndicator color="#fff" />
                  ) : (
                      <Text style={styles.submitButtonText}>Continuar</Text>
                  )}
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
    return (
      <View style={[styles.glassContainerWeb, style]}>
        {children}
      </View>
    );
  } else if (Platform.OS === 'ios') {
    return (
      <View style={[styles.glassContainer, style]}>
        <BlurView 
          intensity={80} 
          tint="light"
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
  } else {
    return (
      <View style={[styles.glassContainerAndroid, style]}>
        <LinearGradient
          colors={[
            'rgba(255, 255, 255, 0.4)',
            'rgba(255, 255, 255, 0.25)',
            'rgba(255, 255, 255, 0.35)',
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.glassGradient}
        />
        <View style={styles.glassOverlay} />
        <LinearGradient
          colors={['rgba(255, 255, 255, 0.6)', 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.glassShineAndroid}
        />
        {children}
      </View>
    );
  }
};