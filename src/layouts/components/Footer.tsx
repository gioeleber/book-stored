import React from "react";
import { APP_NAME } from "../../utils/consts";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-slate-200 px-4 py-2">
      © {APP_NAME} - {year}
    </footer>
  );
}
