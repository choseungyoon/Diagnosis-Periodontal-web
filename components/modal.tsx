// components/Modal.tsx
import React from "react";
import {
  CheckCircleIcon,
  ClockIcon,
  CogIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 *:font-serif">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full animate-modal-open">
        <h2 className="text-xl font-bold mb-4">
          Processing - {currenctFileName}
        </h2>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="mb-4">{renderContent()}</div>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </div>
  );
}
