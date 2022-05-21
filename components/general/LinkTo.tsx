import React, { ReactNode } from "react";
import Link from "next/link";

export default function LinkTo({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) {
  return (
    <Link href={href} passHref>
      <a href="dummy">{children}</a>
    </Link>
  );
}
