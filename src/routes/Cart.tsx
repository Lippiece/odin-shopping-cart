import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import { useEffect, useState } from "react";

import Product from "../@types/Product";
import items from "../data/items.json";

const itemsTyped = items as Product[];

const Cart: React.FC<{ ids: number[] }> = ({ ids }) => {
  const [ currentItems, setCurrentItems ] = useState<Product[]>([]);
  useEffect(() => {
    setCurrentItems(getCurrentItems(ids));
  }, [ ids ]);
  return (
    <>
      <List>
        {currentItems.map(item => (
          <ListItem key={item.id}>
            <ListItemText
              primary={item.name}
              secondary={`$${item.price}`}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end">
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
        <ListItem>
          <ListItemText
            primary="Total"
            secondary={`$${calculateTotal(currentItems)}`}
          />
        </ListItem>
      </List>
    </>
  );
};

const calculateTotal = (products: Product[]) => {
  return products.reduce((total, product) => {
    return total + product.price;
  }, 0);
};

const getCurrentItems = (ids: number[]) =>
  itemsTyped.filter(item => ids.includes(item.id));

export default Cart;
