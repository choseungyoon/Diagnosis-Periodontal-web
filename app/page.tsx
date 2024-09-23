import React from "react";
import { Metadata } from "next";
import Header from "@/components/Header";
import { Text } from "@/components/Text";
import { Heading } from "@/components/Heading";
import { Button } from "@/components/Button";
import { Img } from "@/components/Img";

export default function MainPage() {
  return (
    <div className="w-full bg-indigo-900">
      <Header
        className="border-white-a700_33"
        textColor="text-white-a700"
      ></Header>
      <div className="flex items-start justify-end px-16">
        <div className="relative z-[6] mt-[290px] flex w-[38%] flex-col items-start gap-20 lg:gap-20 md:w-full md:gap-[60px] md:px-5 sm:gap-10">
          <div className="flex flex-col items-start justify-center self-stretch">
            <div className="flex flex-col items-start justify-center self-stretch">
              <span className="text-white-a700 text-6xl"> Easy PerioDet.</span>
              <span className="text-white-a700 text-6xl py-3">
                {" "}
                Diagnosis Periodontitis.
              </span>
            </div>
            <div className="pt-5">
              <span className="text-white-a700 font-mono">
                Supporting better health outcomes and clinical excellence with
                intelligent technology.
              </span>
            </div>
          </div>
          <Button
            color="light_blue_800"
            size="5xl"
            rightIcon={
              <Img
                src="img_arrowright_white_a700.svg"
                width={24}
                height={24}
                alt="Arrot Right"
                className="h-[24px] w-[24px]"
              ></Img>
            }
            className="min-w-[208px] gap-1 rounded-[30px] px-[22px] font-bold sm:px-4"
          >
            <a href="/diagnosis"> Diagnosis Now</a>
          </Button>
        </div>
        <div className="relative ml-[-340px] flex h-[1080px] w-[50%] items-start justify-center self-center rounded-[540px] bg-[url(/images/img_group_3.png)] bg-cover bg-no-repeat p-3 lg:h-auto md:ml-0 md:h-auto md:w-full md:px-5">
          <div className="mb-40 flex w-[86%] flex-col items-end lg:w-full md:w-full">
            <div className="relative h-[894px] w-[92%] ">
              <div className="absolute bottom-0 left-0 right-0 top-0 m-auto flex h-max flex-1 flex-col items-center rounded-full border border-solid border-gray-200_19 p-[22px] sm:p-4">
                <div className="mb-[82px] w-[84%] lg:w-full md:w-full">
                  <div className="flex items-start justify-between gap-5">
                    <Button
                      color="white_a700_1e"
                      size="6xl"
                      className="mb-3.5 ml-7 w-[66px] rounded-[18px] px-3"
                    >
                      <Img src="img_80_tooth.png" width={42} height={42}></Img>
                    </Button>
                    <Img
                      src="img_mage_hospital_plus_fill.svg"
                      width={42}
                      height={42}
                      alt="Magehospital"
                      className="h-[42px] w-[42px] self-end"
                    ></Img>
                  </div>
                  <div className="relative ml-[86px] mr-[202px] h-[400px] md:mx-0">
                    <Img
                      src="img_tooth.png"
                      width={388}
                      height={388}
                      alt="image"
                      className="absolute right-[20px] top-0 m-auto h-[100%] w-[100%] object-contain"
                    ></Img>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-[28%] right-[2%] z-[5] m-auto flex w-[40%] justify-center rounded-[20px] bg-white-a700_1e p-3">
                <div className="flex w-full flex-col items-start">
                  <Heading
                    size="headings"
                    as="h2"
                    className="text-[16px] font-extrabold lg:text-[13px] text-white-a700"
                  >
                    Important proteins
                  </Heading>
                  <div className="mr-2 mt-2.5 flex flex-col items-start self-stretch md:mr-0">
                    <Text
                      as="p"
                      className="text-[10px] font-normal capitalize text-white-a700"
                    >
                      P61626
                    </Text>
                    <div className="h-[14px] w-[62%] rounded-bl-sm rounded-br-md rounded-tl-sm rounded-tr-md bg-gradient-to-l from-indigo-300"></div>
                    <Text
                      as="p"
                      className="mt-1.5 text-[10px] font-normal capitalize text-white-a700"
                    >
                      P05164
                    </Text>
                    <div className="h-[14px] w-[99%] rounded-bl-sm rounded-br-md rounded-tl-sm rounded-tr-md bg-gradient-to-l from-indigo-300"></div>
                    <Text
                      as="p"
                      className="mt-1.5 text-[10px] font-normal capitalize text-white-a700"
                    >
                      P05164
                    </Text>
                    <div className="h-[14px] w-[86%] rounded-bl-sm rounded-br-md rounded-tl-sm rounded-tr-md bg-gradient-to-l from-indigo-300"></div>
                    <Text
                      as="p"
                      className="mt-1.5 text-[10px] font-normal capitalize text-white-a700"
                    >
                      P05164
                    </Text>
                    <div className="h-[14px] w-[72%] rounded-bl-sm rounded-br-md rounded-tl-sm rounded-tr-md bg-gradient-to-l from-indigo-300"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
