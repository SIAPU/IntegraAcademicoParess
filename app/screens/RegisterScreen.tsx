import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView, // Añadido para el teclado
  Platform, // Añadido para el teclado
  Dimensions // Añadido para el estilo del scrollContainer
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons'; // Importa Ionicons
import { useRouter } from 'expo-router'; // Importa useRouter para la navegación

// --- Interfaces (actualizadas para incluir contraseñas) ---
interface FormData {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  grupo: string;
  telefono: string;
  facebook: string;
  instagram: string;
  correoInstitucional: string;
  correoPersonal: string;
  direccion: string;
  calle: string;
  estado: string;
  municipio: string;
  colonia: string;
  foto: string | null;
  contrasena: string; // Nuevo campo
  confirmarContrasena: string; // Nuevo campo
}

interface Errors {
  [key: string]: string;
}

const { width, height } = Dimensions.get('window'); // Para el estilo del scrollContainer

// --- COMPONENTE InputField MOVIDO FUERA ---
interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  error?: string;
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
  secureTextEntry?: boolean; // Nuevo prop para contraseñas
  rightIcon?: keyof typeof Ionicons.glyphMap; // Nuevo prop para iconos a la derecha
  onRightIconPress?: () => void; // Callback para el icono de la derecha
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  keyboardType = 'default',
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
        placeholderTextColor="#6B7280" // Color consistente con el login
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoCapitalize={keyboardType === 'email-address' ? 'none' : 'sentences'} // Ajuste para capitalización
        autoCorrect={false}
        returnKeyType="next"
        blurOnSubmit={false}
        textContentType={keyboardType === 'email-address' ? 'emailAddress' : (secureTextEntry ? 'password' : 'none')}
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

// --- COMPONENTE PRINCIPAL SpotifyRegisterForm ---
const SpotifyRegisterForm: React.FC = () => {
  const router = useRouter(); // Inicializa el hook de router

  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    grupo: '',
    telefono: '',
    facebook: '',
    instagram: '',
    correoInstitucional: '',
    correoPersonal: '',
    direccion: '',
    calle: '',
    estado: '',
    municipio: '',
    colonia: '',
    foto: null,
    contrasena: '', // Estado para la contraseña
    confirmarContrasena: '', // Estado para confirmar contraseña
  });

  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);


  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Opcional: limpiar el error inmediatamente al empezar a escribir de nuevo
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permiso requerido', 'Se necesita permiso para acceder a la galería');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setFormData(prev => ({ ...prev, foto: result.assets[0].uri }));
      if (errors.foto) {
        setErrors(prev => ({ ...prev, foto: '' }));
      }
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };


  const validateForm = (): boolean => {
    const newErrors: Errors = {};

    // Campos obligatorios (excluyendo foto que tiene su propia validación y las contraseñas)
    Object.keys(formData).forEach(key => {
      // Excluye 'foto', 'contrasena', 'confirmarContrasena' de esta validación genérica de campos vacíos
      if (!formData[key as keyof FormData] && key !== 'foto' && key !== 'contrasena' && key !== 'confirmarContrasena') {
        newErrors[key] = 'Este campo es obligatorio';
      }
    });

    // Validación específica de la foto
    if (!formData.foto) {
      newErrors.foto = 'La foto es obligatoria';
    }

    // Validación de correos
    if (formData.correoInstitucional && !validateEmail(formData.correoInstitucional)) {
      newErrors.correoInstitucional = 'Ingresa un correo institucional válido';
    }
    if (formData.correoPersonal && !validateEmail(formData.correoPersonal)) {
      newErrors.correoPersonal = 'Ingresa un correo personal válido';
    }


    // Validación de contraseñas
    if (!formData.contrasena) {
      newErrors.contrasena = 'La contraseña es obligatoria';
    } else if (formData.contrasena.length < 6) {
      newErrors.contrasena = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (!formData.confirmarContrasena) {
      newErrors.confirmarContrasena = 'Debes confirmar la contraseña';
    } else if (formData.contrasena !== formData.confirmarContrasena) {
      newErrors.confirmarContrasena = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    // Simular envío
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Éxito', '¡Registro exitoso!');
      // Opcional: Reiniciar el formulario o navegar
      // setFormData({ /* reset a valores iniciales */ });
      // router.replace('/login'); // Navegar al login después de un registro exitoso
    }, 2000);
  };

  // Función para navegar al login
  const handleGoToLogin = () => {
    router.replace('/login'); // Usar replace para que no se pueda volver al registro con el botón de atrás
  };


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Crear cuenta</Text>
          <Text style={styles.subtitle}>Completa todos los campos para registrarte</Text>
        </View>

        {/* Información Personal */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <Ionicons name="person-circle-outline" size={20} color="#1DB954" /> Información Personal
          </Text>

          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <InputField
                label="Nombre"
                value={formData.nombre}
                onChangeText={(value) => handleInputChange('nombre', value)}
                placeholder="Tu nombre"
                error={errors.nombre}
              />
            </View>
            <View style={styles.halfWidth}>
              <InputField
                label="Apellido Paterno"
                value={formData.apellidoPaterno}
                onChangeText={(value) => handleInputChange('apellidoPaterno', value)}
                placeholder="Apellido paterno"
                error={errors.apellidoPaterno}
              />
            </View>
          </View>

          <InputField
            label="Apellido Materno"
            value={formData.apellidoMaterno}
            onChangeText={(value) => handleInputChange('apellidoMaterno', value)}
            placeholder="Apellido materno"
            error={errors.apellidoMaterno}
          />

          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <InputField
                label="Grupo"
                value={formData.grupo}
                onChangeText={(value) => handleInputChange('grupo', value)}
                placeholder="Tu grupo"
                error={errors.grupo}
              />
            </View>
            <View style={styles.halfWidth}>
              <InputField
                label="Teléfono"
                value={formData.telefono}
                onChangeText={(value) => handleInputChange('telefono', value)}
                placeholder="Número de teléfono"
                keyboardType="phone-pad"
                error={errors.telefono}
              />
            </View>
          </View>
        </View>

        {/* Redes Sociales y Correos */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <Ionicons name="at-circle-outline" size={20} color="#1DB954" /> Contacto y Redes Sociales
          </Text>

          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <InputField
                label="Facebook"
                value={formData.facebook}
                onChangeText={(value) => handleInputChange('facebook', value)}
                placeholder="Usuario de Facebook"
                error={errors.facebook}
              />
            </View>
            <View style={styles.halfWidth}>
              <InputField
                label="Instagram"
                value={formData.instagram}
                onChangeText={(value) => handleInputChange('instagram', value)}
                placeholder="Usuario de Instagram"
                error={errors.instagram}
              />
            </View>
          </View>

          <InputField
            label="Correo Institucional"
            value={formData.correoInstitucional}
            onChangeText={(value) => handleInputChange('correoInstitucional', value)}
            placeholder="correo@institucion.edu"
            keyboardType="email-address"
            error={errors.correoInstitucional}
          />

          <InputField
            label="Correo Personal"
            value={formData.correoPersonal}
            onChangeText={(value) => handleInputChange('correoPersonal', value)}
            placeholder="correo@ejemplo.com"
            keyboardType="email-address"
            error={errors.correoPersonal}
          />
        </View>

        {/* Dirección */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <Ionicons name="location-outline" size={20} color="#1DB954" /> Dirección
          </Text>

          <InputField
            label="Dirección"
            value={formData.direccion}
            onChangeText={(value) => handleInputChange('direccion', value)}
            placeholder="Dirección completa"
            error={errors.direccion}
          />

          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <InputField
                label="Calle"
                value={formData.calle}
                onChangeText={(value) => handleInputChange('calle', value)}
                placeholder="Nombre de la calle"
                error={errors.calle}
              />
            </View>
            <View style={styles.halfWidth}>
              <InputField
                label="Estado"
                value={formData.estado}
                onChangeText={(value) => handleInputChange('estado', value)}
                placeholder="Estado"
                error={errors.estado}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfWidth}>
              <InputField
                label="Municipio"
                value={formData.municipio}
                onChangeText={(value) => handleInputChange('municipio', value)}
                placeholder="Municipio"
                error={errors.municipio}
              />
            </View>
            <View style={styles.halfWidth}>
              <InputField
                label="Colonia"
                value={formData.colonia}
                onChangeText={(value) => handleInputChange('colonia', value)}
                placeholder="Colonia"
                error={errors.colonia}
              />
            </View>
          </View>
        </View>

        {/* Contraseña */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <Ionicons name="lock-closed-outline" size={20} color="#1DB954" /> Contraseña
          </Text>

          <InputField
            label="Contraseña"
            value={formData.contrasena}
            onChangeText={(value) => handleInputChange('contrasena', value)}
            placeholder="Crea tu contraseña"
            secureTextEntry={!showPassword}
            error={errors.contrasena}
            rightIcon={showPassword ? 'eye-off-outline' : 'eye-outline'}
            onRightIconPress={() => setShowPassword(!showPassword)}
          />

          <InputField
            label="Confirmar Contraseña"
            value={formData.confirmarContrasena}
            onChangeText={(value) => handleInputChange('confirmarContrasena', value)}
            placeholder="Confirma tu contraseña"
            secureTextEntry={!showConfirmPassword}
            error={errors.confirmarContrasena}
            rightIcon={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
            onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        </View>

        {/* Foto de Perfil */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <Ionicons name="camera-outline" size={20} color="#1DB954" /> Foto de Perfil
          </Text>

          <View style={styles.photoContainer}>
            <View style={[styles.photoPreview, errors.foto ? styles.photoError : null]}>
              {formData.foto ? (
                <Image source={{ uri: formData.foto }} style={styles.photo} />
              ) : (
                <Text style={styles.photoPlaceholder}>
                  <Ionicons name="image-outline" size={40} color="#6B7280" />
                </Text>
              )}
            </View>

            <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
              <Ionicons name="cloud-upload-outline" size={20} color="#FFFFFF" />
              <Text style={styles.photoButtonText}> Subir Foto</Text>
            </TouchableOpacity>

            {errors.foto && <Text style={styles.errorText}>{errors.foto}</Text>}
          </View>
        </View>

        {/* Botón de Envío */}
        <View style={styles.submitContainer}>
          <TouchableOpacity
            style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator color="#FFFFFF" size="small" />
                <Text style={styles.submitButtonText}>Registrando...</Text>
              </View>
            ) : (
              <Text style={styles.submitButtonText}>Crear Cuenta</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Ya tienes cuenta? Iniciar Sesión */}
        <View style={styles.loginLinkContainer}>
          <Text style={styles.loginQuestion}>¿Ya tienes una cuenta?</Text>
          <TouchableOpacity onPress={handleGoToLogin}>
            <Text style={styles.loginLink}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

// --- ESTILOS (Actualizados para coincidir con el login) ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Fondo blanco como en el login
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 30, // Ajustado para un mejor espaciado
    justifyContent: 'center', // Centra el contenido si es corto
    minHeight: height, // Para asegurar que ocupe toda la altura
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20, // Más consistente con el login
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F2937', // Color consistente con el login
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280', // Color consistente con el login
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  section: {
    backgroundColor: '#F9FAFB', // Color de fondo del formulario del login
    borderRadius: 16, // Bordes más redondeados
    padding: 24, // Padding consistente
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB', // Borde más suave
    shadowColor: '#000', // Sombra como en el login
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937', // Color de texto principal
    marginBottom: 20,
    flexDirection: 'row', // Para alinear icono y texto
    alignItems: 'center',
    gap: 8, // Espacio entre icono y texto
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  inputContainer: {
    marginBottom: 16, // Espaciado consistente
  },
  label: {
    fontSize: 14,
    fontWeight: '600', // Más negrita
    color: '#374151', // Color consistente
    marginBottom: 8,
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    backgroundColor: '#FFFFFF', // Fondo del input blanco
    borderWidth: 1,
    borderColor: '#D1D5DB', // Borde más suave
    borderRadius: 12, // Bordes más redondeados
    padding: 16, // Padding consistente
    fontSize: 16,
    color: '#1F2937', // Color de texto del input
    minHeight: 54, // Altura mínima consistente
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05, // Sombra más sutil
    shadowRadius: 2,
    elevation: 1,
    textAlignVertical: 'center', // Para centrar verticalmente el texto en Android
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
    width: 24, // Ajuste de ancho del área del icono
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 6, // Ajustado para un mejor espaciado
  },
  photoContainer: {
    alignItems: 'center',
  },
  photoPreview: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#D1D5DB', // Borde más suave
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  photoError: {
    borderColor: '#EF4444',
  },
  photo: {
    width: 116,
    height: 116,
    borderRadius: 58,
  },
  photoPlaceholder: {
    fontSize: 40,
    color: '#6B7280', // Color consistente
  },
  photoButton: {
    backgroundColor: '#1DB954', // Color principal verde
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8, // Espacio entre icono y texto
  },
  photoButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  submitContainer: {
    paddingVertical: 20, // Menos padding para no empujar demasiado el "ya tienes cuenta"
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#1DB954', // Color principal verde
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 12, // Más consistente con el estilo del login
    minWidth: 200,
    alignItems: 'center',
    shadowColor: '#1DB954', // Sombra del botón
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  submitButtonDisabled: {
    opacity: 0.6, // Opacidad más notoria para deshabilitado
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700', // Más negrita
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12, // Espacio entre spinner y texto
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40, // Espaciado inferior
    gap: 4,
  },
  loginQuestion: {
    color: '#4B5563',
    fontSize: 14,
  },
  loginLink: {
    color: '#1DB954', // Color del enlace verde
    fontSize: 14,
    fontWeight: '600',
  },
});

export default SpotifyRegisterForm;