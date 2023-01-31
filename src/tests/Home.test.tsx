/* eslint-disable fp/no-unused-expression */
/* eslint-disable fp/no-nil */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Link, MemoryRouter, Route, Routes } from "react-router-dom";

import products from "../data/items.json";

interface Props {
  count: number;
}

const MockedItems: React.FC<Props> = ({ count }) => {
  return (
    <ul data-testid="links">
      {products.slice(0, count).map((product: any) => (
        <Link
          to={`/products/${product.id}`}
          key={product.id}
          data-testid="link"
        >
          <li>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
          </li>
        </Link>
      ))}
    </ul>
  );
};
const MockedProductCard: React.FC  = () => (
  <div data-testid="product-card">
    <h3>Product name</h3>
    <p>Product description</p>
  </div>
);
vi.doMock("../components/Items.tsx", () => ({ default: MockedItems }));

import Home from "../routes/Home"; // eslint-disable-line

const MockedRouter: React.FC = () => (
  <MemoryRouter initialEntries={[ "/products/1", "/home" ]}>
    <Routes>
      <Route
        path="/home"
        element={<Home />}
      />
      <Route
        path="/products/:id"
        element={<MockedProductCard />}
      />
    </Routes>
  </MemoryRouter>
);

describe("Home", () => {
  test("has links that lead to the products", async () => {
    render(<MockedRouter />);
    const user = userEvent.setup();

    user.click(screen.getAllByTestId("link")[ 0 ]);

    expect(await screen.findByTestId("product-card"));
  });
});
