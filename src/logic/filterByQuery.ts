import Product from "../@types/Product";

const filterByQuery = (query: string) => (product: Product) =>
  query.length > 0
    ? product.name.toLowerCase().includes(query.toLowerCase())
    : true;

export default filterByQuery;
