import Product from "../@types/Product";

const filterByPrice = (price: number[]) => (product: Product) =>
    product.price >= price[ 0 ] && product.price <= price[ 1 ];

export default filterByPrice;
