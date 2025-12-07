// app/(tabs)/home.tsx
import { styles } from '@/constants/homeStyle';
import { api } from '@/services/api';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  Image,
  Modal,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

const additionalStyles = {
  placeholderImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    backgroundColor: '#f0f0f0',
  },
  stockText: {
    fontSize: 12,
    color: '#34C759',
    fontWeight: '600' as const,
    marginTop: 8,
  },
  emptySubtext: {
    marginTop: 8,
    fontSize: 14,
    color: '#999',
    textAlign: 'center' as const,
  },
};

interface Producto {
  idProducto: number;
  idVendedor: number;
  nombreProducto: string;
  descripcion: string | null;
  precio: number;
  cantidad: number | null;
  turno: string | null;
  incluyeEnvio: boolean | null;
  salonVendedor: string | null;
  telefonoContacto: string | null;
  clabe: string | null;
  imagenBase64: string | null;
  categoria: string | null;
  activo: boolean | null;
  disponible: boolean | null;
  fechaPublicacion: string | null;
  fechaActualizacion: string | null;
  idVendedorNavigation?: any;
}

const ProductCard = ({ product, onPress }: { product: Producto; onPress: () => void }) => {
  const getImageUri = (base64: string | null): string | null => {
    if (!base64) return null;

    try {
      const cleanBase64 = base64.replace(/\s/g, '');

      if (cleanBase64.startsWith('data:image')) {
        return cleanBase64;
      }

      let mimeType = 'image/jpeg';

      if (cleanBase64.startsWith('/9j/')) {
        mimeType = 'image/jpeg';
      } else if (cleanBase64.startsWith('iVBORw0KGgo')) {
        mimeType = 'image/png';
      } else if (cleanBase64.startsWith('R0lGOD')) {
        mimeType = 'image/gif';
      } else if (cleanBase64.startsWith('UklGR')) {
        mimeType = 'image/webp';
      }

      return `data:${mimeType};base64,${cleanBase64}`;
    } catch (error) {
      console.error('Error procesando imagen Base64:', error);
      return null;
    }
  };

  const imageUri = getImageUri(product.imagenBase64);

  return (
    <TouchableOpacity
      style={styles.productCard}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View style={styles.imageContainer}>
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={styles.productImage}
            resizeMode="contain"
            onError={(error) => {
              console.error('Error cargando imagen:', error.nativeEvent.error);
            }}
          />
        ) : (
          <View style={styles.placeholderImage}>
            <Ionicons name="image-outline" size={40} color="#ccc" />
          </View>
        )}
      </View>

      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={1}>
          {product.nombreProducto}
        </Text>
        <Text style={styles.productAuthor} numberOfLines={1}>
          {product.categoria || 'Sin categoría'}
        </Text>
        <Text style={styles.productPrice}>${product.precio.toFixed(2)}</Text>
        <Text style={styles.productDescription} numberOfLines={3}>
          {product.descripcion || 'Sin descripción disponible'}
        </Text>
        {product.cantidad !== null && product.cantidad > 0 && (
          <Text style={styles.stockText}>Stock: {product.cantidad}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default function HomeScreen() {
  const [products, setProducts] = useState<Producto[]>([]);
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

      console.log('📦 Cargando productos desde la API...');

      const productos = await api.productos.obtenerTodos();

      console.log(`✅ ${productos.length} productos cargados`);

      const productosActivos = productos.filter(
        (p: Producto) => p.activo !== false && p.disponible !== false
      );

      console.log(`✅ ${productosActivos.length} productos activos y disponibles`);

      setProducts(productosActivos);

    } catch (err: any) {
      const errorMessage = err.message || 'Error al cargar productos. Intenta nuevamente.';
      setError(errorMessage);
      console.error('❌ Error fetching products:', err);

      if (!isRefresh) {
        Alert.alert(
          'Error',
          'No se pudieron cargar los productos. Verifica tu conexión.',
          [
            { text: 'Reintentar', onPress: () => fetchProducts() },
            { text: 'Cancelar', style: 'cancel' }
          ]
        );
      }
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
    // TODO: Navegar a detalle del producto
    // router.push(`/producto/${productId}`);
    Alert.alert(
      'Producto seleccionado',
      `ID: ${productId}`,
      [{ text: 'OK' }]
    );
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
    console.log('Navegando a búsqueda...');
    router.push('/(tabs)/buscar');
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
    closeMenu();
    router.push('/(tabs)/profile');
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
            <Text style={styles.emptySubtext}>
              Sé el primero en publicar un producto
            </Text>
          </View>
        ) : (
          products.map((product) => (
            <ProductCard
              key={product.idProducto}
              product={product}
              onPress={() => handleProductPress(product.idProducto)}
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