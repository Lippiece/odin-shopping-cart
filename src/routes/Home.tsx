import "../css/Home.css";
import Items from "../components/Items";

const Home = () => {
  return (
    <div className="home">
      <h1>Home</h1>
      <p>Welcome to the home page!</p>
      <h2>Random picks:</h2>
      <Items random={true} />
    </div>
  );
};

export default Home;
