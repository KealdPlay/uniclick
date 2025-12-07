// app/(tabs)/profile.tsx
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { styles } from '@/constants/profileStyle';
import { api } from '@/services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserProfile {
    idUsuario: number;
    nombre: string;
    apellido: string;
    genero: string;
    matricula: string;
    correo: string;
    telefono: string;
    fotoPerfil?: string;
}

export default function ProfileScreen() {
    const [userData, setUserData] = useState<UserProfile>({
        idUsuario: 0,
        nombre: '',
        apellido: '',
        genero: '',
        matricula: '',
        correo: '',
        telefono: '',
    });

    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [showGeneroOptions, setShowGeneroOptions] = useState(false);

    const generoOptions = ['Masculino', 'Femenino', 'Otro', 'Prefiero no decir'];

    // Cargar datos del usuario al montar el componente
    useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        try {
            setIsLoading(true);

            // Obtener sesión de AsyncStorage
            const sessionData = await AsyncStorage.getItem('userSession');

            if (!sessionData) {
                // Si no hay sesión, redirigir al login (o manejar según lógica de app)
                console.log('No hay sesión activa');
                router.replace('/(login)/login');
                return;
            }

            const sessionUser = JSON.parse(sessionData);
            const idUsuario = sessionUser.idUsuario;

            const usuario = await api.usuarios.obtenerPorId(idUsuario);

            if (usuario) {
                setUserData({
                    idUsuario: usuario.idUsuario,
                    nombre: usuario.nombre,
                    apellido: usuario.apellido,
                    genero: usuario.genero || '',
                    matricula: usuario.matricula,
                    correo: usuario.correo,
                    telefono: usuario.telefono || '',
                    fotoPerfil: usuario.fotoPerfil,
                });
            }
        } catch (error) {
            console.error('Error al cargar usuario:', error);
            if (Platform.OS === 'web') {
                window.alert('Error al cargar los datos del perfil');
            } else {
                Alert.alert('Error', 'No se pudieron cargar los datos del perfil');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveChanges = async () => {
        if (!userData.nombre || !userData.apellido || !userData.telefono) {
            if (Platform.OS === 'web') {
                window.alert('Por favor completa todos los campos obligatorios');
            } else {
                Alert.alert('Campos incompletos', 'Por favor completa todos los campos obligatorios');
            }
            return;
        }

        setIsSaving(true);

        try {
            // Preparar datos para actualizar
            const datosActualizados = {
                Nombre: userData.nombre,
                Apellido: userData.apellido,
                Genero: userData.genero,
                Telefono: userData.telefono,
            };

            await api.usuarios.actualizar(userData.idUsuario, datosActualizados);

            if (Platform.OS === 'web') {
                window.alert('Perfil actualizado correctamente');
            } else {
                Alert.alert('¡Éxito!', 'Perfil actualizado correctamente');
            }
            setIsEditing(false);

            // Recargar datos para confirmar
            await loadUserData();

        } catch (error: any) {
            console.error('Error:', error);
            if (Platform.OS === 'web') {
                window.alert(error.message || 'Error al actualizar el perfil');
            } else {
                Alert.alert('Error', error.message || 'No se pudo actualizar el perfil');
            }
        } finally {
            setIsSaving(false);
        }
    };

    const handleChangePassword = () => {
        router.push({
            pathname: '/(tabs)/change-password' as any,
            params: { idUsuario: userData.idUsuario.toString() }
        });
    };

    const handleBack = () => {
        router.back();
    };

    if (isLoading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color="#000" />
                    <Text style={styles.loadingText}>Cargando perfil...</Text>
                </View>
            </SafeAreaView>
        );
    }

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
                    <Text style={styles.headerTitle}>
                        {userData.nombre} {userData.apellido}
                    </Text>
                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => setIsEditing(!isEditing)}>
                        <Ionicons
                            name={isEditing ? 'close' : 'create-outline'}
                            size={24}
                            color="#000"
                        />
                    </TouchableOpacity>
                </View>

                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}>

                    {/* Profile Image */}
                    <View style={styles.profileImageContainer}>
                        <View style={styles.profileImageWrapper}>
                            <Image
                                source={
                                    userData.fotoPerfil
                                        ? { uri: userData.fotoPerfil }
                                        : require('@/assets/images/default-avatar.png')
                                }
                                style={styles.profileImage}
                            />
                            {isEditing && (
                                <TouchableOpacity style={styles.changePhotoButton}>
                                    <Ionicons name="camera" size={20} color="#fff" />
                                </TouchableOpacity>
                            )}
                        </View>
                        <Text style={styles.changePhotoText}>Cambiar Foto de Perfil</Text>
                    </View>

                    {/* Form Fields */}
                    <View style={styles.formContainer}>

                        {/* Correo (Read-only) */}
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldLabel}>Correo:</Text>
                            <View style={[styles.inputWrapper, styles.inputDisabled]}>
                                <Text style={styles.inputTextDisabled}>{userData.correo}</Text>
                            </View>
                        </View>

                        {/* Género */}
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldLabel}>Género:</Text>
                            {isEditing ? (
                                <View style={[styles.inputWrapper, showGeneroOptions && styles.inputActive]}>
                                    <TouchableOpacity
                                        style={styles.selectButton}
                                        onPress={() => setShowGeneroOptions(!showGeneroOptions)}>
                                        <Text style={styles.inputText}>
                                            {userData.genero || 'Seleccionar género'}
                                        </Text>
                                        <Text style={styles.chevron}>▼</Text>
                                    </TouchableOpacity>

                                    {showGeneroOptions && (
                                        <View style={styles.optionsWrapper}>
                                            <View style={styles.optionsContent}>
                                                {generoOptions.map((option, index) => (
                                                    <TouchableOpacity
                                                        key={option}
                                                        style={[
                                                            styles.option,
                                                            index < generoOptions.length - 1 && styles.optionBorder,
                                                        ]}
                                                        onPress={() => {
                                                            setUserData({ ...userData, genero: option });
                                                            setShowGeneroOptions(false);
                                                        }}>
                                                        <Text style={styles.optionText}>{option}</Text>
                                                    </TouchableOpacity>
                                                ))}
                                            </View>
                                        </View>
                                    )}
                                </View>
                            ) : (
                                <View style={[styles.inputWrapper, styles.inputDisabled]}>
                                    <Text style={styles.inputTextDisabled}>
                                        {userData.genero || 'No especificado'}
                                    </Text>
                                </View>
                            )}
                        </View>

                        {/* Matrícula (Read-only) */}
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldLabel}>Matrícula:</Text>
                            <View style={[styles.inputWrapper, styles.inputDisabled]}>
                                <Text style={styles.inputTextDisabled}>{userData.matricula}</Text>
                            </View>
                        </View>

                        {/* Contraseña */}
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldLabel}>Contraseña:</Text>
                            <View style={[styles.inputWrapper, styles.inputDisabled]}>
                                <Text style={styles.inputTextDisabled}>••••••••</Text>
                                {isEditing && (
                                    <TouchableOpacity
                                        style={styles.changePasswordButton}
                                        onPress={handleChangePassword}>
                                        <Text style={styles.changePasswordText}>Cambiar</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </View>

                        {/* Teléfono */}
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldLabel}>Número de teléfono:</Text>
                            {isEditing ? (
                                <View style={styles.inputWrapper}>
                                    <TextInput
                                        style={styles.input}
                                        value={userData.telefono}
                                        onChangeText={(text) =>
                                            setUserData({ ...userData, telefono: text })
                                        }
                                        keyboardType="phone-pad"
                                        placeholder="Número de teléfono"
                                        placeholderTextColor="#999"
                                    />
                                </View>
                            ) : (
                                <View style={[styles.inputWrapper, styles.inputDisabled]}>
                                    <Text style={styles.inputTextDisabled}>
                                        {userData.telefono || 'No especificado'}
                                    </Text>
                                </View>
                            )}
                        </View>

                        {/* Notificaciones */}
                        <View style={styles.fieldContainer}>
                            <Text style={styles.fieldLabel}>Notificaciones</Text>
                            <View style={styles.notificationContainer}>
                                <Switch
                                    value={notificationsEnabled}
                                    onValueChange={setNotificationsEnabled}
                                    trackColor={{ false: '#D1D1D6', true: '#34C759' }}
                                    thumbColor="#fff"
                                    ios_backgroundColor="#D1D1D6"
                                />
                            </View>
                        </View>

                        {/* Botón Editar Perfil */}
                        {isEditing && (
                            <TouchableOpacity
                                style={[styles.submitButton, isSaving && { opacity: 0.7 }]}
                                onPress={handleSaveChanges}
                                disabled={isSaving}>
                                {isSaving ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text style={styles.submitButtonText}>✏️ Guardar Cambios</Text>
                                )}
                            </TouchableOpacity>
                        )}
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

// Estilos adicionales para loading
const loadingStyles = {
    centerContainer: {
        flex: 1,
        justifyContent: 'center' as const,
        alignItems: 'center' as const,
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#666',
    },
};