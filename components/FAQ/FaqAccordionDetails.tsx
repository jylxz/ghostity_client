import * as React from "react";
import { AccordionDetails, AccordionDetailsProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const FaqAccordionDetails = styled(AccordionDetails)<AccordionDetailsProps>(({theme}) => ({
  background: theme.palette.mode === "dark" ? "#2b2b2b" : "white",
  color: theme.palette.mode === "dark" ? "#a1a1a1" : "rgb(107 114 128)",
  fontSize: "0.875rem",
  lineHeight: "1.25rem"
}))

export default FaqAccordionDetails