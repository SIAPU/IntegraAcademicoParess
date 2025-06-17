import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../constants/colors';
import { FormSectionProps } from '../types';

export const FormSection: React.FC<FormSectionProps> = ({ title, children }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
};

interface FormSectionStyles {
  section: ViewStyle;
  sectionTitle: TextStyle;
}

const styles = StyleSheet.create<FormSectionStyles>({
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 16,
  },
});