import { render, screen } from "@testing-library/react";

import products from "../data/items.json";
import Cart from "../routes/Cart";

describe("Cart", () => {
  test("should display products by given ids", () => {
    const toDisplay = [ 1, 2, 3 ];
    render(<Cart ids={toDisplay} />);

    const names = products
      .slice(0, toDisplay.length)
      .map(product => product.name);
    names.map(name => expect(screen.getByText(name)));
  });
});
