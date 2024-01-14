# Conference Planner

Este proyecto es una aplicación de planificación de conferencias que ayuda a organizar eventos con múltiples temáticas, sesiones y charlas. La aplicación toma como entrada un archivo de texto que contiene información sobre las charlas propuestas y genera un horario organizado para el evento.

## Contenido

- [Características](#características)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instrucciones de Ejecución](#instrucciones-de-ejecución)
- [Ejemplo](#ejemplo)

## Características

- **Entrada de Archivo de Texto**: La aplicación permite cargar un archivo de texto con información sobre las charlas propuestas.
- **Organización de Sesiones**: La aplicación organiza automáticamente las charlas en sesiones de la mañana y la tarde, cumpliendo con las restricciones de tiempo.
- **Eventos Especiales**: Se gestionan eventos especiales como el almuerzo y el evento social, asegurando que se cumplan los horarios establecidos.
- **Visualización por Temáticas**: La aplicación muestra el horario organizado por temáticas, con detalles sobre el tiempo, título y duración de cada charla.

## Estructura del Proyecto

- **`src/components/Dashboard.jsx`**: Componente principal que integra la interfaz de usuario, la carga de archivos y la visualización del horario.
- **`src/components/FileUploader.jsx`**: Componente encargado de manejar la carga de archivos.
- **`src/components/TopicTable.jsx`**: Componente que representa la tabla de una temática específica con detalles de las charlas.
- **`styles/`**: Carpeta que contiene archivos CSS para estilos de los componentes.

## Instrucciones de Ejecución

1. Clone el repositorio en su máquina local.
2. Asegúrese de tener Node.js instalado en su sistema.
3. Abra una terminal y navegue al directorio del proyecto.
4. Ejecute el siguiente comando para entrar al directorio del proyecto:

    ```bash
    cd conference-planner
    ```

5. Ejecute el siguiente comando para instalar las dependencias:

    ```bash
    npm install
    ```

6. Ejecute el siguiente comando para ejecutar la aplicación:

    ```bash
    npm start
    ```

7. Abra su navegador y vaya a `http://localhost:3000`.

## Ejemplo

**Entrada:**
HOW TO USE E-LEARNING FOR TESTING AND ASSESSING LARGE CLASSES 60min
THREE-DIMENSIONAL COLLABORATIVE VIRTUAL ENVIRONMENTS TO ENHANCE LEARNING MATHEMATICS 45min
DO STUDENT RESPONSES DECREASE IF TEACHERS KEEP ASKING QUESTIONS THROUGH STUDENT RESPONSE SYSTEMS: A QUANTITATIVE RESEARCH 30min
...

**Salida:**
TOPIC 1:
09:00AM HOW TO USE E-LEARNING FOR TESTING AND ASSESSING LARGE CLASSES 60min
10:00AM THREE-DIMENSIONAL COLLABORATIVE VIRTUAL ENVIRONMENTS TO ENHANCE LEARNING MATHEMATICS 45min
10:45AM DO STUDENT RESPONSES DECREASE IF TEACHERS KEEP ASKING QUESTIONS THROUGH STUDENT RESPONSE SYSTEMS: A QUANTITATIVE RESEARCH 30min
11:15AM A SEQUENTIAL ANALYSIS OF TEACHING BEHAVIORS TOWARD THE USE OF BLACKBOARD LEARNING MANAGEMENT SYSTEM 45min
12:00PM LUNCH
01:00PM ONLINE GRADUATE DEGREES: PERCEPTIONS OF MOROCCAN UNIVERSITY STUDENTS 60min
...