import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

interface MenuItem {
  id: string;
  label: string;
  iconName: keyof typeof Ionicons.glyphMap;
  backgroundColor: string;
  textColor: string;
  path?: string;
}

const ActionMenuScreen: React.FC = () => {
  const menuItems: MenuItem[] = [
    {
      id: 'asistenciaProfesor',
      label: 'Asistencia Profesor',
      iconName: 'person-add',
      backgroundColor: '#28A745',
      textColor: '#FFFFFF',
      path: '../',
    },
    {
      id: 'asistenciaAlumno',
      label: 'Asistencia Alumno',
      iconName: 'person',
      backgroundColor: '#6C757D',
      textColor: '#FFFFFF',
      path: '../',
    },
    {
      id: 'reportarAlumno',
      label: 'Reportar Alumno',
      iconName: 'alert-circle',
      backgroundColor: '#DC3545',
      textColor: '#FFFFFF',
      path: '/Asesores/ReportarAlumno',
    },
    {
      id: 'estadisticasProgreso',
      label: 'Estadísticas y Progreso',
      iconName: 'stats-chart',
      backgroundColor: '#28A745',
      textColor: '#FFFFFF',
      path: '../',
    },
    {
      id: 'gestionarGrupos',
      label: 'Gestionar Grupos',
      iconName: 'people',
      backgroundColor: '#343A40',
      textColor: '#FFFFFF',
      path: '/Asesores/GestionarGrupos',
    },
    {
      id: 'ajustesGenerales',
      label: 'Ajustes Generales',
      iconName: 'settings',
      backgroundColor: '#28A745',
      textColor: '#FFFFFF',
      path: '../',
    },
  ];

const handleActionPress = (item: MenuItem) => {
    // Si el elemento tiene una ruta definida, navega a ella
    if (item.path) {
      router.push(item.path);
    } else {
      Alert.alert('Acción no configurada', `La acción para "${item.label}" aún no tiene una ruta asignada.`);
    }
  };

  const handleBackToMenu = () => {
    // Usa router.back() para volver a la pantalla anterior en la pila de navegación
    router.back();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.mainTitle}>SIAPU-UTTT</Text>
        <Text style={styles.headerSubtitle}>MENÚ DE ACCIONES</Text>
        {/* Usar una imagen local o un recurso estático si es posible en lugar de placeholder.com */}
        <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOein9cEe4ZqNcDRVWDgfdiSs8OOcMr9Kwvg&s' }} style={styles.profileImage} />
      </View>

      <View style={styles.buttonsGrid}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.actionButton, { backgroundColor: item.backgroundColor }]}
            onPress={() => handleActionPress(item)} // Llama a la nueva función
          >
            <Ionicons name={item.iconName} size={40} color={item.textColor} />
            <Text style={[styles.actionButtonText, { color: item.textColor }]}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.backButton} onPress={handleBackToMenu}>
        <Text style={styles.backButtonText}>Volver al menú</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
    alignItems: 'center',
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
    paddingVertical: 16,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#10B981',
    marginBottom: 5,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#10B981',
    marginTop: 10,
  },
  buttonsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
  },
  actionButton: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    padding: 10,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 10,
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#28A745',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 30,
    width: '80%',
    alignSelf: 'center',
    shadowColor: '#28A745',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default ActionMenuScreen;