import React, { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFileUploaded: (file: File) => void; // Callback to handle file after selection
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onFileUploaded }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      onFileUploaded(selectedFile); // Optionally trigger the upload immediately
    }
  };

  const handleSubmit = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      // Example API call
      try {
        const response = await fetch("http://localhost:8000/process-data/", {
          method: "POST",
          body: formData,
        });
        const result = await response.json();
        console.log("Server response:", result);
        onClose(); // Close the modal after processing
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <div className={`modal ${isOpen ? "block" : "hidden"}`}>
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content">
        <button onClick={onClose}>Close</button>
        <input type="file" onChange={handleFileChange} />
        {file && <p>File selected: {file.name}</p>}
        <button onClick={handleSubmit}>Start Diagnosis</button>
      </div>
    </div>
  );
};

export default Modal;
