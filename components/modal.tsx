// components/Modal.tsx
import React from "react";
import {
  CheckCircleIcon,
  ClockIcon,
  CogIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { Img } from "./Img";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStep: number;
  currenctFileName?: String;
}

export default function Modal({
  isOpen,
  onClose,
  currentStep,
  currenctFileName,
}: ModalProps) {
  if (!isOpen) return null;

  const renderContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="flex items-center">
            <ArrowPathIcon className="h-6 w-6 mr-2 animate-spin" />
            <div>Sending data to server...</div>
          </div>
        );
      case 2:
        return (
          <div className="flex items-center">
            <CogIcon className="h-6 w-6 mr-2 animate-spin" />
            <div>Preprocess data...</div>
          </div>
        );
      case 3:
        return (
          <div className="flex items-center">
            <ClockIcon className="h-6 w-6 mr-2 animate-pulse" />
            <div>Artificial intelligence analysis in progress...</div>
          </div>
        );
      case 4:
        return (
          <div className="flex items-center">
            <CheckCircleIcon className="h-6 w-6 mr-2 text-green-500" />
            <div>Almost done...</div>
          </div>
        );
      default:
        return null;
    }
  };

  const progressPercentage = (currentStep / 4) * 100;

  return (
    <div className="fixed inset-0 bg-black-900_7 bg-opacity-50 flex items-center justify-center z-50 *:font-serif w-full">
      <div className="bg-white-a700 py-10 px-5 rounded-lg shadow-lg max-w-lg w-full animate-modal-open flex flex-col gap-2">
        <div className="border items-center flex self-start justify-start border-slate-200 rounded-md p-2">
          <span className="font-sans text-xl font-semibold">AI</span>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4 font-sans">
            Altificial Intelligence analysis in progress
          </h2>
        </div>
        <div className="flex gap-3 items-center">
          <div>
            <Img src="img_excel_icon.png" width={36} height={36}></Img>
          </div>
          <div>
            <span className="font-sans">{currenctFileName}</span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div
            className="bg-light_blue-800 h-2.5 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="mb-4 font-sans">{renderContent()}</div>
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-md hover:bg-red-300 border-gray-100 border self-end w-1/4 font-sans"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
