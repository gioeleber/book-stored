import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  priority: 1 | 2 | 3 | 4 | 5 | 6;
}

export default function Heading({
  children,
  priority,
}: Props): JSX.Element | null {
  const classes = "font-extrabold leading-normal text-gray-700 ";
  switch (priority) {
    case 1:
      return <h1 className={classes + "text-5xl"}>{children}</h1>;
    case 2:
      return <h1 className={classes + "text-4xl"}>{children}</h1>;

    default:
      return null;
  }
}
