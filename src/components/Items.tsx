import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

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
          <Link to={`/odin-shopping-cart/products/${product.id}`}>
            <ListItemText
              primary={product.name}
              secondary={product.description}
            />
          </Link>
        </ListItem>
      ))}
    </List>
  );
};

export default Items;
