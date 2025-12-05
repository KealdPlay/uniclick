import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PedidoPreviewScreen() {

  const router = useRouter();

  // Aquí obtienes los datos enviados desde otra pantalla
  const {
    nombreCliente = "Sin datos",
    nombreProducto = "Sin datos",
    cantidad = "Sin datos",
    telefono = "Sin datos"
  } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>

      {/* Flecha de regreso */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>{'<'}</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.scrollContent}>

        <View style={styles.card}>

          <View style={styles.section}>
            <Text style={styles.title}>Nombre del que realizó el pedido</Text>
            <Text style={styles.value}>{String(nombreCliente)}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.title}>Nombre del producto</Text>
            <Text style={styles.value}>{String(nombreProducto)}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.title}>Cantidad</Text>
            <Text style={styles.value}>{String(cantidad)}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.title}>Número de teléfono</Text>
            <Text style={styles.value}>{String(telefono)}</Text>
          </View>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f0f0' },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  card: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  section: { marginBottom: 25, alignItems: 'center' },
  title: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 4 },
  value: { fontSize: 16, color: '#555' },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    left: 20,
    zIndex: 10,
    padding: 10,
  },
  backButtonText: { fontSize: 28, fontWeight: 'bold', color: '#333' },
});
