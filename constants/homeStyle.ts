import { Dimensions, Platform, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e2e1de',
    },
    safeArea: {
        flex: 1,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    header: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        height: 40,
        width: 120,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    logoImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    logoutButton: {
        padding: 8,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 120, // Space for the floating bottom nav
        gap: 20,
    },
    productCard: {
        backgroundColor: '#F5F5F7',
        borderRadius: 20,
        padding: 24,
        flexDirection: 'row',
        gap: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    imageContainer: {
        width: 140,
        height: 140,
        backgroundColor: '#fff',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        overflow: 'hidden',
    },
    productImage: {
        width: '100%',
        height: '100%',
    },
    placeholderImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    productInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    productName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 4,
    },
    productAuthor: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    productPrice: {
        fontSize: 22,
        fontWeight: '600',
        color: '#000',
        marginBottom: 12,
    },
    productDescription: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    stockText: {
        fontSize: 12,
        color: '#34C759',
        fontWeight: '600',
        marginTop: 8,
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#666',
    },
    errorText: {
        marginTop: 16,
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
    retryButton: {
        backgroundColor: '#000',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },
    retryButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    emptyText: {
        marginTop: 16,
        fontSize: 16,
        color: '#999',
    },
    emptySubtext: {
        marginTop: 8,
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
    },

    // Bottom Navigation (Glassmorphism)
    bottomNavContainer: {
        position: 'absolute',
        bottom: 30,
        left: 20,
        right: 20,
        alignItems: 'center',
    },
    bottomNavGlass: {
        width: '100%',
        borderRadius: 30,
        overflow: 'hidden',
    },
    bottomNavContent: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
    },
    navButton: {
        padding: 8,
    },
    menuIcon: {
        gap: 6,
    },
    menuLine: {
        width: 32,
        height: 3,
        backgroundColor: '#000',
        borderRadius: 2,
    },
    addButton: {
        width: 56,
        height: 56,
        borderRadius: 28,
        borderWidth: 1,
        borderColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Glass Container Styles
    glassContainer: {
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
        elevation: 10,
    },
    glassContainerWeb: {
        borderRadius: 24,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.25)',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
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

    // Side Menu Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    overlayBackground: {
        flex: 1,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    sideMenuContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: width * 0.75,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 2,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    menuSafeArea: {
        flex: 1,
    },
    menuHeader: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    menuTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    closeButton: {
        padding: 4,
    },
    menuItems: {
        padding: 20,
        gap: 20,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingVertical: 12,
    },
    menuItemText: {
        fontSize: 18,
        fontWeight: '500',
    },
});