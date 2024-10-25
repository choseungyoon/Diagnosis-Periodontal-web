// components/Modal.tsx
import React from "react";

import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Img } from "./Img";

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
          <div className="mx-auto flex flex-col justify-center flex-shrink-0 items-center rounded-full">
            <div>
              <Img
                src="result/img_icon_periodontitis.png"
                width={60}
                height={60}
              ></Img>
            </div>
            <div>
              <span className="font-semibold font-sans text-3xl text-[#E35455]">
                Periodontitis
              </span>
            </div>
          </div>
        );
      case "gingivitis":
        return (
          <div className="mx-auto flex flex-col justify-center flex-shrink-0 items-center rounded-full">
            <div>
              <Img
                src="result/img_icon_gingivitis.png"
                width={60}
                height={60}
              ></Img>
            </div>
            <div>
              <span className="font-semibold font-sans text-3xl text-[#FFA307]">
                Gingivitis
              </span>
            </div>
          </div>
        );
      case "normal":
        return (
          <div className="mx-auto flex flex-col justify-center flex-shrink-0 items-center rounded-full">
            <div>
              <Img
                src="result/img_icon_normal.png"
                width={60}
                height={60}
              ></Img>
            </div>
            <div>
              <span className="font-semibold font-sans text-3xl text-[#007AFD]">
                Normal
              </span>
            </div>
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
          <div className="fixed inset-0 bg-black-900_7 bg-opacity-50 transition-opacity" />
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white-a700 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md">
                <div className="bg-white-a700 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="pb-5">
                    <Slider {...sliderSettings}>
                      {disanosisResults.map((result, index) => (
                        <div key={index}>
                          <div className="flex flex-col items-center pb-3 justify-center gap-2">
                            <div> {renderContent(result.predictedResult)}</div>
                          </div>

                          <div className="p-5 border border-none bg-gray-300 bg-opacity-20 rounded-md text-center">
                            <p className="text-sm text-gray-700_01 font-sans">
                              Your diagnostic result is{" "}
                              <span className="font-semibold font-sans">
                                {result.predictedResult}
                              </span>
                              .
                            </p>
                            <p className="text-sm text-gray-700_01 font-sans">
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

                <div className=" bg-white-a700 px-4 py-3 flex justify-between gap-3">
                  <div className="rounded-md w-1/2 flex justify-center py-2 items-center">
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white-a700 px-3 py-4 font-sans font-semibold text-gray-900 border-gray-300 border hover:bg-gray-100"
                      onClick={onClose}
                      data-autofocus
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="rounded-md w-1/2 flex justify-center py-2 items-center">
                    {" "}
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-[#0081BF] px-3 py-4 font-sans font-semibold text-white-a700   hover:bg-[#8dc8e3]"
                      onClick={handleResultButtonClick}
                    >
                      Go to result
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
