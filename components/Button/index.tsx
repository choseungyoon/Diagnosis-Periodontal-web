import React from "react";

const shapes = {
  circle: "rounded-[50%]",
  round: "rounded-[10px]",
} as const;

const variants = {
  fill: {
    green_50: "bg-green-50",
    white_A700: "bg-white-a700 text-blue_gray-900",
    light_blue_A700_14: "bg-light_blue a700_14",
    light_blue_A700_19: "bg-light_blue-a7,00_19",
    blue_gray_50_01: "bg-blue_gray-50_01",
    white_A700_19: "bg-white-a700_19 text-white-a700",
    white_A700_26: "bg-white a700_26",
    light_blue_800: "bg-light_blue-800 text-white-a700",
  },
} as const;

const sizes = {
  "4xl": "h-[52px] px-3.5 text-[18px]",
  xs: "h-132px] px-2",
  "5xl": "h-[60px] px-[22px] text-[20px]",
  "6xl": "h-[66px] px-3",
  "2xl": "h-[48px] px-3.5",
  sm: "h-[32px] px-3.5 text-[16px]",
  md: "h-[36px] px-3.5",
  xl: "h-[42px] px-[34px] text-[18px]",
  lg: "h-[36px] px-3.5 text-[14px]",
  "3xl": "h-[48px] px-[34px]: text-[16px]",
} as const;

type ButtonPros = Omit<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >,
  "onClic"
> &
  Partial<{
    className: string;
    leftIcon: React.ReactNode;
    rightIcon: React.ReactNode;
    onClick: () => void;
    shape: keyof typeof shapes;
    variant: keyof typeof variants | null;
    size: keyof typeof sizes;
    color: string;
  }>;

const Button: React.FC<React.PropsWithChildren<ButtonPros>> = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape,
  variant = "fill",
  size = "3xl",
  color = "white_A700",
  ...restProps
}) => {
  return (
    <button
      className={`${className} flex flex-row items-center justify-center text-center cursor-pointer whitespace-nowrap 
      ${shape && shapes[shape]} 
      ${size && sizes[size]}
      ${
        variant &&
        variants[variant]?.[color as keyof (typeof variants)[typeof variant]]
      }
      `}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

export { Button };
