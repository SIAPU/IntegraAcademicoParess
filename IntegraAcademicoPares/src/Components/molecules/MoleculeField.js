import React from 'react';
import { View, StyleSheet } from 'react-native';
import AtomLabel from '../atoms/AtomLabel';
import AtomInput from '../atoms/AtomInput';
import AtomError from '../atoms/AtomError';
import globalStyles from '../../styles/globalStyles'; // Ajusta la ruta según sea necesario

const MoleculeField = ({ label, placeholder, value, onChangeText, required = false, error = '', secureTextEntry = false, keyboardType = 'default' }) => (
  <View style={globalStyles.fieldContainer}>
    <AtomLabel required={required}>{label}</AtomLabel>
    <AtomInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      error={!!error}
    />
    <AtomError visible={!!error}>{error}</AtomError>
  </View>
);

export default MoleculeField;