import Link from "next/link";
import { Img } from "../Img";
import { Button } from "../Button";
import { Heading } from "../Heading";

interface Props {
  className?: string;
  textColor: string;
}

export default function Header({ ...props }: Props) {
  return (
    <header
      {...props}
      className={`${props.className} sm:p-4 border-b border-solid *:text-sm`}
    >
      <div className="flex justify-between items-center w-full gap-10 px-5">
        <div className="flex items-center">
          <Link href={"http://basilbiotech.com/"} target="_blank">
            <Img
              src="img_header_logo2.png"
              width={200}
              height={30}
              alt="Headerlogo"
              className="h-[30px] w-[200px] object-contain"
            ></Img>
          </Link>
        </div>
        <div className="flex gap-10">
          {" "}
          <div>
            <Link href="/" className="lg:text-[13px]">
              <Heading
                size="headings"
                as="h3"
                className={`text-[16px] capitalize font-sans ${props.textColor}`}
              >
                Home
              </Heading>
            </Link>
          </div>
          <div>
            <Link href="/diagnosis" className="lg:text-[13px]">
              <Heading
                size="headings"
                as="h3"
                className={`text-[16px] capitalize font-sans ${props.textColor}`}
              >
                Diagnosis
              </Heading>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-between gap-5">
          <div className="flex gap-2">
            <div>
              <span
                className={` ${props.textColor} text-[14px] font-bold underline underline-offset-4 font-sans`}
              >
                KR
              </span>
            </div>
            <div>
              <span className="">|</span>
            </div>
            <div>
              <span
                className={`text-[14px] capitalize font-sans ${props.textColor}`}
              >
                EN
              </span>
            </div>
          </div>
          <div>
            <div className="px-3 py-1 border border-none bg-light_blue-800 text-center rounded-md bg-opacity-50">
              <Link href="/login">
                <div>
                  <button className="text-white-a700 font-extrabold font-sans">
                    Login
                  </button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
