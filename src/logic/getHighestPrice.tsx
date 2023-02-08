import products from "../data/items.json";

const getHighestPrice = () => products.reduce(
  ( accumulator: number, product ) => ( product.price > accumulator ? product.price : accumulator ),
  0
);

export default getHighestPrice;
