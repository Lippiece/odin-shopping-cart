interface Props {
  item: any;
}

const Card: React.FC<Props> = ({ item }) => (
  <>
    <h3>{item.name}</h3>
    <p>This is a component specifically for {item.name}</p>
    <p>{item.description}</p>
  </>
);

export default Card;
