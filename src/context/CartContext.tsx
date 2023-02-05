import { createContext, Dispatch, useContext, useReducer } from "react";

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

const increasedQuantity = (state: Set<CartItem>) =>
  setMap(state, item => ({ ...item, quantity: item.quantity + 1 }));

const handleCartAdd = (state: Set<CartItem>, action: Action) => {
  const { product, quantity } = action.payload;
  const existingProduct       = [ ...state ].find(
    item => item.product.id === product.id
  );

  return existingProduct
    ? increasedQuantity(state)
    : new Set([ ...state, action.payload ]);
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
  "retrieve local data": (_state: Set<CartItem>, action: Action) =>
    action.payload,
  "store data locally": (state: Set<CartItem>) => {
    localStorage.setItem("cart", JSON.stringify([ ...state ]));
    return state;
  },
};
const cartReducer = (state: Set<CartItem>, action: Action) =>
  (switcher[ action.type ] || switcher.default)(state, action);

export const useCart = () => useContext(CartContext);
export const useCartDispatch = () => useContext(CartDispatchContext);
