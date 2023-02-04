import { useEffect, useState } from "react";

import Product from "../@types/Product";
import { useCart, useCartDispatch } from "../context/CartContext";

const Cart = () => {
  const cart                = useCart();
  const [ total, setTotal ] = useState(0);
  const dispatch            = useCartDispatch();

  useEffect(() => {
    cart?.length > 0 &&
      setTotal(cart.reduce((accumulator, item) => accumulator + item.price, 0));
  }, [ cart ]);

  return (
    <>
      <h2>Cart</h2>
      <ul>
        {cart?.length > 0 &&
          cart.map((product: Product) => (
            <li key={product.id}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>{product.price}</p>
              <button
                type="button"
                onClick={() =>
                  dispatch({ payload: product, type: "removed an item" })
                }
              >
                Remove
              </button>
            </li>
          ))}
      </ul>
      <p>Total: {total}</p>
    </>
  );
};

export default Cart;
