import Link from "next/link";
import React, { ReactNode } from "react";

interface Props {
  href: string;
  children: ReactNode;
}

export default function NextLink({ href, children }: Props): JSX.Element {
  return (
    <Link href={href}>
      <a href={href} className="cursor-pointer text-violet-500 underline">
        {children}
      </a>
    </Link>
  );
}
