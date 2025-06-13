import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MoleculeField from '../molecules/MoleculeField';
import MoleculePasswordField from '../molecules/MoleculePasswordField';
import AtomButton from '../atoms/AtomButton';
import AtomTitle from '../atoms/AtomTitle';
import globalStyles from '../../styles/globalStyles'; // Ajusta la ruta según sea necesario

const OrganismLoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    return email.endsWith('.utt.mx');
  };

  const handleLogin = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'El correo es requerido';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Debe ser un correo institucional (.utt.mx)';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Login successful');
      // Lógica de inicio de sesión aquí
    }
  };

  return (
    <ScrollView style={globalStyles.container}>
      <View style={globalStyles.formContainer}>
        <AtomTitle style={globalStyles.formTitle}>Iniciar Sesión</AtomTitle>

        <MoleculeField
          label="Correo Institucional"
          placeholder="usuario@utt.mx"
          value={formData.email}
          onChangeText={(text) => setFormData({...formData, email: text})}
          keyboardType="email-address"
          required
          error={errors.email}
        />
        <MoleculePasswordField
          label="Contraseña"
          placeholder="Ingresa tu contraseña"
          value={formData.password}
          onChangeText={(text) => setFormData({...formData, password: text})}
          required
          error={errors.password}
        />
        <TouchableOpacity style={globalStyles.forgotPassword}>
          <Text style={globalStyles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
        <AtomButton
          title="Iniciar Sesión"
          onPress={handleLogin}
          style={globalStyles.submitButton}
        />
      </View>
    </ScrollView>
  );
};

export default OrganismLoginForm;