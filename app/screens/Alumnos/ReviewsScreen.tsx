import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Modal,
  TextInput,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface Teacher {
  id: number;
  name: string;
  subject: string;
  rating: number;
  reviews: number;
  lastUpdated: string;
  initials: string;
  color: string;
}

interface ReviewForm {
  teachingQuality: number;
  attitudeAndTreatment: number;
  punctuality: number;
  courseOrganization: number;
  availability: number;
  courseDifficulty: number;
  additionalComments: string;
}

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  interactive?: boolean;
}

const ReseñasScreen: React.FC = () => {
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [showReviewForm, setShowReviewForm] = useState<boolean>(false);
  const [reviewForm, setReviewForm] = useState<ReviewForm>({
    teachingQuality: 0,
    attitudeAndTreatment: 0,
    punctuality: 0,
    courseOrganization: 0,
    availability: 0,
    courseDifficulty: 0,
    additionalComments: ''
  });

  const teachers: Teacher[] = [
    {
      id: 1,
      name: "Dr. Ana Martínez",
      subject: "Matemáticas Avanzadas",
      rating: 4.2,
      reviews: 156,
      lastUpdated: "2h",
      initials: "AM",
      color: "#10B981"
    },
    {
      id: 2,
      name: "Prof. José López",
      subject: "Física Cuántica",
      rating: 4.8,
      reviews: 89,
      lastUpdated: "1d",
      initials: "JL",
      color: "#10B981"
    },
    {
      id: 3,
      name: "Dra. María García",
      subject: "Química Orgánica",
      rating: 4.5,
      reviews: 203,
      lastUpdated: "3h",
      initials: "MG",
      color: "#10B981"
    },
    {
      id: 4,
      name: "Prof. Carlos Ruiz",
      subject: "Historia Universal",
      rating: 3.9,
      reviews: 127,
      lastUpdated: "5h",
      initials: "CR",
      color: "#10B981"
    }
  ];

  const StarRating: React.FC<StarRatingProps> = ({ rating, onRatingChange, interactive = false }) => {
    return (
      <View style={styles.starContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => interactive && onRatingChange && onRatingChange(star)}
            disabled={!interactive}
            style={styles.starButton}
          >
            <Ionicons
              name={star <= rating ? 'star' : 'star-outline'}
              size={20}
              color={star <= rating ? '#10B981' : '#D1D5DB'}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const handleRatingChange = (category: keyof ReviewForm, rating: number): void => {
    setReviewForm(prev => ({
      ...prev,
      [category]: rating
    }));
  };

  const handleReviewSubmit = (): void => {
    console.log('Review submitted:', reviewForm);
    setShowReviewForm(false);
    setSelectedTeacher(null);
    setReviewForm({
      teachingQuality: 0,
      attitudeAndTreatment: 0,
      punctuality: 0,
      courseOrganization: 0,
      availability: 0,
      courseDifficulty: 0,
      additionalComments: ''
    });
  };

  const RatingCategory = ({ 
    title, 
    description, 
    leftLabel, 
    rightLabel, 
    category, 
    rating 
  }: {
    title: string;
    description: string;
    leftLabel: string;
    rightLabel: string;
    category: keyof ReviewForm;
    rating: number;
  }) => (
    <View style={styles.ratingCategory}>
      <Text style={styles.categoryTitle}>{title}</Text>
      <Text style={styles.categoryDescription}>{description}</Text>
      <View style={styles.ratingRow}>
        <Text style={styles.ratingLabel}>{leftLabel}</Text>
        <StarRating
          rating={rating}
          onRatingChange={(rating) => handleRatingChange(category, rating)}
          interactive={true}
        />
        <Text style={styles.ratingLabel}>{rightLabel}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Reseñas de Maestros</Text>
          <View style={styles.userIcon}>
            <Ionicons name="person" size={20} color="#6B7280" />
          </View>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.contentContainer}>
          <Text style={styles.subtitle}>Califica a tus maestros y ayuda a otros estudiantes</Text>
          
          {/* Teachers List */}
          <View style={styles.teachersList}>
            {teachers.map((teacher) => (
              <View key={teacher.id} style={styles.teacherCard}>
                <View style={styles.teacherInfo}>
                  <View style={styles.teacherHeader}>
                    <View style={styles.teacherProfile}>
                      <View style={[styles.avatar, { backgroundColor: teacher.color }]}>
                        <Text style={styles.avatarText}>{teacher.initials}</Text>
                      </View>
                      <View style={styles.teacherDetails}>
                        <Text style={styles.teacherName}>{teacher.name}</Text>
                        <Text style={styles.teacherSubject}>{teacher.subject}</Text>
                      </View>
                    </View>
                    <View style={styles.ratingInfo}>
                      <Text style={styles.ratingNumber}>{teacher.rating}</Text>
                      <StarRating rating={Math.floor(teacher.rating)} />
                    </View>
                  </View>

                  <View style={styles.teacherStats}>
                    <Text style={styles.statText}>{teacher.reviews} reseñas</Text>
                    <View style={styles.updateInfo}>
                      <Ionicons name="time-outline" size={16} color="#6B7280" />
                      <Text style={styles.updateText}>Actualizado hace {teacher.lastUpdated}</Text>
                    </View>
                  </View>

                  <View style={styles.buttonRow}>
                    <TouchableOpacity
                      style={styles.rateButton}
                      onPress={() => {
                        setSelectedTeacher(teacher);
                        setShowReviewForm(true);
                      }}
                    >
                      <Text style={styles.rateButtonText}>Calificar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.reviewsButton}>
                      <Text style={styles.reviewsButtonText}>Ver Reseñas</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Review Form Modal */}
      <Modal
        visible={showReviewForm}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => {
          setShowReviewForm(false);
          setSelectedTeacher(null);
        }}
      >
        <View style={styles.modalContainer}>
          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <View style={styles.modalTitleContainer}>
              <Text style={styles.modalTitle}>{selectedTeacher?.name}</Text>
              <Text style={styles.modalSubtitle}>{selectedTeacher?.subject}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setShowReviewForm(false);
                setSelectedTeacher(null);
              }}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
            {/* Overall Rating */}
            <View style={styles.overallRating}>
              <Text style={styles.overallTitle}>Calificación General</Text>
              <Text style={styles.overallScore}>0.0</Text>
              <Text style={styles.overallStatus}>Sin calificar</Text>
            </View>

            {/* Rating Categories */}
            <View style={styles.categoriesContainer}>
              <RatingCategory
                title="Calidad de la Enseñanza"
                description="¿Qué tan bien explica los conceptos y resuelve dudas?"
                leftLabel="Muy deficiente"
                rightLabel="Excelente"
                category="teachingQuality"
                rating={reviewForm.teachingQuality}
              />

              <RatingCategory
                title="Actitud y Trato"
                description="¿Cómo es su comportamiento y trato hacia los estudiantes?"
                leftLabel="Muy malo"
                rightLabel="Excelente"
                category="attitudeAndTreatment"
                rating={reviewForm.attitudeAndTreatment}
              />

              <RatingCategory
                title="Puntualidad"
                description="¿Llega a tiempo y cumple con el horario de clases?"
                leftLabel="Nunca puntual"
                rightLabel="Siempre puntual"
                category="punctuality"
                rating={reviewForm.punctuality}
              />

              <RatingCategory
                title="Organización del Curso"
                description="¿Qué tan bien estructurado está el contenido y las actividades?"
                leftLabel="Muy desorganizado"
                rightLabel="Muy organizado"
                category="courseOrganization"
                rating={reviewForm.courseOrganization}
              />

              <RatingCategory
                title="Disponibilidad"
                description="¿Está disponible para consultas fuera del horario de clase?"
                leftLabel="Nunca disponible"
                rightLabel="Siempre disponible"
                category="availability"
                rating={reviewForm.availability}
              />

              <RatingCategory
                title="Dificultad del Curso"
                description="¿Qué tan desafiante es el nivel del curso?"
                leftLabel="Muy fácil"
                rightLabel="Muy difícil"
                category="courseDifficulty"
                rating={reviewForm.courseDifficulty}
              />

              <View style={styles.commentsSection}>
                <Text style={styles.categoryTitle}>Comentarios adicionales (opcional)</Text>
                <TextInput
                  style={styles.commentsInput}
                  value={reviewForm.additionalComments}
                  onChangeText={(text) => setReviewForm(prev => ({...prev, additionalComments: text}))}
                  placeholder="Comparte tu experiencia con este maestro..."
                  multiline
                  textAlignVertical="top"
                />
              </View>
            </View>
          </ScrollView>

          {/* Modal Footer */}
          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setShowReviewForm(false);
                setSelectedTeacher(null);
              }}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleReviewSubmit}
            >
              <Text style={styles.submitButtonText}>Enviar Calificación</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  userIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    maxWidth: 800,
    alignSelf: 'center',
    width: '100%',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
  },
  teachersList: {
    gap: 16,
  },
  teacherCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
  },
  teacherInfo: {
    gap: 16,
  },
  teacherHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  teacherProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flex: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  teacherDetails: {
    flex: 1,
  },
  teacherName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  teacherSubject: {
    fontSize: 16,
    color: '#6B7280',
  },
  ratingInfo: {
    alignItems: 'center',
  },
  ratingNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#10B981',
    marginBottom: 4,
  },
  teacherStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statText: {
    fontSize: 14,
    color: '#6B7280',
  },
  updateInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  updateText: {
    fontSize: 14,
    color: '#6B7280',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  rateButton: {
    flex: 1,
    backgroundColor: '#10B981',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  rateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  reviewsButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    alignItems: 'center',
  },
  reviewsButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
  },
  starContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  starButton: {
    padding: 2,
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitleContainer: {
    flex: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 2,
  },
  closeButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
  },
  modalContent: {
    flex: 1,
  },
  overallRating: {
    backgroundColor: '#F9FAFB',
    padding: 24,
    alignItems: 'center',
  },
  overallTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  overallScore: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#10B981',
    marginBottom: 4,
  },
  overallStatus: {
    fontSize: 14,
    color: '#6B7280',
  },
  categoriesContainer: {
    padding: 20,
    gap: 24,
  },
  ratingCategory: {
    gap: 8,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  categoryDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  ratingLabel: {
    fontSize: 12,
    color: '#6B7280',
    flex: 1,
  },
  commentsSection: {
    gap: 8,
  },
  commentsInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 12,
    height: 96,
    fontSize: 16,
    textAlignVertical: 'top',
  },
  modalFooter: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#9CA3AF',
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ReseñasScreen;