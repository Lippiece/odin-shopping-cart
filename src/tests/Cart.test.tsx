/* eslint-disable fp/no-unused-expression */
/* eslint-disable fp/no-nil */
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import App from "../App";
import { CartProvider, useCartDispatch } from "../context/CartContext";
import Cart from "../routes/Cart";

const Items = () => {
  const dispatch = useCartDispatch();
  return (
    <ul>
      <li>
        <h3>Product name</h3>
        <p>Product description</p>
        <button
          type="button"
          onClick={() =>
            dispatch({
              payload: {
                description: "Product description",
                id         : 1,
                name       : "Product name",
                price      : 1,
              },
              type: "added an item",
            })
          }
        >
          Add to cart
        </button>
      </li>
    </ul>
  );
};
vi.doMock("../components/Items.tsx", () => ({ default: Items }));

import Home from "../routes/Home"; // eslint-disable-line
import Products from "../routes/Products"; // eslint-disable-line

const MockedRouter = () => (
  <CartProvider>
    <MemoryRouter
      initialEntries={[
        "/odin-shopping-cart",
        "/odin-shopping-cart/products",
        "/odin-shopping-cart/cart",
        "/odin-shopping-cart/home",
      ]}
    >
      <Routes>
        <Route
          path="/odin-shopping-cart"
          element={<App />}
        >
          <Route
            path="/odin-shopping-cart/home"
            element={<Home />}
          />
          <Route
            path="/odin-shopping-cart/products"
            element={<Products />}
          />
          <Route
            path="/odin-shopping-cart/cart"
            element={<Cart />}
          />
        </Route>
      </Routes>
    </MemoryRouter>
  </CartProvider>
);

describe("Cart", () => {
  test("can add items to the cart", async () => {
    render(<MockedRouter />);
    userEvent.setup();

    // add a product to the cart
    userEvent.click(screen.getByRole("button", { name: /add/iu }));

    // navigate to the cart
    userEvent.click(screen.getByText("Cart"));

    // check that the product is in the cart
    expect(await screen.findByText(/product name/iu));
  });
});
