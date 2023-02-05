import "./css/App.css";

import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import Footer from "./components/Footer";
import Nav from "./components/Nav";
import { useCart, useCartDispatch } from "./context/CartContext";

const App = () => {
  const cart     = useCart();
  const dispatch = useCartDispatch();

  useEffect(() => {
    const local = localStorage.getItem("cart");
    if (local) {
      dispatch({
        payload: new Set(JSON.parse(local)),
        type   : "retrieve local data",
      });
    }
  }, []);

  useEffect(() => {
    dispatch({ type: "store data locally" });
  }, [ cart ]);

  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
};

export default App;
