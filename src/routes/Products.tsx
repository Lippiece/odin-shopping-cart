import { Outlet } from "react-router-dom";
import Items from "../components/Items";

const Products = () => {
  return (
    <>
      <Outlet />
      <h1>Products</h1>
      <Items random={false} />
    </>
  );
};

export default Products;
