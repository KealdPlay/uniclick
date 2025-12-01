// app/verificacionView.tsx
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useRef, useState } from 'react';
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
export default function VerificacionScreen() {
    const { matricula } = useLocalSearchParams();
    const [code, setCode] = useState(['', '', '', '', '']);
    // Generar el email a partir de la matrícula recibida
    const [email] = useState(matricula ? `${matricula}@utags.edu.mx` : '000000@utags.edu.mx');
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
        console.log('Matrícula:', matricula);
        console.log('Email:', email);
        // Aquí iría la lógica de verificación
        router.push('/login');
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

