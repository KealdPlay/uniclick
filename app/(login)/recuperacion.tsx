// app/recuperacion.tsx
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import { styles } from '@/constants/loginStyle';
export default function RecuperacionScreen() {
    const [email, setEmail] = useState('');

    const handleSendCode = () => {
        console.log('Enviando código a:', email);
        // Aquí iría la lógica para enviar el código
        // Extrae la matrícula del email (la parte antes de @)
        const matricula = email.split('@')[0];
        router.push({
            pathname: '/verificacionView',
            params: { matricula }
        });
    };

    // Componente Glass Container que funciona en web y nativo
    const GlassContainer = ({ children, style }: any) => {
        if (Platform.OS === 'web') {
            return (
                <View style={[styles.glassContainerWeb, style]}>
                    {children}
                </View>
            );
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
                blurRadius={Platform.OS === 'web' ? 0 : 2}>

                {/* Botón de regreso */}
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.push('/login')}
                >
                    <Ionicons name="chevron-back" size={32} color="#fff" />
                </TouchableOpacity>

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.container}>

                    <View style={styles.content}>
                        <GlassContainer>
                            <View style={styles.glassContent}>
                                <Text style={styles.title}>Recuperación de contraseña</Text>

                                <Text style={styles.description}>
                                    Ingrese su correo electrónico:
                                </Text>

                                <TextInput
                                    style={styles.emailInput}
                                    value={email}
                                    onChangeText={setEmail}
                                    placeholder="000000@utags.edu.mx"
                                    placeholderTextColor="rgba(0, 0, 0, 0.4)"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />

                                <TouchableOpacity
                                    style={styles.sendButton}
                                    onPress={handleSendCode}>
                                    <Text style={styles.sendButtonText}>Enviar código de verificación</Text>
                                </TouchableOpacity>
                            </View>
                        </GlassContainer>
                    </View>

                </KeyboardAvoidingView>
            </ImageBackground>
        </View>
    );
}

