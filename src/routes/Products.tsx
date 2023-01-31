import { Link, Outlet } from "react-router-dom";
import products from "../data/items.json";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const Products = () => {
  return (
    <>
      <Outlet />
      <h1>Products</h1>
      <List>
        {products.map((product: any) => (
          <Link
            to={`/odin-shopping-cart/products/${product.id}`}
            key={product.id}
          >
            <ListItem>
              <ListItemText
                primary={product.name}
                secondary={product.description}
              />
            </ListItem>
          </Link>
        ))}
      </List>
    </>
  );
};

export default Products;
