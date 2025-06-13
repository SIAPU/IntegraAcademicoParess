import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import MoleculeField from '../molecules/MoleculeField';
import MoleculePasswordField from '../molecules/MoleculePasswordField';
import MoleculePickerField from '../molecules/MoleculePickerField';
import MoleculePhotoField from '../molecules/MoleculePhotoField';
import AtomButton from '../atoms/AtomButton';
import AtomTitle from '../atoms/AtomTitle';
import globalStyles from '../../styles/globalStyles'; // Ajusta la ruta según sea necesario

const OrganismTutorForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    group: '', // ¿El tutor/profesor tiene un "grupo" de alumnos? O es para su grupo de trabajo? Ajustar según necesidad.
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
    subjectTaught: '', // Campo específico para la materia que enseña
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
    { label: 'Matemáticas', value: 'math' }, // Añadido para ejemplo de tutor
    { label: 'Física', value: 'physics' },   // Añadido para ejemplo de tutor
    { label: 'Química', value: 'chemistry' }, // Añadido para ejemplo de tutor
  ];

  const validateEmail = (email) => {
    return email.endsWith('.utt.mx'); // O cualquier dominio para profesores
  };

  const handleSubmit = () => {
    const newErrors = {};

    // Ejemplo de validaciones básicas para el formulario de tutor
    if (!formData.fullName) newErrors.fullName = 'El nombre completo es requerido';
    if (!formData.specialty) newErrors.specialty = 'La especialidad es requerida';
    if (!formData.phone) newErrors.phone = 'El teléfono es requerido';
    if (!formData.institutionalEmail) {
      newErrors.institutionalEmail = 'El correo institucional es requerido';
    } else if (!validateEmail(formData.institutionalEmail)) {
      newErrors.institutionalEmail = 'Debe ser un correo institucional (.utt.mx)';
    }
    if (!formData.personalEmail) newErrors.personalEmail = 'El correo personal es requerido';
    if (!formData.address) newErrors.address = 'La dirección es requerida';
    if (!formData.street) newErrors.street = 'La calle es requerida';
    if (!formData.state) newErrors.state = 'El estado es requerido';
    if (!formData.municipality) newErrors.municipality = 'El municipio es requerido';
    if (!formData.neighborhood) newErrors.neighborhood = 'La colonia es requerida';
    if (!formData.subjectTaught) newErrors.subjectTaught = 'La materia enseñada es requerida';
    if (!formData.password) newErrors.password = 'La contraseña es requerida';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    } else if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log('Tutor/Professor registration submitted:', formData);
      // Aquí iría la lógica para enviar los datos de registro a tu backend
    }
  };

  return (
    <ScrollView style={globalStyles.container}>
      <View style={globalStyles.formContainer}>
        <AtomTitle style={globalStyles.formTitle}>Registro de Tutor/Profesor</AtomTitle>

        <Text style={globalStyles.sectionTitle}>Información Personal</Text>
        <MoleculeField
          label="Nombre Completo"
          placeholder="Ingresa tu nombre completo"
          value={formData.fullName}
          onChangeText={(text) => setFormData({...formData, fullName: text})}
          required
          error={errors.fullName}
        />
        {/* Aquí puedes ajustar si un tutor necesita un "grupo" o no */}
        <MoleculeField
          label="Grupo (Opcional)"
          placeholder="Ej: Grupo de Taller de Tesis"
          value={formData.group}
          onChangeText={(text) => setFormData({...formData, group: text})}
          error={errors.group} // No es requerido, pero puede tener error si se valida de alguna manera
        />
        <MoleculePickerField
          label="Especialidad"
          selectedValue={formData.specialty}
          onValueChange={(value) => setFormData({...formData, specialty: value})}
          items={specialties}
          placeholder="Selecciona una especialidad"
          required
          error={errors.specialty}
        />
        <MoleculeField
          label="Teléfono"
          placeholder="10 dígitos"
          value={formData.phone}
          onChangeText={(text) => setFormData({...formData, phone: text})}
          keyboardType="phone-pad"
          required
          error={errors.phone}
        />
        <MoleculeField
          label="Facebook"
          placeholder="Usuario de Facebook (opcional)"
          value={formData.facebook}
          onChangeText={(text) => setFormData({...formData, facebook: text})}
        />
        <MoleculeField
          label="Instagram"
          placeholder="Usuario de Instagram (opcional)"
          value={formData.instagram}
          onChangeText={(text) => setFormData({...formData, instagram: text})}
        />

        <Text style={globalStyles.sectionTitle}>Información de Contacto</Text>
        <MoleculeField
          label="Correo Institucional"
          placeholder="usuario@utt.mx"
          value={formData.institutionalEmail}
          onChangeText={(text) => setFormData({...formData, institutionalEmail: text})}
          keyboardType="email-address"
          required
          error={errors.institutionalEmail}
        />
        <MoleculeField
          label="Correo Personal"
          placeholder="correo@gmail.com"
          value={formData.personalEmail}
          onChangeText={(text) => setFormData({...formData, personalEmail: text})}
          keyboardType="email-address"
          required
          error={errors.personalEmail}
        />

        <Text style={globalStyles.sectionTitle}>Dirección</Text>
        <MoleculeField
          label="Dirección"
          placeholder="Dirección completa"
          value={formData.address}
          onChangeText={(text) => setFormData({...formData, address: text})}
          required
          error={errors.address}
        />
        <MoleculeField
          label="Calle"
          placeholder="Nombre de la calle"
          value={formData.street}
          onChangeText={(text) => setFormData({...formData, street: text})}
          required
          error={errors.street}
        />
        <MoleculeField
          label="Estado"
          placeholder="Estado"
          value={formData.state}
          onChangeText={(text) => setFormData({...formData, state: text})}
          required
          error={errors.state}
        />
        <MoleculeField
          label="Municipio"
          placeholder="Municipio"
          value={formData.municipality}
          onChangeText={(text) => setFormData({...formData, municipality: text})}
          required
          error={errors.municipality}
        />
        <MoleculeField
          label="Colonia"
          placeholder="Colonia"
          value={formData.neighborhood}
          onChangeText={(text) => setFormData({...formData, neighborhood: text})}
          required
          error={errors.neighborhood}
        />
        <MoleculePhotoField
          label="Foto del Tutor/Profesor"
          photo={formData.photo}
          onSelectPhoto={() => console.log('Select photo for Tutor/Professor')}
          required
        />

        <Text style={globalStyles.sectionTitle}>Información de Tutoría</Text>
        <MoleculeField
          label="Materia que Imparte"
          placeholder="Ej: Programación Móvil"
          value={formData.subjectTaught}
          onChangeText={(text) => setFormData({...formData, subjectTaught: text})}
          required
          error={errors.subjectTaught}
        />

        <Text style={globalStyles.sectionTitle}>Seguridad</Text>
        <MoleculePasswordField
          label="Contraseña"
          placeholder="Mínimo 8 caracteres"
          value={formData.password}
          onChangeText={(text) => setFormData({...formData, password: text})}
          required
          error={errors.password}
        />
        <MoleculePasswordField
          label="Confirmar Contraseña"
          placeholder="Confirma tu contraseña"
          value={formData.confirmPassword}
          onChangeText={(text) => setFormData({...formData, confirmPassword: text})}
          required
          error={errors.confirmPassword}
        />
        <AtomButton
          title="Registrar Tutor/Profesor"
          onPress={handleSubmit}
          style={globalStyles.submitButton}
        />
      </View>
    </ScrollView>
  );
};

export default OrganismTutorForm;