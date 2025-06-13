import React from 'react';
import { Text, StyleSheet } from 'react-native';
import globalStyles from '../../styles/globalStyles'; // Ajusta la ruta según sea necesario

const AtomLabel = ({ children, required }) => (
  <Text style={globalStyles.label}>
    {children}
    {required && <Text style={globalStyles.required}> *</Text>}
  </Text>
);

export default AtomLabel;