// components/Modal.tsx
import React from "react";

import { useState, Fragment } from "react";
import { Dialog, DialogTitle, Transition } from "@headlessui/react";
import {
  ExclamationTriangleIcon,
  BellAlertIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Result {
  id: number;
  userName: string;
  predictedResult: string;
}

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  resultValue?: string;
  resultId?: number;
  disanosisResults: Result[];
}

export default function ResultModal({
  isOpen,
  onClose,
  resultValue,
  resultId,
  disanosisResults,
}: ResultModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current: number, next: number) => setCurrentSlide(next),
  };

  const renderContent = (value: string) => {
    switch (value) {
      case "periodontitis":
        return (
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <ExclamationTriangleIcon
              className="h-6 w-6 text-red-600"
              aria-hidden="true"
            />
          </div>
        );
      case "gingivitis":
        return (
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10">
            <BellAlertIcon
              className="h-6 w-6 text-yellow-600"
              aria-hidden="true"
            />
          </div>
        );
      case "normal":
        return (
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
            <CheckCircleIcon
              className="h-6 w-6 text-green-600"
              aria-hidden="true"
            />
          </div>
        );
      default:
        return null;
    }
  };

  const handleResultButtonClick = () => {
    const selectedResult = disanosisResults[currentSlide];
    window.open(`/diagnosis/result?resultId=${selectedResult.id}`, "_blank");
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="pb-5">
                    <Slider {...sliderSettings}>
                      {disanosisResults.map((result, index) => (
                        <div key={index}>
                          <div className="flex items-center pb-3">
                            {renderContent(result.predictedResult)}
                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                              <DialogTitle
                                as="h3"
                                className="text-xl font-semibold leading-6 text-gray-900"
                              >
                                {result.predictedResult.toUpperCase()}
                              </DialogTitle>
                            </div>
                          </div>

                          <h3 className="text-base font-semibold">{`File: ${result.userName}`}</h3>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Your diagnostic result is{" "}
                              <span className="font-semibold">
                                {result.predictedResult}
                              </span>
                              .
                            </p>
                            <p className="text-sm text-gray-500">
                              These results were determined by an AI model, and
                              for a more detailed explanation, please consult
                              with your physician.
                            </p>
                          </div>
                        </div>
                      ))}
                    </Slider>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-purple-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-400 sm:ml-3 sm:w-auto"
                    onClick={handleResultButtonClick}
                  >
                    Go to result
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={onClose}
                    data-autofocus
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
