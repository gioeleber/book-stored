import React, { ButtonHTMLAttributes, ReactNode } from "react";
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
  buttonStyle?: "default" | "link-button";
}

export default function Button({
  children,
  isLoading,
  buttonStyle,
  ...rest
}: Props): JSX.Element {
  const className = () => {
    switch (buttonStyle) {
      case "link-button":
        return "cursor-pointer text-violet-500 underline";
      default:
        return "cursor-pointer rounded-md bg-violet-300 px-4 py-2";
    }
  };
  return (
    <button className={className()} disabled={isLoading} {...rest}>
      {children}
    </button>
  );
}
