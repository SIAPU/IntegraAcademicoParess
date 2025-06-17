import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { StudentRegistrationForm } from '../organism/FormularioEstudiante';
import { colors } from '../constants/colors';
import { StudentFormData } from '../types';

export const StudentRegistrationPage: React.FC = () => {
  const handleFormSubmit = async (studentData: StudentFormData): Promise<void> => {
    // Aquí implementarías la lógica para enviar los datos al servidor
    console.log('Datos del estudiante:', studentData);
    
    // Ejemplo de envío a API con TypeScript
    try {
      const formData = new FormData();
      
      // Iterar sobre las propiedades del estudiante con tipado
      (Object.keys(studentData) as Array<keyof StudentFormData>).forEach(key => {
        const value = studentData[key];
        
        if (key === 'photo' && value) {
          formData.append('photo', {
            uri: value.uri,
            type: value.type || 'image/jpeg',
            name: value.fileName || 'photo.jpg',
          } as any);
        } else if (value !== null) {
          formData.append(key, String(value));
        }
      });

      // Ejemplo de llamada a API
      // const response = await fetch('YOUR_API_ENDPOINT', {
      //   method: 'POST',
      //   body: formData,
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // });
      
      // const result = await response.json();
      // return result;
      
      // Simulación de éxito
      return Promise.resolve();
    } catch (error) {
      console.error('Error submitting form:', error);
      throw error;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.secondary}
      />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Registro de Alumno</Text>
        <Text style={styles.headerSubtitle}>
          Completa todos los campos para acceder a la plataforma
        </Text>
      </View>
      
      <StudentRegistrationForm onSubmit={handleFormSubmit} />
    </SafeAreaView>
  );
};

interface PageStyles {
  container: ViewStyle;
  header: ViewStyle;
  headerTitle: TextStyle;
  headerSubtitle: TextStyle;
}

const styles = StyleSheet.create<PageStyles>({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});