import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import MoleculeField from '../molecules/MoleculeField';
import MoleculePasswordField from '../molecules/MoleculePasswordField';
import MoleculePickerField from '../molecules/MoleculePickerField';
import MoleculePhotoField from '../molecules/MoleculePhotoField';
import AtomButton from '../atoms/AtomButton';
import AtomTitle from '../atoms/AtomTitle';
import globalStyles from '../../styles/globalStyles'; // Ajusta la ruta según sea necesario

const OrganismStudentForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    group: '',
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
    failedSubject: '',
    failedPeriod: '',
    studentGroup: '',
    institute: '',
    failedUnits: '',
    currentQuarter: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const quarters = [
    { label: '1° Cuatrimestre', value: '1' },
    { label: '2° Cuatrimestre', value: '2' },
    { label: '3° Cuatrimestre', value: '3' },
    { label: '4° Cuatrimestre', value: '4' },
    { label: '5° Cuatrimestre', value: '5' },
    { label: '6° Cuatrimestre', value: '6' },
    { label: '7° Cuatrimestre', value: '7' },
    { label: '8° Cuatrimestre', value: '8' },
    { label: '9° Cuatrimestre', value: '9' },
    { label: '10° Cuatrimestre', value: '10' },
  ];

  const handleSubmit = () => {
    console.log('Student registration submitted');
    // Implementa la lógica de validación y envío aquí
  };

  return (
    <ScrollView style={globalStyles.container}>
      <View style={globalStyles.formContainer}>
        <AtomTitle style={globalStyles.formTitle}>Registro de Alumno</AtomTitle>

        <Text style={globalStyles.sectionTitle}>Información Personal</Text>
        <MoleculeField
          label="Nombre Completo"
          placeholder="Ingresa tu nombre completo"
          value={formData.fullName}
          onChangeText={(text) => setFormData({...formData, fullName: text})}
          required
          error={errors.fullName}
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

        <Text style={globalStyles.sectionTitle}>Información Académica</Text>
        <MoleculeField
          label="Materia Reprobada"
          placeholder="Nombre de la materia"
          value={formData.failedSubject}
          onChangeText={(text) => setFormData({...formData, failedSubject: text})}
          required
          error={errors.failedSubject}
        />
        <MoleculeField
          label="Período Reprobado"
          placeholder="Ej: Sep-Dic 2024"
          value={formData.failedPeriod}
          onChangeText={(text) => setFormData({...formData, failedPeriod: text})}
          required
          error={errors.failedPeriod}
        />
        <MoleculeField
          label="Grupo"
          placeholder="Ej: 9A-DS"
          value={formData.studentGroup}
          onChangeText={(text) => setFormData({...formData, studentGroup: text})}
          required
          error={errors.studentGroup}
        />
        <MoleculeField
          label="Instituto"
          placeholder="Nombre del instituto"
          value={formData.institute}
          onChangeText={(text) => setFormData({...formData, institute: text})}
          required
          error={errors.institute}
        />
        <MoleculeField
          label="Cantidad de Unidades Reprobadas"
          placeholder="Número de unidades"
          value={formData.failedUnits}
          onChangeText={(text) => setFormData({...formData, failedUnits: text})}
          keyboardType="numeric"
          required
          error={errors.failedUnits}
        />
        <MoleculePickerField
          label="Cuatrimestre Cursando Actualmente"
          selectedValue={formData.currentQuarter}
          onValueChange={(value) => setFormData({...formData, currentQuarter: value})}
          items={quarters}
          placeholder="Selecciona tu cuatrimestre"
          required
          error={errors.currentQuarter}
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
          label="Foto del Alumno"
          photo={formData.photo}
          onSelectPhoto={() => console.log('Select photo')} // Reemplazar con la lógica real de selección de imagen
          required
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
          title="Registrar Alumno"
          onPress={handleSubmit}
          style={globalStyles.submitButton}
        />
      </View>
    </ScrollView>
  );
};

export default OrganismStudentForm;