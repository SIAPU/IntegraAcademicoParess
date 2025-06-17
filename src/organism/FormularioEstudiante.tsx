import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';
import { ImagePicker } from '../atoms/ImagePicker';
import { FormSection } from '../molecules/FormSection';
import { colors } from '../constants/colors';
import { validateForm } from '../utils/validation';
import { 
  StudentFormData, 
  ImageAsset, 
  StudentRegistrationFormProps 
} from '../types';

export const StudentRegistrationForm: React.FC<StudentRegistrationFormProps> = ({ 
  onSubmit 
}) => {
  const [formData, setFormData] = useState<StudentFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    studentId: '',
    birthDate: '',
    address: '',
    emergencyContact: '',
    emergencyPhone: '',
    photo: null,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof StudentFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const updateField = <K extends keyof StudentFormData>(
    field: K, 
    value: StudentFormData[K]
  ): void => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleImageSelected = (asset: ImageAsset): void => {
    setFormData(prev => ({ ...prev, photo: asset }));
    if (errors.photo) {
      setErrors(prev => ({ ...prev, photo: undefined }));
    }
  };

  const handleSubmit = async (): Promise<void> => {
    const validation = validateForm(formData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      Alert.alert(
        'Formulario Incompleto',
        'Por favor, corrige los errores marcados en rojo.',
        [{ text: 'OK' }]
      );
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
      Alert.alert(
        'Registro Exitoso',
        'El alumno ha sido registrado correctamente.',
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert(
        'Error',
        'Ocurrió un error al registrar el alumno. Intenta nuevamente.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          {/* Foto del Alumno */}
          <FormSection title="Foto del Alumno">
            <ImagePicker
              onImageSelected={handleImageSelected}
              imageUri={formData.photo?.uri}
              error={errors.photo}
            />
          </FormSection>

          {/* Información Personal */}
          <FormSection title="Información Personal">
            <Input
              label="Nombres *"
              value={formData.firstName}
              onChangeText={(text: string) => updateField('firstName', text)}
              placeholder="Ingresa los nombres"
              error={errors.firstName}
              autoCapitalize="words"
            />
            
            <Input
              label="Apellidos *"
              value={formData.lastName}
              onChangeText={(text: string) => updateField('lastName', text)}
              placeholder="Ingresa los apellidos"
              error={errors.lastName}
              autoCapitalize="words"
            />
            
            <Input
              label="Número de Estudiante *"
              value={formData.studentId}
              onChangeText={(text: string) => updateField('studentId', text)}
              placeholder="Ej: EST001234"
              error={errors.studentId}
              autoCapitalize="characters"
            />
            
            <Input
              label="Fecha de Nacimiento *"
              value={formData.birthDate}
              onChangeText={(text: string) => updateField('birthDate', text)}
              placeholder="DD/MM/AAAA"
              error={errors.birthDate}
              keyboardType="numeric"
            />
          </FormSection>

          {/* Información de Contacto */}
          <FormSection title="Información de Contacto">
            <Input
              label="Correo Electrónico *"
              value={formData.email}
              onChangeText={(text: string) => updateField('email', text)}
              placeholder="estudiante@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
            />
            
            <Input
              label="Teléfono *"
              value={formData.phone}
              onChangeText={(text: string) => updateField('phone', text)}
              placeholder="Ej: +52 123 456 7890"
              keyboardType="phone-pad"
              error={errors.phone}
            />
            
            <Input
              label="Dirección *"
              value={formData.address}
              onChangeText={(text: string) => updateField('address', text)}
              placeholder="Dirección completa"
              multiline
              error={errors.address}
              autoCapitalize="sentences"
            />
          </FormSection>

          {/* Contacto de Emergencia */}
          <FormSection title="Contacto de Emergencia">
            <Input
              label="Nombre del Contacto *"
              value={formData.emergencyContact}
              onChangeText={(text: string) => updateField('emergencyContact', text)}
              placeholder="Nombre completo"
              error={errors.emergencyContact}
              autoCapitalize="words"
            />
            
            <Input
              label="Teléfono de Emergencia *"
              value={formData.emergencyPhone}
              onChangeText={(text: string) => updateField('emergencyPhone', text)}
              placeholder="Ej: +52 123 456 7890"
              keyboardType="phone-pad"
              error={errors.emergencyPhone}
            />
          </FormSection>

          <Button
            title={isSubmitting ? "Registrando..." : "Registrar Alumno"}
            onPress={handleSubmit}
            disabled={isSubmitting}
            style={styles.submitButton}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

interface FormStyles {
  container: ViewStyle;
  scrollView: ViewStyle;
  form: ViewStyle;
  submitButton: ViewStyle;
}

const styles = StyleSheet.create<FormStyles>({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  form: {
    padding: 20,
  },
  submitButton: {
    marginTop: 20,
    marginBottom: 40,
  },
});