import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  ViewStyle,
  TextStyle,
  ImageStyle
} from 'react-native';
import { 
  launchImageLibrary, 
  ImagePickerResponse, 
  MediaType,
  ImageLibraryOptions 
} from 'react-native-image-picker';
import { colors } from '../constants/colors';
import { ImagePickerProps, ImageAsset } from '../types';

export const ImagePicker: React.FC<ImagePickerProps> = ({ 
  onImageSelected, 
  imageUri, 
  error 
}) => {
  const selectImage = (): void => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo' as MediaType,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
      quality: 0.8,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel || response.errorMessage) {
        return;
      }

      if (response.assets && response.assets[0]) {
        const asset = response.assets[0];
        const fileExtension = asset.fileName?.split('.').pop()?.toLowerCase();
        
        // Validar extensión
        if (!fileExtension || !['jpg', 'jpeg'].includes(fileExtension)) {
          Alert.alert(
            'Formato no válido',
            'Solo se permiten imágenes en formato JPG o JPEG',
            [{ text: 'OK' }]
          );
          return;
        }

        // Validar tamaño (máximo 5MB)
        if (asset.fileSize && asset.fileSize > 5 * 1024 * 1024) {
          Alert.alert(
            'Archivo muy grande',
            'La imagen no debe superar los 5MB',
            [{ text: 'OK' }]
          );
          return;
        }

        const imageAsset: ImageAsset = {
          uri: asset.uri || '',
          fileName: asset.fileName,
          fileSize: asset.fileSize,
          type: asset.type,
        };

        onImageSelected(imageAsset);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Foto del Alumno *</Text>
      <TouchableOpacity
        style={[styles.imagePicker, error && styles.imagePickerError]}
        onPress={selectImage}
      >
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.selectedImage} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>📷</Text>
            <Text style={styles.placeholderLabel}>Seleccionar Foto</Text>
            <Text style={styles.formatText}>Solo JPG/JPEG</Text>
          </View>
        )}
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

interface ImagePickerStyles {
  container: ViewStyle;
  label: TextStyle;
  imagePicker: ViewStyle;
  imagePickerError: ViewStyle;
  selectedImage: ImageStyle;
  placeholder: ViewStyle;
  placeholderText: TextStyle;
  placeholderLabel: TextStyle;
  formatText: TextStyle;
  errorText: TextStyle;
}

const styles = StyleSheet.create<ImagePickerStyles>({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  imagePicker: {
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
    borderRadius: 8,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
  },
  imagePickerError: {
    borderColor: colors.error,
  },
  selectedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
  placeholder: {
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 32,
    marginBottom: 8,
  },
  placeholderLabel: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '500',
  },
  formatText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  errorText: {
    fontSize: 12,
    color: colors.error,
    marginTop: 4,
  },
});