import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../constants/colors';
import { ButtonProps } from '../types';

export const Button: React.FC<ButtonProps> = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  disabled = false,
  style = {} 
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[variant],
        disabled && styles.disabled,
        style
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={[styles.buttonText, styles[`${variant}Text` as keyof typeof styles]]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

interface Styles {
  button: ViewStyle;
  primary: ViewStyle;
  secondary: ViewStyle;
  danger: ViewStyle;
  disabled: ViewStyle;
  buttonText: TextStyle;
  primaryText: TextStyle;
  secondaryText: TextStyle;
  dangerText: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  danger: {
    backgroundColor: colors.error,
  },
  disabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: colors.white,
  },
  secondaryText: {
    color: colors.primary,
  },
  dangerText: {
    color: colors.white,
  },
});