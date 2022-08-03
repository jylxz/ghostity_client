import React from 'react'
import { IconType } from 'react-icons'
import AnimatedButton from '../General/AnimatedButton'
import LinkTo from '../General/LinkTo';

export default function HamburgerNavMenuButtons({title, onClick, icon, href}: {
  title: string,
  onClick?: () => void,
  icon?: IconType | JSX.Element,
  href?: string
}) {
  return (
    <LinkTo href={href || ""}>
      <AnimatedButton
        className="dark:text-text-primary-dark flex items-center gap-2"
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
