import React, { ButtonHTMLAttributes } from "react";
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: string;
  isLoading: boolean;
}

export default function Button({
  children,
  isLoading,
  ...rest
}: Props): JSX.Element {
  return (
    <button
      className="rounded-md bg-violet-300 px-4 py-2"
      disabled={isLoading}
      {...rest}
    >
      {children}
    </button>
  );
}
