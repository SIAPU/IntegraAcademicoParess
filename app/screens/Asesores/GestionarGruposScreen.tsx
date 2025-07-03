import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  StyleSheet,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Estudiante {
  nombre: string;
  tema: string;
  gruposAdicionales?: string[];
  // Información adicional para el perfil
  matricula: string;
  edad: number;
  semestre: string;
  carrera: string;
  materiaEnRiesgo: string;
  nivelRiesgo: 'Alto' | 'Medio' | 'Bajo';
  calificacionActual: number;
  asistencia: number;
  email: string;
  telefono: string;
}

interface Horario {
  dia: string;
  hora: string;
  aula: string;
}

interface Grupo {
  id: number;
  materia: string;
  alumnos: number;
  profesor: string;
  aula: string;
  estudiantes: Estudiante[];
  horarios: Horario[];
}

const GestionarGrupos = () => {
  const [selectedModal, setSelectedModal] = useState<string | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<Grupo | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Estudiante | null>(null);

  const grupos: Grupo[] = [
    {
      id: 1,
      materia: 'Matemáticas Básicas',
      alumnos: 8,
      profesor: 'Prof. García',
      aula: 'Aula 101',
      estudiantes: [
        { 
          nombre: 'Ana Rodríguez', 
          tema: 'Álgebra', 
          gruposAdicionales: ['Química General'],
          matricula: '2023001',
          edad: 19,
          semestre: '3er Semestre',
          carrera: 'Ingeniería Industrial',
          materiaEnRiesgo: 'Álgebra',
          nivelRiesgo: 'Alto',
          calificacionActual: 5.2,
          asistencia: 65,
          email: 'ana.rodriguez@universidad.edu',
          telefono: '+52 771 123 4567'
        },
        { 
          nombre: 'Carlos Mendoza', 
          tema: 'Geometría', 
          gruposAdicionales: ['Física I'],
          matricula: '2023002',
          edad: 20,
          semestre: '4to Semestre',
          carrera: 'Ingeniería Civil',
          materiaEnRiesgo: 'Geometría',
          nivelRiesgo: 'Medio',
          calificacionActual: 6.8,
          asistencia: 80,
          email: 'carlos.mendoza@universidad.edu',
          telefono: '+52 771 234 5678'
        },
        { 
          nombre: 'María González', 
          tema: 'Trigonometría',
          matricula: '2023003',
          edad: 18,
          semestre: '2do Semestre',
          carrera: 'Licenciatura en Matemáticas',
          materiaEnRiesgo: 'Trigonometría',
          nivelRiesgo: 'Bajo',
          calificacionActual: 7.5,
          asistencia: 90,
          email: 'maria.gonzalez@universidad.edu',
          telefono: '+52 771 345 6789'
        },
        { 
          nombre: 'Luis Herrera', 
          tema: 'Álgebra', 
          gruposAdicionales: ['Química General'],
          matricula: '2023004',
          edad: 21,
          semestre: '5to Semestre',
          carrera: 'Ingeniería Química',
          materiaEnRiesgo: 'Álgebra',
          nivelRiesgo: 'Alto',
          calificacionActual: 4.8,
          asistencia: 55,
          email: 'luis.herrera@universidad.edu',
          telefono: '+52 771 456 7890'
        },
        { 
          nombre: 'Sofia Jiménez', 
          tema: 'Geometría',
          matricula: '2023005',
          edad: 19,
          semestre: '3er Semestre',
          carrera: 'Arquitectura',
          materiaEnRiesgo: 'Geometría',
          nivelRiesgo: 'Medio',
          calificacionActual: 6.2,
          asistencia: 75,
          email: 'sofia.jimenez@universidad.edu',
          telefono: '+52 771 567 8901'
        },
        { 
          nombre: 'Diego Morales', 
          tema: 'Trigonometría', 
          gruposAdicionales: ['Física I'],
          matricula: '2023006',
          edad: 20,
          semestre: '4to Semestre',
          carrera: 'Ingeniería Mecánica',
          materiaEnRiesgo: 'Trigonometría',
          nivelRiesgo: 'Bajo',
          calificacionActual: 8.1,
          asistencia: 95,
          email: 'diego.morales@universidad.edu',
          telefono: '+52 771 678 9012'
        },
        { 
          nombre: 'Elena Vásquez', 
          tema: 'Álgebra',
          matricula: '2023007',
          edad: 18,
          semestre: '2do Semestre',
          carrera: 'Licenciatura en Física',
          materiaEnRiesgo: 'Álgebra',
          nivelRiesgo: 'Medio',
          calificacionActual: 6.5,
          asistencia: 70,
          email: 'elena.vasquez@universidad.edu',
          telefono: '+52 771 789 0123'
        },
        { 
          nombre: 'Roberto Silva', 
          tema: 'Geometría', 
          gruposAdicionales: ['Química General'],
          matricula: '2023008',
          edad: 22,
          semestre: '6to Semestre',
          carrera: 'Ingeniería Industrial',
          materiaEnRiesgo: 'Geometría',
          nivelRiesgo: 'Alto',
          calificacionActual: 5.0,
          asistencia: 60,
          email: 'roberto.silva@universidad.edu',
          telefono: '+52 771 890 1234'
        }
      ],
      horarios: [
        { dia: 'Lunes', hora: '08:00 - 10:00', aula: 'Aula 101' },
        { dia: 'Miércoles', hora: '10:00 - 12:00', aula: 'Aula 101' },
        { dia: 'Viernes', hora: '14:00 - 16:00', aula: 'Aula 101' }
      ]
    },
    {
      id: 2,
      materia: 'Química General',
      alumnos: 12,
      profesor: 'Prof. López',
      aula: 'Lab. 205',
      estudiantes: [
        { 
          nombre: 'Pedro Martínez', 
          tema: 'Química Orgánica',
          matricula: '2023009',
          edad: 20,
          semestre: '4to Semestre',
          carrera: 'Ingeniería Química',
          materiaEnRiesgo: 'Química Orgánica',
          nivelRiesgo: 'Medio',
          calificacionActual: 6.3,
          asistencia: 78,
          email: 'pedro.martinez@universidad.edu',
          telefono: '+52 771 901 2345'
        },
        { 
          nombre: 'Laura Fernández', 
          tema: 'Química Inorgánica', 
          gruposAdicionales: ['Matemáticas Básicas'],
          matricula: '2023010',
          edad: 19,
          semestre: '3er Semestre',
          carrera: 'Química Industrial',
          materiaEnRiesgo: 'Química Inorgánica',
          nivelRiesgo: 'Bajo',
          calificacionActual: 7.8,
          asistencia: 88,
          email: 'laura.fernandez@universidad.edu',
          telefono: '+52 771 012 3456'
        },
        // Agregar más estudiantes con datos completos...
        { 
          nombre: 'José Ramírez', 
          tema: 'Estequiometría',
          matricula: '2023011',
          edad: 21,
          semestre: '5to Semestre',
          carrera: 'Ingeniería Ambiental',
          materiaEnRiesgo: 'Estequiometría',
          nivelRiesgo: 'Alto',
          calificacionActual: 5.5,
          asistencia: 62,
          email: 'jose.ramirez@universidad.edu',
          telefono: '+52 771 123 4567'
        },
        { 
          nombre: 'Carmen Torres', 
          tema: 'Química Orgánica', 
          gruposAdicionales: ['Física I'],
          matricula: '2023012',
          edad: 18,
          semestre: '2do Semestre',
          carrera: 'Ingeniería Bioquímica',
          materiaEnRiesgo: 'Química Orgánica',
          nivelRiesgo: 'Medio',
          calificacionActual: 6.9,
          asistencia: 82,
          email: 'carmen.torres@universidad.edu',
          telefono: '+52 771 234 5678'
        },
        { 
          nombre: 'Antonio Ruiz', 
          tema: 'Química Inorgánica',
          matricula: '2023013',
          edad: 20,
          semestre: '4to Semestre',
          carrera: 'Ingeniería de Materiales',
          materiaEnRiesgo: 'Química Inorgánica',
          nivelRiesgo: 'Bajo',
          calificacionActual: 7.2,
          asistencia: 85,
          email: 'antonio.ruiz@universidad.edu',
          telefono: '+52 771 345 6789'
        },
        { 
          nombre: 'Isabel Castro', 
          tema: 'Estequiometría', 
          gruposAdicionales: ['Matemáticas Básicas'],
          matricula: '2023014',
          edad: 19,
          semestre: '3er Semestre',
          carrera: 'Química Farmacéutica',
          materiaEnRiesgo: 'Estequiometría',
          nivelRiesgo: 'Alto',
          calificacionActual: 4.9,
          asistencia: 58,
          email: 'isabel.castro@universidad.edu',
          telefono: '+52 771 456 7890'
        },
        { 
          nombre: 'Miguel Vargas', 
          tema: 'Química Orgánica',
          matricula: '2023015',
          edad: 22,
          semestre: '6to Semestre',
          carrera: 'Ingeniería Química',
          materiaEnRiesgo: 'Química Orgánica',
          nivelRiesgo: 'Medio',
          calificacionActual: 6.4,
          asistencia: 76,
          email: 'miguel.vargas@universidad.edu',
          telefono: '+52 771 567 8901'
        },
        { 
          nombre: 'Patricia Núñez', 
          tema: 'Química Inorgánica',
          matricula: '2023016',
          edad: 21,
          semestre: '5to Semestre',
          carrera: 'Ingeniería Petrolera',
          materiaEnRiesgo: 'Química Inorgánica',
          nivelRiesgo: 'Bajo',
          calificacionActual: 7.6,
          asistencia: 91,
          email: 'patricia.nunez@universidad.edu',
          telefono: '+52 771 678 9012'
        },
        { 
          nombre: 'Ricardo Soto', 
          tema: 'Estequiometría', 
          gruposAdicionales: ['Física I'],
          matricula: '2023017',
          edad: 20,
          semestre: '4to Semestre',
          carrera: 'Ingeniería Industrial',
          materiaEnRiesgo: 'Estequiometría',
          nivelRiesgo: 'Alto',
          calificacionActual: 5.1,
          asistencia: 64,
          email: 'ricardo.soto@universidad.edu',
          telefono: '+52 771 789 0123'
        },
        { 
          nombre: 'Claudia Herrera', 
          tema: 'Química Orgánica',
          matricula: '2023018',
          edad: 19,
          semestre: '3er Semestre',
          carrera: 'Biotecnología',
          materiaEnRiesgo: 'Química Orgánica',
          nivelRiesgo: 'Medio',
          calificacionActual: 6.7,
          asistencia: 79,
          email: 'claudia.herrera@universidad.edu',
          telefono: '+52 771 890 1234'
        },
        { 
          nombre: 'Fernando Díaz', 
          tema: 'Química Inorgánica', 
          gruposAdicionales: ['Matemáticas Básicas'],
          matricula: '2023019',
          edad: 23,
          semestre: '7mo Semestre',
          carrera: 'Ingeniería Química',
          materiaEnRiesgo: 'Química Inorgánica',
          nivelRiesgo: 'Bajo',
          calificacionActual: 8.0,
          asistencia: 93,
          email: 'fernando.diaz@universidad.edu',
          telefono: '+52 771 901 2345'
        },
        { 
          nombre: 'Mónica Pérez', 
          tema: 'Estequiometría',
          matricula: '2023020',
          edad: 18,
          semestre: '2do Semestre',
          carrera: 'Ingeniería Ambiental',
          materiaEnRiesgo: 'Estequiometría',
          nivelRiesgo: 'Alto',
          calificacionActual: 4.7,
          asistencia: 53,
          email: 'monica.perez@universidad.edu',
          telefono: '+52 771 012 3456'
        }
      ],
      horarios: [
        { dia: 'Martes', hora: '10:00 - 12:00', aula: 'Lab. 205' },
        { dia: 'Jueves', hora: '10:00 - 12:00', aula: 'Lab. 205' },
        { dia: 'Sábado', hora: '09:00 - 11:00', aula: 'Lab. 205' }
      ]
    },
    {
      id: 3,
      materia: 'Física I',
      alumnos: 6,
      profesor: 'Prof. Martínez',
      aula: 'Aula 303',
      estudiantes: [
        { 
          nombre: 'Alejandro Gómez', 
          tema: 'Mecánica', 
          gruposAdicionales: ['Matemáticas Básicas'],
          matricula: '2023021',
          edad: 19,
          semestre: '3er Semestre',
          carrera: 'Ingeniería Mecánica',
          materiaEnRiesgo: 'Mecánica',
          nivelRiesgo: 'Medio',
          calificacionActual: 6.8,
          asistencia: 81,
          email: 'alejandro.gomez@universidad.edu',
          telefono: '+52 771 123 4567'
        },
        { 
          nombre: 'Beatriz Moreno', 
          tema: 'Cinemática',
          matricula: '2023022',
          edad: 20,
          semestre: '4to Semestre',
          carrera: 'Ingeniería Aeroespacial',
          materiaEnRiesgo: 'Cinemática',
          nivelRiesgo: 'Bajo',
          calificacionActual: 7.9,
          asistencia: 94,
          email: 'beatriz.moreno@universidad.edu',
          telefono: '+52 771 234 5678'
        },
        { 
          nombre: 'Carlos Jiménez', 
          tema: 'Dinámica', 
          gruposAdicionales: ['Química General'],
          matricula: '2023023',
          edad: 21,
          semestre: '5to Semestre',
          carrera: 'Ingeniería Civil',
          materiaEnRiesgo: 'Dinámica',
          nivelRiesgo: 'Alto',
          calificacionActual: 5.3,
          asistencia: 67,
          email: 'carlos.jimenez@universidad.edu',
          telefono: '+52 771 345 6789'
        },
        { 
          nombre: 'Diana López', 
          tema: 'Mecánica',
          matricula: '2023024',
          edad: 18,
          semestre: '2do Semestre',
          carrera: 'Licenciatura en Física',
          materiaEnRiesgo: 'Mecánica',
          nivelRiesgo: 'Medio',
          calificacionActual: 6.6,
          asistencia: 77,
          email: 'diana.lopez@universidad.edu',
          telefono: '+52 771 456 7890'
        },
        { 
          nombre: 'Eduardo Ramos', 
          tema: 'Cinemática', 
          gruposAdicionales: ['Matemáticas Básicas'],
          matricula: '2023025',
          edad: 22,
          semestre: '6to Semestre',
          carrera: 'Ingeniería Automotriz',
          materiaEnRiesgo: 'Cinemática',
          nivelRiesgo: 'Bajo',
          calificacionActual: 7.4,
          asistencia: 89,
          email: 'eduardo.ramos@universidad.edu',
          telefono: '+52 771 567 8901'
        },
        { 
          nombre: 'Fernanda Cruz', 
          tema: 'Dinámica',
          matricula: '2023026',
          edad: 19,
          semestre: '3er Semestre',
          carrera: 'Ingeniería Biomédica',
          materiaEnRiesgo: 'Dinámica',
          nivelRiesgo: 'Alto',
          calificacionActual: 4.6,
          asistencia: 52,
          email: 'fernanda.cruz@universidad.edu',
          telefono: '+52 771 678 9012'
        }
      ],
      horarios: [
        { dia: 'Lunes', hora: '14:00 - 16:00', aula: 'Aula 303' },
        { dia: 'Miércoles', hora: '16:00 - 18:00', aula: 'Aula 303' },
        { dia: 'Viernes', hora: '10:00 - 12:00', aula: 'Aula 303' }
      ]
    }
  ];

  const openModal = (modalType: string, group: Grupo) => {
    setSelectedModal(modalType);
    setSelectedGroup(group);
  };

  const openStudentProfile = (student: Estudiante) => {
    setSelectedStudent(student);
    setSelectedModal('perfil');
  };

  const closeModal = () => {
    setSelectedModal(null);
    setSelectedGroup(null);
    setSelectedStudent(null);
  };

  const getRiskColor = (nivel: string) => {
    switch (nivel) {
      case 'Alto':
        return '#EF4444';
      case 'Medio':
        return '#F59E0B';
      case 'Bajo':
        return '#10B981';
      default:
        return '#6B7280';
    }
  };

  const renderGrupoCard = ({ item: grupo }: { item: Grupo }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{grupo.materia}</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>Activo</Text>
        </View>
      </View>

      <View style={styles.cardContent}>
        <View style={styles.infoRow}>
          <Ionicons name="people" size={16} color="#6B7280" />
          <Text style={styles.infoLabel}>Alumnos:</Text>
          <Text style={styles.infoValue}>{grupo.alumnos} estudiantes</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="person" size={16} color="#6B7280" />
          <Text style={styles.infoLabel}>Profesor:</Text>
          <Text style={styles.infoValue}>{grupo.profesor}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="location" size={16} color="#6B7280" />
          <Text style={styles.infoLabel}>Aula:</Text>
          <Text style={styles.infoValue}>{grupo.aula}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() => openModal('estudiantes', grupo)}
          >
            <Text style={styles.primaryButtonText}>Lista de Alumnos</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => openModal('horarios', grupo)}
          >
            <Text style={styles.secondaryButtonText}>Horarios del Grupo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderEstudiante = ({ item: estudiante }: { item: Estudiante }) => (
    <TouchableOpacity 
      style={styles.estudianteCard}
      onPress={() => openStudentProfile(estudiante)}
    >
      <Text style={styles.estudianteNombre}>{estudiante.nombre}</Text>
      <Text style={styles.estudianteTema}>{estudiante.tema}</Text>
      {estudiante.gruposAdicionales && estudiante.gruposAdicionales.length > 0 && (
        <Text style={styles.gruposAdicionales}>
          También en: {estudiante.gruposAdicionales.join(', ')}
        </Text>
      )}
      <View style={styles.riskIndicator}>
        <View style={[styles.riskBadge, { backgroundColor: getRiskColor(estudiante.nivelRiesgo) }]}>
          <Text style={styles.riskText}>{estudiante.nivelRiesgo}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderHorario = ({ item: horario }: { item: Horario }) => (
    <View style={styles.horarioCard}>
      <View style={styles.horarioInfo}>
        <Text style={styles.horarioDia}>{horario.dia}</Text>
        <Text style={styles.horarioAula}>{horario.aula}</Text>
      </View>
      <Text style={styles.horarioHora}>{horario.hora}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Gestión de Grupos de Asesorías</Text>
        <Text style={styles.subtitle}>Administra los grupos de asesorías y su información</Text>
      </View>

      <FlatList
        data={grupos}
        renderItem={renderGrupoCard}
        keyExtractor={(item: Grupo) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* Modal para Lista de Alumnos */}
      <Modal
        visible={selectedModal === 'estudiantes'}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Lista de Alumnos - {selectedGroup?.materia}
              </Text>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={selectedGroup?.estudiantes || []}
              renderItem={renderEstudiante}
              keyExtractor={(item: Estudiante, index: number) => index.toString()}
              contentContainerStyle={styles.modalList}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>

      {/* Modal para Horarios del Grupo */}
      <Modal
        visible={selectedModal === 'horarios'}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Horarios - {selectedGroup?.materia}
              </Text>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={selectedGroup?.horarios || []}
              renderItem={renderHorario}
              keyExtractor={(item: Horario, index: number) => index.toString()}
              contentContainerStyle={styles.modalList}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>

      {/* Modal para Perfil del Estudiante */}
      <Modal
        visible={selectedModal === 'perfil'}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Perfil del Alumno</Text>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.profileContainer} showsVerticalScrollIndicator={false}>
              {selectedStudent && (
                <>
                  {/* Header del perfil */}
                  <View style={styles.profileHeader}>
                    <View style={styles.photoPlaceholder}>
                      <Text style={styles.photoText}>Foto del alumno</Text>
                    </View>
                    <Text style={styles.profileName}>{selectedStudent.nombre}</Text>
                    <Text style={styles.profileMatricula}>Matrícula: {selectedStudent.matricula}</Text>
                  </View>

                  {/* Información Académica */}
                  <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Información Académica</Text>
                    
                    <View style={styles.infoItem}>
                      <Text style={styles.infoItemLabel}>Materia en Riesgo:</Text>
                      <Text style={styles.infoItemValue}>{selectedStudent.materiaEnRiesgo}</Text>
                    </View>

                    <View style={styles.infoItem}>
                      <Text style={styles.infoItemLabel}>Nivel de Riesgo:</Text>
                      <View style={[styles.riskBadge, { backgroundColor: getRiskColor(selectedStudent.nivelRiesgo) }]}>
                        <Text style={styles.riskText}>{selectedStudent.nivelRiesgo}</Text>
                      </View>
                    </View>

                    <View style={styles.infoItem}>
                      <Text style={styles.infoItemLabel}>Calificación Actual:</Text>
                      <Text style={styles.infoItemValue}>{selectedStudent.calificacionActual}</Text>
                    </View>

                    <View style={styles.infoItem}>
                      <Text style={styles.infoItemLabel}>Asistencia:</Text>
                      <Text style={styles.infoItemValue}>{selectedStudent.asistencia}%</Text>
                    </View>
                  </View>

                  {/* Información Personal */}
                  <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Información Personal</Text>
                    
                    <View style={styles.infoItem}>
                      <Text style={styles.infoItemLabel}>Edad:</Text>
                      <Text style={styles.infoItemValue}>{selectedStudent.edad} años</Text>
                    </View>

                    <View style={styles.infoItem}>
                      <Text style={styles.infoItemLabel}>Semestre:</Text>
                      <Text style={styles.infoItemValue}>{selectedStudent.semestre}</Text>
                    </View>

                    <View style={styles.infoItem}>
                      <Text style={styles.infoItemLabel}>Carrera:</Text>
                      <Text style={styles.infoItemValue}>{selectedStudent.carrera}</Text>
                    </View>
                  </View>

                  {/* Contacto */}
                  <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Contacto</Text>
                    
                    <View style={styles.contactItem}>
                      <Ionicons name="mail" size={16} color="#10B981" />
                      <Text style={styles.contactText}>{selectedStudent.email}</Text>
                    </View>

                    <View style={styles.contactItem}>
                      <Ionicons name="call" size={16} color="#10B981" />
                      <Text style={styles.contactText}>{selectedStudent.telefono}</Text>
                    </View>
                  </View>
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    padding: 16,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  statusBadge: {
    backgroundColor: '#10B981',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  cardContent: {
    padding: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: {
    fontWeight: '500',
    color: '#374151',
    marginLeft: 8,
  },
  infoValue: {
    color: '#6B7280',
    marginLeft: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 16,
    gap: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#10B981',
  },
  secondaryButton: {
    backgroundColor: '#111827',
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  secondaryButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    width: '100%',
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  modalList: {
    padding: 16,
  },
  estudianteCard: {
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  estudianteNombre: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 4,
  },
  estudianteTema: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '500',
    marginBottom: 4,
  },
  gruposAdicionales: {
    fontSize: 12,
    color: '#6B7280',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  riskIndicator: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  riskBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  riskText: {
    color: 'white',
    fontSize: 11,
    fontWeight: '600',
  },
  horarioCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  horarioInfo: {
    flex: 1,
  },
  horarioDia: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 4,
  },
  horarioAula: {
    fontSize: 14,
    color: '#6B7280',
  },
  horarioHora: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '500',
  },
  // Estilos para el perfil del estudiante
  profileContainer: {
    flex: 1,
  },
  profileHeader: {
    backgroundColor: '#10B981',
    padding: 20,
    alignItems: 'center',
  },
  photoPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'white',
  },
  photoText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  profileMatricula: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  sectionContainer: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoItemLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    flex: 1,
  },
  infoItemValue: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'right',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  contactText: {
    fontSize: 14,
    color: '#10B981',
    marginLeft: 8,
    fontWeight: '500',
  },
});

export default GestionarGrupos;