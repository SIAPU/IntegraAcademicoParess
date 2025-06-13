import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import globalStyles from '../../styles/globalStyles'; // Ajusta la ruta según sea necesario
import colors from '../../constants/colors'; // Ajusta la ruta según sea necesario

const AtomPicker = ({ selectedValue, onValueChange, items, placeholder, error }) => (
  <View style={[globalStyles.pickerContainer, error && globalStyles.inputError]}>
    <Picker
      selectedValue={selectedValue}
      onValueChange={onValueChange}
      style={globalStyles.picker}
      itemStyle={{ color: colors.spotifyBlack }} // Estilo para ítems individuales si es necesario
    >
      {placeholder && <Picker.Item label={placeholder} value="" enabled={false} />}
      {items.map((item) => (
        <Picker.Item key={item.value} label={item.label} value={item.value} />
      ))}
    </Picker>
  </View>
);

export default AtomPicker;