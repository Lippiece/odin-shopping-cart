/* eslint-disable fp/no-unused-expression */
/* eslint-disable fp/no-nil */
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import products from "../data/items.json";
import Cart from "../routes/Cart";

describe("Cart", () => {
  test("should display products by given ids", () => {
    const toDisplay = [ 1, 2, 3 ];
    render(<Cart ids={toDisplay} />);

    products
      .slice(0, toDisplay.length)
      .map(product => product.name)
      .map(name => expect(screen.getByText(name)));
  });

  test("should remove product from cart when clicked on a bin", async () => {
    const toDisplay = [ 1, 2, 3 ];
    render(<Cart ids={toDisplay} />);

    const bin = screen.getByTestId("bin-1");
    userEvent.click(bin);

    const removedProductName = products.find(product => product.id === 1)?.name;
    await waitFor(() =>
      expect(screen.queryByText(removedProductName)).toBeNull()
    );
  });
});
