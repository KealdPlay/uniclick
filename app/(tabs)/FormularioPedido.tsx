import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

// Definimos el tipo de datos que esperamos recibir de la otra pantalla
type SearchParams = {
  idProducto?: string;
  nombreProducto?: string;
  precio?: string;
};

export default function FormularioPedido() {
  const router = useRouter();
  const params = useLocalSearchParams<SearchParams>();

  // ESTADOS CON VALORES DE EJEMPLO (Para probar sin escribir)
  const [idProducto, setIdProducto] = useState<string>('99');
  const [nombreProducto, setNombreProducto] = useState<string>('Producto de Prueba');
  const [cantidad, setCantidad] = useState<string>('2');
  const [precioUnitario, setPrecioUnitario] = useState<string>('150.00'); 
  const [puntoEntrega, setPuntoEntrega] = useState<string>('Edificio K - Cafetería');
  const [telefono, setTelefono] = useState<string>('4491234567');
  const [notas, setNotas] = useState<string>('Entregar antes de las 2pm por favor.');
  
  const [cargando, setCargando] = useState<boolean>(false);

  // Si recibimos datos reales de la navegación, sobreescribimos los de prueba
  useEffect(() => {
    if (params.idProducto) setIdProducto(params.idProducto);
    if (params.nombreProducto) setNombreProducto(params.nombreProducto);
    if (params.precio) setPrecioUnitario(params.precio);        
  }, [params]);

  // Cálculo seguro del total
  const totalCalculado = (
    (parseFloat(precioUnitario || '0') * parseInt(cantidad || '1', 10))
  ).toFixed(2);

  const confirmarPedido = async () => {
    // Validación simple
    if (!idProducto || !cantidad || !puntoEntrega || !telefono) {
      Alert.alert("Faltan datos", "Por favor llena los campos obligatorios.");
      return;
    }

    // SIMULACIÓN DE CARGA (Sin backend)
    setCargando(true);
    
    // Esperamos 1.5 segundos para que parezca que procesa
    setTimeout(() => {
        setCargando(false);
        
        // Mostramos éxito falso
        Alert.alert(
            "¡Pedido Exitoso! (Simulado)", 
            "Tu pedido ha sido enviado al vendedor (Esto es una prueba local).", 
            [
                { 
                    text: "OK", 
                    onPress: () => router.push("/") // Redirige al inicio
                }
            ]
        );
        
        // Limpiamos (Opcional, para pruebas puedes dejarlo así)
        // setIdProducto('');
        // setCantidad('1');
    }, 1500);
  };

  return (
    <ScrollView contentContainerStyle={styles.fondoGeneral}>
      <View style={styles.cardContainer}>
        <Text style={styles.titulo}>Realizar Pedido</Text>

        <Text style={styles.label}>Producto Seleccionado</Text>
        {nombreProducto ? (
            <TextInput
              style={[styles.input, styles.inputBloqueado]} 
              value={nombreProducto} 
              editable={false}       
            />
        ) : (
            <TouchableOpacity onPress={() => router.push("/")} style={styles.botonAlerta}>
                <Text style={styles.textoAlerta}>⚠️ No has seleccionado producto. Ir al Inicio</Text>
            </TouchableOpacity>
        )}

        <View style={styles.row}>
            <View style={styles.halfInput}>
                <Text style={styles.label}>Precio</Text>
                <TextInput
                style={[styles.input, styles.inputBloqueado]}
                value={`$ ${precioUnitario}`}
                editable={false} 
                />
            </View>
            <View style={styles.halfInput}>
                <Text style={styles.label}>Cantidad *</Text>
                <TextInput
                style={styles.input}
                placeholder="1"
                placeholderTextColor="#999"
                keyboardType="numeric"
                value={cantidad}
                onChangeText={setCantidad}
                />
            </View>
        </View>

        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total a Pagar:</Text>
          <Text style={styles.totalValue}>$ {totalCalculado}</Text>
        </View>

        <Text style={styles.label}>Punto de Entrega *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Ej. Cafetería central, mesa 4..."
          placeholderTextColor="#999"
          multiline
          numberOfLines={2}
          value={puntoEntrega}
          onChangeText={setPuntoEntrega}
        />

        <Text style={styles.label}>Teléfono de Contacto *</Text>
        <TextInput
          style={styles.input}
          placeholder="55 1234 5678"
          placeholderTextColor="#999"
          keyboardType="phone-pad"
          value={telefono}
          onChangeText={setTelefono}
        />

        <Text style={styles.label}>Notas para el vendedor</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Ej. Traer cambio de $500..."
          placeholderTextColor="#999"
          multiline
          numberOfLines={2}
          value={notas}
          onChangeText={setNotas}
        />

        <TouchableOpacity 
          style={[styles.botonGuardar, !nombreProducto && {backgroundColor: '#ccc'}]} 
          onPress={confirmarPedido}
          disabled={cargando || !nombreProducto} 
        >
          {cargando ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.textoBotonGuardar}>Confirmar Pedido</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fondoGeneral: { flexGrow: 1, backgroundColor: '#f5f5f5', padding: 20, paddingTop: 40 },
  cardContainer: { backgroundColor: 'white', borderRadius: 15, padding: 20, shadowColor: '#000', elevation: 4 },
  titulo: { fontSize: 24, fontWeight: 'bold', color: '#000', marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 6 },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 15, fontSize: 16, color: '#000' },
  inputBloqueado: { backgroundColor: '#e9ecef', color: '#495057', fontWeight: 'bold' },
  textArea: { height: 60, textAlignVertical: 'top' },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  halfInput: { width: '48%' },
  totalContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f0f0f0', padding: 15, borderRadius: 8, marginBottom: 20, borderWidth: 1, borderColor: '#ddd' },
  totalLabel: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  totalValue: { fontSize: 20, fontWeight: 'bold', color: '#000' },
  botonGuardar: { backgroundColor: '#000', paddingVertical: 15, borderRadius: 8, alignItems: 'center', marginTop: 5, shadowColor: '#000', elevation: 5 },
  textoBotonGuardar: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  botonAlerta: { backgroundColor: '#fff3cd', padding: 10, borderRadius: 5, marginBottom: 15 },
  textoAlerta: { color: '#856404', fontWeight: 'bold', textAlign: 'center' }
});