import { AccordionSummary, AccordionSummaryProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const FaqAccordionSummary = styled(AccordionSummary)<AccordionSummaryProps>(
  ({ theme }) => ({
    background: theme.palette.mode === "dark" ? "#25272A" : "white",
    color: theme.palette.mode === "dark" ? "#efefef" : "black",
  })
);

export default FaqAccordionSummary