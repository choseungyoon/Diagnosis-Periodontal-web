import Link from "next/link";
import { Img } from "../Img";
import { Button } from "../Button";
import { Heading } from "../Heading";

interface Props {
  className?: string;
}

export default function Header({ ...props }: Props) {
  return (
    <header
      {...props}
      className={`${props.className} flex  justify-between items-center gap-5 px-20 py-6 lg:px-8 md:px-5 sm:p-4 border-b border-solid`}
    >
      <Img
        src="img_header_logo.png"
        width={200}
        height={30}
        alt="Headerlogo"
        className="h-[30px] w-[200px] object-contain"
      ></Img>

      <ul className="flex flex-wrap gap-[60px] lg:gap-5 md:gap-5">
        <li>
          <Link href="#" className="lg:text-[13px]">
            <Heading
              size="headings"
              as="h6"
              className="text-[16px] font-extrabold capitalize text-white-a700"
            >
              Home
            </Heading>
          </Link>
        </li>
        <li>
          <Link href="/diagnosis" className="lg:text-[13px]">
            <Heading
              size="headings"
              as="h6"
              className="text-[16px] font-extrabold capitalize text-white-a700"
            >
              Diagnosis
            </Heading>
          </Link>
        </li>
      </ul>
    </header>
  );
}
