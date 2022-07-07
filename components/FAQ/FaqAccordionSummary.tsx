import * as React from "react";
import { AccordionSummary, AccordionSummaryProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const FaqAccordionSummary = styled(AccordionSummary)<AccordionSummaryProps>(
  ({ theme }) => ({
    background: theme.palette.mode === "dark" ? "#2b2b2b" : "white",
    color: theme.palette.mode === "dark" ? "#efefef" : "black",
  })
);

export default FaqAccordionSummary