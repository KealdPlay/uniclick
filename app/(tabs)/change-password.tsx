// app/change-password.tsx
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { styles } from '@/constants/changePasswordStyle';
import { api } from '@/services/api';

export default function ChangePasswordScreen() {
    const params = useLocalSearchParams();
    const idUsuario = params.idUsuario ? parseInt(params.idUsuario as string) : 0;

    const [formData, setFormData] = useState({
        contrasenaActual: '',
        contrasenaNueva: '',
        confirmarContrasena: '',
    });

    const [showPasswords, setShowPasswords] = useState({
        actual: false,
        nueva: false,
        confirmar: false,
    });

    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({
        contrasenaActual: '',
        contrasenaNueva: '',
        confirmarContrasena: '',
    });

    // Validación de fortaleza de contraseña
    const validatePasswordStrength = (password: string): { valid: boolean; message: string } => {
        if (password.length < 8) {
            return { valid: false, message: 'Mínimo 8 caracteres' };
        }
        if (!/[A-Z]/.test(password)) {
            return { valid: false, message: 'Debe contener al menos una mayúscula' };
        }
        if (!/[a-z]/.test(password)) {
            return { valid: false, message: 'Debe contener al menos una minúscula' };
        }
        if (!/[0-9]/.test(password)) {
            return { valid: false, message: 'Debe contener al menos un número' };
        }
        return { valid: true, message: 'Contraseña segura' };
    };

    const handleChangePassword = async () => {
        // Limpiar errores previos
        setErrors({
            contrasenaActual: '',
            contrasenaNueva: '',
            confirmarContrasena: '',
        });

        let hasErrors = false;
        const newErrors = { ...errors };

        // Validación: Campos vacíos
        if (!formData.contrasenaActual) {
            newErrors.contrasenaActual = 'Campo requerido';
            hasErrors = true;
        }

        if (!formData.contrasenaNueva) {
            newErrors.contrasenaNueva = 'Campo requerido';
            hasErrors = true;
        }

        if (!formData.confirmarContrasena) {
            newErrors.confirmarContrasena = 'Campo requerido';
            hasErrors = true;
        }

        // Validación: Contraseñas nuevas coinciden
        if (formData.contrasenaNueva !== formData.confirmarContrasena) {
            newErrors.confirmarContrasena = 'Las contraseñas no coinciden';
            hasErrors = true;
        }

        // Validación: Contraseña nueva es diferente a la actual
        if (formData.contrasenaActual === formData.contrasenaNueva) {
            newErrors.contrasenaNueva = 'Debe ser diferente a la actual';
            hasErrors = true;
        }

        // Validación: Fortaleza de contraseña
        const strengthCheck = validatePasswordStrength(formData.contrasenaNueva);
        if (!strengthCheck.valid && formData.contrasenaNueva) {
            newErrors.contrasenaNueva = strengthCheck.message;
            hasErrors = true;
        }

        if (hasErrors) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);

        try {
            await api.usuarios.cambiarContrasena(
                idUsuario,
                formData.contrasenaActual,
                formData.contrasenaNueva
            );

            if (Platform.OS === 'web') {
                window.alert('Contraseña actualizada correctamente');
            } else {
                Alert.alert(
                    '¡Éxito!',
                    'Tu contraseña ha sido actualizada correctamente',
                    [
                        {
                            text: 'Aceptar',
                            onPress: () => router.back(),
                        },
                    ]
                );
            }

            // Volver a la pantalla anterior
            if (Platform.OS === 'web') {
                router.back();
            }
        } catch (error: any) {
            console.error('Error:', error);

            // Manejar errores específicos
            let errorMessage = 'No se pudo cambiar la contraseña';

            if (error.message.includes('incorrecta')) {
                setErrors({
                    ...errors,
                    contrasenaActual: 'Contraseña actual incorrecta',
                });
                errorMessage = 'La contraseña actual es incorrecta';
            }

            if (Platform.OS === 'web') {
                window.alert(errorMessage);
            } else {
                Alert.alert('Error', errorMessage);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleBack = () => {
        router.back();
    };

    const getPasswordStrengthColor = (password: string): string => {
        if (!password) return '#D1D1D6';
        const strength = validatePasswordStrength(password);
        if (strength.valid) return '#34C759'; // Verde
        if (password.length >= 6) return '#FF9500'; // Naranja
        return '#FF3B30'; // Rojo
    };

    const getPasswordStrengthText = (password: string): string => {
        if (!password) return '';
        const strength = validatePasswordStrength(password);
        if (strength.valid) return '✓ Contraseña segura';
        return strength.message;
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}>

                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                        <Ionicons name="chevron-back" size={28} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Cambiar Contraseña</Text>
                    <View style={styles.placeholder} />
                </View>

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled">

                    <View style={styles.infoContainer}>
                        <Ionicons name="lock-closed-outline" size={48} color="#666" />
                        <Text style={styles.infoTitle}>Actualiza tu contraseña</Text>
                        <Text style={styles.infoText}>
                            Tu nueva contraseña debe tener al menos 8 caracteres e incluir
                            mayúsculas, minúsculas y números.
                        </Text>
                    </View>

                    <View style={styles.formContainer}>
                        {/* Contraseña Actual */}
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldLabel}>Contraseña actual</Text>
                            <View style={[
                                styles.inputWrapper,
                                errors.contrasenaActual && styles.inputError
                            ]}>
                                <TextInput
                                    style={styles.input}
                                    value={formData.contrasenaActual}
                                    onChangeText={(text) => {
                                        setFormData({ ...formData, contrasenaActual: text });
                                        if (errors.contrasenaActual) {
                                            setErrors({ ...errors, contrasenaActual: '' });
                                        }
                                    }}
                                    placeholder="Ingresa tu contraseña actual"
                                    placeholderTextColor="#999"
                                    secureTextEntry={!showPasswords.actual}
                                    autoCapitalize="none"
                                />
                                <TouchableOpacity
                                    style={styles.eyeButton}
                                    onPress={() =>
                                        setShowPasswords({ ...showPasswords, actual: !showPasswords.actual })
                                    }>
                                    <Ionicons
                                        name={showPasswords.actual ? 'eye-off-outline' : 'eye-outline'}
                                        size={22}
                                        color="#666"
                                    />
                                </TouchableOpacity>
                            </View>
                            {errors.contrasenaActual ? (
                                <Text style={styles.errorText}>{errors.contrasenaActual}</Text>
                            ) : null}
                        </View>

                        {/* Contraseña Nueva */}
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldLabel}>Nueva contraseña</Text>
                            <View style={[
                                styles.inputWrapper,
                                errors.contrasenaNueva && styles.inputError
                            ]}>
                                <TextInput
                                    style={styles.input}
                                    value={formData.contrasenaNueva}
                                    onChangeText={(text) => {
                                        setFormData({ ...formData, contrasenaNueva: text });
                                        if (errors.contrasenaNueva) {
                                            setErrors({ ...errors, contrasenaNueva: '' });
                                        }
                                    }}
                                    placeholder="Ingresa tu nueva contraseña"
                                    placeholderTextColor="#999"
                                    secureTextEntry={!showPasswords.nueva}
                                    autoCapitalize="none"
                                />
                                <TouchableOpacity
                                    style={styles.eyeButton}
                                    onPress={() =>
                                        setShowPasswords({ ...showPasswords, nueva: !showPasswords.nueva })
                                    }>
                                    <Ionicons
                                        name={showPasswords.nueva ? 'eye-off-outline' : 'eye-outline'}
                                        size={22}
                                        color="#666"
                                    />
                                </TouchableOpacity>
                            </View>

                            {/* Indicador de fortaleza */}
                            {formData.contrasenaNueva ? (
                                <View style={styles.strengthContainer}>
                                    <View style={styles.strengthBar}>
                                        <View
                                            style={[
                                                styles.strengthFill,
                                                {
                                                    width: validatePasswordStrength(formData.contrasenaNueva).valid
                                                        ? '100%'
                                                        : formData.contrasenaNueva.length >= 6
                                                            ? '66%'
                                                            : '33%',
                                                    backgroundColor: getPasswordStrengthColor(formData.contrasenaNueva),
                                                },
                                            ]}
                                        />
                                    </View>
                                    <Text
                                        style={[
                                            styles.strengthText,
                                            { color: getPasswordStrengthColor(formData.contrasenaNueva) },
                                        ]}>
                                        {getPasswordStrengthText(formData.contrasenaNueva)}
                                    </Text>
                                </View>
                            ) : null}

                            {errors.contrasenaNueva ? (
                                <Text style={styles.errorText}>{errors.contrasenaNueva}</Text>
                            ) : null}
                        </View>

                        {/* Confirmar Contraseña */}
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldLabel}>Confirmar nueva contraseña</Text>
                            <View style={[
                                styles.inputWrapper,
                                errors.confirmarContrasena && styles.inputError
                            ]}>
                                <TextInput
                                    style={styles.input}
                                    value={formData.confirmarContrasena}
                                    onChangeText={(text) => {
                                        setFormData({ ...formData, confirmarContrasena: text });
                                        if (errors.confirmarContrasena) {
                                            setErrors({ ...errors, confirmarContrasena: '' });
                                        }
                                    }}
                                    placeholder="Confirma tu nueva contraseña"
                                    placeholderTextColor="#999"
                                    secureTextEntry={!showPasswords.confirmar}
                                    autoCapitalize="none"
                                />
                                <TouchableOpacity
                                    style={styles.eyeButton}
                                    onPress={() =>
                                        setShowPasswords({ ...showPasswords, confirmar: !showPasswords.confirmar })
                                    }>
                                    <Ionicons
                                        name={showPasswords.confirmar ? 'eye-off-outline' : 'eye-outline'}
                                        size={22}
                                        color="#666"
                                    />
                                </TouchableOpacity>
                            </View>
                            {errors.confirmarContrasena ? (
                                <Text style={styles.errorText}>{errors.confirmarContrasena}</Text>
                            ) : null}

                            {/* Indicador de coincidencia */}
                            {formData.confirmarContrasena &&
                                formData.contrasenaNueva === formData.confirmarContrasena && (
                                    <View style={styles.matchContainer}>
                                        <Ionicons name="checkmark-circle" size={16} color="#34C759" />
                                        <Text style={styles.matchText}>Las contraseñas coinciden</Text>
                                    </View>
                                )}
                        </View>

                        {/* Requisitos de contraseña */}
                        <View style={styles.requirementsContainer}>
                            <Text style={styles.requirementsTitle}>Requisitos:</Text>
                            <View style={styles.requirementItem}>
                                <Ionicons
                                    name={formData.contrasenaNueva.length >= 8 ? 'checkmark-circle' : 'ellipse-outline'}
                                    size={16}
                                    color={formData.contrasenaNueva.length >= 8 ? '#34C759' : '#999'}
                                />
                                <Text style={styles.requirementText}>Mínimo 8 caracteres</Text>
                            </View>
                            <View style={styles.requirementItem}>
                                <Ionicons
                                    name={/[A-Z]/.test(formData.contrasenaNueva) ? 'checkmark-circle' : 'ellipse-outline'}
                                    size={16}
                                    color={/[A-Z]/.test(formData.contrasenaNueva) ? '#34C759' : '#999'}
                                />
                                <Text style={styles.requirementText}>Una letra mayúscula</Text>
                            </View>
                            <View style={styles.requirementItem}>
                                <Ionicons
                                    name={/[a-z]/.test(formData.contrasenaNueva) ? 'checkmark-circle' : 'ellipse-outline'}
                                    size={16}
                                    color={/[a-z]/.test(formData.contrasenaNueva) ? '#34C759' : '#999'}
                                />
                                <Text style={styles.requirementText}>Una letra minúscula</Text>
                            </View>
                            <View style={styles.requirementItem}>
                                <Ionicons
                                    name={/[0-9]/.test(formData.contrasenaNueva) ? 'checkmark-circle' : 'ellipse-outline'}
                                    size={16}
                                    color={/[0-9]/.test(formData.contrasenaNueva) ? '#34C759' : '#999'}
                                />
                                <Text style={styles.requirementText}>Un número</Text>
                            </View>
                        </View>

                        {/* Botón de Guardar */}
                        <TouchableOpacity
                            style={[styles.submitButton, isLoading && { opacity: 0.7 }]}
                            onPress={handleChangePassword}
                            disabled={isLoading}>
                            {isLoading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.submitButtonText}>Actualizar Contraseña</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}