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
              src="img_header_logo.png"
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
                className={`text-[16px] capitalize text-white-a700 font-sans  ${props.textColor}`}
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
                className="text-[16px] capitalize text-white-a700 font-sans"
              >
                Diagnosis
              </Heading>
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-between gap-5">
          <div className="flex gap-2">
            <div>
              <span className="text-white-a700 font-bold underline underline-offset-4 font-sans">
                KR
              </span>
            </div>
            <div>
              <span className="text-white-a700_33">|</span>
            </div>
            <div>
              <span className="text-white-a700 font-sans font-normal">EN</span>
            </div>
          </div>
          <div>
            <div className="px-3 py-1 border border-none bg-blue-400 text-center rounded-md bg-opacity-25">
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
