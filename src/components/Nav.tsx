import "../css/Nav.css";

import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <Link to="/odin-shopping-cart">
        <h1>Logo</h1>
      </Link>
      <ul>
        <li>
          <Link to="/odin-shopping-cart/products">Products</Link>
        </li>
        <li>
          <Link to="/odin-shopping-cart/cart">Cart</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
