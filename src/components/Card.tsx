import { useCartDispatch } from "../context/CartContext";

interface Props {
  item: any;
}

const Card: React.FC<Props> = ({ item }) => {
  const dispatch = useCartDispatch();
  return (
    <>
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <button
        type="button"
        onClick={() => dispatch({ payload: item, type: "added" })}
      >
        Add to cart
      </button>
    </>
  );
};

export default Card;
