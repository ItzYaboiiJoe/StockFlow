import HomeBody from "./HomeBody";
import HomeNavbar from "./HomeNavbar";

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <HomeNavbar />
      <HomeBody />
    </div>
  );
};

export default Home;
