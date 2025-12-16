import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Image
} from 'react-native';

import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

export default function Index() {
  const [pantalla, setPantalla] = useState('lista');
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [imagen, setImagen] = useState(null);

  const productos = [
    {
      id: 1,
      nombre: 'Mouse Gamer',
      descripcion: 'Mouse RGB',
      precio: 450,
      categoria: 'Tecnología',
      estado: 'Disponible'
    }
  ];

  const abrirCamara = async () => {
    const permiso = await ImagePicker.requestCameraPermissionsAsync();
    if (!permiso.granted) return;

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.5
    });

    if (!result.canceled) {
      setImagen(result.assets[0].uri);
    }
  };

  if (pantalla === 'form') {
    return (
      <SafeAreaView style={estilo.contenedor}>
        <TextInput placeholder="Nombre" style={estilo.input} />
        <TextInput placeholder="Descripción" style={estilo.input} />
        <TextInput placeholder="Estado" style={estilo.input} />
        <TextInput placeholder="Categoría" style={estilo.input} />
        <TextInput placeholder="Precio" style={estilo.input} />

        <TouchableOpacity style={estilo.imagenBox} onPress={abrirCamara}>
          {imagen ? (
            <Image source={{ uri: imagen }} style={estilo.imagen} />
          ) : (
            <Text>Tomar fotografía</Text>
          )}
        </TouchableOpacity>

        <Button title="Guardar" onPress={() => setPantalla('lista')} />
      </SafeAreaView>
    );
  }

  if (pantalla === 'detalle') {
    return (
      <SafeAreaView style={estilo.contenedor}>
        <Text style={estilo.titulo}>Ver detalle del item</Text>

        <View style={estilo.imagenBox}>
          {imagen && (
            <Image source={{ uri: imagen }} style={estilo.imagen} />
          )}
        </View>

        <Text>Nombre: {productoSeleccionado.nombre}</Text>
        <Text>Precio: L. {productoSeleccionado.precio}</Text>
        <Text>Descripción: {productoSeleccionado.descripcion}</Text>

        <View style={{ marginTop: 15 }}>
          <Button
            title="Eliminar"
            color="red"
            onPress={() => setPantalla('lista')}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={estilo.contenedor}>
      <Button title="Nuevo Producto" onPress={() => setPantalla('form')} />

      <View style={estilo.fila}>
        <Text style={estilo.celda}>Nombre</Text>
        <Text style={estilo.celda}>Precio</Text>
        <Text style={estilo.celda}>Acción</Text>
      </View>

      {productos.map(p => (
        <View key={p.id} style={estilo.fila}>
          <Text style={estilo.celda}>{p.nombre}</Text>
          <Text style={estilo.celda}>L. {p.precio}</Text>

          <TouchableOpacity
            style={estilo.botonVer}
            onPress={() => {
              setProductoSeleccionado(p);
              setPantalla('detalle');
            }}
          >
            <Text style={{ color: 'white' }}>Ver</Text>
          </TouchableOpacity>
        </View>
      ))}
    </SafeAreaView>
  );
}

const estilo = {
  contenedor: {
    flex: 1,
    padding: 20,
    paddingTop: 40
  },
  titulo: {
    fontSize: 18,
    marginBottom: 10
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 10
  },
  imagenBox: {
    height: 120,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  imagen: {
    width: '100%',
    height: '100%'
  },
  fila: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center'
  },
  celda: {
    flex: 1
  },
  botonVer: {
    backgroundColor: 'green',
    padding: 6
  }
};
