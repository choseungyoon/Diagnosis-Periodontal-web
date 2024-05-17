"use client";
import axios from "axios";
import Head from "next/head";
import { SetStateAction, useState } from "react";
import Modal from "./diagnosis/DiagnosisModal"; // Adjust the path as necessary

const DiagnosisPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleFileUploaded = (file: File) => {
    console.log("File ready for upload:", file.name);
    // Additional actions based on the file, e.g., storing it in state
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Upload file");
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
          "http://localhost:8000/process-data/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      console.error("No file selected");
    }
  };

  return (
    <div>
      <Head>
        <title>Diagnosis Start Page</title>
      </Head>

      <nav className="flex justify-between items-center bg-gray-100 p-4">
        <div>STRING</div>
        <div>
          <button className="mr-4">DIAGNOSIS</button>
          <button className="mr-4">DOWNLOAD</button>
          <button>HELP</button>
        </div>
      </nav>

      <div className="flex justify-around p-4">
        <div>Accuracy: 98%</div>
        <div>Trained Data Set: 5000</div>
        <div>Test Data Set: 1000</div>
      </div>

      <div className="flex items-center justify-center p-4">
        <input
          type="text"
          placeholder="Enter data or upload a file"
          className="border border-gray-300 p-2 mr-2 flex-1"
        />
        <label className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <input type="file" onChange={handleFileChange} />
          Upload Excel
        </label>
        <button
          onClick={handleUpload}
          className="ml-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Start Diagnosis
        </button>
      </div>

      <table className="w-full mt-4">
        <thead>
          <tr>
            <th>Date</th>
            <th>Patient Name</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {/* 이 부분은 실제 데이터에 따라 동적으로 채워질 수 있습니다 */}
        </tbody>
      </table>
    </div>
  );
};

export default DiagnosisPage;
