import "../css/Nav.css";

import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <Link to="/odin-shopping-cart">
        <LocalShippingIcon fontSize="large" />
        <p>CompanyName</p>
      </Link>
      <ul>
        <li>
          <Button
            variant="text"
            color="inherit"
            component={Link}
            to="/odin-shopping-cart/products"
          >
            Products
          </Button>
        </li>
        <li>
          <Button
            variant="text"
            color="inherit"
            component={Link}
            to="/odin-shopping-cart/cart"
          >
            Cart
          </Button>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
