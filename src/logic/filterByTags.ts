import Product from "../@types/Product";

const filterByTags = (tags: Set<string>) => (product: Product) =>
  [...tags].some(tag => product.tags.includes(tag));

export default filterByTags;
