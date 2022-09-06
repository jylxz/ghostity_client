import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  const setup = (compact = false, loading = false, width = undefined) => {
    const setInput = jest.fn();

    const searchBar = render(
      <SearchBar
        input={""}
        setInput={setInput}
        compact={compact}
        loading={loading}
        width={width}
      />
    );

    const inputField = searchBar.getByRole("textbox");

    return { inputField, ...searchBar, setInput };
  };

  it("Component renders", () => {
    const { getByRole } = setup();
    expect(getByRole("textbox")).toBeInTheDocument();
  });

  it("Component will compact", async () => {
    const { queryByText } = setup(true);

    expect(queryByText("Search vGhostity")).toBeNull();
  });

  it("Clear field button works", async () => {
    const { getByRole, setInput } = setup(true);
    const clearButton = getByRole("button");

    expect(clearButton).toBeInTheDocument();
    fireEvent.click(clearButton);
    expect(setInput).toHaveBeenCalledWith("");
  });

  it("Progress circle appears when loading", () => {
    const {getByRole} = setup(true, true)

    expect(getByRole("progressbar")).toBeInTheDocument()
  })
});
