import React from 'react'
import { IconType } from 'react-icons'
import AnimatedButton from '../general/AnimatedButton'
import LinkTo from '../general/LinkTo';

export default function HamburgerNavMenuButtons({title, onClick, icon, href}: {
  title: string,
  onClick?: () => void,
  icon?: IconType | any,
  href?: string
}) {
  return (
    <LinkTo href={href || ""}>
      <AnimatedButton
        className="flex items-center gap-2"
        onClick={onClick}
      >
        {title}
        <div className="border-l-2 border-gray-300 pl-3">
          {icon}
        </div>
      </AnimatedButton>
    </LinkTo>
  );
}
