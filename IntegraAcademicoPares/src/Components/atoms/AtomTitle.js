import React from 'react';
import { Text, StyleSheet } from 'react-native';
import globalStyles from '../../styles/globalStyles'; // Ajusta la ruta según sea necesario

const AtomTitle = ({ children, style }) => (
  <Text style={[globalStyles.title, style]}>{children}</Text>
);

export default AtomTitle;