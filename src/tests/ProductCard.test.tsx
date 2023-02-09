import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useEffect, useState } from "react";

import Product from "../@types/Product";
import { useCartDispatch } from "../context/CartContext";
import { Link } from "react-router-dom";

const product: Product = {
  deliveryDate: "2021-10-10",
  description : "Product 1 description",
  id          : 1,
  imageUrl    : "product1",
  name        : "Product 1",
  price       : 100,
  tags        : [ "tag1" ],
};

const ProductCard = () => {
  const dispatch = useCartDispatch();

  return (
    <>
    <Link to={`/odin-shopping-cart/products/${product.id}/confirm`}>
      <button
        onClick={() =>
          dispatch({ payload: { product, quantity: 1 }, type: "ADD_TO_CART" })
        }
      >
        Add to cart
      </button>
      <p>{product.name}</p>
    </>
  );
};

describe("ProductCard", () => {
  test("should display confirmation message when product is added to cart", async () => {
    render(<ProductCard />);
    const user = userEvent.setup();

    await user.click(screen.getByText("Add to cart"));

    expect(screen.getByText(/do you/iu));
  });
});
