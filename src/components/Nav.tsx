import "../css/Nav.css";

import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav>
      <Link to="/">
        <h1>Logo</h1>
      </Link>
      <ul>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
