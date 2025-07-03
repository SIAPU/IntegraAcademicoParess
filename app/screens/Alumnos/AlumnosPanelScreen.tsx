import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const AlumnoPanelScreen: React.FC = () => {
  const router = useRouter();

  const handleRecursosPress = () => {
    router.push('../');
  };

  const handleEvaluacionesPress = () => {
    router.push('../'); 
  };

  const handleCalendarioPress = () => {
    router.push('/Alumnos/CalendarioAlumnos'); 
  };

  const handleReviewsPress = () => {
    router.push('/Alumnos/Reviews'); 
  };

  const handleMatematicasPress = () => {
    router.push('../'); 
  };

  const handleFisicaPress = () => {
    router.push('../'); 
  };

  const handleQuimicaPress = () => {
    router.push('../'); 
  };

  const handleProfilePress = () => {
    router.push('/Alumnos/PerfilAlumno'); 
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Creado para ti</Text>
        <TouchableOpacity style={styles.profileButton} onPress={handleProfilePress}>
          <Ionicons name="person-circle-outline" size={24} color="#000000" />
        </TouchableOpacity>
      </View>

      {/* Menu Grid */}
      <View style={styles.menuGrid}>
        <TouchableOpacity style={styles.menuItem} onPress={handleRecursosPress}>
          <View style={styles.menuIconContainer}>
            <Ionicons name="library-outline" size={28} color="#10B981" />
          </View>
          <Text style={styles.menuTitle}>Tablón de Recursos</Text>
          <Text style={styles.menuSubtitle}>Recuperación</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleEvaluacionesPress}>
          <View style={styles.menuIconContainer}>
            <Ionicons name="bar-chart-outline" size={28} color="#10B981" />
          </View>
          <Text style={styles.menuTitle}>Evaluaciones</Text>
          <Text style={styles.menuSubtitle}>Nuevas disponibles</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleCalendarioPress}>
          <View style={styles.menuIconContainer}>
            <Ionicons name="calendar-outline" size={28} color="#10B981" />
          </View>
          <Text style={styles.menuTitle}>Calendario</Text>
          <Text style={styles.menuSubtitle}>Citas creadas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={handleReviewsPress}>
          <View style={styles.menuIconContainer}>
            <Ionicons name="star-outline" size={28} color="#10B981" />
          </View>
          <Text style={styles.menuTitle}>Reseñas</Text>
          <Text style={styles.menuSubtitle}>Califica a tus maestros</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Activities Section */}
      <View style={styles.recentSection}>
        <Text style={styles.sectionTitle}>Reproducido recientemente</Text>
        
        <View style={styles.activitiesList}>
          <TouchableOpacity style={styles.activityItemWithBorder} onPress={handleMatematicasPress}>
            <View style={styles.activityIconContainer}>
              <Ionicons name="library-outline" size={16} color="#10B981" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Matemáticas - Álgebra</Text>
              <Text style={styles.activityDescription}>Evaluación: 95% • Necesitas más práctica</Text>
            </View>
            <Text style={styles.activityStatus}>AYER</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.activityItemWithBorder} onPress={handleFisicaPress}>
            <View style={styles.activityIconContainer}>
              <Ionicons name="time-outline" size={16} color="#10B981" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Física - Mecánica</Text>
              <Text style={styles.activityDescription}>Asesoría programada • Martes 4:00 PM</Text>
            </View>
            <Text style={styles.activityStatus}>PRÓXIMO</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.activityItem} onPress={handleQuimicaPress}>
            <View style={styles.activityIconContainer}>
              <Ionicons name="alert-circle-outline" size={16} color="#10B981" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Química Orgánica</Text>
              <Text style={styles.activityDescription}>Evaluación pendiente • Deadline: Viernes</Text>
            </View>
            <Text style={styles.activityStatus}>PENDIENTE</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Welcome Section */}
      <View style={styles.welcomeSection}>
        <View style={styles.welcomeCard}>
          <View style={styles.iconContainerLarge}>
            <Ionicons name="school-outline" size={32} color="#10B981" />
          </View>
          <Text style={styles.greeting}>Hola, Ana</Text>
          <Text style={styles.subtitle}>Tu música académica</Text>
          <Text style={styles.timeGreeting}>BUENAS TARDES</Text>
          
          <View style={styles.progressSection}>
            <Text style={styles.progressTitle}>Calificación General</Text>
            <Text style={styles.progressPercentage}>8.5</Text>
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBar}>
                <View style={styles.progressFill} />
              </View>
            </View>
            <View style={styles.progressLabels}>
              <Text style={styles.progressLabel}>Excelente desempeño</Text>
              <Text style={styles.progressLabel}>Meta: 9.0</Text>
            </View>
            
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>3</Text>
                <Text style={styles.statLabel}>POR RECUPERAR</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingTop: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  profileButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  menuItem: {
    width: '48%',
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    minHeight: 110,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  menuIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 4,
  },
  menuSubtitle: {
    fontSize: 11,
    color: '#6B7280',
    textAlign: 'center',
  },
  recentSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 12,
  },
  activitiesList: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  activityItemWithBorder: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  activityIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  activityContent: {
    flex: 1,
    marginRight: 12,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 2,
  },
  activityDescription: {
    fontSize: 12,
    color: '#6B7280',
  },
  activityStatus: {
    fontSize: 10,
    fontWeight: '700',
    color: '#10B981',
    letterSpacing: 0.5,
  },
  welcomeSection: {
    alignItems: 'center',
  },
  welcomeCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  iconContainerLarge: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  timeGreeting: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 20,
  },
  progressSection: {
    width: '100%',
    alignItems: 'center',
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  progressPercentage: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#10B981',
    marginBottom: 16,
  },
  progressBarContainer: {
    width: '100%',
    marginBottom: 12,
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    width: '85%',
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 3,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  progressLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});

export default AlumnoPanelScreen;