import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Alert,
  Modal,
  TextInput,
  FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface Student {
  id: string;
  name: string;
  studentId: string;
  email: string;
  present: boolean;
}

interface ClassMaterial {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
}

interface ClassSession {
  id: string;
  subject: string;
  date: string;
  startTime: string;
  endTime?: string;
  duration: number; // en minutos
  students: Student[];
  materials: ClassMaterial[];
  status: 'pending' | 'active' | 'completed';
}

const ListaAsistenciaScreen: React.FC = () => {
  const router = useRouter();
  const [classSession, setClassSession] = useState<ClassSession | null>(null);
  const [timer, setTimer] = useState<number>(0); // en segundos
  const [isClassActive, setIsClassActive] = useState<boolean>(false);
  const [showMaterialModal, setShowMaterialModal] = useState<boolean>(false);
  const [materialName, setMaterialName] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  
  // Datos de ejemplo de estudiantes
  const initialStudents: Student[] = [
    {
      id: '1',
      name: 'Juan Carlos Pérez',
      studentId: '2021001',
      email: 'juan.perez@estudiantes.edu',
      present: false,
    },
    {
      id: '2',
      name: 'María González López',
      studentId: '2021002',
      email: 'maria.gonzalez@estudiantes.edu',
      present: false,
    },
    {
      id: '3',
      name: 'Carlos Rodríguez Martín',
      studentId: '2021003',
      email: 'carlos.rodriguez@estudiantes.edu',
      present: false,
    },
    {
      id: '4',
      name: 'Ana Sofía Vásquez',
      studentId: '2021004',
      email: 'ana.vasquez@estudiantes.edu',
      present: false,
    },
    {
      id: '5',
      name: 'Pedro Ramírez Castro',
      studentId: '2021005',
      email: 'pedro.ramirez@estudiantes.edu',
      present: false,
    },
  ];

  // Inicializar sesión de clase
  useEffect(() => {
    const newSession: ClassSession = {
      id: Date.now().toString(),
      subject: 'Matemáticas Básicas',
      date: new Date().toLocaleDateString(),
      startTime: new Date().toLocaleTimeString(),
      duration: 120, // 2 horas = 120 minutos
      students: initialStudents,
      materials: [],
      status: 'pending'
    };
    setClassSession(newSession);
  }, []);

  // Timer para la clase
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isClassActive) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isClassActive]);

  // Formatear tiempo
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Calcular tiempo restante
  const getRemainingTime = (): string => {
    const totalSeconds = 120 * 60; // 2 horas en segundos
    const remaining = totalSeconds - timer;
    if (remaining <= 0) return '00:00:00';
    return formatTime(remaining);
  };

  // Manejar asistencia
  const toggleAttendance = (studentId: string) => {
    if (!classSession) return;
    
    const updatedStudents = classSession.students.map(student =>
      student.id === studentId ? { ...student, present: !student.present } : student
    );
    
    setClassSession({
      ...classSession,
      students: updatedStudents
    });
  };

  // Iniciar clase
  const startClass = () => {
    if (!classSession) return;
    
    Alert.alert(
      "Iniciar Clase",
      "¿Estás seguro de que quieres iniciar la clase?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Iniciar", 
          onPress: () => {
            setIsClassActive(true);
            setClassSession({
              ...classSession,
              status: 'active'
            });
            setTimer(0);
          }
        }
      ]
    );
  };

  // Finalizar clase
  const endClass = () => {
    Alert.alert(
      "Finalizar Clase",
      "¿Estás seguro de que quieres finalizar la clase?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Finalizar", 
          onPress: () => {
            setIsClassActive(false);
            if (classSession) {
              setClassSession({
                ...classSession,
                status: 'completed',
                endTime: new Date().toLocaleTimeString()
              });
            }
            // Aquí se guardaría en el historial
            Alert.alert("Clase Finalizada", "La clase ha sido guardada en el historial.");
          }
        }
      ]
    );
  };

  // Subir material (simulación sin expo-document-picker)
  const uploadMaterial = async () => {
    if (!selectedFile) {
      Alert.alert("Error", "Por favor selecciona un archivo primero.");
      return;
    }
    
    try {
      // Simulación de selección de archivo
      const fileName = materialName || selectedFile;
      
      const newMaterial: ClassMaterial = {
        id: Date.now().toString(),
        name: fileName,
        type: getFileType(selectedFile),
        uploadDate: new Date().toLocaleString()
      };
      
      if (classSession) {
        setClassSession({
          ...classSession,
          materials: [...classSession.materials, newMaterial]
        });
      }
      
      setShowMaterialModal(false);
      setMaterialName('');
      setSelectedFile(null);
      Alert.alert("Material Subido", "El material ha sido subido exitosamente.");
    } catch (error) {
      Alert.alert("Error", "No se pudo subir el material.");
    }
  };

  // Obtener tipo de archivo basado en extensión
  const getFileType = (fileName: string): string => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return 'application/pdf';
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg';
      case 'png':
        return 'image/png';
      case 'docx':
        return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      case 'doc':
        return 'application/msword';
      default:
        return 'application/octet-stream';
    }
  };

  // Simular selección de archivo
  const selectFile = () => {
    Alert.alert(
      "Seleccionar Archivo",
      "Selecciona el tipo de archivo:",
      [
        { text: "PDF", onPress: () => setSelectedFile("documento.pdf") },
        { text: "Imagen JPG", onPress: () => setSelectedFile("imagen.jpg") },
        { text: "Imagen PNG", onPress: () => setSelectedFile("imagen.png") },
        { text: "Word", onPress: () => setSelectedFile("documento.docx") },
        { text: "Cancelar", style: "cancel" }
      ]
    );
  };

  // Obtener estadísticas de asistencia
  const getAttendanceStats = () => {
    if (!classSession) return { present: 0, total: 0, percentage: 0 };
    
    const present = classSession.students.filter(s => s.present).length;
    const total = classSession.students.length;
    const percentage = total > 0 ? Math.round((present / total) * 100) : 0;
    
    return { present, total, percentage };
  };

  const stats = getAttendanceStats();

  if (!classSession) {
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#10B981" />
        </TouchableOpacity>
        <Text style={styles.mainTitle}>Lista de Asistencia</Text>
        <Text style={styles.headerSubtitle}>{classSession.subject}</Text>
      </View>

      {/* Estado de la Clase y Timer */}
      <View style={styles.classStatusCard}>
        <View style={styles.statusHeader}>
          <View style={styles.statusInfo}>
            <Text style={styles.statusLabel}>Estado:</Text>
            <View style={[styles.statusBadge, { 
              backgroundColor: classSession.status === 'active' ? '#10B981' : 
                             classSession.status === 'completed' ? '#6B7280' : '#F59E0B'
            }]}>
              <Text style={styles.statusText}>
                {classSession.status === 'active' ? 'EN CLASE' : 
                 classSession.status === 'completed' ? 'FINALIZADA' : 'PENDIENTE'}
              </Text>
            </View>
          </View>
          <View style={styles.timerContainer}>
            <Text style={styles.timerLabel}>
              {isClassActive ? 'Tiempo Restante:' : 'Duración: 2:00:00'}
            </Text>
            <Text style={[styles.timerText, { 
              color: isClassActive ? '#EF4444' : '#6B7280'
            }]}>
              {isClassActive ? getRemainingTime() : formatTime(timer)}
            </Text>
          </View>
        </View>
      </View>

      {/* Estadísticas de Asistencia */}
      <View style={styles.statsCard}>
        <View style={styles.cardHeader}>
          <Ionicons name="people-outline" size={24} color="#10B981" />
          <Text style={styles.cardTitle}>Estadísticas de Asistencia</Text>
        </View>
        <View style={styles.statsContent}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.present}</Text>
            <Text style={styles.statLabel}>Presentes</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.total}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.percentage}%</Text>
            <Text style={styles.statLabel}>Asistencia</Text>
          </View>
        </View>
      </View>

      {/* Controles de Clase */}
      <View style={styles.controlsCard}>
        <View style={styles.controlsRow}>
          <TouchableOpacity 
            style={[styles.controlButton, styles.startButton, {
              opacity: classSession.status === 'pending' ? 1 : 0.5
            }]}
            onPress={startClass}
            disabled={classSession.status !== 'pending'}
          >
            <Ionicons name="play-outline" size={20} color="#FFFFFF" />
            <Text style={styles.controlButtonText}>Iniciar Clase</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.controlButton, styles.endButton, {
              opacity: classSession.status === 'active' ? 1 : 0.5
            }]}
            onPress={endClass}
            disabled={classSession.status !== 'active'}
          >
            <Ionicons name="stop-outline" size={20} color="#FFFFFF" />
            <Text style={styles.controlButtonText}>Finalizar</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.materialButton}
          onPress={() => setShowMaterialModal(true)}
        >
          <Ionicons name="cloud-upload-outline" size={20} color="#FFFFFF" />
          <Text style={styles.controlButtonText}>Subir Material</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Estudiantes */}
      <View style={styles.studentsCard}>
        <View style={styles.cardHeader}>
          <Ionicons name="list-outline" size={24} color="#10B981" />
          <Text style={styles.cardTitle}>Lista de Estudiantes</Text>
        </View>
        <View style={styles.cardContent}>
          {classSession.students.map((student) => (
            <View key={student.id} style={styles.studentItem}>
              <TouchableOpacity 
                style={styles.checkboxContainer}
                onPress={() => toggleAttendance(student.id)}
              >
                <View style={[styles.checkbox, student.present && styles.checkedBox]}>
                  {student.present && <Ionicons name="checkmark" size={16} color="#FFFFFF" />}
                </View>
              </TouchableOpacity>
              <View style={styles.studentInfo}>
                <Text style={styles.studentName}>{student.name}</Text>
                <Text style={styles.studentId}>ID: {student.studentId}</Text>
                <Text style={styles.studentEmail}>{student.email}</Text>
              </View>
              <View style={styles.attendanceStatus}>
                <Text style={[styles.attendanceText, {
                  color: student.present ? '#10B981' : '#EF4444'
                }]}>
                  {student.present ? 'Presente' : 'Ausente'}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Materiales Subidos */}
      {classSession.materials.length > 0 && (
        <View style={styles.materialsCard}>
          <View style={styles.cardHeader}>
            <Ionicons name="document-text-outline" size={24} color="#10B981" />
            <Text style={styles.cardTitle}>Materiales de Clase</Text>
          </View>
          <View style={styles.cardContent}>
            {classSession.materials.map((material) => (
              <View key={material.id} style={styles.materialItem}>
                <Ionicons name="document-outline" size={20} color="#6B7280" />
                <View style={styles.materialInfo}>
                  <Text style={styles.materialName}>{material.name}</Text>
                  <Text style={styles.materialDate}>{material.uploadDate}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Modal para Subir Material */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showMaterialModal}
        onRequestClose={() => setShowMaterialModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Subir Material</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Nombre del material (opcional)"
              value={materialName}
              onChangeText={setMaterialName}
            />
            
            <TouchableOpacity 
              style={styles.fileSelectButton}
              onPress={selectFile}
            >
              <Ionicons name="folder-outline" size={20} color="#10B981" />
              <Text style={styles.fileSelectText}>
                {selectedFile || 'Seleccionar archivo'}
              </Text>
            </TouchableOpacity>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setShowMaterialModal(false);
                  setSelectedFile(null);
                  setMaterialName('');
                }}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.uploadButton, {
                  opacity: selectedFile ? 1 : 0.5
                }]}
                onPress={uploadMaterial}
                disabled={!selectedFile}
              >
                <Text style={styles.uploadButtonText}>Subir Material</Text>
              </TouchableOpacity>
            </View>
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
    alignItems: 'center',
    marginBottom: 24,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    padding: 8,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  classStatusCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: 16,
    color: '#6B7280',
    marginRight: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  timerContainer: {
    alignItems: 'flex-end',
  },
  timerLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  timerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
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
  statsContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#10B981',
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  controlsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    flex: 0.48,
  },
  startButton: {
    backgroundColor: '#10B981',
  },
  endButton: {
    backgroundColor: '#EF4444',
  },
  materialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#3B82F6',
  },
  controlButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  studentsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardContent: {
    padding: 16,
  },
  studentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  checkboxContainer: {
    marginRight: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkedBox: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  studentId: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  studentEmail: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  attendanceStatus: {
    alignItems: 'flex-end',
  },
  attendanceText: {
    fontSize: 14,
    fontWeight: '600',
  },
  materialsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  materialItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  materialInfo: {
    marginLeft: 12,
  },
  materialName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  materialDate: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 0.48,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F3F4F6',
  },
  uploadButton: {
    backgroundColor: '#10B981',
  },
  cancelButtonText: {
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '600',
  },
  uploadButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  fileSelectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#10B981',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#F0FDF4',
  },
  fileSelectText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#10B981',
    fontWeight: '500',
  },
});

export default ListaAsistenciaScreen;