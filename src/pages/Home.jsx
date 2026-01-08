import Header from "../components/Header";
import Hero from "../components/Hero";
import TeamsScroll from "../components/TeamsScroll";
import Stats from "../components/Stats";
import Events from "../components/Events";
import Programs from "../components/Programs";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <TeamsScroll />
      <Stats />
      <Events />
      <Programs />
    </div>
  );
};

export default Index;
