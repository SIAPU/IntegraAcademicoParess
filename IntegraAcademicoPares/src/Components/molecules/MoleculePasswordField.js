import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import AtomLabel from '../atoms/AtomLabel';
import AtomInput from '../atoms/AtomInput';
import AtomError from '../atoms/AtomError';
import globalStyles from '../../styles/globalStyles'; // Ajusta la ruta según sea necesario

const MoleculePasswordField = ({ label, placeholder, value, onChangeText, required = false, error = '' }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={globalStyles.fieldContainer}>
      <AtomLabel required={required}>{label}</AtomLabel>
      <View style={globalStyles.passwordContainer}>
        <AtomInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!showPassword}
          error={!!error}
          style={globalStyles.passwordInput}
        />
        <TouchableOpacity
          style={globalStyles.passwordToggle}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Text style={globalStyles.passwordToggleText}>
            {showPassword ? '👁️' : '👁️‍🗨️'}
          </Text>
        </TouchableOpacity>
      </View>
      <AtomError visible={!!error}>{error}</AtomError>
    </View>
  );
};

export default MoleculePasswordField;