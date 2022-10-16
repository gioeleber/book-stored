import React from "react";
import { strToSousageCase } from "../utils/strUtils";

interface Props {
  label: string;
  placeholder: string;
}

const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ label, placeholder }, ref) => {
    const inputID = strToSousageCase(label);
    return (
      <div>
        <label htmlFor={inputID} className="block">
          {label}
        </label>
        <input
          ref={ref}
          type="text"
          name={inputID}
          id={inputID}
          className="block w-full max-w-lg rounded-md border border-slate-400 p-2"
          placeholder={placeholder}
        />
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
