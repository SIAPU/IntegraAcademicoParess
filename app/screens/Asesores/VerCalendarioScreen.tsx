import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Student {
  id: string;
  name: string;
  present?: boolean;
}

interface ClassInfo {
  id: string;
  subject: string;
  group: string;
  classroom: string;
  time: string;
  professor: string;
  students: Student[];
  status: 'Disponible' | 'En Clase' | 'Confirmada' | 'Pendiente';
}

interface CalendarEvent {
  date: string;
  classes: ClassInfo[];
}

const VerCalendarioScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState<ClassInfo | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Datos de ejemplo para el calendario
  const calendarEvents: CalendarEvent[] = [
    {
      date: '2025-06-27',
      classes: [
        {
          id: '1',
          subject: 'Matemáticas Básicas',
          group: 'Grupo A - 1er Semestre',
          classroom: 'Aula 204',
          time: '09:00 - 10:00',
          professor: 'Prof. Ana Rodríguez',
          status: 'Confirmada',
          students: [
            { id: '1', name: 'Juan Pérez García' },
            { id: '2', name: 'María González López' },
            { id: '3', name: 'Carlos Mendoza Ruiz' },
            { id: '4', name: 'Ana Martínez Torres' },
            { id: '5', name: 'Luis Hernández Mora' },
          ]
        },
        {
          id: '2',
          subject: 'Física I',
          group: 'Grupo B - 2do Semestre',
          classroom: 'Aula 301',
          time: '14:00 - 15:00',
          professor: 'Prof. Carlos Mendoza',
          status: 'En Clase',
          students: [
            { id: '6', name: 'Elena Vásquez Silva' },
            { id: '7', name: 'Roberto Díaz Cruz' },
            { id: '8', name: 'Patricia Flores Ramos' },
            { id: '9', name: 'Miguel Ángel López' },
          ]
        }
      ]
    },
    {
      date: '2025-06-28',
      classes: [
        {
          id: '3',
          subject: 'Química General',
          group: 'Grupo C - 1er Semestre',
          classroom: 'Laboratorio B-205',
          time: '10:00 - 11:00',
          professor: 'Prof. Elena Vásquez',
          status: 'Disponible',
          students: [
            { id: '10', name: 'Sofía Ramírez Ortiz' },
            { id: '11', name: 'Diego Morales Castillo' },
            { id: '12', name: 'Valeria Torres Jiménez' },
          ]
        }
      ]
    },
    {
      date: '2025-06-30',
      classes: [
        {
          id: '4',
          subject: 'Asesoría Individual',
          group: 'Tutoría Personalizada',
          classroom: 'Oficina A-102',
          time: '11:00 - 12:00',
          professor: 'Asesor Par',
          status: 'Pendiente',
          students: [
            { id: '13', name: 'Fernando Aguilar Ruiz' },
          ]
        }
      ]
    },
    {
      date: '2025-06-25',
      classes: [
        {
          id: '5',
          subject: 'Historia Universal',
          group: 'Grupo D - 3er Semestre',
          classroom: 'Aula 105',
          time: '08:00 - 09:00',
          professor: 'Prof. Laura Jiménez',
          status: 'Confirmada',
          students: [
            { id: '14', name: 'Andrea López Vega' },
            { id: '15', name: 'Ricardo Sánchez Mora' },
            { id: '16', name: 'Gabriela Herrera Torres' },
          ]
        }
      ]
    },
    {
      date: '2025-06-26',
      classes: [
        {
          id: '6',
          subject: 'Inglés Básico',
          group: 'Grupo E - 1er Semestre',
          classroom: 'Aula 102',
          time: '13:00 - 14:00',
          professor: 'Prof. Michael Brown',
          status: 'Confirmada',
          students: [
            { id: '17', name: 'Carmen Ruiz López' },
            { id: '18', name: 'José Antonio Vargas' },
          ]
        }
      ]
    },
    {
      date: '2025-06-29',
      classes: [
        {
          id: '7',
          subject: 'Biología Celular',
          group: 'Grupo F - 2do Semestre',
          classroom: 'Laboratorio A-301',
          time: '09:30 - 10:30',
          professor: 'Prof. Carmen Delgado',
          status: 'Disponible',
          students: [
            { id: '19', name: 'Pablo Mendoza Silva' },
            { id: '20', name: 'Lucía Fernández Torres' },
            { id: '21', name: 'Andrés Castro Vega' },
          ]
        }
      ]
    }
  ];

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const formatDate = (day: number) => {
    const month = (currentMonth + 1).toString().padStart(2, '0');
    const dayStr = day.toString().padStart(2, '0');
    return `${currentYear}-${month}-${dayStr}`;
  };

  const getClassesForDate = (date: string) => {
    const event = calendarEvents.find(event => event.date === date);
    return event ? event.classes : [];
  };

  const isToday = (day: number) => {
    const today = new Date();
    return day === today.getDate() && 
           currentMonth === today.getMonth() && 
           currentYear === today.getFullYear();
  };

  const formatDateForDisplay = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = monthNames[date.getMonth()];
    const weekDay = dayNames[date.getDay()];
    return { day, month, weekDay };
  };

  const getUpcomingClasses = () => {
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    
    return calendarEvents
      .filter(event => event.date >= todayString)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 10);
  };

  const renderStatusTag = (status: ClassInfo['status']) => {
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

  const handleClassPress = (classInfo: ClassInfo) => {
    setSelectedClass(classInfo);
    setShowModal(true);
  };

  const handleGoToClass = () => {
    console.log('Ir a la clase:', selectedClass?.subject);
    setShowModal(false);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const renderCalendarDay = (day: number) => {
    const dateString = formatDate(day);
    const classes = getClassesForDate(dateString);
    const todayCheck = isToday(day);

    return (
      <TouchableOpacity
        key={day}
        style={[
          styles.calendarDay,
          todayCheck && styles.todayDay,
          classes.length > 0 && styles.dayWithClasses
        ]}
        onPress={() => {
          setSelectedDate(dateString);
          if (classes.length === 1) {
            handleClassPress(classes[0]);
          }
        }}
      >
        <Text style={[
          styles.dayNumber,
          todayCheck && styles.todayDayNumber
        ]}>
          {day}
        </Text>
        {classes.length > 0 && (
          <View style={styles.classDot}>
            <Text style={styles.classDotText}>{classes.length}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const renderCalendarDays = () => {
    const days = [];
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
    
    // Espacios vacíos para los primeros días del mes
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <View key={`empty-${i}`} style={styles.emptyDay} />
      );
    }

    // Días del mes
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(renderCalendarDay(day));
    }

    return days;
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.mainTitle}>Calendario de Clases</Text>
        <Text style={styles.headerSubtitle}>
          Gestiona tu horario y programa tus asesorías
        </Text>
      </View>

      {/* Calendario */}
      <View style={styles.card}>
        {/* Header del calendario con navegación */}
        <View style={styles.cardHeader}>
          <TouchableOpacity onPress={() => navigateMonth('prev')} style={styles.navButton}>
            <Ionicons name="chevron-back" size={24} color="#10B981" />
          </TouchableOpacity>
          
          <View style={styles.monthTitleContainer}>
            <Ionicons name="calendar-outline" size={24} color="#10B981" />
            <Text style={styles.cardTitle}>
              {monthNames[currentMonth]} {currentYear}
            </Text>
          </View>
          
          <TouchableOpacity onPress={() => navigateMonth('next')} style={styles.navButton}>
            <Ionicons name="chevron-forward" size={24} color="#10B981" />
          </TouchableOpacity>
        </View>

        {/* Días de la semana */}
        <View style={styles.weekDaysContainer}>
          {dayNames.map((day) => (
            <View key={day} style={styles.weekDay}>
              <Text style={styles.weekDayText}>{day}</Text>
            </View>
          ))}
        </View>

        {/* Días del mes */}
        <View style={styles.calendarGrid}>
          {renderCalendarDays()}
        </View>
      </View>

      {/* Agenda de próximas clases */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.monthTitleContainer}>
            <Ionicons name="list-outline" size={24} color="#10B981" />
            <Text style={styles.cardTitle}>Próximas Clases</Text>
          </View>
        </View>

        <View style={styles.agendaContainer}>
          {getUpcomingClasses().map((event) => (
            <View key={event.date} style={styles.agendaDateSection}>
              <View style={styles.agendaDateHeader}>
                <Text style={styles.agendaDate}>
                  {formatDateForDisplay(event.date).weekDay}, {formatDateForDisplay(event.date).day} de {formatDateForDisplay(event.date).month}
                </Text>
              </View>
              
              {event.classes.map((classInfo) => (
                <TouchableOpacity
                  key={classInfo.id}
                  style={styles.agendaClassItem}
                  onPress={() => handleClassPress(classInfo)}
                >
                  <View style={styles.agendaClassTime}>
                    <Text style={styles.agendaClassTimeText}>{classInfo.time.split(' - ')[0]}</Text>
                    <Text style={styles.agendaClassDuration}>{classInfo.time.split(' - ')[1]}</Text>
                  </View>
                  
                  <View style={styles.agendaClassInfo}>
                    <Text style={styles.agendaClassSubject}>{classInfo.subject}</Text>
                    <Text style={styles.agendaClassDetails}>
                      {classInfo.group} • {classInfo.classroom}
                    </Text>
                    <Text style={styles.agendaClassProfessor}>{classInfo.professor}</Text>
                  </View>
                  
                  <View style={styles.agendaClassStatus}>
                    {renderStatusTag(classInfo.status)}
                    <Ionicons name="chevron-forward" size={16} color="#9CA3AF" style={styles.agendaArrow} />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </View>

      {/* Modal de detalles de clase */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Header del modal */}
            <View style={styles.modalHeader}>
              <View style={styles.modalHeaderLeft}>
                <Ionicons name="school-outline" size={24} color="#10B981" />
                <Text style={styles.modalTitle}>Detalles de la Clase</Text>
              </View>
              <TouchableOpacity
                onPress={() => setShowModal(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            {/* Contenido del modal */}
            <ScrollView style={styles.modalContent}>
              {selectedClass && (
                <>
                  {/* Información básica */}
                  <View style={styles.classInfoSection}>
                    <Text style={styles.subjectTitle}>{selectedClass.subject}</Text>
                    <View style={styles.groupStatusContainer}>
                      <Text style={styles.groupText}>{selectedClass.group}</Text>
                      {renderStatusTag(selectedClass.status)}
                    </View>
                  </View>

                  {/* Detalles */}
                  <View style={styles.detailsSection}>
                    <View style={styles.detailItem}>
                      <Ionicons name="time-outline" size={20} color="#6B7280" />
                      <View style={styles.detailContent}>
                        <Text style={styles.detailLabel}>Horario:</Text>
                        <Text style={styles.detailValue}>{selectedClass.time}</Text>
                      </View>
                    </View>

                    <View style={styles.detailItem}>
                      <Ionicons name="location-outline" size={20} color="#6B7280" />
                      <View style={styles.detailContent}>
                        <Text style={styles.detailLabel}>Aula:</Text>
                        <Text style={styles.detailValue}>{selectedClass.classroom}</Text>
                      </View>
                    </View>

                    <View style={styles.detailItem}>
                      <Ionicons name="person-outline" size={20} color="#6B7280" />
                      <View style={styles.detailContent}>
                        <Text style={styles.detailLabel}>Profesor:</Text>
                        <Text style={styles.detailValue}>{selectedClass.professor}</Text>
                      </View>
                    </View>

                    <View style={styles.detailItem}>
                      <Ionicons name="people-outline" size={20} color="#6B7280" />
                      <View style={styles.detailContent}>
                        <Text style={styles.detailLabel}>Estudiantes:</Text>
                        <Text style={styles.detailValue}>{selectedClass.students.length} estudiantes inscritos</Text>
                      </View>
                    </View>
                  </View>

                  {/* Botón de acción */}
                  <TouchableOpacity
                    style={styles.goToClassButton}
                    onPress={handleGoToClass}
                  >
                    <Ionicons name="play" size={20} color="#FFFFFF" />
                    <Text style={styles.goToClassButtonText}>Ir a la Clase</Text>
                  </TouchableOpacity>
                </>
              )}
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
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  monthTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 8,
  },
  navButton: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  weekDaysContainer: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  weekDay: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  weekDayText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarDay: {
    width: '14.28%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: '#E5E7EB',
    position: 'relative',
  },
  todayDay: {
    backgroundColor: '#F0FDF4',
    borderColor: '#10B981',
  },
  dayWithClasses: {
    backgroundColor: '#FEFCE8',
  },
  emptyDay: {
    width: '14.28%',
    height: 60,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: '#E5E7EB',
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  todayDayNumber: {
    color: '#10B981',
    fontWeight: '700',
  },
  classDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#10B981',
    borderRadius: 10,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  classDotText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
  statusTag: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  agendaContainer: {
    padding: 20,
  },
  agendaDateSection: {
    marginBottom: 24,
  },
  agendaDateHeader: {
    marginBottom: 12,
  },
  agendaDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  agendaClassItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  agendaClassTime: {
    width: 80,
    alignItems: 'center',
  },
  agendaClassTimeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  agendaClassDuration: {
    fontSize: 12,
    color: '#6B7280',
  },
  agendaClassInfo: {
    flex: 1,
    marginLeft: 16,
  },
  agendaClassSubject: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  agendaClassDetails: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  agendaClassProfessor: {
    fontSize: 14,
    color: '#6B7280',
  },
  agendaClassStatus: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  agendaArrow: {
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: '100%',
    maxHeight: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#F0FDF4',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 8,
  },
  closeButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  modalContent: {
    padding: 20,
  },
  classInfoSection: {
    marginBottom: 24,
  },
  subjectTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  groupStatusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  groupText: {
    fontSize: 16,
    color: '#6B7280',
    flex: 1,
  },
  detailsSection: {
    marginBottom: 32,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
  },
  detailContent: {
    marginLeft: 12,
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  goToClassButton: {
    backgroundColor: '#10B981',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  goToClassButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
});

export default VerCalendarioScreen;