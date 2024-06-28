import { Header } from "@/components";
import { Features, Hero, Highlights, HowItWorks, Model } from "../components";

const Home = () => {
  return (
    <main className="bg-black">
      <Header />
      <Hero />
      <Highlights />
      <Model />
      <Features />
      <HowItWorks />
    </main>
  );
};

export default Home;
