import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';
import { FormSection } from '../molecules/FormSection';
import { colors } from '../constants/colors';
import { validateLoginForm } from '../utils/validation';
import { LoginFormData, LoginFormProps } from '../types';

export const LoginForm: React.FC<LoginFormProps> = ({ 
  onSubmit,
  onNavigateToRegister 
}) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const updateField = <K extends keyof LoginFormData>(
    field: K, 
    value: LoginFormData[K]
  ): void => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (): Promise<void> => {
    const validation = validateLoginForm(formData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      Alert.alert(
        'Datos Incorrectos',
        'Por favor, corrige los errores marcados.',
        [{ text: 'OK' }]
      );
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
    } catch (error) {
      Alert.alert(
        'Error de Inicio de Sesión',
        'Credenciales incorrectas. Verifica tu email y contraseña.',
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
      <View style={styles.form}>
        <FormSection title="Iniciar Sesión">
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
            label="Contraseña *"
            value={formData.password}
            onChangeText={(text: string) => updateField('password', text)}
            placeholder="Ingresa tu contraseña"
            secureTextEntry
            error={errors.password}
          />
        </FormSection>

        <Button
          title={isSubmitting ? "Iniciando sesión..." : "Iniciar Sesión"}
          onPress={handleSubmit}
          disabled={isSubmitting}
          style={styles.loginButton}
        />

        <Button
          title="¿No tienes cuenta? Regístrate"
          onPress={onNavigateToRegister}
          variant="secondary"
          style={styles.registerButton}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

interface LoginFormStyles {
  container: ViewStyle;
  form: ViewStyle;
  loginButton: ViewStyle;
  registerButton: ViewStyle;
}

const styles = StyleSheet.create<LoginFormStyles>({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
  },
  form: {
    padding: 20,
  },
  loginButton: {
    marginTop: 20,
  },
  registerButton: {
    marginTop: 16,
  },
});