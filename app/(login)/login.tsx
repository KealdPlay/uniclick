// app/login.tsx
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, router } from 'expo-router';
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

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');

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
                    placeholder="000000@utags.edu.mx"
                    placeholderTextColor="#999"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
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

                <TouchableOpacity style={styles.submitButton}
                onPress={() => router.push('../(tabs)/home')}
                >
                  <Text style={styles.submitButtonText}>Continuar</Text>
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
  glassContainer: {
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 20,
  },
  glassContainerWeb: {
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
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
    top: 0, left: 0, right: 0, bottom: 0,
  },
  glassColor: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
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
    padding: 28,
    position: 'relative',
    zIndex: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 14,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 12,
    padding: 15,
    fontSize: 15,
    color: '#333',
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginTop: -4,
    marginBottom: 20,
  },
  forgotText: {
    fontSize: 13,
    color: '#444',
    textDecorationLine: 'underline',
  },
  submitButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },
  registerButton: {
    marginTop: 18,
    alignItems: 'center',
  },
  registerText: {
    fontSize: 14,
    color: '#333',
  },
  registerHighlight: {
    fontWeight: 'bold',
  },
});