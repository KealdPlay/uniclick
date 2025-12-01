// app/register.tsx
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
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

export default function RegistroScreen() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    genero: '',
    matricula: '',
    contrasena: '',
    celular: '',
  });

  const [showGeneroOptions, setShowGeneroOptions] = useState(false);

  const generoOptions = ['Masculino', 'Femenino', 'Otro', 'Prefiero no decir'];

  const handleSubmit = () => {
    console.log('Datos del formulario:', formData);
    // Aquí iría la lógica de registro (validación, envío al backend, etc.)
    router.push({
      pathname: '/verificacionView',
      params: { matricula: formData.matricula }
    });
  };

  const handleBack = () => {
    router.push('/login');
  };

  // Componente Glass Container que funciona en web y nativo
  const GlassContainer = ({ children, style }: any) => {
    if (Platform.OS === 'web') {
      // Para WEB: Usamos CSS backdrop-filter
      return (
        <View style={[styles.glassContainerWeb, style]}>
          {children}
        </View>
      );
    } else if (Platform.OS === 'ios') {
      // Para iOS: Usamos BlurView nativo (funciona perfecto)
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
      // Para Android: Sin blur, efecto glassmorphism con gradientes y transparencia
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

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        source={require('@/assets/images/register_bg.png')}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
        blurRadius={Platform.OS === 'web' ? 0 : 3}>

        {/* Botón de regreso */}
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

            {/* Glass Container con soporte web y nativo */}
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
                      {Platform.OS === 'web' ? (
                        <View style={styles.optionsGlassContainerWeb}>
                          <View style={styles.optionsContent}>
                            {generoOptions.map((option, index) => (
                              <TouchableOpacity
                                key={option}
                                style={[
                                  styles.option,
                                  index < generoOptions.length - 1 && styles.optionBorder
                                ]}
                                onPress={() => {
                                  setFormData({ ...formData, genero: option });
                                  setShowGeneroOptions(false);
                                }}>
                                <Text style={styles.optionText}>{option}</Text>
                              </TouchableOpacity>
                            ))}
                          </View>
                        </View>
                      ) : Platform.OS === 'ios' ? (
                        <View style={styles.optionsGlassContainerIOS}>
                          <BlurView
                            intensity={95}
                            tint="light"
                            style={styles.optionsBlur}
                          />
                          <View style={styles.optionsContent}>
                            {generoOptions.map((option, index) => (
                              <TouchableOpacity
                                key={option}
                                style={[
                                  styles.option,
                                  index < generoOptions.length - 1 && styles.optionBorder
                                ]}
                                onPress={() => {
                                  setFormData({ ...formData, genero: option });
                                  setShowGeneroOptions(false);
                                }}>
                                <Text style={styles.optionText}>{option}</Text>
                              </TouchableOpacity>
                            ))}
                          </View>
                        </View>
                      ) : (
                        <View style={styles.optionsGlassContainerAndroid}>
                          <LinearGradient
                            colors={[
                              'rgba(255, 255, 255, 0.75)',
                              'rgba(245, 245, 245, 0.85)',
                            ]}
                            style={styles.optionsGradientAndroid}
                          />
                          <View style={styles.optionsContent}>
                            {generoOptions.map((option, index) => (
                              <TouchableOpacity
                                key={option}
                                style={[
                                  styles.option,
                                  index < generoOptions.length - 1 && styles.optionBorder
                                ]}
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
                  )}
                </View>

                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Matrícula (asignación de correo electrónico)"
                    placeholderTextColor="#999"
                    value={formData.matricula}
                    onChangeText={(text) => setFormData({ ...formData, matricula: text })}
                    keyboardType="email-address"
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

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                  <Text style={styles.submitButtonText}>Continuar</Text>
                </TouchableOpacity>
              </View>
            </GlassContainer>
          </ScrollView>
        </KeyboardAvoidingView>
      </ImageBackground>
    </View>
  );
}

