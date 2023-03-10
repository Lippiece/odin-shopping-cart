import { Button } from "@mui/material";
import { useEffect, useState } from "react";

import CartItem from "../@types/CartItem";
import { useCart, useCartDispatch } from "../context/CartContext";
import setMap from "../logic/setMap";

const Cart = () => {
  const cart                = useCart();
  const [ total, setTotal ] = useState<string>("0");
  const dispatch            = useCartDispatch();

  useEffect(() => {
    cart.size > 0 && setTotal(calculateTotal(cart));
  }, [ cart ]);

  const changeQuantity = (cartItem: CartItem, quantity: number) => () =>
    dispatch({
      payload: {
        ...cartItem,
        quantity: cartItem.quantity + quantity,
      },
      type: "change quantity",
    });

  return (
    <>
      <h2>Cart</h2>
      <ul>
        {cart.size > 0 &&
          setMap(cart, cartItem => (
            <li key={cartItem.product.id}>
              <h3>{`${cartItem.product.name} - ${cartItem.quantity}`}</h3>
              <Button
                type="button"
                onClick={changeQuantity(cartItem, 1)}
              >
                +
              </Button>
              <Button
                type="button"
                onClick={changeQuantity(cartItem, -1)}
              >
                -
              </Button>
              <p>{cartItem.product.description}</p>
              <p>{cartItem.product.price}</p>
              <Button
                type="button"
                onClick={() =>
                  dispatch({ payload: cartItem, type: "removed an item" })
                }
              >
                Remove
              </Button>
            </li>
          ))}
      </ul>
      <p>Total: {total}</p>
      <Button
        type="button"
        onClick={() => dispatch({ type: "cleared the cart" })}
      >
        Clear cart
      </Button>
    </>
  );
};

const calculateTotal = (cart: Set<CartItem>) =>
  [ ...cart ]
    .reduce(
      (accumulator, item) => accumulator + item.product.price * item.quantity,
      0
    )
    .toFixed(2);

export default Cart;
