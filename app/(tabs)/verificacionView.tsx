// app/(tabs)/verificacion.tsx
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useRef, useState } from 'react';
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

export default function VerificacionScreen() {
    const [code, setCode] = useState(['', '', '', '', '']);
    const [email] = useState('000000@utags.edu.mx'); // Este vendría de la pantalla anterior
    const inputRefs = useRef<(TextInput | null)[]>([]);

    const handleCodeChange = (text: string, index: number) => {
        // Solo permitir números
        if (text && !/^\d+$/.test(text)) return;

        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);

        // Auto-avanzar al siguiente campo
        if (text && index < 4) {
        inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        // Si presiona backspace y el campo está vacío, ir al anterior
        if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerify = () => {
        const fullCode = code.join('');
        console.log('Código ingresado:', fullCode);
        // Aquí iría la lógica de verificación
        // router.push('/(tabs)');
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
            <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            
            <View style={styles.content}>
                <GlassContainer>
                <View style={styles.glassContent}>
                    <Text style={styles.title}>Verificación</Text>
                    
                    <Text style={styles.description}>
                    Se envió un código de 5 dígitos al correo{'\n'}
                    <Text style={styles.email}>{email}</Text>.{'\n'}
                    Ingréselo a continuación:
                    </Text>

                    <View style={styles.codeContainer}>
                    {code.map((digit, index) => (
                        <TextInput
                        key={index}
                        ref={(ref) => {
                            if (ref) {
                            inputRefs.current[index] = ref;
                            }
                        }}
                        style={styles.codeInput}
                        value={digit}
                        onChangeText={(text) => handleCodeChange(text, index)}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                        keyboardType="number-pad"
                        maxLength={1}
                        selectTextOnFocus
                        />
                    ))}
                    </View>

                    <TouchableOpacity 
                    style={styles.verifyButton} 
                    onPress={handleVerify}>
                    <Text style={styles.verifyButtonText}>Verificar</Text>
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
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        marginBottom: 20,
    },
    description: {
        fontSize: 14,
        color: '#333',
        textAlign: 'center',
        marginBottom: 32,
        lineHeight: 20,
    },
    email: {
        color: '#000',
        fontWeight: '600',
    },
    codeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 12,
        marginBottom: 32,
    },
    codeInput: {
        width: 50,
        height: 60,
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        borderRadius: 12,
        fontSize: 24,
        fontWeight: '600',
        textAlign: 'center',
        color: '#000',
        borderWidth: 0,
    },
    verifyButton: {
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
    verifyButtonText: {
        fontSize: 17,
        fontWeight: '600',
        color: '#000',
    },
    });