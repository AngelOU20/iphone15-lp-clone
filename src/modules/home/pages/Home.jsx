import { Header } from "@/components";
import { Features, Hero, Highlights, Model } from "../components";

const Home = () => {
  return (
    <main className="bg-black">
      <Header />
      <Hero />
      <Highlights />
      <Model />
      <Features />
    </main>
  );
};

export default Home;
