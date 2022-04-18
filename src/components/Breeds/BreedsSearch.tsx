import React, { useEffect, useState } from "react";
import { Grid } from "@adobe/react-spectrum";

import { filterBreeds } from "./helper/utils";
import TableView from "./TableView";
import SearchView from "./SearchView";

export enum Density {
  COMPACT = "compact",
  SPACIOUS = "spacious",
  REGULAR = "regular",
}

const BreedsList = ({ data }: ListProps) => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState("idle");
  const [idxBase, setIdxBase] = useState(0);
  const [filtered, setFiltered] = useState<object[]>([]);
  const [tableDensity, setTableDensity] = useState(Density.COMPACT);

  useEffect(() => {
    setTimeout(() => {
      setTableDensity(Density.SPACIOUS);
    }, 1000);
  });

  useEffect(() => {
    setLoading("loadingMore");
    setFiltered(filterBreeds(data, search));
    setIdxBase(search === "" ? 0:data.length);
    setTimeout(() => {
      setLoading("idle");
    }, 5000);
  }, [search, data]);

  return (
    <Grid
      areas={["header", "content"]}
      columns={["auto"]}
      rows={["size-1000", "auto"]}
    >
      <SearchView setSearch={setSearch} />
      <TableView 
        loading={loading}
        filtered={filtered}
        density={tableDensity}
        idxBase={idxBase}
      />
    </Grid>
  );
};

export default BreedsList;

interface ListProps {
  data: any
}
