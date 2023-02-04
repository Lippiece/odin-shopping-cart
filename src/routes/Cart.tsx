import { useEffect, useState } from "react";

import Product from "../@types/Product";
import productsJSON from "../data/items.json";

const products: Product[] = productsJSON;

const Cart: React.FC<{ ids: number[] }> = ({ ids }) => {
  const [ productsData, setProductsData ] = useState<Product[]>([]);

  useEffect(() => {
    const retrievedProductsData = products.filter(product =>
      ids.includes(product.id)
    );
    setProductsData(retrievedProductsData);
  }, [ ids ]);

  const [ cart, setCart ] = useState(ids);

  return (
    <ul>
      {productsData
        .filter(product => cart.includes(product.id))
        .map(product => {
          const { name, description, id } = product;

          return (
            <li key={id}>
              <h3>{name}</h3>
              <p>{description}</p>
              <button
                data-testid={`bin-${id}`}
                onClick={() => setCart(cart.filter(cartId => cartId !== id))}
              >
                Remove
              </button>
            </li>
          );
        })}
    </ul>
  );
};

export default Cart;
