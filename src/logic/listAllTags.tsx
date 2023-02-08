import products from "../data/items.json";

const listAllTags = () =>
  new Set(
    products.reduce(
      (accumulator: string[], product) => [ ...accumulator, ...product.tags ],
      []
    )
  );

export default listAllTags;
