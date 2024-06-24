import { Header } from "@/components/Header.jsx";
import { Hero, Highlights } from "../components";

const Home = () => {
  return (
    <main className="bg-black">
      <Header />
      <Hero />
      <Highlights />
    </main>
  );
};

export default Home;
