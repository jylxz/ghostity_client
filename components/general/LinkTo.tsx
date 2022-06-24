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
    <Link href={href} passHref className={className} scroll={false} shallow>
      <a href="dummy">{children}</a>
    </Link>
  );
}
