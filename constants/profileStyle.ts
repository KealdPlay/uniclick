// constants/profileStyle.ts
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e2e1de',
    },
    keyboardView: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        backgroundColor: '#e2e1de',
    },
    backButton: {
        padding: 8,
        width: 44,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
        flex: 1,
        textAlign: 'center',
    },
    editButton: {
        padding: 8,
        width: 44,
        alignItems: 'flex-end',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 40,
    },

    // Profile Image Section
    profileImageContainer: {
        alignItems: 'center',
        paddingVertical: 30,
    },
    profileImageWrapper: {
        position: 'relative',
        marginBottom: 12,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: '#fff',
    },
    changePhotoButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#000',
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: '#e2e1de',
    },
    changePhotoText: {
        fontSize: 14,
        color: '#666',
    },

    // Form Section
    formContainer: {
        paddingHorizontal: 20,
        gap: 20,
    },
    fieldContainer: {
        gap: 8,
    },
    fieldLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },
    inputWrapper: {
        backgroundColor: '#F5F5F7',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        minHeight: 50,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'transparent',
    },
    inputActive: {
        borderColor: '#000',
    },
    inputDisabled: {
        backgroundColor: '#E5E5EA',
    },
    input: {
        fontSize: 16,
        color: '#000',
        padding: 0,
    },
    inputText: {
        fontSize: 16,
        color: '#000',
    },
    inputTextDisabled: {
        fontSize: 16,
        color: '#666',
    },

    // Select Género
    selectButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    chevron: {
        fontSize: 12,
        color: '#666',
    },
    optionsWrapper: {
        marginTop: 8,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    optionsContent: {
        backgroundColor: '#fff',
    },
    option: {
        paddingVertical: 14,
        paddingHorizontal: 16,
    },
    optionBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    optionText: {
        fontSize: 16,
        color: '#000',
    },

    // Password Field
    changePasswordButton: {
        position: 'absolute',
        right: 16,
        paddingVertical: 6,
        paddingHorizontal: 12,
        backgroundColor: '#000',
        borderRadius: 8,
    },
    changePasswordText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },

    // Notifications
    notificationContainer: {
        backgroundColor: '#F5F5F7',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    // Submit Button
    submitButton: {
        backgroundColor: '#000',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        minHeight: 50,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },

    // Loading States
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#666',
    },
});