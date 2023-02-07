/* eslint-disable fp/no-unused-expression */
/* eslint-disable fp/no-nil */
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
}
const products = [
  {
    id   : 1,
    name : "Product 1",
    price: 100,
  },
  {
    id   : 2,
    name : "Product 2",
    price: 300,
  },
  {
    id   : 3,
    name : "Product 3",
    price: 500,
  },
  {
    id   : 4,
    name : "Product 4",
    price: 700,
  },
];

const Items = () => {
  const [ filters, setFilters ]                   = useState({
    price: [ 0, 1000 ],
  });
  const [ filteredProducts, setFilteredProducts ] = useState(products);
  const setPrice                                  = (range: number[]) =>
    setFilters({ ...filters, price: range });

  const renderProduct = (product: {
    id: number;
    name: string;
    price: number;
  }): JSX.Element => (
    <li key={product.id}>
      {product.name} -- {product.price}
    </li>
  );

  const filterByPrice = (price: number[]) => (product: Product) =>
    product.price >= price[ 0 ] && product.price <= price[ 1 ];

  useEffect(() => {
    setFilteredProducts(products.filter(filterByPrice(filters.price)));
  }, [ filters ]);

  return (
    <>
      <input
        type="number"
        data-testid="priceMin"
        value={Number(filters.price[ 0 ])}
        onChange={event => {
          debugger;
          console.log(event.currentTarget.value);
          return setPrice([
            Number(event.currentTarget.value),
            filters.price[ 1 ],
          ]);
        }}
      />
      <input
        type="number"
        data-testid="priceMax"
        value={Number(filters.price[ 1 ])}
        onChange={event =>
          setPrice([ filters.price[ 0 ], Number(event.target.value) ])
        }
      />
      <ul>{filteredProducts.map(renderProduct)}</ul>
    </>
  );
};

describe("Products", () => {
  test("can filter products by price", async () => {
    render(<Items />);
    const user = userEvent.setup();
    const min  = screen.getByTestId("priceMin");
    const max  = screen.getByTestId("priceMax");

    await user.clear(min);
    await user.type(min, "200");

    await user.clear(max);
    await user.type(max, "400");

    expect(screen.queryByText(/Product 1/iu)).toBeNull();
    expect(screen.getByText(/Product 2/iu));
    expect(screen.queryByText(/Product 3/iu)).toBeNull();
    expect(screen.queryByText(/Product 4/iu)).toBeNull();
  });
});
