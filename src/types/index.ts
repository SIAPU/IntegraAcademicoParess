export interface StudentFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  studentId: string;
  birthDate: string;
  address: string;
  emergencyContact: string;
  emergencyPhone: string;
  photo: ImageAsset | null;
}

export interface ImageAsset {
  uri: string;
  fileName?: string;
  fileSize?: number;
  type?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof StudentFormData, string>>;
}

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  style?: any;
}

export interface InputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  keyboardType?: 'default' | 'email-address' | 'phone-pad' | 'numeric';
  secureTextEntry?: boolean;
  multiline?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

export interface ImagePickerProps {
  onImageSelected: (asset: ImageAsset) => void;
  imageUri?: string;
  error?: string;
}

export interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

export interface StudentRegistrationFormProps {
  onSubmit: (data: StudentFormData) => Promise<void>;
}