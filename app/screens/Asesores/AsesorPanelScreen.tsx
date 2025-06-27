import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface ClassItem {
  time: string;
  subject: string;
  professor: string;
  location: string;
  status: 'Disponible' | 'En Clase' | 'Confirmada' | 'Pendiente';
}

const AsesorPanelScreen: React.FC = () => {
  const router = useRouter();

  const todayClasses: ClassItem[] = [
    {
      time: '09:00 - 10:00',
      subject: 'Matemáticas Básicas',
      professor: 'Prof. Ana Rodríguez',
      location: 'Aula 204',
      status: 'Disponible',
    },
    {
      time: '10:30 - 11:30',
      subject: 'Física I',
      professor: 'Prof. Carlos Mendoza',
      location: 'Aula 301',
      status: 'En Clase',
    },
    {
      time: '14:00 - 15:00',
      subject: 'Asesoría Individual',
      professor: 'Asesor Par',
      location: 'Oficina A-102',
      status: 'Disponible',
    },
    {
      time: '16:00 - 17:00',
      subject: 'Química General',
      professor: 'Prof. Elena Vásquez',
      location: 'Laboratorio B-205',
      status: 'En Clase',
    },
  ];

  const upcomingClasses: ClassItem[] = [
    {
      time: 'Mañana 10:00',
      subject: 'Matemáticas Básicas',
      professor: 'Prof. Ana Rodríguez',
      location: 'Aula 204',
      status: 'Confirmada',
    },
    {
      time: 'Miércoles 15:00',
      subject: 'Física I - Examen práctica',
      professor: 'Prof. Carlos Vásquez',
      location: 'Aula 301',
      status: 'Confirmada',
    },
    {
      time: 'Viernes 11:00',
      subject: 'Química General',
      professor: 'Prof. Elena Vásquez',
      location: 'Laboratorio B-205',
      status: 'Pendiente',
    },
  ];

  const renderStatusTag = (status: ClassItem['status']) => {
    let backgroundColor = '#E5E7EB';
    let textColor = '#4B5563';

    switch (status) {
      case 'Disponible':
        backgroundColor = '#D1FAE5';
        textColor = '#059669';
        break;
      case 'En Clase':
        backgroundColor = '#FEE2E2';
        textColor = '#EF4444';
        break;
      case 'Confirmada':
        backgroundColor = '#DBEAFE';
        textColor = '#2563EB';
        break;
      case 'Pendiente':
        backgroundColor = '#FEF3C7';
        textColor = '#D97706';
        break;
    }

    return (
      <View style={[styles.statusTag, { backgroundColor }]}>
        <Text style={[styles.statusText, { color: textColor }]}>{status}</Text>
      </View>
    );
  };

  const navigateToCalendar = () => {
    router.push('/Asesores/VerCalendario');
  };

  const navigateToActivities = () => {
    router.push('/Asesores/GestionarActividades');
  };

  const navigateToAttendance = () => {
    router.push('/Asesores/ListaAsistencia');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.mainTitle}>Panel de Asesor Par</Text>
        <Text style={styles.headerSubtitle}>Gestiona tus clases y asesorías de manera eficiente</Text>
      </View>

      {/* Clases de Hoy */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="calendar-outline" size={24} color="#10B981" />
          <Text style={styles.cardTitle}>Clases de Hoy</Text>
        </View>
        <View style={styles.cardContent}>
          {todayClasses.map((clase, index) => (
            <View key={index} style={styles.classItem}>
              <View style={styles.classDetails}>
                <Text style={styles.classTime}>{clase.time}</Text>
                <Text style={styles.classSubject}>{clase.subject}</Text>
                <View style={styles.professorLocation}>
                  <Ionicons name="person-outline" size={14} color="#6B7280" />
                  <Text style={styles.classInfo}>{clase.professor}</Text>
                </View>
                <View style={styles.professorLocation}>
                  <Ionicons name="location-outline" size={14} color="#6B7280" />
                  <Text style={styles.classInfo}>{clase.location}</Text>
                </View>
              </View>
              {renderStatusTag(clase.status)}
            </View>
          ))}
        </View>
      </View>

      {/* Menú Principal */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="cog-outline" size={24} color="#10B981" />
          <Text style={styles.cardTitle}>Menú Principal</Text>
        </View>
        <View style={styles.cardContent}>
          <TouchableOpacity style={styles.menuButton} onPress={navigateToCalendar}>
            <Ionicons name="calendar-sharp" size={20} color="#FFFFFF" />
            <Text style={styles.menuButtonText}>Ver Calendario</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuButton} onPress={navigateToActivities}>
            <Ionicons name="people-sharp" size={20} color="#FFFFFF" />
            <Text style={styles.menuButtonText}>Gestionar Actividades</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuButton} onPress={navigateToAttendance}>
            <Ionicons name="list-sharp" size={20} color="#FFFFFF" />
            <Text style={styles.menuButtonText}>Lista de Asistencia</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Próximas Clases */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="calendar-sharp" size={24} color="#10B981" />
          <Text style={styles.cardTitle}>Próximas Clases</Text>
        </View>
        <View style={styles.cardContent}>
          {upcomingClasses.map((clase, index) => (
            <View key={index} style={styles.classItem}>
              <View style={styles.classDetails}>
                <Text style={styles.classTime}>{clase.time}</Text>
                <Text style={styles.classSubject}>{clase.subject}</Text>
                <View style={styles.professorLocation}>
                  <Ionicons name="person-outline" size={14} color="#6B7280" />
                  <Text style={styles.classInfo}>{clase.professor}</Text>
                </View>
                <View style={styles.professorLocation}>
                  <Ionicons name="location-outline" size={14} color="#6B7280" />
                  <Text style={styles.classInfo}>{clase.location}</Text>
                </View>
              </View>
              {renderStatusTag(clase.status)}
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
    paddingVertical: 16,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 22,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 8,
  },
  cardContent: {
    padding: 16,
  },
  classItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  classDetails: {
    flex: 1,
    marginRight: 10,
  },
  classTime: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#4B5563',
    marginBottom: 4,
  },
  classSubject: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  professorLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  classInfo: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 6,
  },
  statusTag: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    minWidth: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  menuButton: {
    backgroundColor: '#10B981',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  menuButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
});

export default AsesorPanelScreen;