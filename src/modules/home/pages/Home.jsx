import { Header, Footer } from "@/components";
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
      <Footer />
    </main>
  );
};

export default Home;
