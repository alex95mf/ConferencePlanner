import '../styles/TopicTable.css'

const TopicTable = ({ topicData }) => {
    // Renderiza una tabla Topic con propiedad topic del objeto loadedData que es el que tiene toda 
    // la data del archivo subido
    return (
        <div>
            <h2>{topicData.topicName}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Title</th>
                        <th>Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {topicData.sessions.map((session, index) => (
                        <tr key={index}>
                            <td>{session.time}</td>
                            <td>{session.title}</td>
                            <td>{session.duration}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TopicTable;
