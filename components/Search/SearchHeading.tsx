import { motion } from "framer-motion";
import React from "react";
import { AiOutlineLeft } from "react-icons/ai";

export default function SearchHeading({
  heading,
  total,
  more,
  expand,
  handleExpand,
  handleCollapse,
  refetch,
}: {
  heading: string;
  total: number;
  more: boolean;
  expand: boolean;
  refetch: () => void;
  handleExpand: () => void;
  handleCollapse: () => void;
}) {
  return (
    <motion.div layout={expand} className=" dark:text-primary my-6">
      <div className="flex justify-between">
        <motion.h2 layout="position" className="text-2xl">
          {`${heading} `}
          <span className="text-sm dark:text-text-secondary-dark text-text-secondary">
            {total} results
          </span>
        </motion.h2>
        {more && !expand ? (
          <motion.button
          layout
            className="text-sm underline"
            type="button"
            onClick={() => {
              handleExpand();
              refetch();
            }}
          >
            view more
          </motion.button>
        ) : null}
        {expand ? ( 
          <motion.button
            type="button"
            layout
            onClick={() => handleCollapse()}
            className="text-sm underline flex items-center gap-0.5"
          >
            <AiOutlineLeft size={20}/>
            back
          </motion.button>
        ) : null}
      </div>
    </motion.div>
  );
}
