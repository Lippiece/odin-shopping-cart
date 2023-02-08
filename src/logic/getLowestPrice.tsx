import products from "../data/items.json";
import getHighestPrice from "./getHighestPrice";

const getLowestPrice = () =>
  products.reduce(
    (accumulator: number, product) =>
      (product.price < accumulator ? product.price : accumulator),
    getHighestPrice()
  );

export default getLowestPrice;
