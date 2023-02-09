import Add from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { maxWidth } from "@mui/system";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Product from "../@types/Product";
import { useCart, useCartDispatch } from "../context/CartContext";
import products from "../data/items.json";
import { filterByDelivery } from "../logic/filterByDelivery";
import filterByPrice from "../logic/filterByPrice";
import filterByQuery from "../logic/filterByQuery";
import filterByTags from "../logic/filterByTags";
import getHighestPrice from "../logic/getHighestPrice";
import getLowestPrice from "../logic/getLowestPrice";
import listAllTags from "../logic/listAllTags";
import FilterBox from "./FilterBox";

interface ItemsProps {
  random: boolean;
}
const Items: React.FC<ItemsProps> = ({ random }) => {
  const cart                                      = useCart();
  const [ filters, setFilters ]                   = useState({
    daysTillDelivery: 0,
    price           : [ getLowestPrice(), getHighestPrice() ],
    search          : "",
    tags            : listAllTags(),
  });
  const [ filteredProducts, setFilteredProducts ] = useState(products);

  const setPrice = (range: number[]) =>
    setFilters({ ...filters, price: range });
  const setTags  = (tags: Set<string>) => setFilters({ ...filters, tags });

  const renderProduct = (product: Product): JSX.Element => (
    <ListItem key={product.id}>
      <ListItemButton
        component={Link}
        to={`/odin-shopping-cart/products/${product.id}`}
      >
        <ListItemText
          primary={product.name}
          secondary={product.tags.join(", ")}
        />
        <ListItemText
          primary={product.deliveryDate.slice(5, product.deliveryDate.length)}
          secondary={"Delivery in"}
        />
        <ListItemText primary={product.price} />
      </ListItemButton>
    </ListItem>
  );

  useEffect(() => {
    setFilteredProducts(
      [ ...products ]
        .filter(filterByPrice(filters.price))
        .filter(filterByTags(filters.tags))
        .filter(filterByQuery(filters.search))
        .filter(filterByDelivery(filters.daysTillDelivery))
    );
  }, [ filters ]);

  return (
    <>
      {!random && (
        <FilterBox
          filters={filters}
          setFilters={setFilters}
          setPrice={setPrice}
          setTags={setTags}
        />
      )}
      <List sx={{ maxWidth: 500 }}>
        {random
          ? getRandomItems(3).map(renderProduct)
          : filteredProducts.map(renderProduct)}
      </List>
    </>
  );
};

const getRandomItems = (count: number) =>
  [ ...products ].sort(() => Math.random() - 0.5).slice(0, count);

export default Items;
