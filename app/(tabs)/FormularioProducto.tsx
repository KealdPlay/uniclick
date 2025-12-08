import * as ImagePicker from 'expo-image-picker';

import React, { useState } from 'react';

import {

    ActivityIndicator,

    Alert,

    Image,

    ScrollView,

    StyleSheet,

    Switch,

    Text,

    TextInput,

    TouchableOpacity,

    View

} from 'react-native';



export default function FormularioProducto() {


  const [nombre, setNombre] = useState<string>('');

  const [descripcion, setDescripcion] = useState<string>('');

  const [precio, setPrecio] = useState<string>('');

  const [cantidad, setCantidad] = useState<string>('');

  const [turno, setTurno] = useState<string>('');

  const [incluyeEnvio, setIncluyeEnvio] = useState<boolean>(false);

  const [salon, setSalon] = useState<string>('');

  const [telefono, setTelefono] = useState<string>('');

  const [clabe, setClabe] = useState<string>('');

  const [imagen, setImagen] = useState<string | null>(null);

  const [cargando, setCargando] = useState<boolean>(false);



  // ✅ PUERTO CORRECTO: 5265

  const API_URL = "http://10.2.21.125:5265/api/Productos";



  const seleccionarImagen = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({

      mediaTypes: ImagePicker.MediaTypeOptions.Images,

      allowsEditing: true,

      aspect: [4, 3],

      quality: 0.5,

      base64: true,

    });



    if (!result.canceled && result.assets && result.assets.length > 0) {

      // TypeScript necesita asegurar que assets[0] existe y tiene base64

      const base64 = result.assets[0].base64;

      if (base64) {

        setImagen(`data:image/jpeg;base64,${base64}`);

      }

    }

  };



  const guardarProducto = async () => {

    if (!nombre || !precio || !telefono || !turno) {

      Alert.alert("Faltan datos", "Por favor llena los campos obligatorios");

      return;

    }



    setCargando(true);



    const nuevoProducto = {

      idVendedor: 1,

      nombreProducto: nombre,

      descripcion: descripcion,

      precio: parseFloat(precio),

      cantidad: parseInt(cantidad, 10) || 1,

      turno: turno,                      

      incluyeEnvio: incluyeEnvio,        

      salonVendedor: salon,              

      telefonoContacto: telefono,        

      clabe: clabe,                      

      imagenBase64: imagen,

      categoria: "General",

      activo: true,

      disponible: true,

      fechaPublicacion: new Date().toISOString()

    };



    try {

      console.log("Enviando a:", API_URL);

      const response = await fetch(API_URL, {

        method: 'POST',

        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify(nuevoProducto),

      });



      if (response.ok) {

        Alert.alert("¡Éxito!", "Producto publicado correctamente");

        setNombre('');

        setDescripcion('');

        setPrecio('');

        setCantidad('');

        setTurno('');

        setSalon('');

        setTelefono('');

        setClabe('');

        setIncluyeEnvio(false);

        setImagen(null);

      } else {

        const errorText = await response.text();

        Alert.alert("Error", "No se pudo guardar: " + errorText);

      }

    } catch (error) {

      console.error(error);

      Alert.alert("Error de Conexión", "Verifica el puerto 5265.");

    } finally {

      setCargando(false);

    }

  };



  return (

    <ScrollView contentContainerStyle={styles.fondoGeneral}>

      <View style={styles.cardContainer}>

        <Text style={styles.titulo}>Publicar Producto</Text>



        <Text style={styles.label}>Nombre del Producto *</Text>

        <TextInput

          style={styles.input}

          placeholder="Ej. Silla Gamer"

          placeholderTextColor="#999"

          value={nombre}

          onChangeText={setNombre}

        />



        <Text style={styles.label}>Descripción</Text>

        <TextInput

          style={[styles.input, styles.textArea]}

          placeholder="Detalles del producto..."

          placeholderTextColor="#999"

          multiline

          numberOfLines={3}

          value={descripcion}

          onChangeText={setDescripcion}

        />



        <View style={styles.row}>

          <View style={styles.halfInput}>

            <Text style={styles.label}>Precio *</Text>

            <TextInput

              style={styles.input}

              placeholder="$ 0.00"

              placeholderTextColor="#999"

              keyboardType="numeric"

              value={precio}

              onChangeText={setPrecio}

            />

          </View>

          <View style={styles.halfInput}>

            <Text style={styles.label}>Cantidad</Text>

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



        <Text style={styles.label}>Seleccionar Turno *</Text>

        <TextInput

          style={styles.input}

          placeholder="Ej. Matutino / Vespertino"

          placeholderTextColor="#999"

          value={turno}

          onChangeText={setTurno}

        />



        <View style={styles.switchContainer}>

          <Text style={styles.label}>¿Incluye envío?</Text>

          <Switch

            trackColor={{ false: "#767577", true: "#000" }}

            thumbColor={incluyeEnvio ? "#fff" : "#f4f3f4"}

            onValueChange={setIncluyeEnvio}

            value={incluyeEnvio}

          />

        </View>



        <Text style={styles.label}>Salón del vendedor</Text>

        <TextInput

          style={styles.input}

          placeholder="Ej. Edificio A, Aula 3"

          placeholderTextColor="#999"

          value={salon}

          onChangeText={setSalon}

        />



        <Text style={styles.label}>Número de teléfono *</Text>

        <TextInput

          style={styles.input}

          placeholder="55 1234 5678"

          placeholderTextColor="#999"

          keyboardType="phone-pad"

          value={telefono}

          onChangeText={setTelefono}

        />



        <Text style={styles.label}>CLABE (Opcional, 18 dígitos)</Text>

        <TextInput

          style={styles.input}

          placeholder="1234..."

          placeholderTextColor="#999"

          keyboardType="numeric"

          maxLength={18}

          value={clabe}

          onChangeText={setClabe}

        />



        <TouchableOpacity style={styles.botonImagen} onPress={seleccionarImagen}>

          <Text style={styles.textoBotonImagen}>

            {imagen ? "📸 Cambiar Imagen" : "📷 Subir Imagen"}

          </Text>

        </TouchableOpacity>



        {imagen && (

          <Image source={{ uri: imagen }} style={styles.previewImagen} />

        )}



        <TouchableOpacity

          style={styles.botonGuardar}

          onPress={guardarProducto}

          disabled={cargando}

        >

          {cargando ? (

            <ActivityIndicator color="#fff" />

          ) : (

            <Text style={styles.textoBotonGuardar}>Publicar Producto</Text>

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

  textArea: { height: 80, textAlignVertical: 'top' },

  row: { flexDirection: 'row', justifyContent: 'space-between' },

  halfInput: { width: '48%' },

  switchContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, paddingHorizontal: 5 },

  botonImagen: { backgroundColor: '#f0f0f0', borderWidth: 1, borderColor: '#ccc', borderStyle: 'dashed', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 20 },

  textoBotonImagen: { color: '#000', fontWeight: '600', fontSize: 15 },

  previewImagen: { width: '100%', height: 200, borderRadius: 10, marginBottom: 20, resizeMode: 'cover', borderWidth: 1, borderColor: '#eee' },

  botonGuardar: { backgroundColor: '#000', paddingVertical: 15, borderRadius: 8, alignItems: 'center', marginTop: 5, shadowColor: '#000', elevation: 5 },

  textoBotonGuardar: { color: 'white', fontWeight: 'bold', fontSize: 16 },

});