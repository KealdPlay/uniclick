// app/(tabs)/recuperacion.tsx
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function RecuperacionScreen() {
    const [email, setEmail] = useState('');

    const handleSendCode = () => {
        console.log('Enviando código a:', email);
        // Aquí iría la lógica para enviar el código
        // router.push('/verificacion');
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
                <TouchableOpacity style={styles.backButton}>
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
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 100,
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        padding: 24,
        paddingHorizontal: 32,
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
        padding: 32,
        position: 'relative',
        zIndex: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 34,
    },
    description: {
        fontSize: 15,
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 22,
    },
    emailInput: {
        width: '100%',
        height: 56,
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        borderRadius: 12,
        fontSize: 16,
        paddingHorizontal: 16,
        color: '#000',
        borderWidth: 0,
        marginBottom: 20,
    },
    sendButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
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
    sendButtonText: {
        fontSize: 17,
        fontWeight: '600',
        color: '#000',
    },
});