import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

interface ResetPasswordData {
  nuevaContraseña: string;
  confirmarContraseña: string;
}

interface Errors {
  [key: string]: string;
}

const { width, height } = Dimensions.get('window');

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  error?: string;
  secureTextEntry?: boolean;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  secureTextEntry = false,
  rightIcon,
  onRightIconPress
}) => (
  <View style={styles.inputContainer}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputWrapper}>
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#6B7280"
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="next"
        blurOnSubmit={false}
        textContentType="password"
      />
      {rightIcon && (
        <TouchableOpacity style={styles.rightIcon} onPress={onRightIconPress}>
          <Ionicons name={rightIcon} size={20} color="#6B7280" />
        </TouchableOpacity>
      )}
    </View>
    {error && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

const PasswordStrengthIndicator: React.FC<{ password: string }> = ({ password }) => {
  const getPasswordStrength = (pass: string) => {
    let strength = 0;
    let feedback = [];

    if (pass.length >= 8) strength++;
    else feedback.push('Al menos 8 caracteres');

    if (/[a-z]/.test(pass)) strength++;
    else feedback.push('Una letra minúscula');

    if (/[A-Z]/.test(pass)) strength++;
    else feedback.push('Una letra mayúscula');

    if (/\d/.test(pass)) strength++;
    else feedback.push('Un número');

    if (/[!@#$%^&*(),.?":{}|<>]/.test(pass)) strength++;
    else feedback.push('Un carácter especial');

    return { strength, feedback };
  };

  const { strength, feedback } = getPasswordStrength(password);
  
  const getStrengthColor = () => {
    if (strength <= 2) return '#EF4444';
    if (strength <= 3) return '#F59E0B';
    return '#10B981';
  };

  const getStrengthText = () => {
    if (strength <= 2) return 'Débil';
    if (strength <= 3) return 'Media';
    return 'Fuerte';
  };

  return password ? (
    <View style={styles.strengthContainer}>
      <View style={styles.strengthHeader}>
        <Text style={styles.strengthLabel}>Seguridad de la contraseña:</Text>
        <Text style={[styles.strengthText, { color: getStrengthColor() }]}>
          {getStrengthText()}
        </Text>
      </View>
      <View style={styles.strengthBar}>
        {[1, 2, 3, 4, 5].map((level) => (
          <View
            key={level}
            style={[
              styles.strengthSegment,
              {
                backgroundColor: level <= strength ? getStrengthColor() : '#E5E7EB',
              },
            ]}
          />
        ))}
      </View>
      {feedback.length > 0 && (
        <View style={styles.feedbackContainer}>
          <Text style={styles.feedbackTitle}>Requiere:</Text>
          {feedback.map((item, index) => (
            <Text key={index} style={styles.feedbackItem}>• {item}</Text>
          ))}
        </View>
      )}
    </View>
  ) : null;
};

const ResetPasswordScreen: React.FC = () => {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();

  const [resetPasswordData, setResetPasswordData] = useState<ResetPasswordData>({
    nuevaContraseña: '',
    confirmarContraseña: '',
  });

  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const handleInputChange = (field: keyof ResetPasswordData, value: string) => {
    setResetPasswordData(prev => ({ ...prev, [field]: value }));
  };

  const validatePassword = (password: string): boolean => {
    const minLength = password.length >= 8;
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    return minLength && hasLower && hasUpper && hasNumber && hasSpecial;
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {};

    if (!resetPasswordData.nuevaContraseña) {
      newErrors.nuevaContraseña = 'La nueva contraseña es obligatoria';
    } else if (!validatePassword(resetPasswordData.nuevaContraseña)) {
      newErrors.nuevaContraseña = 'La contraseña no cumple con los requisitos de seguridad';
    }

    if (!resetPasswordData.confirmarContraseña) {
      newErrors.confirmarContraseña = 'Confirma tu nueva contraseña';
    } else if (resetPasswordData.nuevaContraseña !== resetPasswordData.confirmarContraseña) {
      newErrors.confirmarContraseña = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleResetPassword = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulación de cambio de contraseña
    setTimeout(() => {
      setIsLoading(false);
      
      Alert.alert(
        '¡Contraseña Actualizada!',
        'Tu contraseña ha sido cambiada exitosamente. Ahora puedes iniciar sesión con tu nueva contraseña.',
        [
          {
            text: 'Ir al Login',
            onPress: () => {
              router.replace('/login'); // Navegar de vuelta al login
            }
          }
        ]
      );
    }, 2000);
  };

  const handleBackToForgot = () => {
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleBackToForgot}
          >
            <Ionicons name="arrow-back" size={24} color="#1DB954" />
          </TouchableOpacity>
          
          <View style={styles.logoContainer}>
            <Ionicons name="lock-closed" size={40} color="#FFFFFF" />
          </View>
          <Text style={styles.title}>Nueva Contraseña</Text>
          <Text style={styles.subtitle}>
            Crea una contraseña segura para tu cuenta{'\n'}
            {email && <Text style={styles.emailText}>{email}</Text>}
          </Text>
        </View>

        <View style={styles.formContainer}>
          <InputField
            label="Nueva Contraseña"
            value={resetPasswordData.nuevaContraseña}
            onChangeText={(value) => handleInputChange('nuevaContraseña', value)}
            placeholder="Ingresa tu nueva contraseña"
            secureTextEntry={!showNewPassword}
            error={errors.nuevaContraseña}
            rightIcon={showNewPassword ? 'eye-off-outline' : 'eye-outline'}
            onRightIconPress={() => setShowNewPassword(!showNewPassword)}
          />

          <PasswordStrengthIndicator password={resetPasswordData.nuevaContraseña} />

          <InputField
            label="Confirmar Nueva Contraseña"
            value={resetPasswordData.confirmarContraseña}
            onChangeText={(value) => handleInputChange('confirmarContraseña', value)}
            placeholder="Confirma tu nueva contraseña"
            secureTextEntry={!showConfirmPassword}
            error={errors.confirmarContraseña}
            rightIcon={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
            onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
          />

          <TouchableOpacity
            style={[
              styles.resetButton,
              isLoading && styles.resetButtonDisabled,
            ]}
            onPress={handleResetPassword}
            disabled={isLoading}
          >
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator color="#FFFFFF" size="small" />
                <Text style={styles.resetButtonText}>Actualizando...</Text>
              </View>
            ) : (
              <View style={styles.resetButtonContent}>
                <Ionicons name="checkmark-circle-outline" size={20} color="#FFFFFF" />
                <Text style={styles.resetButtonText}>Actualizar Contraseña</Text>
              </View>
            )}
          </TouchableOpacity>

          <View style={styles.securityTipsContainer}>
            <Text style={styles.securityTipsTitle}>
              <Ionicons name="shield-checkmark" size={16} color="#1DB954" /> 
              {' '}Consejos de Seguridad
            </Text>
            <Text style={styles.securityTip}>• No compartas tu contraseña con nadie</Text>
            <Text style={styles.securityTip}>• Usa una contraseña única para esta cuenta</Text>
            <Text style={styles.securityTip}>• Considera usar un gestor de contraseñas</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            ¿Tienes problemas? Contacta al{' '}
            <Text style={styles.footerLink}>soporte técnico</Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    minHeight: height,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 40,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 0,
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1DB954',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 22,
  },
  emailText: {
    color: '#1DB954',
    fontWeight: '600',
  },
  formContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1F2937',
    minHeight: 54,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    textAlignVertical: 'center',
  },
  inputError: {
    borderColor: '#EF4444',
  },
  rightIcon: {
    position: 'absolute',
    right: 16,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: 24,
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 6,
  },
  strengthContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  strengthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  strengthLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  strengthText: {
    fontSize: 12,
    fontWeight: '600',
  },
  strengthBar: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 8,
  },
  strengthSegment: {
    flex: 1,
    height: 4,
    borderRadius: 2,
  },
  feedbackContainer: {
    marginTop: 4,
  },
  feedbackTitle: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: 4,
  },
  feedbackItem: {
    fontSize: 11,
    color: '#9CA3AF',
    marginBottom: 2,
  },
  resetButton: {
    backgroundColor: '#1DB954',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#1DB954',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  resetButtonDisabled: {
    opacity: 0.6,
  },
  resetButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  securityTipsContainer: {
    backgroundColor: '#F0FDF4',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  securityTipsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#065F46',
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  securityTip: {
    fontSize: 12,
    color: '#047857',
    marginBottom: 4,
    lineHeight: 16,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  footerLink: {
    color: '#1DB954',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

export default ResetPasswordScreen;