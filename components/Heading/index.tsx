import React from "react";

const sizes = {
  texts: "text-[14px] font-medium",
  textmd: "text-[16pxl font-medium",
  textlg: "text-[18px] font-medium",
  textxl: "text-[24px] font-medium lg:text-[24px] md:text-[22px]",
  headingxs: "text-[14px] font-semibold",
  headings: "text-[16px] font-extrabold",
  headingmd: "text-[18px] font-bold",
  headinglg: "text-[20px] font-extrabold",
  headingxl: "text-[24x] font-extrabold lg: text-[24px] md: text-[22px]",
  heading2xl:
    "text-[28px] font-extrabold lg: text-[28px] md:text-[26px] sm: text-[24px]",
  heading3xl:
    "text-[32px] font-extrabold lg: text-[32px] md:text-[30px] sm: text-[28px]",
};

export type HeadingProps = Partial<{
  className: string;
  as: any;
  size: keyof typeof sizes;
}> &
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  >;

const Heading: React.FC<React.PropsWithChildren<HeadingProps>> = ({
  children,
  className = "",
  size = "textmd",
  as,
  ...restProps
}) => {
  const Component = as || "h6";
  return (
    <Component
      className={`text-gray-700 font-suit ${className} ${sizes[size]}`}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export { Heading };
