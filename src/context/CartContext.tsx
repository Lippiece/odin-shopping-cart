import { createContext, Dispatch, useContext, useReducer } from "react";
import { h } from "vitest/dist/index-761e769b";

import CartItem from "../@types/CartItem";
import setMap from "../logic/setMap";

interface Action {
  type: string;
  payload: CartItem;
}

const CartContext = createContext<Set<CartItem>>(new Set<CartItem>());

const CartDispatchContext = createContext<Dispatch<Action>>(() => {});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [ state, dispatch ] = useReducer(cartReducer, new Set<CartItem>());

  return (
    <CartContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
};

const safeAdd = (maybeNumber: number | undefined, number: number) =>
  (maybeNumber ? maybeNumber + number : number);

const handleCartAdd = (state: Set<CartItem>, action: Action) => {
  const { product, quantity } = action.payload;

  const increasedQuantity = setMap(state, (item: CartItem) =>
    (item.product.id === product.id
      ? { ...item, quantity: safeAdd(item.quantity, quantity) }
      : item)
  );

  const added = increasedQuantity.add(action.payload);

  return added;
};

const handleQuantity = (state: Set<CartItem>, action: Action) => {
  const { product, quantity } = action.payload;

  const filtered = [ ...state ]
    .map(item =>
      (item.product.id === product.id ? { ...item, quantity } : item)
    )
    .filter(item => item.quantity > 0);

  return new Set(filtered);
};

const switcher    = {
  added            : handleCartAdd,
  "change quantity": handleQuantity,
  cleared          : () => new Set<CartItem>(),
  default          : () => console.error("Invalid action type"),
  "removed an item": (state: Set<CartItem>, action: Action) =>
    state.delete(action.payload),
};
const cartReducer = (state: Set<CartItem>, action: Action) =>
  (switcher[ action.type ] || switcher.default)(state, action);

export const useCart = () => useContext(CartContext);
export const useCartDispatch = () => useContext(CartDispatchContext);
