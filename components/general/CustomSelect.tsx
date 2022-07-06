/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
import * as React from "react";
import SelectUnstyled, {
  SelectUnstyledProps,
  selectUnstyledClasses,
} from "@mui/base/SelectUnstyled";
import OptionUnstyled, {
  optionUnstyledClasses,
} from "@mui/base/OptionUnstyled";
import PopperUnstyled from "@mui/base/PopperUnstyled";
import { styled } from "@mui/system";
import useThemeColor from "../../hooks/useThemeColor";

const blue = {
  100: "#DAECFF",
  200: "#99CCF3",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  100: "#E7EBF0",
  200: "#E0E3E7",
  300: "#CDD2D7",
  400: "#B2BAC2",
  500: "#A0AAB4",
  600: "#6F7E8C",
  700: "#3E5060",
  800: "#2D3843",
  900: "#1A2027",
};

const StyledButton = styled("button")(
  ({ theme }) => `
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  font-weight: 400;
  box-sizing: border-box;
  min-width: fit-content;
  width: 100%
  border: 1px solid ${grey[300]};
  margin-top: 0.5em;
  padding: 4px 8px;
  text-align: left;
  line-height: 1.25;
  color: white;

  &:hover {
    background: ${grey[100]};
    border-color: ${grey[400]};
  }

  &.${selectUnstyledClasses.focusVisible} {
    outline: 3px solid ${blue[100]};
  }

  &.${selectUnstyledClasses.expanded} {
    &::after {
      content: '▴';
    }
  }

  &::after {
    content: '▾';
    float: right;
    font-size: 24px;
  }
  `
);

const StyledListbox = styled("ul")(
  ({ theme }) => `
  
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 5px;
  margin: 10px 0;
  min-width: 100%;
  background: ${
    theme.palette.mode === "dark" ? "#2b2b2b" : "rgb(241 245 249 )"
  };
  border: 1px solid ${grey[300]};
  border-radius: 0.75em;
  color: ${"rgb(107 114 128)"};
  overflow: auto;
  outline: 0px;
  `
);

const StyledOption = styled(OptionUnstyled)(
  ({ theme }) => `
  list-style: none;
  padding: 8px 12px;
  border-radius: 0.45em;
  cursor: default;


  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.highlighted} {
    background-color: ${theme.palette.mode === "dark" ? "#454545" : "white"};
    color: ${theme.palette.mode === "dark" ? "#deecfc" : "black"};
  }

  &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === "dark" ? "#454545" : "white"};
    color: background-color: ${
      theme.palette.mode === "dark" ? "#DEECFC" : "black"
    };
  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
    cursor: pointer;
  }
  `
);

const StyledPopper = styled(PopperUnstyled)`
  z-index: 1;
`;

function CustomSelect(props: SelectUnstyledProps<any>) {
  const components: SelectUnstyledProps<any>["components"] = {
    Root: StyledButton,
    Listbox: StyledListbox,
    Popper: StyledPopper,
    ...props.components,
  };

  return <SelectUnstyled {...props} components={components} />;
}

export { CustomSelect, StyledOption };
