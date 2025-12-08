import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert // Importado para mensajes de prueba
    ,

    Image,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

// --- Definición de Tipos (Según tu modelo Producto.cs) ---
interface Producto {
  idProducto: number;
  nombreProducto: string;
  precio: number;
  descripcion: string;
  idVendedor: number;
  activo: boolean;
  imagenBase64: string; 
}

// --- Colores de Estilo de Uniclick ---
const PRIMARY_COLOR = '#e74c3c'; // Rojo/Naranja fuerte para énfasis
const SECONDARY_COLOR = '#007bff'; // Azul para precios

export default function DetallesProductoScreen({ route, navigation }: any) {
  // Simulación del estado de carga y datos
  const [loading, setLoading] = useState(true);
  const [producto, setProducto] = useState<Producto | null>(null);

  // Lógica de carga (Simulada, en la versión final debe ser la llamada al API)
  useEffect(() => {
    // Datos de ejemplo simulando la respuesta de la API (con Base64)
    const dummyData: Producto = {
      idProducto: 1,
      nombreProducto: 'Chidas super picositas',
      precio: 18.00,
      descripcion: 'Chidas de papa super picositas. ¡Las más ricas del campus! Venta rápida.',
      idVendedor: 101,
      activo: true,
      imagenBase64: 'iVBORw0KGgoAAAANSUhEUgAABAAAAAPO...', 
    };

    setTimeout(() => {
      setProducto(dummyData);
      setLoading(false);
    }, 1000); 
  }, []);
  
  // --- Manejo de la acción de Comprar ---
  const handleComprar = () => {
    // Aquí se iniciaría la navegación al Formulario de Pedido, 
    // pasando los datos clave del producto.
    if (producto) {
      Alert.alert(
          "Compra Iniciada", 
          `Preparando formulario para comprar ${producto.nombreProducto} por $${producto.precio.toFixed(2)}.`
      );
      // navigation.navigate('FormularioPedidoScreen', { idProducto: producto.idProducto, idVendedor: producto.idVendedor });
    }
  };

  // --- Renderizado Condicional de Carga y Error ---
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={PRIMARY_COLOR} />
        <Text style={{ marginTop: 10 }}>Cargando detalles...</Text>
      </View>
    );
  }

  if (!producto) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Producto no encontrado.</Text>
        <TouchableOpacity 
          style={styles.errorButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.errorButtonText}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  // --- Manejo del Base64 ---
  const imageSource = { 
    uri: `data:image/png;base64,${producto.imagenBase64}` 
  };
  // -------------------------

  return (
    <SafeAreaView style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()} 
          >
              <Text style={styles.backButtonText}>&lt;</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Detalles del Producto</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.card}>
          
          {/* Imagen del Producto */}
          <View style={styles.imageSection}>
            <Text style={styles.sectionTitle}>Imagen del producto</Text>
            <Image 
              source={imageSource} 
              style={styles.productImage} 
              resizeMode="contain" 
            />
          </View>
          
          <View style={styles.divider} /> 
          
          {/* Nombre del producto */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Nombre del producto</Text>
            <Text style={styles.value}>{producto.nombreProducto}</Text>
          </View>

          {/* Precio del producto (Destacado en Azul) */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Precio del producto</Text>
            <Text style={styles.priceValue}>${producto.precio.toFixed(2)}</Text>
          </View>

          {/* Descripción del producto */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Descripción del producto</Text>
            <Text style={styles.value}>{producto.descripcion}</Text>
          </View>

          {/* Envío de producto */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Envío de producto</Text>
            <Text style={styles.value}>Sí</Text> 
          </View>
        </View>
        
      </ScrollView>
      
      {/* 🚀 BOTÓN 'COMPRAR' */}
      <TouchableOpacity 
          style={styles.buyButtonFixed} 
          onPress={handleComprar}
      >
          <Text style={styles.actionButtonText}>Comprar Ahora</Text>
      </TouchableOpacity>
      
    </SafeAreaView>
  );
}

// --- Estilos ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // Fondo limpio
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  errorButton: {
    marginTop: 20,
    backgroundColor: PRIMARY_COLOR,
    padding: 10,
    borderRadius: 5,
  },
  errorButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  
  // --- Encabezado ---
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#ffffff',
  },
  backButton: {
    padding: 5, // Aumenta el área de toque
  },
  backButtonText: {
    fontSize: 24,
    color: '#333',
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },

  // --- Card ---
  card: {
    marginHorizontal: 15,
    marginTop: 20,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, 
  },
  
  // --- Imagen ---
  imageSection: {
    alignItems: 'center',
    marginBottom: 15,
  },
  productImage: {
    width: '100%',
    height: 180, // Aumentado ligeramente para mayor impacto visual
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginTop: 8,
    backgroundColor: '#f9f9f9', // Fondo claro si el Base64 no carga
  },

  // --- Información ---
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 15,
  },
  section: {
    marginBottom: 20,
    alignItems: 'center',
  },
  sectionTitle: { 
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333', 
    marginBottom: 4,
    textAlign: 'center',
  },
  value: { 
    fontSize: 16,
    color: '#555555',
    textAlign: 'center',
  },
  priceValue: { 
    fontSize: 24, // Más grande para destacar
    fontWeight: '800',
    color: SECONDARY_COLOR, // Azul de Uniclick
    textAlign: 'center',
  },
  
  // --- Botón de Compra Fijo (NUEVO ESTILO) ---
  buyButtonFixed: {
    backgroundColor: PRIMARY_COLOR, // Rojo/Naranja de Uniclick
    borderRadius: 8,
    paddingVertical: 15,
    marginHorizontal: 15, 
    marginBottom: 10, 
    alignItems: 'center',
    shadowColor: PRIMARY_COLOR,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },

    // Mantener otros estilos que pueda haber
    actionButton: {}, // Puedes eliminarlo si no se usa
});