import Add from "@mui/icons-material/Add";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";

import Product from "../@types/Product";
import products from "../data/items.json";

const Item = ({ product }: { product: Product }) => {
  return (
    <ListItem>
      <ListItemButton
        component={Link}
        to={`/odin-shopping-cart/products/${product.id}`}
      >
        <ListItemText
          primary={product.name}
          secondary={product.description}
        />
        <ListItemButton>
          <ListItemIcon>
            <Add />
          </ListItemIcon>
        </ListItemButton>
      </ListItemButton>
    </ListItem>
  );
};

interface ItemsProps {
  random: boolean;
}

const Items: React.FC<ItemsProps> = ({ random }) => {
  return (
    <List>
      {random ? getRandomItems(3).map(displayItem) : products.map(displayItem)}
    </List>
  );
};
const getRandomItems              = (count: number) =>
  [ ...products ].sort(() => Math.random() - 0.5).slice(0, count);

const displayItem = (product: any) => (
  <Item
    product={product}
    key={product.id}
  />
);

export default Items;
