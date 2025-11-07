// app/(tabs)/home.tsx - VERSIÓN AVANZADA
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

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
    console.log('Abrir menú');
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
    router.replace('/(login)/login');
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
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={24} color="#FF3B30" />
        </TouchableOpacity>
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
    </SafeAreaView>
  );
}


const LogoHeader = () => (
  <View style={styles.logoContainer}>
    <Text style={styles.logoText}>UNICL</Text>
    <Ionicons name="hand-left-outline" size={32} color="#000" />
    <Text style={styles.logoText}>CK</Text>
  </View>
);

const BottomNavigation = ({ 
  onMenuPress, 
  onSearchPress, 
  onAddPress 
}: {
  onMenuPress: () => void;
  onSearchPress: () => void;
  onAddPress: () => void;
}) => (
  <View style={styles.bottomNav}>
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
);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    letterSpacing: 2,
  },
  logoutButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
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
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#fff',
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
    borderWidth: 3,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});