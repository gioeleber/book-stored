import React from "react";
interface Props {
  children: string;
  isLoading: boolean;
}

export default function Button({ children, isLoading }: Props): JSX.Element {
  return (
    <button className="rounded-md bg-violet-400 px-4 py-2" disabled={isLoading}>
      {children}
    </button>
  );
}
