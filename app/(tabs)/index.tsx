// app/(tabs)/index.tsx
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

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
    // Aquí iría la lógica de registro
    // router.push('/(tabs)');
  };

  const handleBack = () => {
    router.back();
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
    } else {
      // Para iOS/Android: Usamos BlurView nativo
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

  return (
    <View style={styles.mainContainer}>
      {/* Botón de regreso */}
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text style={styles.backButtonText}>‹</Text>
      </TouchableOpacity>

      <ImageBackground
        source={require('@/assets/images/register_bg.png')}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
        blurRadius={Platform.OS === 'web' ? 0 : 2}>
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
                      <GlassContainer style={styles.optionsGlassContainer}>
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
                      </GlassContainer>
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

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#E8F0F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: '100%',
    maxWidth: 500,
    height: '95%',
    maxHeight: 850,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  backgroundImageStyle: {
    borderRadius: 24,
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    paddingHorizontal: 32,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 24,
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: 'rgba(80, 120, 120, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  backButtonText: {
    fontSize: 36,
    color: '#FFF',
    fontWeight: '300',
    marginTop: -6,
  },
  // === GLASS CONTAINER NATIVO (iOS/Android) ===
  glassContainer: {
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 20,
  },
  // === GLASS CONTAINER WEB (con backdrop-filter CSS) ===
  glassContainerWeb: {
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    ...Platform.select({
      web: {
        backdropFilter: 'blur(7px) saturate(220%)',
        WebkitBackdropFilter: 'blur(7px) saturate(220%)',
      } as any,
    }),
  },
  glassEffect: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  glassColor: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  glassShine: {
    position: 'absolute',
    top: -100,
    left: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    opacity: 0.15,
  },
  glassContent: {
    padding: 24,
    position: 'relative',
    zIndex: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 14,
    position: 'relative',
    zIndex: 1,
  },
  inputContainerActive: {
    zIndex: 100,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 12,
    padding: 15,
    fontSize: 15,
    color: '#333',
    borderWidth: 0,
  },
  selectButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0,
  },
  placeholderText: {
    fontSize: 15,
    color: '#999',
  },
  selectedText: {
    fontSize: 15,
    color: '#000',
  },
  chevron: {
    fontSize: 12,
    color: '#0066CC',
    fontWeight: 'bold',
  },
  optionsWrapper: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    zIndex: 200,
  },
  optionsGlassContainer: {
    marginTop: 6,
  },
  optionsContent: {
    position: 'relative',
    zIndex: 10,
  },
  option: {
    padding: 15,
  },
  optionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.3)',
  },
  optionText: {
    fontSize: 15,
    color: '#000',
  },
  submitButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginTop: 8,
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },
});