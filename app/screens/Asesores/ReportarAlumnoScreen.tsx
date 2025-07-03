import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Student {
  id: string;
  name: string;
  group: string;
  subject: string;
  faltas: number;
  maxFaltas: number;
}

interface ReportForm {
  directorEmail: string;
  tutorEmail: string;
  teacherEmail: string;
  additionalReason: string;
}

const ReportarAlumnosScreen: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([
    {
      id: '1',
      name: 'Eduardo Olvera Camacho',
      group: 'TIDSMG1',
      subject: 'Inglés',
      faltas: 0,
      maxFaltas: 3,
    },
    {
      id: '2',
      name: 'Gabriela Zoto Martinez',
      group: 'TIDSMG2',
      subject: 'Español',
      faltas: 2,
      maxFaltas: 3,
    },
    {
      id: '3',
      name: 'Gabriela Zoto Martinez',
      group: 'TIDSMG2',
      subject: 'Español',
      faltas: 3,
      maxFaltas: 3,
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [reportForm, setReportForm] = useState<ReportForm>({
    directorEmail: '',
    tutorEmail: '',
    teacherEmail: '',
    additionalReason: '',
  });

  const renderOpportunityCircles = (faltas: number, maxFaltas: number) => {
    const circles = [];
    for (let i = 0; i < maxFaltas; i++) {
      circles.push(
        <View
          key={i}
          style={[
            styles.opportunityCircle,
            i < faltas ? styles.lostOpportunity : styles.availableOpportunity,
          ]}
        />
      );
    }
    return circles;
  };

  const handleReportStudent = (student: Student) => {
    setSelectedStudent(student);
    setModalVisible(true);
  };

  const handleSendReport = () => {
    if (!reportForm.directorEmail || !reportForm.tutorEmail || !reportForm.teacherEmail) {
      Alert.alert('Error', 'Por favor completa todos los campos de correo electrónico');
      return;
    }

    // Aquí iría la lógica para enviar el reporte
    Alert.alert(
      'Reporte Enviado',
      `Se ha enviado el reporte del alumno ${selectedStudent?.name}`,
      [
        {
          text: 'OK',
          onPress: () => {
            setModalVisible(false);
            setReportForm({
              directorEmail: '',
              tutorEmail: '',
              teacherEmail: '',
              additionalReason: '',
            });
          },
        },
      ]
    );
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setReportForm({
      directorEmail: '',
      tutorEmail: '',
      teacherEmail: '',
      additionalReason: '',
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>REPORTAR A UN ALUMNO</Text>
        <Text style={styles.headerSubtitle}>
          Reporta los alumnos que tienen menos del 80% de asistencia
        </Text>
      </View>

      {/* Students List */}
      {students.map((student) => (
        <View key={student.id} style={styles.studentCard}>
          <View style={styles.studentInfo}>
            <Text style={styles.studentName}>{student.name}</Text>
            <Text style={styles.studentGroup}>Grupo: {student.group}</Text>
            <Text style={styles.studentSubject}>Asignatura: {student.subject}</Text>
          </View>

          <View style={styles.opportunityContainer}>
            {renderOpportunityCircles(student.faltas, student.maxFaltas)}
          </View>

          {student.faltas >= student.maxFaltas && (
            <TouchableOpacity
              style={styles.reportButton}
              onPress={() => handleReportStudent(student)}
            >
              <Text style={styles.reportButtonText}>REPORTAR ALUMNO</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}

      {/* Modal for Report Form */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>REPORTAR ALUMNO</Text>
              <Text style={styles.modalSubtitle}>
                Ingresa los correos de las autoridades correspondientes
              </Text>
              <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalBody}>
              {selectedStudent && (
                <View style={styles.studentSummary}>
                  <Text style={styles.studentSummaryName}>{selectedStudent.name}</Text>
                  <Text style={styles.studentSummaryDetails}>
                    Grupo: {selectedStudent.group}
                  </Text>
                  <Text style={styles.studentSummaryDetails}>
                    Asignatura: {selectedStudent.subject}
                  </Text>
                </View>
              )}

              <View style={styles.formGroup}>
                <Text style={styles.label}>Correo del director:</Text>
                <TextInput
                  style={styles.input}
                  value={reportForm.directorEmail}
                  onChangeText={(text) =>
                    setReportForm({ ...reportForm, directorEmail: text })
                  }
                  placeholder="director@universidad.edu"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Correo del tutor:</Text>
                <TextInput
                  style={styles.input}
                  value={reportForm.tutorEmail}
                  onChangeText={(text) =>
                    setReportForm({ ...reportForm, tutorEmail: text })
                  }
                  placeholder="tutor@universidad.edu"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Correo del maestro:</Text>
                <TextInput
                  style={styles.input}
                  value={reportForm.teacherEmail}
                  onChangeText={(text) =>
                    setReportForm({ ...reportForm, teacherEmail: text })
                  }
                  placeholder="maestro@universidad.edu"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Motivo adicional:</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={reportForm.additionalReason}
                  onChangeText={(text) =>
                    setReportForm({ ...reportForm, additionalReason: text })
                  }
                  placeholder="Escribe aquí cualquier información adicional..."
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>

              <TouchableOpacity style={styles.sendButton} onPress={handleSendReport}>
                <Text style={styles.sendButtonText}>Enviar Reporte</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
    backgroundColor: '#10B981',
    padding: 20,
    marginBottom: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
  },
  studentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  studentInfo: {
    marginBottom: 12,
  },
  studentName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  studentGroup: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  studentSubject: {
    fontSize: 14,
    color: '#6B7280',
  },
  opportunityContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  opportunityCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
    borderWidth: 2,
  },
  availableOpportunity: {
    backgroundColor: '#FFFFFF',
    borderColor: '#D1D5DB',
  },
  lostOpportunity: {
    backgroundColor: '#EF4444',
    borderColor: '#EF4444',
  },
  reportButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  reportButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: '90%',
    maxHeight: '80%',
    overflow: 'hidden',
  },
  modalHeader: {
    backgroundColor: '#EF4444',
    padding: 20,
    alignItems: 'center',
    position: 'relative',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 4,
  },
  modalBody: {
    padding: 20,
  },
  studentSummary: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  studentSummaryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  studentSummaryDetails: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  sendButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ReportarAlumnosScreen;