import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import {
    Alert,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

// --- Colores de Estilo de Uniclick ---
const PRIMARY_COLOR = '#e74c3c'; // Rojo/Naranja fuerte para énfasis
const ACCEPT_COLOR = '#388e3c'; // Verde para Aceptar
const REJECT_COLOR = '#d32f2f'; // Rojo oscuro para Rechazar
const STATUS_COLOR = '#007bff'; // Azul para estatus de entrega

// --- Interfaz del Modelo (Basado en Pedido.cs) ---
interface Pedido {
  idPedido: string; 
  nombreComprador: string;
  nombreProducto: string;
  cantidad: number;
  telefonoContacto: string; // Coincide con Backend
  puntoEntrega: string; // Coincide con Backend
  estado: string; // Coincide con Backend (pendiente, aceptado, entregado)
  fechaPedido: string;
}

// --- Datos de Ejemplo con Nombres Ajustados ---
const MOCK_PEDIDOS_PENDIENTES: Pedido[] = [
  {
    idPedido: 'P001',
    nombreComprador: 'Ana García',
    nombreProducto: 'Chidas super picositas',
    cantidad: 5,
    puntoEntrega: 'Calle Falsa 123, Col. Centro',
    telefonoContacto: '5512345678',
    estado: 'pendiente',
    fechaPedido: '03/12/2025 10:30 AM',
  },
];

const MOCK_PEDIDOS_HISTORIAL: Pedido[] = [
  {
    idPedido: 'H010',
    nombreComprador: 'Sofía Martínez',
    nombreProducto: 'Refresco Cola, 3 litros',
    cantidad: 1,
    puntoEntrega: 'Av. Cárdenas 500',
    telefonoContacto: '5500001111',
    estado: 'entregado', // Coincide con un valor final del Backend
    fechaPedido: '02/12/2025',
  },
];

// --- Componente: Pedido Pendiente con Botones de Acción ---
const PedidoPendienteCard = ({ pedido }: { pedido: Pedido }) => {
  // Este es el endpoint PUT que usarías: PUT /api/Pedidos/{id}/estado
  const handleAction = (accion: 'aceptado' | 'rechazado') => { 
    Alert.alert(
      `${accion === 'aceptado' ? 'Aceptar' : 'Rechazar'} Pedido`,
      `¿Seguro que quieres ${accion} el pedido #${pedido.idPedido}?`
    );
    // Aquí va la llamada: ActualizarEstadoPedido(id, { estado: accion })
  };

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Pedido Pendiente #{pedido.idPedido}</Text>
      <Text style={styles.detailText}>
        <Text style={styles.boldText}>Comprador:</Text> {pedido.nombreComprador}
      </Text>
      <Text style={styles.detailText}>
        <Text style={styles.boldText}>Artículo:</Text> {pedido.nombreProducto} ({pedido.cantidad} unid.)
      </Text>
      <Text style={styles.detailText}>
        <Text style={styles.boldText}>Teléfono:</Text> {pedido.telefonoContacto} 
      </Text>
      <Text style={styles.detailText}>
        <Text style={styles.boldText}>Entrega en:</Text> {pedido.puntoEntrega} 
      </Text>
      <Text style={[styles.detailText, styles.date]}>
        Recibido: {pedido.fechaPedido}
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.actionButton, styles.acceptButton]}
          onPress={() => handleAction('aceptado')}
        >
          <Text style={styles.buttonText}>Aceptar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.rejectButton]}
          onPress={() => handleAction('rechazado')}
        >
          <Text style={styles.buttonText}>Rechazar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// --- Componente: Pedido Historial (Solo Estado) ---
const PedidoHistorialCard = ({ pedido }: { pedido: Pedido }) => {
    // Determina el color del estado
    const statusStyle = pedido.estado === 'entregado' ? styles.statusDelivered : styles.statusNotDelivered;
    
    // Formatea el estado para mostrarlo
    const displayStatus = pedido.estado.charAt(0).toUpperCase() + pedido.estado.slice(1).replace('-', ' ');

    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>Pedido Historial #{pedido.idPedido}</Text>
            <Text style={styles.detailText}>
                <Text style={styles.boldText}>Comprador:</Text> {pedido.nombreComprador}
            </Text>
            <Text style={styles.detailText}>
                <Text style={styles.boldText}>Artículo:</Text> {pedido.nombreProducto} ({pedido.cantidad} unid.)
            </Text>
            <View style={styles.statusRow}>
                <Text style={styles.statusLabel}>Estatus:</Text>
                <Text style={statusStyle}>
                    {displayStatus}
                </Text>
            </View>
            <Text style={[styles.detailText, styles.date]}>
                Fecha: {pedido.fechaPedido}
            </Text>
        </View>
    );
};

// --- Componente Principal de la Pantalla ---
const RegistroPedidosScreen = ({ navigation }: any) => {
  const [activeTab, setActiveTab] = useState<'Pendientes' | 'Historial'>('Pendientes'); 

  const renderContent = () => {
    // Aquí se usaría la función de useEffect para llamar a: 
    // GET /api/Pedidos?idVendedor=X&estado=pendiente
    // GET /api/Pedidos?idVendedor=X&estado=entregado&estado=rechazado
    
    const data = activeTab === 'Pendientes' ? MOCK_PEDIDOS_PENDIENTES : MOCK_PEDIDOS_HISTORIAL;
    const renderItemComponent = activeTab === 'Pendientes' ? PedidoPendienteCard : PedidoHistorialCard;

    return (
      <FlatList
        data={data}
        keyExtractor={(item) => item.idPedido}
        renderItem={({ item }) => renderItemComponent({ pedido: item })}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyText}>No hay pedidos en esta sección.</Text>}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* --- Encabezado --- */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Registro de Pedidos</Text>
      </View>

      {/* --- Filtro/Pestañas --- */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Pendientes' && styles.activeTab]}
          onPress={() => setActiveTab('Pendientes')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'Pendientes' && styles.activeTabText,
            ]}
          >
            Pendientes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Historial' && styles.activeTab]}
          onPress={() => setActiveTab('Historial')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'Historial' && styles.activeTabText,
            ]}
          >
            Historial
          </Text>
        </TouchableOpacity>
      </View>

      {/* --- Contenido de la Pestaña Activa --- */}
      <View style={styles.contentContainer}>
        {renderContent()}
      </View>
      
    </SafeAreaView>
  );
};

// --- Estilos ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  // Encabezado
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
  headerTitle: { fontSize: 20, fontWeight: 'bold', marginLeft: 10 },
  backButton: { padding: 5 },

  // Filtro/Pestañas (Usando PRIMARY_COLOR de Uniclick)
  tabContainer: { flexDirection: 'row', justifyContent: 'space-around', borderBottomWidth: 1, borderBottomColor: '#ddd', marginHorizontal: 15, marginTop: 10, marginBottom: 5 },
  tabButton: { flex: 1, paddingVertical: 10, alignItems: 'center', borderBottomWidth: 3, borderBottomColor: 'transparent' },
  activeTab: { borderBottomColor: PRIMARY_COLOR }, // Color de énfasis
  tabText: { fontSize: 16, color: '#666' },
  activeTabText: { fontWeight: 'bold', color: PRIMARY_COLOR }, // Color de énfasis

  // Contenido de la Lista
  contentContainer: { flex: 1 },
  listContent: { paddingHorizontal: 15, paddingBottom: 20 },
  emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#999' },
  
  // Tarjetas (Card)
  card: { backgroundColor: '#f5f5f5', borderRadius: 10, padding: 15, marginVertical: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 2 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8, color: '#333' },
  detailText: { fontSize: 14, color: '#555', marginBottom: 3 },
  boldText: { fontWeight: 'bold' },
  date: { fontSize: 12, marginTop: 5, color: '#999' },

  // Botones de Acción (Pendientes)
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#eee' },
  actionButton: { flex: 1, borderRadius: 8, paddingVertical: 10, alignItems: 'center', marginHorizontal: 5 },
  acceptButton: { backgroundColor: ACCEPT_COLOR }, // Verde
  rejectButton: { backgroundColor: REJECT_COLOR }, // Rojo oscuro
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },

  // Historial Status
  statusRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 3 },
  statusLabel: { fontSize: 14, color: '#555', fontWeight: 'bold', marginRight: 5 },
  statusDelivered: { fontSize: 14, fontWeight: 'bold', color: STATUS_COLOR }, // Azul para Entregado
  statusNotDelivered: { fontSize: 14, fontWeight: 'bold', color: REJECT_COLOR }, // Rojo para No Entregado/Cancelado
});

export default RegistroPedidosScreen;