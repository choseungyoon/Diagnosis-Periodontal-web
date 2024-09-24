"use client";
import { useEffect, useState, Suspense } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
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
import Header from "@/components/Header2";
import ReportResultPage from "./ReportResultPage";

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

const ResultContent = () => {
  return (
    <div className="flex w-full flex-col gap-20 bg-gray-50_01 lg:gap-20 md:gap-[60px] sm:gap-10">
      <Header
        className="border-gray-200 bg-white-a700"
        textColor="text-gray-900 font-bold"
      ></Header>
      <ReportResultPage></ReportResultPage>
    </div>
  );
};

const Result = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  );
};

export default Result;
