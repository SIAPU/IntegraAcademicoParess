import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface MenuItem {
  id: string;
  label: string;
  iconName: keyof typeof Ionicons.glyphMap;
  backgroundColor: string;
  textColor: string;
}

const ActionMenuScreen: React.FC = () => {
  const menuItems: MenuItem[] = [
    {
      id: 'asistenciaProfesor',
      label: 'Asistencia Profesor',
      iconName: 'person-add',
      backgroundColor: '#28A745',
      textColor: '#FFFFFF',
    },
    {
      id: 'asistenciaAlumno',
      label: 'Asistencia Alumno',
      iconName: 'person',
      backgroundColor: '#6C757D',
      textColor: '#FFFFFF',
    },
    {
      id: 'reportarAlumno',
      label: 'Reportar Alumno',
      iconName: 'alert-circle',
      backgroundColor: '#DC3545',
      textColor: '#FFFFFF',
    },
    {
      id: 'estadisticasProgreso',
      label: 'Estadísticas y Progreso',
      iconName: 'stats-chart',
      backgroundColor: '#28A745',
      textColor: '#FFFFFF',
    },
    {
      id: 'gestionarGrupos',
      label: 'Gestionar Grupos',
      iconName: 'people',
      backgroundColor: '#343A40',
      textColor: '#FFFFFF',
    },
    {
      id: 'ajustesGenerales',
      label: 'Ajustes Generales',
      iconName: 'settings',
      backgroundColor: '#28A745',
      textColor: '#FFFFFF',
    },
  ];

  const handleActionPress = (item: MenuItem) => {
    Alert.alert('Acción del Menú', `Has seleccionado: ${item.label}`);
  };

  const handleBackToMenu = () => {
    Alert.alert('Navegación', 'Volver al menú anterior');
    // Aquí iría tu lógica de navegación para volver, similar a cómo manejaste el login.
    // Por ejemplo, si usas props de navegación o un manejador de estado global.
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.mainTitle}>SIAPU-UTTT</Text>
        <Text style={styles.headerSubtitle}>MENÚ DE ACCIONES</Text>
        <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.profileImage} />
      </View>

      <View style={styles.buttonsGrid}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.actionButton, { backgroundColor: item.backgroundColor }]}
            onPress={() => handleActionPress(item)}
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