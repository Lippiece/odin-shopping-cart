import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";

import products from "../data/items.json";
import { Link } from "react-router-dom";

interface Props {
  count: number;
}

const Items: React.FC<Props> = ({ count }) => {
  return (
    <List>
      {products.slice(0, count).map((product: any) => (
        <ListItem key={product.id}>
          <ListItemButton
            component={Link}
            to={`/odin-shopping-cart/products/${product.id}`}
          >
            <ListItemText
              primary={product.name}
              secondary={product.description}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default Items;
