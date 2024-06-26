import { Header } from "@/components";
import { Hero, Highlights, Model } from "../components";

const Home = () => {
  return (
    <main className="bg-black">
      <Header />
      <Hero />
      <Highlights />
      <Model />
    </main>
  );
};

export default Home;
