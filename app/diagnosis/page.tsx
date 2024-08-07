"use client";

import axios from "axios";
import Head from "next/head";
import { SetStateAction, useActionState, useEffect, useState } from "react";
import Link from "next/link";

import React from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Modal from "@/components/modal";
import { useRouter } from "next/navigation";
import { PrismaClient } from "@prisma/client";
import { format } from "date-fns";
import ResultModal from "@/components/resultModal";

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
          //"https://api.diagnosis-api.com/diagnosis",
          "http://localhost:8000/diagnosis",
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
          <span className="justify-center text-center w-1/2 inline-flex items-center rounded-md bg-red-50 px-2 py-2 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
            PERIODONTITIS
          </span>
        );
      case "gingivitis":
        return (
          <span className="justify-center text-center w-1/2 inline-flex items-center rounded-md bg-yellow-50 px-2 py-2 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
            GINGIVITIS
          </span>
        );
      case "normal":
        return (
          <span className="justify-center text-center w-1/2 inline-flex items-center rounded-md bg-green-50 px-2 py-2 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
            NORMAL
          </span>
        );
      default:
        return null;
    }
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    const excelFiles = selectedFiles.filter(
      (file) =>
        file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    setFiles((prevFiles) => [...prevFiles, ...excelFiles]);
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
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">BASIL BIOTECH</span>
              <img className="h-8 w-auto" src="./logo.png" alt="" />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        <Dialog
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="relative isolate px-8 pt-14 lg:px-28">
          <div className="flex flex-col ">
            <div className="pb-8">
              <span className="font-semibold text-3xl">Start diagnosis</span>
            </div>
            <div className="flex flex-col items-center w-full">
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
                    accept=".xlsx"
                    className="hidden"
                    multiple
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              {files.length > 0 && (
                <div className="mt-4 w-full border-2 border-gray-300 p-10 bg-white rounded-md shadow-md">
                  <span className="text-xl">Selected Files</span>
                  <ul className="pt-2">
                    {files.map((file, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center bg-gray-100 p-2 rounded-md mb-2 hover:bg-gray-300"
                      >
                        {file.name}
                        <button
                          onClick={() => removeFile(index)}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-end pt-5">
                    <button
                      //onClick={handleUpload}
                      onClick={openModal}
                      //className="text-base px-2 bg-violet-500 text-white  rounded-xl hover:bg-violet-600  transition-colors"
                      className={`px-4 py-2 rounded ${
                        files.length > 0
                          ? " text-base px-2  text-white bg-violet-500 hover:bg-violet-600  transition-colors"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
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
        <div className="px-28 py-10">
          <div className="w-full h-px bg-neutral-200"></div>
        </div>
        <div className="px-28 py-10">
          <div className="pb-8">
            <span className="font-semibold text-3xl">Analysis Step</span>
          </div>
          <div className="flex flex-row items-center justify-center pt-4 gap-5 grid-cols-4">
            <div className="grid-cols-1 flex">
              <div className=" bg-white rounded-lg p-4 shadow-lg flex-col hover:scale-125 transition-transform hover:bg-purple-50">
                <span className="font-semibold text-lg">
                  Upload Protein data
                </span>
                <p>
                  Upload protein data extracted from the patient's oral cavity.
                  The data must include both Accession and Abundance values.
                </p>
              </div>
            </div>
            <div className="grid-cols-1 flex">
              <div className=" bg-white rounded-lg p-4 shadow-lg flex-col hover:scale-125 transition-transform hover:bg-purple-50">
                <span className="font-semibold text-lg">
                  Data preprocessing
                </span>
                <p>
                  We preprocess the data to fit the AI model. We select the top
                  100 most important features from the patient's protein data.
                </p>
              </div>
            </div>
            <div className="grid-cols-1 flex">
              <div className=" bg-white rounded-lg p-4 shadow-lg flex-col hover:scale-125 transition-transform hover:bg-purple-50">
                <span className="font-semibold text-lg">Predict</span>
                <p>
                  We diagnose the presence of diseases using an artificial
                  intelligence algorithm
                </p>
              </div>
            </div>
            <div className="grid-cols-1 flex">
              <div className=" bg-white rounded-lg p-4 shadow-lg flex-col hover:scale-125 transition-transform hover:bg-purple-50">
                <span className="font-semibold text-lg">Result</span>
                <p>
                  We classify the results into periodontitis, gingivitis, and
                  normal. We also provide the top 5 protein data that most
                  influenced the diagnosis.
                </p>
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
                  <tr key={result.id} className=" hover:bg-violet-50">
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
                        className="text-sm px-3 py-2 rounded bg-violet-50 hover:bg-violet-200"
                      >
                        REPORT
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center items-center mt-4 gap-10">
              <button
                className="px-4 py-2 bg-violet-500 hover:bg-violet-600  text-white rounded  disabled:bg-gray-300"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="px-4 py-2 bg-violet-500 hover:bg-violet-600  text-white rounded  disabled:bg-gray-300"
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
