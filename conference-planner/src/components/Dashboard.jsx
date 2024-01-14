import { useState } from 'react';
import TopicTable from './TopicTable';
import FileUploader from './FileUploader';
import '../styles/Dashboard.css'

const Dashboard = () => {
    const [loadedData, setLoadedData] = useState([]);

    // Manejar archivo subido (.txt)
    const handleFileUpload = (fileContent) => {
        // Parsea datos de archivo a objeto de la forma: {title: datos, duration: datos}
        const parsedData = parseFileContent(fileContent);
        // Agrega propiedad time a objeto parseado: {title: datos, duration: datos, time: datos}
        const sessionsWithTime = calculateStartTime(parsedData.sessions);

        // Establece loadedData con el objeto parseado y actualizado de la forma: {title: datos, duration: datos, time: datos}
        // Las tablas mostraran estos datos
        setLoadedData(sessionsWithTime);
    };

    const parseFileContent = (fileContent) => {
        // Contador para verificar iteraciones pares o impares mas adelante
        let contador = 0;
        let title = '';
        const sessions = [];

        // Se recorre el archivo por cada linea
        fileContent
            // Divide todos los datos del archivo en lineas, donde cada linea (entry) termina con la palabra "min"
            .split(/(\d+min)/)
            // Si encuentra lineas con puros espacios no la toma en cuenta
            .filter((entry) => entry.trim() !== '')
            .forEach((entry) => {
                contador++;

                let duration;

                if (!(contador % 2 === 0)) {
                    // Agrega los title cuando la linea es impar
                    title = entry.trim().replace(/\r\n/g, '');
                } else {
                    // Agrega los duration cuando la linea es par
                    duration = entry.trim();
                    sessions.push({ title, duration });
                }
            });

        return { sessions };
    };

    // Agrega evento de LUNCH
    const addLunchBreak = (currentTime, updatedSessions) => {
        updatedSessions.push({ topic: `Topic ${currentTopic}`, title: 'LUNCH', duration: '60min', time: '12:00' });
        currentTime.setHours(13, 0, 0, 0);
    };

    // Agrega evento de SOCIAL EVENT
    const addSocialEvent = (currentTime, updatedSessions) => {
        updatedSessions.push({ topic: `Topic ${currentTopic}`, title: 'SOCIAL EVENT', duration: '60min', time: currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) });
        // Pasa al siguiente Topic y reinicia el time (dia siguiente)
        currentTopic++;
        restartTime(currentTime);
    };

    // Reinicia tiempo a 9 AM
    const restartTime = (currentTime) => {
        currentTime.setHours(9, 0, 0, 0);
    };

    // Organiza el objeto, para establecer una charla que termine a las 12:00
    const organizeBeforeLunch = (sessionsPar, indexPar, currentTimePar, updatedSessionsPar) => {
        try {
            sessionsPar.forEach((session, index) => {
                // Recorre objeto de sessiones pasando por alto los index recorridos anteriormente
                if (index > indexPar) {
                    const { title, duration } = session;
                    const [durationValue] = duration.match(/(\d+)/);

                    // Si la duracion de la charla actual iterada mas los minutos actuales (currentTime) hacen una hora (para que finalice a las
                    // 12:00) la agrega
                    if (parseInt(durationValue) + currentTimePar.getMinutes() === 60) {
                        const startTime = new Date(currentTimePar);
                        updatedSessionsPar.push({ topic: `Topic ${currentTopic}`, title, duration, time: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) });
                        currentTimePar.setMinutes(currentTimePar.getMinutes() + parseInt(durationValue, 10));

                        // Elimina la charla seleccionada para no repetirla después
                        sessionsPar.splice(index, 1);

                        // Salida de ciclo ForEach
                        throw new Error('Salida del forEach');
                    }
                }
            });
        } catch (error) {
            if (error.message !== 'Salida del forEach') {
                throw error;
            }
        }
    }

    // Define el primer Topic
    let currentTopic = 1;

    // Calcular los time de cada propiedad y los agrega, pasando de: {title: datos, duration: datos} a {title: datos, duration: datos, time: datos}
    const calculateStartTime = (sessions) => {
        // Hora 9 AM
        const morningStart = new Date();
        morningStart.setHours(9, 0, 0, 0);

        // Objeto con los topic actualizados a devolver
        const updatedSessions = [];

        // Hora actual establecida a 9 AM
        let currentTime = new Date(morningStart);

        // Recorre el objeto con los datos parseados del archivo txt
        sessions.forEach((session, index) => {
            // Obtiene los datos title y duration del objeto
            const { title, duration } = session;
            const [durationValue] = duration.match(/(\d+)/);

            // Obtiene siguiente charla y su duracion, si no hay se establece en 0
            const nextSession = sessions[index + 1];
            const nextSessionDuration = nextSession ? parseInt(nextSession.duration.match(/(\d+)/)[0], 10) : 0;

            // Si la hora actual es 12:00 agrega evento de LUNCH
            if (currentTime.getHours() === 12) {
                addLunchBreak(currentTime, updatedSessions);
            }

            // Si la hora esta entre 11 y 13, y no son las 12 exactamente organiza el evento presente para poner uno que termine justo a las 12:00
            if ((currentTime.getHours() >= 11) && !(currentTime.getHours() >= 13) && (currentTime.getMinutes() + parseInt(durationValue) > 60)) {
                if (currentTime.getHours() !== 12) {
                    organizeBeforeLunch(sessions, index, currentTime, updatedSessions);
                }
                addLunchBreak(currentTime, updatedSessions);
            }

            // Si la hora actual es mayor que 16:00 agrega SOCIAL EVENT
            if (currentTime.getHours() >= 16) {
                // Si son las 17:00 exactamente lo agrega
                if (currentTime.getHours() === 17) {
                    addSocialEvent(currentTime, updatedSessions);
                }

                // Si los minutos actuales mas la duracion de la sesion siguente es mayor que 60 agrega automaticamente el SOCIAL EVENT
                if (((currentTime.getMinutes() + nextSessionDuration) > 60)) {
                    addSocialEvent(currentTime, updatedSessions);
                }
            }

            // Establece tiempo de inicio de charla actual (time), y lo agrega al objeto actualizado con respectivo title y duration
            const startTime = new Date(currentTime);
            updatedSessions.push({ topic: `Topic ${currentTopic}`, title, duration, time: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) });

            // Actualiza hora actual
            currentTime.setMinutes(currentTime.getMinutes() + parseInt(durationValue, 10));

            // Si son mas de las 16:00 y es la ultima charla, agrega el SOCIAL EVENT
            if ((currentTime.getHours() >= 16) && (nextSessionDuration === 0)) {
                addSocialEvent(currentTime, updatedSessions);
            }
        });

        // Devuelve el objeto actualizado con title, duration y time
        return updatedSessions;
    };

    // Renderiza las tablas con el valor de loadedData, una tabla por cada Topic
    const renderTopicTables = () => {
        const uniqueTopics = Array.from(new Set(loadedData.map(session => session.topic)));

        // Renderiza cada tabla por cada propiedad topic dentro de objeto loadedData
        return uniqueTopics.map((topic, index) => (
            <TopicTable key={index} topicData={{ topicName: topic, sessions: loadedData.filter(session => session.topic === topic) }} />
        ));
    };

    return (
        <div className='contenedor'>
            <div>
                <h2>CONFERENCE PLANNER</h2>
            </div>
            <FileUploader onFileUpload={handleFileUpload} />
            {renderTopicTables()}
        </div>
    );
};

export default Dashboard;
