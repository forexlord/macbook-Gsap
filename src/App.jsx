import Hero from "./components/Hero";
import ProductViewer from "./components/ProductViewer";
import Navbar from "./components/Navbar";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Showcase from "./components/Showcase";
import Performance from "./components/performance";
import Features from "./components/features";
import Highlights from "./components/Highlights";
import Footer from "./components/Footer";
gsap.registerPlugin(ScrollTrigger);

function App() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ProductViewer />
      <Showcase />
      <Performance />
      <Features />
      <Highlights />
      <Footer />
    </main>
  );
}
export default App;
