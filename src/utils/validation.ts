import { StudentFormData, ValidationResult } from '../types';

export const validateForm = (data: StudentFormData): ValidationResult => {
  const errors: Partial<Record<keyof StudentFormData, string>> = {};
  let isValid: boolean = true;

  // Validar foto
  if (!data.photo) {
    errors.photo = 'La foto es obligatoria para acceder a la plataforma';
    isValid = false;
  }

  // Validar nombres
  if (!data.firstName.trim()) {
    errors.firstName = 'Los nombres son obligatorios';
    isValid = false;
  } else if (data.firstName.trim().length < 2) {
    errors.firstName = 'Los nombres deben tener al menos 2 caracteres';
    isValid = false;
  }

  // Validar apellidos
  if (!data.lastName.trim()) {
    errors.lastName = 'Los apellidos son obligatorios';
    isValid = false;
  } else if (data.lastName.trim().length < 2) {
    errors.lastName = 'Los apellidos deben tener al menos 2 caracteres';
    isValid = false;
  }

  // Validar email (PRIORIDAD)
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email.trim()) {
    errors.email = 'El correo electrónico es obligatorio';
    isValid = false;
  } else if (!emailRegex.test(data.email)) {
    errors.email = 'Ingresa un correo electrónico válido';
    isValid = false;
  }

  // Validar teléfono (PRIORIDAD)
  const phoneRegex: RegExp = /^[\+]?[1-9][\d]{0,15}$/;
  if (!data.phone.trim()) {
    errors.phone = 'El teléfono es obligatorio';
    isValid = false;
  } else if (!phoneRegex.test(data.phone.replace(/[\s\-\(\)]/g, ''))) {
    errors.phone = 'Ingresa un número de teléfono válido';
    isValid = false;
  }

  // Validar número de estudiante
  if (!data.studentId.trim()) {
    errors.studentId = 'El número de estudiante es obligatorio';
    isValid = false;
  } else if (data.studentId.trim().length < 6) {
    errors.studentId = 'El número de estudiante debe tener al menos 6 caracteres';
    isValid = false;
  }

  // Validar fecha de nacimiento
  const dateRegex: RegExp = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!data.birthDate.trim()) {
    errors.birthDate = 'La fecha de nacimiento es obligatoria';
    isValid = false;
  } else if (!dateRegex.test(data.birthDate)) {
    errors.birthDate = 'Formato de fecha inválido (DD/MM/AAAA)';
    isValid = false;
  } else {
    // Validar que sea una fecha válida y que la persona sea mayor a 16 años
    const [day, month, year] = data.birthDate.split('/').map(Number);
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    
    if (age < 16 || age > 100) {
      errors.birthDate = 'La edad debe estar entre 16 y 100 años';
      isValid = false;
    }
  }

  // Validar dirección
  if (!data.address.trim()) {
    errors.address = 'La dirección es obligatoria';
    isValid = false;
  } else if (data.address.trim().length < 10) {
    errors.address = 'La dirección debe ser más específica (mínimo 10 caracteres)';
    isValid = false;
  }

  // Validar contacto de emergencia
  if (!data.emergencyContact.trim()) {
    errors.emergencyContact = 'El contacto de emergencia es obligatorio';
    isValid = false;
  }

  // Validar teléfono de emergencia
  if (!data.emergencyPhone.trim()) {
    errors.emergencyPhone = 'El teléfono de emergencia es obligatorio';
    isValid = false;
  } else if (!phoneRegex.test(data.emergencyPhone.replace(/[\s\-\(\)]/g, ''))) {
    errors.emergencyPhone = 'Ingresa un número de teléfono válido';
    isValid = false;
  }

  return { isValid, errors };
};

// Funciones de utilidad adicionales
export const formatPhoneNumber = (phone: string): string => {
  // Remover caracteres no numéricos excepto +
  const cleaned = phone.replace(/[^\d+]/g, '');
  return cleaned;
};

export const formatDate = (date: string): string => {
  // Formatear automáticamente mientras el usuario escribe
  const cleaned = date.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{0,2})(\d{0,2})(\d{0,4})$/);
  
  if (!match) return date;
  
  let formatted = '';
  if (match[1]) formatted += match[1];
  if (match[2]) formatted += '/' + match[2];
  if (match[3]) formatted += '/' + match[3];
  
  return formatted;
};