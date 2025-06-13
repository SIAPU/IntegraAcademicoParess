import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import AtomLabel from '../atoms/AtomLabel';
import globalStyles from '../../styles/globalStyles'; // Ajusta la ruta según sea necesario

const MoleculePhotoField = ({ label, photo, onSelectPhoto, required = false }) => (
  <View style={globalStyles.fieldContainer}>
    <AtomLabel required={required}>{label}</AtomLabel>
    <TouchableOpacity style={globalStyles.photoContainer} onPress={onSelectPhoto}>
      {photo ? (
        <Image source={{ uri: photo }} style={globalStyles.photoPreview} />
      ) : (
        <View style={globalStyles.photoPlaceholder}>
          <Text style={globalStyles.photoPlaceholderText}>📷</Text>
          <Text style={globalStyles.photoPlaceholderLabel}>Seleccionar foto</Text>
        </View>
      )}
    </TouchableOpacity>
  </View>
);

export default MoleculePhotoField;