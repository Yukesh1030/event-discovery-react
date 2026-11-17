
import EventHero from "../components/EventHero";
import CategorySection from "../components/CategorySection";

import "./Home.css";

function Home() {
  return (
    <main className="home-page">
      <EventHero />

      <CategorySection />
    </main>
  );
}

export default Home;
