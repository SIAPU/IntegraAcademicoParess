# SIAPU - Sistema de Apoyo para Alumnos en Situación Vulnerable

**Nombre del proyecto:** SIAPU  
**Carpeta de trabajo:** `IntegraAcademicoPares`  
**Plataforma:** React Native con Expo  
**Propósito:** Monitoreo y apoyo académico integral para alumnos en situación de vulnerabilidad académica.

---

## Descripción

**SIAPU** (Sistema de Apoyo para Alumnos en Situación Vulnerable) es una aplicación móvil desarrollada con **React Native Expo** que facilita el seguimiento y apoyo académico para estudiantes en riesgo escolar. Utilizando el ecosistema Expo, ofrece una experiencia fluida y rápida para el desarrollo y despliegue, integrando funcionalidades para un soporte educativo efectivo.

### Características principales:
- **Detección proactiva** de estudiantes en riesgo académico  
- **Asignación inteligente** de recursos de apoyo y tutorías  
- **Seguimiento integral** del progreso estudiantil  
- **Comunicación fluida** entre estudiantes, tutores y coordinadores  
- **Análisis de datos** para tomar decisiones basadas en evidencia  
- **Integración con APIs externas**, incluyendo Google Calendar para gestión y sincronización de horarios  

---

## Objetivos estratégicos

### Objetivos primarios:
- **Prevención:** Identificar tempranamente a estudiantes con riesgo de reprobación  
- **Intervención:** Proveer estrategias personalizadas de apoyo académico  
- **Seguimiento:** Monitorear el desempeño académico de manera continua  
- **Integración:** Facilitar la conexión entre alumnos, tutores y coordinadores  

### Objetivos secundarios:
- Reducir la deserción escolar  
- Mejorar el rendimiento académico general  
- Fortalecer la comunicación institucional  
- Generar métricas y reportes para la toma de decisiones  

---

## Funcionalidades principales

### **Dashboard de monitoreo**
- Visualización en tiempo real de estudiantes en riesgo  
- Indicadores académicos por materia  
- Alertas automáticas de bajo rendimiento  
- Estadísticas globales del programa  

### **Gestión de estudiantes**
- Perfil completo de alumnos  
- Historial académico detallado  
- Registro de intervenciones previas  
- Etiquetas y categorización inteligente  

### **Sistema de asesorías**
- Asignación automática e inteligente de tutores  
- Programación flexible y calendario integrado  
- Seguimiento por materia  
- Registro de asistencia y participación  

### **Gestión de horarios**
- Calendario integrado para todos los usuarios  
- Sincronización y gestión de eventos mediante la **API de Google Calendar**  
- Recordatorios y notificaciones automáticas  
- Opciones para reprogramar sesiones  

### **Registro de progreso**
- Comentarios detallados por sesión  
- Sistema de evaluaciones y calificaciones  
- Notas y recomendaciones de tutores  
- Planes de mejora personalizados  

### **Sistema de notificaciones**
- Notificaciones push para sesiones y alertas  
- Comunicación directa dentro de la app  
- Recordatorios de tareas y fechas importantes  

### **Reportes y análisis**
- Reportes individuales y grupales  
- Visualización estadística de la efectividad  
- Exportación de datos para análisis externos  

---

## Tecnologías utilizadas

### Frontend (React Native Expo)
- **Expo SDK** (última versión estable) — Framework principal para desarrollo rápido y multiplataforma  
- **React Native** (incluido en Expo) — Desarrollo de interfaz nativa para iOS y Android  
- **React Navigation** v6 — Navegación entre pantallas  
- **React Native Paper** — Componentes UI basados en Material Design  
- **React Native Vector Icons** — Iconografía  
- **React Native Async Storage** — Almacenamiento local persistente  
- **React Native DateTimePicker** — Selección de fechas y horarios  
- **React Native Chart Kit** — Gráficos para visualización de datos  

### Backend y Base de datos
- **Firebase** — Backend as a Service (BaaS)  
  - Authentication — Autenticación segura de usuarios  
  - Firestore — Base de datos NoSQL en tiempo real  
  - Cloud Functions — Lógica backend sin servidor  
  - Cloud Messaging — Notificaciones push (integradas con Expo Notifications)  
- **Expo Notifications** — Manejo de notificaciones push para dispositivos Expo  
- **APIs externas**  
  - **Google Calendar API** — Gestión y sincronización avanzada de calendarios y eventos  
  - **Otras APIs** (a definir según necesidades futuras)  

### Herramientas de desarrollo
- **ESLint** — Análisis estático y calidad de código  
- **Prettier** — Formateo automático de código  
- **Jest** — Framework para pruebas unitarias  
- **TypeScript** (opcional) — Tipado estático para mayor robustez  
- **Metro** — Bundler y empaquetador de React Native  

---

## Notas adicionales

- La integración con Google Calendar permite sincronizar automáticamente las asesorías y actividades programadas con los calendarios personales de usuarios, mejorando la gestión y recordatorios de sesiones.  
- Se contempla la posibilidad de extender la app con otras APIs externas para enriquecer la experiencia educativa.  
