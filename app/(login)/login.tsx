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
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import { styles } from '@/constants/loginStyle';

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

