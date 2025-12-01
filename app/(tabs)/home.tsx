// app/(tabs)/home.tsx - VERSIÓN AVANZADA
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Image,
  Modal,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');


interface Product {
  id: number;
  name: string;
  author: string;
  price: number;
  description: string;
  image: any; // En producción: string (URL)
}

const ProductCard = ({ product, onPress }: { product: Product; onPress: () => void }) => (
  <TouchableOpacity
    style={styles.productCard}
    activeOpacity={0.7}
    onPress={onPress}
  >
    <View style={styles.imageContainer}>
      <Image
        source={product.image}
        style={styles.productImage}
        resizeMode="contain"
      />
    </View>

    <View style={styles.productInfo}>
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productAuthor}>
        Publicado por {product.author}
      </Text>
      <Text style={styles.productPrice}>${product.price}</Text>
      <Text style={styles.productDescription} numberOfLines={3}>
        {product.description}
      </Text>
    </View>
  </TouchableOpacity>
);

export default function HomeScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const slideAnim = React.useRef(new Animated.Value(-width)).current;
  const fadeAnim = React.useRef(new Animated.Value(0)).current;


  const fetchProducts = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }
      setError(null);


      await new Promise(resolve => setTimeout(resolve, 1000));


      const mockProducts: Product[] = [
        {
          id: 1,
          name: 'Chidas',
          author: 'Miguel',
          price: 16,
          description: 'Lorem Ipsum dolor sit amet, consectetur adipisci tempor incidunt ut labore',
          image: require('@/assets/images/chidas.png'),
        },
        {
          id: 2,
          name: 'Chidas',
          author: 'Miguel',
          price: 16,
          description: 'Lorem Ipsum dolor sit amet, consectetur adipisci tempor incidunt ut labore',
          image: require('@/assets/images/chidas.png'),
        },
        {
          id: 3,
          name: 'Chidas',
          author: 'Miguel',
          price: 16,
          description: 'Lorem Ipsum dolor sit amet, consectetur adipisci tempor incidunt ut labore',
          image: require('@/assets/images/chidas.png'),
        },
        {
          id: 4,
          name: 'Chidas',
          author: 'Miguel',
          price: 16,
          description: 'Lorem Ipsum dolor sit amet, consectetur adipisci tempor incidunt ut labore',
          image: require('@/assets/images/chidas.png'),
        },
        {
          id: 5,
          name: 'Chidas',
          author: 'Miguel',
          price: 16,
          description: 'Lorem Ipsum dolor sit amet, consectetur adipisci tempor incidunt ut labore',
          image: require('@/assets/images/chidas.png'),
        },
        {
          id: 6,
          name: 'Chidas',
          author: 'Miguel',
          price: 16,
          description: 'Lorem Ipsum dolor sit amet, consectetur adipisci tempor incidunt ut labore',
          image: require('@/assets/images/chidas.png'),
        },
        {
          id: 7,
          name: 'Chidas',
          author: 'Miguel',
          price: 16,
          description: 'Lorem Ipsum dolor sit amet, consectetur adipisci tempor incidunt ut labore',
          image: require('@/assets/images/chidas.png'),
        },
        {
          id: 8,
          name: 'Chidas',
          author: 'Miguel',
          price: 16,
          description: 'Lorem Ipsum dolor sit amet, consectetur adipisci tempor incidunt ut labore',
          image: require('@/assets/images/chidas.png'),
        },
        {
          id: 9,
          name: 'Chidas',
          author: 'Miguel',
          price: 16,
          description: 'Lorem Ipsum dolor sit amet, consectetur adipisci tempor incidunt ut labore',
          image: require('@/assets/images/chidas.png'),
        },
        {
          id: 10,
          name: 'Chidas',
          author: 'Miguel',
          price: 16,
          description: 'Lorem Ipsum dolor sit amet, consectetur adipisci tempor incidunt ut labore',
          image: require('@/assets/images/chidas.png'),
        }
      ];

      setProducts(mockProducts);
    } catch (err) {
      setError('Error al cargar productos. Intenta nuevamente.');
      console.error('Error fetching products:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductPress = (productId: number) => {

    console.log('Producto seleccionado:', productId);
    // router.push(`/producto/${productId}`);
  };

  const handleMenuPress = () => {
    setIsMenuVisible(true);
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeMenu = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: -width,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => setIsMenuVisible(false));
  };


  const handleSearchPress = () => {
    console.log('Abrir búsqueda');
    // router.push('/buscar');
  };

  const handleAddPress = () => {
    console.log('Agregar producto');
    // router.push('/agregar-producto');
  };

  const handleLogout = () => {
    closeMenu();
    router.replace('/(login)/login');
  };

  const handleSettings = () => {
    // Aquí se redirecciona
    console.log('Ir a configuración');
    closeMenu();
  };


  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <LogoHeader />
        </View>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#000" />
          <Text style={styles.loadingText}>Cargando productos...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <LogoHeader />
        </View>
        <View style={styles.centerContainer}>
          <Ionicons name="alert-circle-outline" size={64} color="#FF3B30" />
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => fetchProducts()}
          >
            <Text style={styles.retryButtonText}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }


  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <LogoHeader />
      </View>

      {/* Lista de productos con Pull-to-Refresh */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => fetchProducts(true)}
            tintColor="#000"
          />
        }
      >
        {products.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="cart-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>No hay productos disponibles</Text>
          </View>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onPress={() => handleProductPress(product.id)}
            />
          ))
        )}
      </ScrollView>

      {/* Barra inferior */}
      <BottomNavigation
        onMenuPress={handleMenuPress}
        onSearchPress={handleSearchPress}
        onAddPress={handleAddPress}
      />

      {/* Side Menu Modal */}
      <Modal
        visible={isMenuVisible}
        transparent={true}
        animationType="none"
        onRequestClose={closeMenu}
      >
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={closeMenu}>
            <Animated.View
              style={[
                styles.overlayBackground,
                { opacity: fadeAnim }
              ]}
            />
          </TouchableWithoutFeedback>

          <Animated.View
            style={[
              styles.sideMenuContainer,
              { transform: [{ translateX: slideAnim }] }
            ]}
          >
            <SafeAreaView style={styles.menuSafeArea}>
              <View style={styles.menuHeader}>
                <Text style={styles.menuTitle}>Menú</Text>
                <TouchableOpacity onPress={closeMenu} style={styles.closeButton}>
                  <Ionicons name="close" size={24} color="#000" />
                </TouchableOpacity>
              </View>

              <View style={styles.menuItems}>
                <TouchableOpacity style={styles.menuItem} onPress={handleSettings}>
                  <Ionicons name="settings-outline" size={24} color="#000" />
                  <Text style={styles.menuItemText}>Configuración</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
                  <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
                  <Text style={[styles.menuItemText, { color: '#FF3B30' }]}>Cerrar Sesión</Text>
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </Animated.View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}


const LogoHeader = () => (
  <View style={styles.logoContainer}>
    <Image
      source={require('@/assets/images/uniclick.png')}
      style={styles.logoImage}
      resizeMode="contain"
    />
  </View>
);

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

const BottomNavigation = ({
  onMenuPress,
  onSearchPress,
  onAddPress
}: {
  onMenuPress: () => void;
  onSearchPress: () => void;
  onAddPress: () => void;
}) => (
  <View style={styles.bottomNavContainer}>
    <GlassContainer style={styles.bottomNavGlass}>
      <View style={styles.bottomNavContent}>
        <TouchableOpacity style={styles.navButton} onPress={onMenuPress}>
          <View style={styles.menuIcon}>
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={onSearchPress}>
          <Ionicons name="search-outline" size={32} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton} onPress={onAddPress}>
          <View style={styles.addButton}>
            <Ionicons name="add" size={32} color="#000" />
          </View>
        </TouchableOpacity>
      </View>
    </GlassContainer>
  </View>
);


const styles = StyleSheet.create({
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
  },
  productImage: {
    width: '100%',
    height: '100%',
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
    top: 0, left: 0, right: 0, bottom: 0,
  },
  glassColor: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
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