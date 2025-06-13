import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import globalStyles from '../../styles/globalStyles'; // Ajusta la ruta según sea necesario

const AtomInput = ({ placeholder, value, onChangeText, secureTextEntry, keyboardType, error, style }) => (
  <TextInput
    style={[globalStyles.input, error && globalStyles.inputError, style]}
    placeholder={placeholder}
    value={value}
    onChangeText={onChangeText}
    secureTextEntry={secureTextEntry}
    keyboardType={keyboardType}
    placeholderTextColor={globalStyles.input.color} // Asegura el color del texto del placeholder
  />
);

export default AtomInput;