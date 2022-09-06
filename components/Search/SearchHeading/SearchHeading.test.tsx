import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import SearchHeading from "./SearchHeading";

describe("SearchHeading", () => {
  const setup = (customProps?: {}) => {
    const refetch = jest.fn();
    const handleExpand = jest.fn();
    const handleCollapse = jest.fn();

    const props = {
      heading: "Test",
      total: 0,
      more: false,
      expand: false,
      ...customProps,
    };

    const searchHeading = render(
      <SearchHeading
        heading={props.heading}
        total={props.total}
        more={props.more}
        expand={props.expand}
        refetch={refetch}
        handleExpand={handleExpand}
        handleCollapse={handleCollapse}
      />
    );

    screen.debug()

    return {...searchHeading, refetch, handleExpand, handleCollapse}
  };

  it("Component renders", () => {
    const {queryByText} = setup()
    expect(queryByText("Test")).not.toBeNull()
  })

  it("Displays total results", () => {
    const {queryByText} = setup({total: 4})
    expect(queryByText("4 results")).not.toBeNull()
  })

  it("View more button appears and works", () => {
    const {getByText, handleExpand, refetch} = setup({more: true})
    const moreButton = getByText("view more");
    expect(moreButton).toBeInTheDocument()

    fireEvent.click(moreButton)
    expect(handleExpand).toHaveBeenCalled()
    expect(refetch).toHaveBeenCalled();
  })

  it("Back button appears and works", () => {
    const {getByText, handleCollapse} = setup({expand: true})
    const backButton = getByText("back")
    expect(backButton).toBeInTheDocument()

    fireEvent.click(backButton)
    expect(handleCollapse).toHaveBeenCalled()
  })
});
