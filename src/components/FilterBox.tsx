import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";

import getHighestPrice from "../logic/getHighestPrice";
import getLowestPrice from "../logic/getLowestPrice";
import listAllTags from "../logic/listAllTags";

const addTag    = (tag: string) => (tags: Set<string>) => {
  tags.add(tag);
  return tags;
};
const removeTag = (tag: string) => (tags: Set<string>) => {
  tags.delete(tag);
  return tags;
};

const Tag = ({
  tags,
  setTags,
  tag,
}: {
  tags: Set<string>;
  setTags: (tags: Set<string>) => any;
  tag: string;
}) => {
  const [ checked, setChecked ] = useState(tags.has(tag));

  useEffect(() => {
    setChecked(tags.has(tag));
  }, [ tags, tag ]);
  return (
    <Button
      color="inherit"
      variant={checked ? "outlined" : "text"}
      size="small"
    >
      <label htmlFor={tag}>
        {tag}
        <input
          hidden
          id={tag}
          type="checkbox"
          checked={checked}
          onChange={event => {
            setChecked(event.target.checked);
            return setTags(
              event.target.checked ? addTag(tag)(tags) : removeTag(tag)(tags)
            );
          }}
        />
      </label>
    </Button>
  );
};

const FilterBox = ({
  filters,
  setFilters,
  setPrice,
  setTags,
}: {
  filters: unknown;
  setFilters: unknown;
  setPrice: (range: number[]) => any;
  setTags: (tags: Set<string>) => any;
}) => {
  return (
    <Box
      sx={{
        bgcolor : "background.paper",
        maxWidth: 500,
        minWidth: 300,
        width   : "70vw",
      }}
      display={"flex"}
      flexDirection={"column"}
      padding={2}
      gap={2}
    >
      <Box
        flex={1}
        flexDirection={"row"}
        gap={1}
      >
        <TextField
          type="number"
          value={Number(filters.price[ 0 ])}
          onChange={event =>
            setPrice([ Number(event.currentTarget.value), filters.price[ 1 ] ])
          }
        />
        <Slider
          min={getLowestPrice()}
          max={getHighestPrice()}
          value={filters.price}
          onChange={(_, value) => setPrice(value as number[])}
        />
        <TextField
          type="number"
          value={Number(filters.price[ 1 ])}
          onChange={event =>
            setPrice([ filters.price[ 0 ], Number(event.target.value) ])
          }
        />
      </Box>
      <Grid container>
        {[ ...listAllTags() ].map(tag => (
          <Tag
            tag={tag}
            key={tag}
            tags={filters.tags}
            setTags={setTags}
          />
        ))}
        <Button
          variant="outlined"
          size="small"
          onClick={() =>
            ([ ...filters.tags ].length > 0
              ? setTags(new Set())
              : setTags(listAllTags()))
          }
        >
          {[ ...filters.tags ].length > 0 ? "Clear" : "All"}
        </Button>
      </Grid>
      <TextField
        type="search"
        value={filters.search}
        label="Search for products"
        onChange={event =>
          setFilters({ ...filters, search: event.target.value })
        }
      />
    </Box>
  );
};

export default FilterBox;
