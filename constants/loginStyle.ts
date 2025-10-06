// app/(tabs)/index.tsx
import {
    Platform,
    StyleSheet
} from 'react-native';

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