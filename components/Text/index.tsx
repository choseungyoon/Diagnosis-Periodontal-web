import React from "react";

const sizes = {
  textxs: "text-[10px] font-normal not-italic",
  text2xl:
    "text-[56px] font-normal not-italic lg:text-[56px] md:text-[48px] sm:text-[42px]",
};

export type TextProps = Partial<{
  className: string;
  as: any;
  size: keyof typeof sizes;
}> &
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  >;

const Text: React.FC<React.PropsWithChildren<TextProps>> = ({
  children,
  className = "",
  as,
  size = "textxs",
  ...restProps
}) => {
  const Component = as || "p";
  return (
    <Component
      className={`text-white font-suit ${className} ${sizes[size]}`}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export { Text };
