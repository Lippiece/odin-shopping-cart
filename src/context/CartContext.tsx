import { createContext, useContext, useReducer } from "react";

import Product from "../@types/Product";

const CartContext = createContext(null);

const CartDispatchContext = createContext([]);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [ state, dispatch ] = useReducer(cartReducer, []);

  return (
    <CartContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
export const useCartDispatch = () => useContext(CartDispatchContext);

interface Action {
  type: string;
  payload: Product;
}
const switcher    = {
  added            : (state: Product[], action: Action) => [ ...state, action.payload ],
  cleared          : () => [],
  "removed an item": (state: Product[], action: Action) =>
    state.filter(item => item.id !== action.payload.id),
};
const cartReducer = (state: Product[], action: Action) =>
  switcher?.[ action.type ]?.(state, action) || new Error("Invalid action type");
