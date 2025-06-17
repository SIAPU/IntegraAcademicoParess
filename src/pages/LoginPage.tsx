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
import { LoginForm } from '../organism/LoginForm';
import { colors } from '../constants/colors';
import { LoginFormData } from '../types';

interface LoginPageProps {
  onLogin: (data: LoginFormData) => Promise<void>;
  onNavigateToRegister: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ 
  onLogin, 
  onNavigateToRegister 
}) => {
  const handleLoginSubmit = async (loginData: LoginFormData): Promise<void> => {
    // Aquí implementarías la lógica de autenticación
    console.log('Datos de login:', loginData);
    
    try {
      // Ejemplo de llamada a API de autenticación
      // const response = await fetch('YOUR_LOGIN_API_ENDPOINT', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(loginData),
      // });
      
      // const result = await response.json();
      
      // if (!response.ok) {
      //   throw new Error(result.message || 'Error en el login');
      // }
      
      // Aquí guardarías el token de autenticación
      // await AsyncStorage.setItem('authToken', result.token);
      
      await onLogin(loginData);
    } catch (error) {
      console.error('Error en login:', error);
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
        <Text style={styles.headerTitle}>Bienvenido</Text>
        <Text style={styles.headerSubtitle}>
          Inicia sesión para acceder a tu cuenta
        </Text>
      </View>
      
      <LoginForm 
        onSubmit={handleLoginSubmit}
        onNavigateToRegister={onNavigateToRegister}
      />
    </SafeAreaView>
  );
};

interface LoginPageStyles {
  container: ViewStyle;
  header: ViewStyle;
  headerTitle: TextStyle;
  headerSubtitle: TextStyle;
}

const styles = StyleSheet.create<LoginPageStyles>({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});