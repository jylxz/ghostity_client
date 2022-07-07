import React, { ReactNode } from "react";
import Link from "next/link";

export default function LinkTo({
  children,
  href,
  className
}: {
  children: ReactNode;
  href: string;
  className?: string
}) {
  return (
    <Link href={href} passHref>
      <a href="dummy" className={className}>
        {children}
      </a>
    </Link>
  );
}
