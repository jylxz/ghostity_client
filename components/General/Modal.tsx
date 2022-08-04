/* eslint-disable react/jsx-props-no-spreading */
import { motion, MotionProps } from "framer-motion";
import React, { HTMLAttributes, ReactNode } from "react";
import ModalWrapper from "./ModalWrapper";

export interface ModalProps extends MotionProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  className?: HTMLAttributes<HTMLDivElement>["className"]
  children: ReactNode
}

export default function Modal({
  children,
  onClick,
  ...props
}: ModalProps) {

  return (
    <ModalWrapper onClick={onClick}>
      <motion.div {...props} onClick={(e) => e.stopPropagation()}>
        {children}
      </motion.div>
    </ModalWrapper>
  );
}
