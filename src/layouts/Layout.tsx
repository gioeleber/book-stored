import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Navbar />
      <main className="mx-auto mb-6 max-w-4xl px-4 md:px-0">{children}</main>
      <Footer />
    </>
  );
}
