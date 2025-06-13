import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import globalStyles from '../../styles/globalStyles'; // Ajusta la ruta según sea necesario

const AtomButton = ({ title, onPress, style, disabled }) => (
  <TouchableOpacity
    style={[globalStyles.button, style, disabled && globalStyles.buttonDisabled]}
    onPress={onPress}
    disabled={disabled}
  >
    <Text style={globalStyles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

export default AtomButton;