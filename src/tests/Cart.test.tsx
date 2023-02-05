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
                product: {
                  description: "Test description",
                  id         : 1,
                  name       : "Test item",
                  price      : 963,
                },
                quantity: 1,
              },
              type: "added",
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
);

describe("Cart", () => {
  beforeEach(() => {
    localStorage.clear();
  });
  test("can add items to the cart", async () => {
    render(
      <CartProvider>
        <MockedRouter />
      </CartProvider>
    );
    userEvent.setup();

    userEvent.click(screen.getByRole("button", { name: /add to cart/iu }));
    userEvent.click(screen.getByRole("link", { name: "Cart" }));

    expect(await screen.findByText(/Test item/iu));
  });

  test("can remove items from the cart", async () => {
    render(
      <CartProvider>
        <MockedRouter />
      </CartProvider>
    );
    userEvent.setup();

    userEvent.click(screen.getByRole("button", { name: /add/iu }));
    userEvent.click(screen.getByText("Cart"));
    expect(await screen.findByText(/Test item/iu));
    userEvent.click(await screen.findByRole("button", { name: /remove/iu }));

    await waitFor(() => expect(screen.queryByText(/Test item/iu)).toBeNull());
  });

  describe("quantity", () => {
    test("adding the same item twice increases the quantity", async () => {
      render(
        <CartProvider>
          <MockedRouter />
        </CartProvider>
      );
      userEvent.setup();

      userEvent.click(screen.getByRole("button", { name: /add/iu }));
      userEvent.click(screen.getByRole("button", { name: /add/iu }));
      userEvent.click(screen.getByText("Cart"));

      expect(await screen.findByText(/Test item - 2/iu));
    });

    test("can increase and decrease quantity", async () => {
      render(
        <CartProvider>
          <MockedRouter />
        </CartProvider>
      );
      userEvent.setup();

      userEvent.click(screen.getByRole("button", { name: /add/iu }));
      userEvent.click(screen.getByText("Cart"));
      expect(await screen.findByText(/Test item/iu));
      userEvent.click(screen.getByRole("button", { name: /\+/u }));

      expect(await screen.findByText(/Test item - 2/iu));

      userEvent.click(screen.getByRole("button", { name: /-/u }));

      expect(await screen.findByText(/Test item/iu));
    });

    test("remove item when quantity is 0", async () => {
      render(
        <CartProvider>
          <MockedRouter />
        </CartProvider>
      );
      userEvent.setup();

      userEvent.click(screen.getByRole("button", { name: /add/iu }));
      userEvent.click(screen.getByText("Cart"));
      expect(await screen.findByText(/Test item/iu));

      userEvent.click(screen.getByRole("button", { name: /-/u }));

      await waitFor(() => expect(screen.queryByText(/Test item/iu)).toBeNull());
    });
  });

  test("items save to local storage", async () => {});
});
