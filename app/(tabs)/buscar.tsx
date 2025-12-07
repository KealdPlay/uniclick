// app/(tabs)/buscar.tsx
import { api } from '@/services/api';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

// Interfaz que coincide con tu modelo Producto.cs
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

const ProductCard = ({
    product,
    onPress
}: {
    product: Producto;
    onPress: () => void
}) => (
    <TouchableOpacity
        style={styles.productCard}
        activeOpacity={0.7}
        onPress={onPress}
    >
        <View style={styles.imageContainer}>
            {product.imagenBase64 ? (
                <Image
                    source={{ uri: `data:image/jpeg;base64,${product.imagenBase64}` }}
                    style={styles.productImage}
                    resizeMode="contain"
                />
            ) : (
                <View style={styles.placeholderImage}>
                    <Ionicons name="image-outline" size={40} color="#ccc" />
                </View>
            )}
        </View>

        <View style={styles.productInfo}>
            <Text style={styles.productName}>{product.nombreProducto}</Text>
            <Text style={styles.productAuthor}>
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

export default function BuscarScreen() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [allProducts, setAllProducts] = useState<Producto[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Producto[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Carga productos desde la API
    useEffect(() => {
        fetchProducts();
    }, []);

    // Filtra productos cuando cambia la búsqueda
    useEffect(() => {
        filterProducts();
    }, [searchQuery, allProducts]);

    const fetchProducts = async () => {
        try {
            setIsLoading(true);
            setError(null);

            console.log('🔍 Cargando productos desde la API...');

            // ✅ LLAMADA REAL A LA API
            const productos = await api.productos.obtenerTodos();

            console.log(`✅ ${productos.length} productos cargados`);

            // Filtrar solo productos activos y disponibles
            const productosActivos = productos.filter(
                (p: Producto) => p.activo !== false && p.disponible !== false
            );

            setAllProducts(productosActivos);
            setFilteredProducts(productosActivos);

        } catch (error: any) {
            console.error('❌ Error al cargar productos:', error);
            setError(error.message || 'Error al cargar productos');

            Alert.alert(
                'Error',
                'No se pudieron cargar los productos. Verifica tu conexión.',
                [
                    { text: 'Reintentar', onPress: () => fetchProducts() },
                    { text: 'Cancelar', style: 'cancel' }
                ]
            );
        } finally {
            setIsLoading(false);
        }
    };

    const filterProducts = () => {
        if (searchQuery.trim() === '') {
            setFilteredProducts(allProducts);
            return;
        }

        const query = searchQuery.toLowerCase();
        const filtered = allProducts.filter(product =>
            product.nombreProducto.toLowerCase().includes(query) ||
            product.descripcion?.toLowerCase().includes(query) ||
            product.categoria?.toLowerCase().includes(query) ||
            product.salonVendedor?.toLowerCase().includes(query)
        );

        setFilteredProducts(filtered);
    };

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

    const handleBack = () => {
        router.back();
    };

    const clearSearch = () => {
        setSearchQuery('');
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header con búsqueda */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={handleBack}
                    activeOpacity={0.7}
                >
                    <Ionicons name="arrow-back" size={28} color="#000" />
                </TouchableOpacity>

                <View style={styles.searchContainer}>
                    <Ionicons
                        name="search-outline"
                        size={20}
                        color="#666"
                        style={styles.searchIcon}
                    />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Buscar productos..."
                        placeholderTextColor="#999"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        autoFocus={false}
                        returnKeyType="search"
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity
                            onPress={clearSearch}
                            style={styles.clearButton}
                            activeOpacity={0.7}
                        >
                            <Ionicons name="close-circle" size={20} color="#999" />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* Resultados */}
            {!isLoading && (
                <View style={styles.resultsContainer}>
                    <Text style={styles.resultsText}>
                        {searchQuery ?
                            `${filteredProducts.length} resultado${filteredProducts.length !== 1 ? 's' : ''} para "${searchQuery}"` :
                            `${filteredProducts.length} producto${filteredProducts.length !== 1 ? 's' : ''} disponible${filteredProducts.length !== 1 ? 's' : ''}`
                        }
                    </Text>
                </View>
            )}

            {/* Lista de productos */}
            {isLoading ? (
                <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color="#000" />
                    <Text style={styles.loadingText}>Cargando productos...</Text>
                </View>
            ) : error ? (
                <View style={styles.centerContainer}>
                    <Ionicons name="alert-circle-outline" size={64} color="#FF3B30" />
                    <Text style={styles.errorText}>{error}</Text>
                    <TouchableOpacity
                        style={styles.retryButton}
                        onPress={fetchProducts}
                    >
                        <Text style={styles.retryButtonText}>Reintentar</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {filteredProducts.length === 0 ? (
                        <View style={styles.emptyContainer}>
                            <Ionicons name="search-outline" size={64} color="#ccc" />
                            <Text style={styles.emptyText}>
                                No se encontraron productos
                            </Text>
                            <Text style={styles.emptySubtext}>
                                {searchQuery ?
                                    'Intenta con otros términos de búsqueda' :
                                    'Aún no hay productos disponibles'
                                }
                            </Text>
                        </View>
                    ) : (
                        filteredProducts.map((product) => (
                            <ProductCard
                                key={product.idProducto}
                                product={product}
                                onPress={() => handleProductPress(product.idProducto)}
                            />
                        ))
                    )}
                </ScrollView>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e2e1de',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        gap: 12,
    },
    backButton: {
        padding: 4,
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 44,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#000',
        paddingVertical: 8,
    },
    clearButton: {
        padding: 4,
    },
    resultsContainer: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    resultsText: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
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
        fontSize: 18,
        fontWeight: '600',
        color: '#666',
    },
    emptySubtext: {
        marginTop: 8,
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
    },
});