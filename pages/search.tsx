import Head from "next/head";
import React, { ReactElement } from "react";
import DefaultDescription from "../components/Head/Description";
import DefaultKeywords from "../components/Head/Keywords";
import SearchMain from "../components/Search/SearchMain";
import BrowseLayout from "../layouts/BrowseLayout";

function Search() {
  return (
    <>
      <Head>
        <title>vGhostity | Search</title>
      </Head>
      <DefaultKeywords />
      <DefaultDescription />
      <SearchMain />
    </>
  );
}

Search.getLayout = function getLayout(page: ReactElement) {
  return <BrowseLayout>{page}</BrowseLayout>;
};

export default Search;
