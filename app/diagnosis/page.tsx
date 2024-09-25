"use client";

import axios from "axios";
import { SetStateAction, useActionState, useEffect, useState } from "react";
import Link from "next/link";

import React from "react";
import Modal from "@/components/modal";
import { PrismaClient } from "@prisma/client";
import { format } from "date-fns";
import ResultModal from "@/components/resultModal";
import Header from "@/components/Header2";
import { Img } from "@/components/Img";
import Image from "next/image";

const navigation = [
  { name: "HOME", href: "/" },
  { name: "DIAGNOSIS", href: "/diagnosis" },
];

const db = new PrismaClient();

interface Protein {
  protein: string;
  importance: number;
  abundance: number;
}

interface DiagnosisData {
  predicted_result: string;
  important_proteins: Protein[];
}

interface Result {
  id: number;
  userName: string;
  predictedResult: string;
  createdAt: string;
  updatedAt: string;
}

interface TempResult {
  id: number;
  userName: string;
  predictedResult: string;
}

const DiagnosisPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [files, setFiles] = useState<File[]>([]);
  const [currentFile, setCurrentFile] = useState<File>();

  const [currentStep, setCurrentStep] = useState(1);
  const [apiResponse, setApiResponse] = useState<string[]>([]);

  const [results, setResults] = useState<Result[] | null>(null);

  const [result, setResult] = useState<Result | null>(null);

  const [disanosisResults, setDisanosisResults] = useState<TempResult[]>([]);

  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const openModal = async () => {
    setIsModalOpen(true);
    setCurrentStep(1);

    const apiRefs: string[] = [];
    for (const file of files) {
      setCurrentFile(file);
      const ref = await handleUpload(file);
      apiRefs.push(ref);
    }
    setApiResponse(apiRefs);
  };

  const closeResultModal = () => {
    setIsResultModalOpen(false);
    setFiles([]);
    setApiResponse([]);
    setDisanosisResults([]);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentStep(1);
    setApiResponse([]);
    setFiles([]);
    setDisanosisResults([]);
  };

  const handleResultButtonClick = (id: number) => {
    window.open(`/diagnosis/result?resultId=${id}`, "_blank");
  };

  useEffect(() => {
    if (!isModalOpen) return;

    if (apiResponse.length > 0) {
      for (const idx in apiResponse) {
        let parsedData = JSON.parse(apiResponse[idx]);
        const resultData = parsedData as DiagnosisData;
        console.log(resultData);
        const saveResult = async () => {
          try {
            const response = await fetch("/api/saveResult", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userName: files[idx] ? files[idx].name : "Anonymous", // 예시 값, 실제 사용자 이름으로 변경
                predictedResult: resultData.predicted_result,
                proteins: resultData.important_proteins,
              }),
            });

            if (response.ok) {
              const temp = await response.json();
              setResult(temp);
              setIsResultModalOpen(true);
              setIsModalOpen(false);
              console.log("temp : ", temp);
              setDisanosisResults((prevResult) => [
                ...prevResult,
                {
                  id: temp.id,
                  userName: temp.userName,
                  predictedResult: temp.predictedResult,
                },
              ]);
              console.log("disanosisResults : ", disanosisResults);
            } else {
              console.error("Failed to save result");
            }
          } catch (error) {
            console.error("An error occurred while saving the result:", error);
          }
        };
        saveResult();
      }
    } else {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => (prev < 4 ? prev + 1 : 1));
      }, 3000);

      if (currentStep === 5) {
        clearTimeout(timer);
        openModal(); // 다시 단계를 시작
      }

      return () => clearTimeout(timer);
    }
  }, [isModalOpen, currentStep, apiResponse]);

  useEffect(() => {
    console.log(currentPage);
    const fetchResults = async () => {
      try {
        const response = await fetch(`/api/getAllResult?page=${currentPage}`);
        if (response.ok) {
          const data = await response.json();
          setResults(data.results);
          setTotalResults(data.totalResults);
        } else {
          console.log("Failed to fetch result");
        }
      } catch (error) {
        console.error("An error occurred while fetching the result:", error);
      } finally {
      }
    };
    fetchResults();
  }, [currentPage]);

  const totalPages = Math.ceil(totalResults / pageSize);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleUpload = async (file: File) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await axios.post(
          "https://api.diagnosis-api.com/diagnosis",
          //"http://localhost:8000/diagnosis",
          formData
        );
        //alert(response.data["output"]);
        //console.log(response.data);
        return response.data["output"];
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    } else {
      console.error("No file selected");
    }
  };

  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p>Loading...</p>
      </div>
    );
  }

  const renderResult = (predictResult: String) => {
    switch (predictResult) {
      case "periodontitis":
        return (
          <span className="justify-center text-center w-1/2 inline-flex items-center rounded-md bg-red-50 px-2 py-2 text-xs font-medium font-sans text-red-700 ">
            Periodontitis
          </span>
        );
      case "gingivitis":
        return (
          <span className="justify-center text-center w-1/2 inline-flex items-center rounded-md bg-yellow-50 px-2 py-2 text-xs font-medium font-sans text-yellow-500">
            Gingivitis
          </span>
        );
      case "normal":
        return (
          <span className="justify-center text-center w-1/2 inline-flex items-center rounded-md bg-blue-50 px-2 py-2 text-xs font-medium font-sans text-blue-700 ">
            Normal
          </span>
        );
      default:
        return null;
    }
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);

    const tsvFiles = selectedFiles.filter(
      (file) => file.type === "text/tab-separated-values"
    );

    const excelFiles = selectedFiles.filter(
      (file) =>
        file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    if (excelFiles) setFiles((prevFiles) => [...prevFiles, ...excelFiles]);
    if (tsvFiles) setFiles((prevFiles) => [...prevFiles, ...tsvFiles]);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    const excelFiles = droppedFiles.filter(
      (file) =>
        file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    setFiles((prevFiles) => [...prevFiles, ...excelFiles]);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="flex w-full flex-col bg-white-a700">
      <Header
        className="border-gray-200"
        textColor="text-gray-900 font-bold"
      ></Header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        ></div>
        <div className="relative isolate px-8 pt-14 lg:px-28">
          <div className="flex flex-col ">
            <div className="pb-8">
              <span className="font-extralight text-3xl">Start diagnosis</span>
            </div>
            <div className="flex flex-col items-center w-full">
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-100 dark:hover:bg-blue-gray-800 dark:bg-gray-700 hover:bg-gray-400 hover:bg-opacity-25 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-full"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-base text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">
                        Click to upload data
                      </span>{" "}
                      or drag and drop
                    </p>
                    <p className="text-sm text-red-500 dark:text-gray-400">
                      Only Excel file is Allowed.
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    accept=".xlsx,.tsv"
                    className="hidden"
                    multiple
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              {files.length > 0 && (
                <div className="mt-4 w-full bg-white pt-5">
                  <span className="text-xl">Selected Files</span>
                  <ul className="pt-5">
                    {files.map((file, index) => (
                      <li
                        key={index}
                        className="px-5 flex justify-between items-center bg-gray-100 py-2 rounded-md mb-2 hover:bg-gray-300"
                      >
                        <div className="flex gap-5 items-center">
                          <div>
                            {file.name.endsWith(".tsv") ? (
                              <Img
                                src="img_tsv_icon.png"
                                width={36}
                                height={36}
                              ></Img>
                            ) : (
                              <Img
                                src="img_excel_icon.png"
                                width={36}
                                height={36}
                              ></Img>
                            )}
                          </div>
                          <div>
                            <span>{file.name}</span>
                          </div>
                        </div>

                        <button onClick={() => removeFile(index)}>
                          <Img src="img_close.png" width={24} height={24}></Img>
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-center pt-5">
                    <button
                      //onClick={handleUpload}
                      onClick={openModal}
                      className={`px-4 py-2 rounded ${
                        files.length > 0
                          ? " text-white-a700 px-2 bg-light_blue-800 hover:bg-gray-600  transition-colors hover:bg-sky-800"
                          : "bg-light_blue-800  text-white-a700 cursor-not-allowed"
                      }`}
                    >
                      Diagnosis Now
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="px-28 py-20">
          <div className="pb-8">
            <span className="font-semibold text-3xl">Analysis Step</span>
          </div>
          <div className="grid items-start justify-center grid-cols-4 ">
            <div className="flex">
              <div className="bg-white p-4 flex-col ">
                <div className="flex justify-center">
                  <Img
                    src="diagnosis/img_step_1.png"
                    width={300}
                    height={100}
                    alt="step1"
                  ></Img>
                </div>
                <div className="pt-2">
                  <span className="text-light_blue-800 text-lg font-sans">
                    01
                  </span>
                </div>
                <div className="py-2">
                  <span className="text-2xl font-sans font-semibold">
                    Upload Protein data
                  </span>
                </div>
                <div>
                  <p className="font-light font-sans">
                    Upload protein data extracted from the patient's oral
                    cavity. The data must include both Accession and Abundance
                    values.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="bg-white p-4 flex-col ">
                <div className="flex justify-center">
                  <Img
                    src="diagnosis/img_step_2.png"
                    width={300}
                    height={100}
                    alt="step1"
                  ></Img>
                </div>
                <div className="pt-2">
                  <span className="text-light_blue-800 text-lg font-sans">
                    02
                  </span>
                </div>
                <div className="py-2">
                  <span className="text-2xl font-sans font-semibold">
                    Data preprocessing
                  </span>
                </div>
                <div>
                  <p className="font-light font-sans">
                    We preprocess the data to fit the AI model. We select the
                    top 100 most important features from the patient's protein
                    data.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="bg-white p-4 flex-col ">
                <div className="flex justify-center">
                  <Img
                    src="diagnosis/img_step_3.png"
                    width={300}
                    height={100}
                    alt="step1"
                  ></Img>
                </div>
                <div className="pt-2">
                  <span className="text-light_blue-800 text-lg font-sans">
                    03
                  </span>
                </div>
                <div className="py-2">
                  <span className="text-2xl font-sans font-semibold">
                    Predict
                  </span>
                </div>
                <div>
                  <p className="font-light font-sans">
                    We diagnose the presence of diseases using an artificial
                    intelligence algorithm
                  </p>
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="bg-white p-4 flex-col ">
                <div className="flex justify-center">
                  <Img
                    src="diagnosis/img_step_4.png"
                    width={300}
                    height={100}
                    alt="step1"
                  ></Img>
                </div>
                <div className="pt-2">
                  <span className="text-light_blue-800 text-lg font-sans">
                    04
                  </span>
                </div>
                <div className="py-2">
                  <span className="text-2xl font-sans font-semibold">
                    Result
                  </span>
                </div>
                <div>
                  <p className="font-light font-sans">
                    We classify the results into periodontitis, gingivitis, and
                    normal. We also provide the top 5 protein data that most
                    influenced the diagnosis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-28 py-10">
          <div>
            <span className="font-semibold text-3xl">History</span>
          </div>
          <div className="py-10">
            <table className="min-w-full bg-white table-auto border-separate rounded-lg border-2 overflow-hidden border-gray-100">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b ">ID</th>
                  <th className="py-2 px-4 border-b">User Name</th>
                  <th className="py-2 px-4 border-b">Predicted Result</th>
                  <th className="py-2 px-4 border-b">Created At</th>
                  <th className="py-2 px-4 border-b">Report</th>
                </tr>
              </thead>
              <tbody>
                {results?.map((result) => (
                  <tr key={result.id} className=" hover:bg-gray-50">
                    <td className="py-2 px-4 border-b text-center">
                      {result.id}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {result.userName}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {renderResult(result.predictedResult)}
                    </td>
                    <td className="py-2 px-4 border-b text-center">
                      {format(
                        new Date(result.createdAt),
                        "yyyy-MM-dd HH:mm:ss"
                      )}
                    </td>
                    <td className="py-1 px-2 border-b text-center">
                      <button
                        onClick={() => handleResultButtonClick(result.id)}
                        className="text-sm px-3 py-2 rounded hover:bg-sky-100"
                      >
                        <Img
                          src="diagnosis/img_report.png"
                          width={24}
                          height={24}
                        ></Img>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center items-center mt-4 gap-10">
              <button
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600  text-white rounded  disabled:bg-gray-300"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600  text-white rounded  disabled:bg-gray-300"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        currentStep={currentStep}
        currenctFileName={currentFile?.name}
      />

      <ResultModal
        isOpen={isResultModalOpen}
        onClose={closeResultModal}
        resultValue={result?.predictedResult}
        resultId={result?.id}
        disanosisResults={disanosisResults}
      ></ResultModal>
    </div>
  );
};

export default DiagnosisPage;
