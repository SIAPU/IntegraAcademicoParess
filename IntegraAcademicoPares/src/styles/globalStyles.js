import { StyleSheet } from 'react-native';
import colors from '../constants/colors'; // Ajusta la ruta según sea necesario

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.spotifyWhite,
  },
  formContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  formTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.spotifyBlack,
    textAlign: 'center',
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.spotifyGreen,
    marginTop: 25,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.spotifyLightGray,
    paddingBottom: 5,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.spotifyBlack,
    marginBottom: 8,
  },
  required: {
    color: colors.error,
  },
  input: {
    backgroundColor: colors.spotifyLightGray,
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: colors.spotifyBlack,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  inputError: {
    borderColor: colors.error,
    borderWidth: 1,
  },
  errorText: {
    color: colors.error,
    fontSize: 14,
    marginTop: 5,
  },
  button: {
    backgroundColor: colors.spotifyGreen,
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: colors.spotifyBlack,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: colors.spotifyGray,
  },
  buttonText: {
    color: colors.spotifyWhite,
    fontSize: 16,
    fontWeight: '600',
  },
  submitButton: {
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.spotifyBlack,
  },
  pickerContainer: {
    backgroundColor: colors.spotifyLightGray,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  picker: {
    height: 50,
    color: colors.spotifyBlack,
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 50,
  },
  passwordToggle: {
    position: 'absolute',
    right: 15,
    top: 15, // Ajusta según la altura/padding de tu input
    bottom: 15, // Ajusta según la altura/padding de tu input
    justifyContent: 'center',
  },
  passwordToggleText: {
    fontSize: 18,
  },
  photoContainer: {
    backgroundColor: colors.spotifyLightGray,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
    borderWidth: 2,
    borderColor: colors.spotifyGray,
    borderStyle: 'dashed',
  },
  photoPreview: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  photoPlaceholder: {
    alignItems: 'center',
  },
  photoPlaceholderText: {
    fontSize: 40,
    marginBottom: 10,
  },
  photoPlaceholderLabel: {
    color: colors.spotifyDarkGray,
    fontSize: 16,
    fontWeight: '500',
  },
  forgotPassword: {
    alignItems: 'center',
    marginVertical: 15,
  },
  forgotPasswordText: {
    color: colors.spotifyGreen,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default globalStyles;