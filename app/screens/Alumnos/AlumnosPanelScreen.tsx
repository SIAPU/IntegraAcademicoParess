import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const AlumnoPanelScreen: React.FC = () => { // <--- Nombre del componente cambiado aquí
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Creado para ti</Text>
        <TouchableOpacity style={styles.profileButton}>
          <Ionicons name="person-circle-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Menu Grid */}
      <View style={styles.menuGrid}>
        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIconContainer}>
            <Ionicons name="library-outline" size={28} color="#10B981" />
          </View>
          <Text style={styles.menuTitle}>Tablón de Recursos</Text>
          <Text style={styles.menuSubtitle}>Recuperación</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIconContainer}>
            <Ionicons name="bar-chart-outline" size={28} color="#10B981" />
          </View>
          <Text style={styles.menuTitle}>Evaluaciones</Text>
          <Text style={styles.menuSubtitle}>Nuevas disponibles</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIconContainer}>
            <Ionicons name="calendar-outline" size={28} color="#10B981" />
          </View>
          <Text style={styles.menuTitle}>Calendario</Text>
          <Text style={styles.menuSubtitle}>Citas creadas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <View style={styles.menuIconContainer}>
            <Ionicons name="trending-up-outline" size={28} color="#10B981" />
          </View>
          <Text style={styles.menuTitle}>Tus Stats</Text>
          <Text style={styles.menuSubtitle}>Resumen anual</Text>
        </TouchableOpacity>
      </View>

      {/* Recent Activities Section */}
      <View style={styles.recentSection}>
        <Text style={styles.sectionTitle}>Reproducido recientemente</Text>
        
        <View style={styles.activitiesList}>
          <TouchableOpacity style={styles.activityItem}>
            <View style={styles.activityIconContainer}>
              <Ionicons name="library-outline" size={16} color="#FFFFFF" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Matemáticas - Álgebra</Text>
              <Text style={styles.activityDescription}>Evaluación: 95% • Necesitas más práctica</Text>
            </View>
            <Text style={styles.activityStatus}>AYER</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.activityItem}>
            <View style={styles.activityIconContainer}>
              <Ionicons name="time-outline" size={16} color="#FFFFFF" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Física - Mecánica</Text>
              <Text style={styles.activityDescription}>Asesoría programada • Martes 4:00 PM</Text>
            </View>
            <Text style={styles.activityStatus}>PRÓXIMO</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.activityItem}>
            <View style={styles.activityIconContainer}>
              <Ionicons name="alert-circle-outline" size={16} color="#FFFFFF" />
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
            <Ionicons name="school-outline" size={32} color="#FFFFFF" />
          </View>
          <Text style={styles.greeting}>Hola, Ana</Text>
          <Text style={styles.subtitle}>Tu música académica</Text>
          <Text style={styles.timeGreeting}>BUENAS TARDES</Text>
          
          <View style={styles.progressSection}>
            <Text style={styles.progressTitle}>Progreso Académico</Text>
            <Text style={styles.progressPercentage}>68%</Text>
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBar}>
                <View style={styles.progressFill} />
              </View>
            </View>
            <View style={styles.progressLabels}>
              <Text style={styles.progressLabel}>Camino hacia el éxito</Text>
              <Text style={styles.progressLabel}>Meta: 80%</Text>
            </View>
            
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>3</Text>
                <Text style={styles.statLabel}>POR RECUPERAR</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>5</Text>
                <Text style={styles.statLabel}>ASESORÍAS ACTIVAS</Text>
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
    backgroundColor: '#10B981',
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
    color: '#FFFFFF',
  },
  profileButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  menuItem: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    minHeight: 110,
    justifyContent: 'center',
  },
  menuIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  menuTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  menuSubtitle: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  recentSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  activitiesList: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    overflow: 'hidden',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  activityIconContainer: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
    marginRight: 12,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  activityDescription: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  activityStatus: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  welcomeSection: {
    alignItems: 'center',
  },
  welcomeCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    alignItems: 'center',
  },
  iconContainerLarge: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  timeGreeting: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
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
    color: '#FFFFFF',
    marginBottom: 8,
  },
  progressPercentage: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  progressBarContainer: {
    width: '100%',
    marginBottom: 12,
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    width: '68%',
    height: '100%',
    backgroundColor: '#FFFFFF',
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
    color: 'rgba(255, 255, 255, 0.8)',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});

export default AlumnoPanelScreen; 