import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet, // Importa StyleSheet para usar los estilos
} from 'react-native';

// Importa los átomos y moléculas necesarios
import {
  AtomInput,
  AtomButton,
  AtomTitle,
  AtomLabel,
  AtomError,
  AtomPicker,
  MoleculeField,
  MoleculePasswordField,
  MoleculePickerField,
  MoleculePhotoField,
  colors, // Asegúrate de importar los colores
} from './YourAtomsMoleculesFile'; // Asegúrate de que esta ruta sea correcta

// ORGANISMO: Formulario de Registro Asesor
const OrganismAdvisorForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    group: '',
    specialty: '',
    phone: '',
    facebook: '',
    instagram: '',
    institutionalEmail: '',
    personalEmail: '',
    address: '',
    street: '',
    state: '',
    municipality: '',
    neighborhood: '',
    photo: null,
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const specialties = [
    { label: 'Desarrollo de Software', value: 'software' },
    { label: 'Redes y Telecomunicaciones', value: 'networks' },
    { label: 'Base de Datos', value: 'database' },
    { label: 'Ciberseguridad', value: 'cybersecurity' },
    { label: 'Inteligencia Artificial', value: 'ai' },
    { label: 'Desarrollo Web', value: 'web' },
  ];

  const handleSubmit = () => {
    const newErrors = {};

    // --- Lógica de Validación (ejemplos, expande según tus necesidades) ---
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'El nombre completo es requerido.';
    }
    if (!formData.group.trim()) {
      newErrors.group = 'El grupo es requerido.';
    }
    if (!formData.specialty) {
      newErrors.specialty = 'La especialidad es requerida.';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido.';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'El teléfono debe tener 10 dígitos.';
    }
    if (!formData.institutionalEmail.trim()) {
      newErrors.institutionalEmail = 'El correo institucional es requerido.';
    } else if (!formData.institutionalEmail.endsWith('.utt.mx')) {
      newErrors.institutionalEmail = 'Debe ser un correo institucional (.utt.mx).';
    }
    if (!formData.personalEmail.trim()) {
      newErrors.personalEmail = 'El correo personal es requerido.';
    } else if (!/\S+@\S+\.\S+/.test(formData.personalEmail)) {
      newErrors.personalEmail = 'Debe ser un correo electrónico válido.';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'La dirección es requerida.';
    }
    if (!formData.street.trim()) {
      newErrors.street = 'La calle es requerida.';
    }
    if (!formData.state.trim()) {
      newErrors.state = 'El estado es requerido.';
    }
    if (!formData.municipality.trim()) {
      newErrors.municipality = 'El municipio es requerido.';
    }
    if (!formData.neighborhood.trim()) {
      newErrors.neighborhood = 'La colonia es requerida.';
    }
    // Asumiendo que `photo` será un URI o base64, si es null o vacío, considerarlo error
    if (!formData.photo) {
        newErrors.photo = 'La foto del asesor es requerida.';
    }
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida.';
    } else if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres.';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden.';
    }
    // --- Fin de Lógica de Validación ---

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Formulario de Asesor Válido. Datos:', formData);
      // Aquí puedes integrar la lógica para enviar los datos a tu API o base de datos
      // Por ejemplo:
      // api.registerAdvisor(formData)
      //   .then(response => { /* manejar éxito */ })
      //   .catch(error => { /* manejar error */ });
      alert('¡Registro de Asesor exitoso!');
    } else {
      console.log('Errores de validación:', newErrors);
      alert('Por favor, corrige los errores en el formulario.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <AtomTitle style={styles.formTitle}>Registro de Asesor</AtomTitle>

        {/* Información Personal */}
        <Text style={styles.sectionTitle}>Información Personal</Text>

        <MoleculeField
          label="Nombre Completo"
          placeholder="Ingresa tu nombre completo"
          value={formData.fullName}
          onChangeText={(text) => setFormData({ ...formData, fullName: text })}
          required
          error={errors.fullName}
        />

        <MoleculeField
          label="Grupo"
          placeholder="Ej: 9A-DS"
          value={formData.group}
          onChangeText={(text) => setFormData({ ...formData, group: text })}
          required
          error={errors.group}
        />

        <MoleculePickerField
          label="Especialidad"
          selectedValue={formData.specialty}
          onValueChange={(value) => setFormData({ ...formData, specialty: value })}
          items={specialties}
          placeholder="Selecciona una especialidad"
          required
          error={errors.specialty}
        />

        {/* Información de Contacto */}
        <Text style={styles.sectionTitle}>Información de Contacto</Text>

        <MoleculeField
          label="Teléfono"
          placeholder="10 dígitos"
          value={formData.phone}
          onChangeText={(text) => setFormData({ ...formData, phone: text })}
          keyboardType="phone-pad"
          required
          error={errors.phone}
        />

        <MoleculeField
          label="Facebook"
          placeholder="Usuario de Facebook (opcional)"
          value={formData.facebook}
          onChangeText={(text) => setFormData({ ...formData, facebook: text })}
        />

        <MoleculeField
          label="Instagram"
          placeholder="Usuario de Instagram (opcional)"
          value={formData.instagram}
          onChangeText={(text) => setFormData({ ...formData, instagram: text })}
        />

        <MoleculeField
          label="Correo Institucional"
          placeholder="usuario@utt.mx"
          value={formData.institutionalEmail}
          onChangeText={(text) => setFormData({ ...formData, institutionalEmail: text })}
          keyboardType="email-address"
          required
          error={errors.institutionalEmail}
        />

        <MoleculeField
          label="Correo Personal"
          placeholder="correo@gmail.com"
          value={formData.personalEmail}
          onChangeText={(text) => setFormData({ ...formData, personalEmail: text })}
          keyboardType="email-address"
          required
          error={errors.personalEmail}
        />

        {/* Información de Dirección */}
        <Text style={styles.sectionTitle}>Dirección</Text>

        <MoleculeField
          label="Dirección"
          placeholder="Dirección completa"
          value={formData.address}
          onChangeText={(text) => setFormData({ ...formData, address: text })}
          required
          error={errors.address}
        />

        <MoleculeField
          label="Calle"
          placeholder="Nombre de la calle"
          value={formData.street}
          onChangeText={(text) => setFormData({ ...formData, street: text })}
          required
          error={errors.street}
        />

        <MoleculeField
          label="Estado"
          placeholder="Estado"
          value={formData.state}
          onChangeText={(text) => setFormData({ ...formData, state: text })}
          required
          error={errors.state}
        />

        <MoleculeField
          label="Municipio"
          placeholder="Municipio"
          value={formData.municipality}
          onChangeText={(text) => setFormData({ ...formData, municipality: text })}
          required
          error={errors.municipality}
        />

        <MoleculeField
          label="Colonia"
          placeholder="Colonia"
          value={formData.neighborhood}
          onChangeText={(text) => setFormData({ ...formData, neighborhood: text })}
          required
          error={errors.neighborhood}
        />

        <MoleculePhotoField
          label="Foto del Asesor"
          photo={formData.photo}
          onSelectPhoto={() => {
            // Aquí iría la lógica para seleccionar una imagen, por ejemplo, usando ImagePicker
            console.log('Abrir selector de fotos para Asesor');
            // Ejemplo de cómo actualizar la foto (simulado)
            // setFormData({ ...formData, photo: 'https://via.placeholder.com/150' });
          }}
          required
          error={errors.photo}
        />

        {/* Contraseña */}
        <Text style={styles.sectionTitle}>Seguridad</Text>

        <MoleculePasswordField
          label="Contraseña"
          placeholder="Mínimo 8 caracteres"
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          required
          error={errors.password}
        />

        <MoleculePasswordField
          label="Confirmar Contraseña"
          placeholder="Confirma tu contraseña"
          value={formData.confirmPassword}
          onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
          required
          error={errors.confirmPassword}
        />

        <AtomButton
          title="Registrar Asesor"
          onPress={handleSubmit}
          style={styles.submitButton}
        />
      </View>
    </ScrollView>
  );
};

// ================================
// Estilos (duplicados aquí para que el archivo sea autocontenido,
// pero idealmente se importarían de un archivo de estilos compartido)
// ================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.spotifyWhite,
  },
  formContainer: {
    padding: 20,
  },
  formTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.spotifyBlack,
    marginBottom: 30,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.spotifyBlack,
    marginTop: 20,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.spotifyLightGray,
    paddingBottom: 5,
  },
  fieldContainer: {
    marginBottom: 15,
  },
  input: {
    height: 50,
    borderColor: colors.spotifyGray,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: colors.spotifyBlack,
    backgroundColor: colors.spotifyLightGray,
  },
  inputError: {
    borderColor: colors.error,
    borderWidth: 2,
  },
  button: {
    backgroundColor: colors.spotifyGreen,
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: colors.spotifyDarkGray,
  },
  buttonText: {
    color: colors.spotifyWhite,
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: { // Reutilizado de AtomTitle, pero aquí como parte de los estilos generales
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.spotifyBlack,
  },
  label: {
    fontSize: 16,
    color: colors.spotifyDarkGray,
    marginBottom: 8,
    fontWeight: '600',
  },
  required: {
    color: colors.error,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: 5,
  },
  pickerContainer: {
    borderColor: colors.spotifyGray,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: colors.spotifyLightGray,
  },
  picker: {
    height: 50,
    color: colors.spotifyBlack,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: colors.spotifyGray,
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: colors.spotifyLightGray,
  },
  passwordInput: {
    flex: 1,
    borderWidth: 0,
    height: 50,
  },
  passwordToggle: {
    padding: 10,
  },
  passwordToggleText: {
    fontSize: 20,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: colors.spotifyGreen,
    fontSize: 14,
    fontWeight: 'bold',
  },
  submitButton: {
    marginTop: 30,
    marginBottom: 50,
  },
  photoContainer: {
    width: '100%',
    height: 150,
    backgroundColor: colors.spotifyLightGray,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.spotifyGray,
    overflow: 'hidden',
  },
  photoPreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  photoPlaceholder: {
    alignItems: 'center',
  },
  photoPlaceholderText: {
    fontSize: 50,
    color: colors.spotifyGray,
  },
  photoPlaceholderLabel: {
    fontSize: 16,
    color: colors.spotifyDarkGray,
    marginTop: 5,
  },
});

export default OrganismAdvisorForm;