import React from 'react';
import { View, StyleSheet } from 'react-native';
import AtomLabel from '../atoms/AtomLabel';
import AtomPicker from '../atoms/AtomPicker';
import AtomError from '../atoms/AtomError';
import globalStyles from '../../styles/globalStyles'; // Ajusta la ruta según sea necesario

const MoleculePickerField = ({ label, selectedValue, onValueChange, items, placeholder, required = false, error = '' }) => (
  <View style={globalStyles.fieldContainer}>
    <AtomLabel required={required}>{label}</AtomLabel>
    <AtomPicker
      selectedValue={selectedValue}
      onValueChange={onValueChange}
      items={items}
      placeholder={placeholder}
      error={!!error}
    />
    <AtomError visible={!!error}>{error}</AtomError>
  </View>
);

export default MoleculePickerField;