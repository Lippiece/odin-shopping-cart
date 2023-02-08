/* eslint-disable fp/no-unused-expression */
/* eslint-disable fp/no-nil */
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  tags: string[];
}
const products: Product[] = [
  {
    id   : 1,
    name : "Product 1",
    price: 100,
    tags : [ "tag1" ],
  },
  {
    id   : 2,
    name : "Product 2",
    price: 300,
    tags : [ "tag2" ],
  },
  {
    id   : 3,
    name : "Product 3",
    price: 500,
    tags : [ "tag3" ],
  },
  {
    id   : 4,
    name : "Product 4",
    price: 700,
    tags : [ "tag1", "tag3" ],
  },
];

const listAllTags = () =>
  new Set(
    products.reduce(
      (accumulator: string[], product) => [ ...accumulator, ...product.tags ],
      []
    )
  );
const addTag      = (tag: string) => (tags: Set<string>) => {
  tags.add(tag);
  return tags;
};
const removeTag   = (tag: string) => (tags: Set<string>) => {
  tags.delete(tag);
  return tags;
};

const Tag = ({
  tags,
  setTags,
  tag,
}: {
  tags: Set<string>;
  setTags: (tags: Set<string>) => any;
  tag: string;
}) => {
  return (
    <input
      data-testid={tag}
      type="checkbox"
      checked={tags.has(tag)}
      onChange={event => {
        console.log(
          `Clicked ${tag}`,
          `checked: ${event.target.checked}`,
          `Active tags: ${[ ...tags ].join(", ")}`
        );
        return setTags(
          event.target.checked ? addTag(tag)(tags) : removeTag(tag)(tags)
        );
      }}
    />
  );
};

const Items = () => {
  const [ filters, setFilters ]                   = useState({
    price: [ 0, 1000 ],
    tags : listAllTags(),
  });
  const [ filteredProducts, setFilteredProducts ] = useState(products);

  const setPrice = (range: number[]) =>
    setFilters({ ...filters, price: range });
  const setTags  = (tags: Set<string>) => setFilters({ ...filters, tags });

  const renderProduct = (product: Product): JSX.Element => (
    <li key={product.id}>
      <p>
        {product.name} -- {product.price}
      </p>
      <p>{product.tags.join(", ")}</p>
    </li>
  );

  const filterByPrice = (price: number[]) => (product: Product) =>
    product.price >= price[ 0 ] && product.price <= price[ 1 ];
  const filterByTags  = (tags: Set<string>) => (product: Product) =>
    [ ...tags ].some(tag => product.tags.includes(tag));

  useEffect(() => {
    setFilteredProducts(
      products
        .filter(filterByPrice(filters.price))
        .filter(filterByTags(filters.tags))
    );
  }, [ filters ]);

  return (
    <>
      <input
        type="number"
        data-testid="priceMin"
        value={Number(filters.price[ 0 ])}
        onChange={event =>
          setPrice([ Number(event.currentTarget.value), filters.price[ 1 ] ])
        }
      />
      <input
        type="number"
        data-testid="priceMax"
        value={Number(filters.price[ 1 ])}
        onChange={event =>
          setPrice([ filters.price[ 0 ], Number(event.target.value) ])
        }
      />
      {[ ...listAllTags() ].map(tag => (
        <Tag
          tag={tag}
          key={tag}
          tags={filters.tags}
          setTags={setTags}
        />
      ))}
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

  test("can filter products by tags", async () => {
    render(<Items />);
    const user = userEvent.setup({ delay: 100 });
    const tag1 = screen.getByTestId("tag1");
    const tag3 = screen.getByTestId("tag3");

    await user.click(tag1);
    await waitFor(() => {
      expect(tag1.checked).toBeFalsy();
    });
    await user.click(tag3);
    await waitFor(() => {
      expect(tag3.checked).toBeFalsy();
    });

    await waitFor(() => {
      expect(screen.queryByText(/Product 1/iu)).toBeNull();
    });
    expect(screen.getByText(/Product 2/iu));
    expect(screen.queryByText(/Product 3/iu)).toBeNull();
    expect(screen.queryByText(/Product 4/iu)).toBeNull();
  });
});
