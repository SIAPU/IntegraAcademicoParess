import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import OrganismLoginForm from './src/Components/organisms/OrganismLoginForm';
import OrganismStudentForm from './src/components/organisms/OrganismStudentForm';
import colors from './src/constants/colors';
import globalStyles from './src/styles/globalStyles';

const App = () => {
  const [currentForm, setCurrentForm] = useState('login');

  const renderForm = () => {
    switch (currentForm) {
      case 'login':
        return <OrganismLoginForm />;
      case 'student':
        return <OrganismStudentForm />;
      default:
        return <OrganismLoginForm />;
    }
  };

  return (
    <View style={globalStyles.container}>
      {/* Navegación simple para cambiar entre formularios */}
      <View style={styles.tabNavigation}>
        <TouchableOpacity onPress={() => setCurrentForm('login')}>
          <Text style={[
            styles.tabText,
            currentForm === 'login' ? styles.activeTabText : null,
          ]}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCurrentForm('student')}>
          <Text style={[
            styles.tabText,
            currentForm === 'student' ? styles.activeTabText : null,
          ]}>
            Registro Alumno
          </Text>
        </TouchableOpacity>
      </View>

      {renderForm()}
    </View>
  );
};

const styles = StyleSheet.create({
  tabNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: colors.spotifyLightGray,
    borderBottomWidth: 1,
    borderBottomColor: colors.spotifyGray,
  },
  tabText: {
    color: colors.spotifyGray,
    fontWeight: '600',
  },
  activeTabText: {
    color: colors.spotifyGreen,
  },
});

export default App;