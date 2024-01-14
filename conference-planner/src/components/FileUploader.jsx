import '../styles/FileUploader.css'

const FileUploader = ({ onFileUpload }) => {
    // Lee el archivo subido (txt) y devuelve sus datos
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const fileContent = e.target.result;
            onFileUpload(fileContent);
        };

        reader.readAsText(file);
    };

    return (
        <div>
            <input type="file" accept=".txt" onChange={handleFileChange} />
        </div>
    );
};

export default FileUploader;
