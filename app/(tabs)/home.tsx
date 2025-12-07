// app/(tabs)/home.tsx
import { styles } from '@/constants/homeStyle';
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
  image: any;
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

  // ✅ NAVEGACIÓN A LA PANTALLA DE BÚSQUEDA
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
    // Navegación a la pantalla de perfil/configuración
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