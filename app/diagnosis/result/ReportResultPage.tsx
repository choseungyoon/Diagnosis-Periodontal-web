"use client";
import { Heading } from "@/components/Heading";
import { Img } from "@/components/Img";
import React from "react";

import { useEffect, useState, Suspense } from "react";
import { CheckIcon } from "@heroicons/react/24/solid";
import { Dialog } from "@headlessui/react";
import { useSearchParams } from "next/navigation";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { PrismaClient } from "@prisma/client";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Protein {
  protein: string;
  importance: number;
  abundance: number;
}

interface Protein {
  id: number;
  name: string;
  importance: number;
  abundance: number;
}

interface Result {
  id: number;
  userName: string;
  predictedResult: string;
  createdAt: string;
  updatedAt: string;
  protein: Protein[];
}

const navigation = [
  { name: "HOME", href: "/" },
  { name: "DIAGNOSIS", href: "/diagnosis" },
];

const db = new PrismaClient();

export default function ReportResultPage() {
  const searchParams = useSearchParams();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState(true);

  const resultId = searchParams.get("resultId");

  useEffect(() => {
    if (resultId) {
      const fetchResult = async () => {
        try {
          const response = await fetch(`/api/getResult?resultId=${resultId}`);
          if (response.ok) {
            const data = await response.json();
            console.log(data);
            setResult(data);
          } else {
            console.error("Failed to fetch result");
          }
        } catch (error) {
          console.error("An error occurred while fetching the result:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchResult();
    }
  }, [resultId]);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p>Loading...</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p>Loading...</p>
      </div>
    );
  }

  const predictedResult = result.predictedResult;
  const fileName = result.userName;

  const features = result.protein || [];

  const chartData = {
    labels: features.map((f) => f.protein),
    datasets: [
      {
        label: "Importance",
        data: features.map((f) => f.importance),
        backgroundColor: features.map(
          (f) => `rgba(75, 192, 192, ${f.importance * 50})`
        ),
        borderColor: features.map((f) => `rgba(75, 192, 192, 1)`),
        borderWidth: 1,
      },
      {
        label: "Abundance",
        data: features.map((f) => f.abundance),
        backgroundColor: features.map(
          (f) => `rgba(153, 102, 255, ${f.importance * 50})`
        ),
        borderColor: features.map((f) => `rgba(153, 102, 255, 1)`),
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    indexAxis: "y" as const, // 수평형 막대 차트로 변경
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
        text: "Top 10 Important Proteins",
      },
    },
  };

  const renderResult = (predictResult: String) => {
    switch (predictResult) {
      case "periodontitis":
        return (
          <div className="flex gap-5 items-center">
            <div className="bg-red-500 rounded-lg p-1">
              <Img
                src="result/img_icon_periodontitis.png"
                width={30}
                height={30}
              ></Img>
            </div>
            <span className="justify-center text-center w-1/2 inline-flex items-center rounded-md  px-2 py-2 text-xl font-semibold font-sans text-[#E35455] ">
              Periodontitis
            </span>
          </div>
        );
      case "gingivitis":
        return (
          <div className="flex gap-3 items-center">
            <div className=" bg-yellow-400 rounded-lg p-1">
              <Img
                src="result/img_icon_gingivitis.png"
                width={30}
                height={30}
              ></Img>
            </div>
            <span className="justify-center text-center w-1/2 inline-flex items-center rounded-md  px-2 py-2 text-xl font-semibold font-sans text-[#FFA307]">
              Gingivitis
            </span>
          </div>
        );
      case "normal":
        return (
          <div className="flex gap-3 items-center">
            <div className=" bg-blue-500 rounded-lg p-1">
              <Img
                src="result/img_icon_normal.png"
                width={30}
                height={30}
              ></Img>
            </div>
            <span className="justify-center text-center w-1/2 inline-flex items-center rounded-md  px-2 py-2 text-xl font-semibold font-sans text-[#007AFD] ">
              Normal
            </span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mb-1 flex justify-end pl-14 pr-[126px] lg:pr-8 md:px-5 sm:px-4">
      <div className="flex w-[88%] flex-col gap-5 lg:w-full md:w-full">
        <div className="container-md flex flex-col items-start gap-10 lg:px-5 md:px-5">
          <Heading
            size="heading3xl"
            as="h1"
            className="text-[32px] font-extrabold capitalize text-gray-900_01 lg:text-[27px] md:text-[26px] sm:text-[24px]"
          >
            Result page
          </Heading>
          <div className="flex items-center justify-around self-stretch rounded-[20px] bg-white-a700 py-7 shadow-sm">
            <div className="w-1/2 flex flex-col gap-5 px-10">
              <div className="flex gap-3 items-center">
                <div className="bg-blue-200 bg-opacity-25 rounded-md p-2">
                  <Img src="result/img_icon.png" width={25} height={25}></Img>
                </div>
                <div>
                  {" "}
                  <span className="font-sans text-lg font-semibold">
                    File Name
                  </span>
                </div>
              </div>
              <div className="flex justify-end items-end">
                <span className="font-sans text-xl">{fileName}</span>
              </div>
            </div>
            <div className="inline-block h-[100px] min-h-[1em] w-0.5 self-stretch bg-neutral-100 dark:bg-white/10"></div>
            <div className="w-1/2 flex flex-col gap-5 px-10">
              <div className="flex gap-3 items-center">
                <div className="bg-blue-200 bg-opacity-25 rounded-md p-2">
                  <Img src="result/img_icon.png" width={25} height={25}></Img>
                </div>
                <div>
                  {" "}
                  <span className="font-sans text-lg font-semibold">
                    Diagnosis Result
                  </span>
                </div>
              </div>
              <div className="flex justify-end items-end">
                <span className="">{renderResult(predictedResult)}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-around self-stretch rounded-[20px] bg-white-a700 shadow-sm px-10">
            <div className="pt-5 flex flex-col gap-1 justify-start self-start">
              <div>
                <span className="font-sans text-gray-400">Statistics</span>
              </div>
              <div>
                {" "}
                <span className="text-xl font-sans">
                  Top 10 Important Proteins
                </span>
              </div>
            </div>
            <div className="pt-5 w-full h-full">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
