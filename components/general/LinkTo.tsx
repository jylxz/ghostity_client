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
    <Link href={href} passHref className={className}>
      <a href="dummy" className="flex items-center">{children}</a>
    </Link>
  );
}
