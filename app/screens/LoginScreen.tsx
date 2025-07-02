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
import { useRouter } from 'expo-router';

interface LoginData {
  correoInstitucional: string;
  contraseña: string;
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
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
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
  keyboardType = 'default',
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
        keyboardType={keyboardType}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="next"
        blurOnSubmit={false}
        textContentType={keyboardType === 'email-address' ? 'emailAddress' : secureTextEntry ? 'password' : 'none'}
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

const StudentLoginScreen: React.FC = () => {
  const router = useRouter();


  const TEST_USERS = {
    alumno: {
      correo: 'alumno@universidad.edu',
      contraseña: 'passwordAlumno',
      ruta: '/Alumnos/AlumnoPanel',
      color: '#3B82F6', 
    },
    maestro: {
      correo: 'maestro@universidad.edu',
      contraseña: 'passwordMaestro',
      ruta: '/Maestros/MaestroPanel',
      color: '#10B981', 
    },
    asesor: {
      correo: 'asesor@universidad.edu',
      contraseña: 'passwordAsesor',
      ruta: '/Asesores/AsesorPanel',
      color: '#F59E0B',
    },
    tutor: {
      correo: 'tutor@universidad.edu',
      contraseña: 'passwordTutor',
      ruta: '/Tutor/TutorPanel',
      color: '#8B5CF6', 
    },
  } as const;

  const [loginData, setLoginData] = useState<LoginData>({
    correoInstitucional: '',
    contraseña: '',
  });

  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const handleInputChange = (field: keyof LoginData, value: string) => {
    setLoginData(prev => ({ ...prev, [field]: value }));
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: Errors = {};

    if (!loginData.correoInstitucional) {
      newErrors.correoInstitucional = 'El correo institucional es obligatorio';
    } else if (!validateEmail(loginData.correoInstitucional)) {
      newErrors.correoInstitucional = 'Ingresa un correo válido';
    }

    if (!loginData.contraseña) {
      newErrors.contraseña = 'La contraseña es obligatoria';
    } else if (loginData.contraseña.length < 6) {
      newErrors.contraseña = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    let userRole: keyof typeof TEST_USERS | undefined;
    if (loginData.correoInstitucional.startsWith('alumno')) {
      userRole = 'alumno';
    } else if (loginData.correoInstitucional.startsWith('maestro')) {
      userRole = 'maestro';
    } else if (loginData.correoInstitucional.startsWith('asesor')) {
      userRole = 'asesor';
    } else if (loginData.correoInstitucional.startsWith('tutor')) {
      userRole = 'tutor';
    }

    // Verificar si se encontró un rol válido y obtener los datos de usuario de prueba
    const currentUserTest = userRole ? TEST_USERS[userRole] : undefined;

    setTimeout(() => {
      setIsLoading(false);

      if (
        currentUserTest && // Asegúrate de que se encontró un usuario de prueba
        loginData.correoInstitucional === currentUserTest.correo &&
        loginData.contraseña === currentUserTest.contraseña
      ) {
        Alert.alert(
          '¡Inicio de Sesión Exitoso!',
          `¡Bienvenido, ${userRole}! Navegando a tu sección...`
        );
        router.replace(currentUserTest.ruta);
      } else {
        Alert.alert('Error', 'Credenciales incorrectas o rol no reconocido. Intenta de nuevo.');
      }
    }, 2000);
  };

  const handleForgotPassword = () => {
    router.push('/RecuperarPassword'); 

  };

  const handleRegister = () => {
    router.push('/register');
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
          <View style={styles.logoContainer}>
            <Ionicons name="school" size={40} color="#FFFFFF" />
          </View>
          <Text style={styles.title}>Portal Estudiantil</Text>
          <Text style={styles.subtitle}>Accede con tu cuenta institucional</Text>
        </View>

        <View style={styles.formContainer}>
          <InputField
            label="Correo Institucional"
            value={loginData.correoInstitucional}
            onChangeText={(value) => handleInputChange('correoInstitucional', value)}
            placeholder="usuario@universidad.edu"
            keyboardType="email-address"
            error={errors.correoInstitucional}
          />

          <InputField
            label="Contraseña"
            value={loginData.contraseña}
            onChangeText={(value) => handleInputChange('contraseña', value)}
            placeholder="Ingresa tu contraseña"
            secureTextEntry={!showPassword}
            error={errors.contraseña}
            rightIcon={showPassword ? 'eye-off-outline' : 'eye-outline'}
            onRightIconPress={() => setShowPassword(!showPassword)}
          />

          {/* Se eliminó la sección de selección de rol aquí */}

          <View style={styles.optionsContainer}>
            <TouchableOpacity
              style={styles.rememberContainer}
              onPress={() => setRememberMe(!rememberMe)}
            >
              <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
                {rememberMe && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
              </View>
              <Text style={styles.rememberText}>Recordarme</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              styles.loginButton,
              isLoading && styles.loginButtonDisabled,
              { backgroundColor: '#1DB954' }
            ]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator color="#FFFFFF" size="small" />
                <Text style={styles.loginButtonText}>Iniciando sesión...</Text>
              </View>
            ) : (
              <View style={styles.loginButtonContent}>
                <Ionicons name="log-in-outline" size={20} color="#FFFFFF" />
                <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
              </View>
            )}
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>o</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.registerContainer}>
            <Text style={styles.registerQuestion}>¿Eres nuevo usuario?</Text>
            <TouchableOpacity onPress={handleRegister}>
              <Text style={styles.registerLink}>Regístrate aquí</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Al continuar, aceptas nuestros{' '}
            <Text style={styles.footerLink}>Términos de Servicio</Text>
            {' '}y{' '}
            <Text style={styles.footerLink}>Política de Privacidad</Text>
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
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  checkboxActive: {
    backgroundColor: '#1DB954',
    borderColor: '#1DB954',
  },
  rememberText: {
    color: '#4B5563',
    fontSize: 14,
  },
  forgotText: {
    color: '#1DB954',
    fontSize: 14,
    fontWeight: '600',
  },
  loginButton: {
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
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    color: '#6B7280',
    fontSize: 14,
    paddingHorizontal: 16,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  registerQuestion: {
    color: '#4B5563',
    fontSize: 14,
  },
  registerLink: {
    color: '#1DB954',
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  footerText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#9CA3AF',
    lineHeight: 18,
  },
  footerLink: {
    color: '#1DB954',
    fontWeight: '600',
  },
});

export default StudentLoginScreen;