import React from 'react';
import { Text, StyleSheet } from 'react-native';
import globalStyles from '../../styles/globalStyles'; // Ajusta la ruta según sea necesario

const AtomError = ({ children, visible }) => (
  visible ? <Text style={globalStyles.errorText}>{children}</Text> : null
);

export default AtomError;