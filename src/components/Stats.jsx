import { Button } from "../components/Button";
import runnerVictory from "../assets/runner-victory.jpg";
import groupRun from "../assets/group-run.jpg";
import { CheckCircle } from "lucide-react";
import ScrollAnimation from "./ScrollAnimation";
import { StaggerContainer, StaggerItem } from "./StaggerAnimation";

const Stats = () => {
  const stats = [
    { number: "85+", title: "COMMUNITY EVENTS", description: "Fusce gravida purus etilamu quam viverra, vel aliquam arcumeris porttitor." },
    { number: "98%", title: "MEMBER COMPLETION RATE", description: "Fusce gravida purus etilamu quam viverra, vel aliquam arcumeris porttitor." },
    { number: "320+", title: "PERSONAL BESTS ACHIEVED", description: "Fusce gravida purus etilamu quam viverra, vel aliquam arcumeris porttitor." },
  ];

  const features = [
    "Weekly Community Runs",
    "Personalized Training Support",
    "Open to All Ages & Skill Levels",
  ];

  return (
    <section className="py-20 bg-background" id="about">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Stats Header */}
        <ScrollAnimation>
          <div className="mb-16">
            <Button variant="tagGreen" size="tag" className="mb-6">
              ~ RUNMATE IN NUMBERS ~
            </Button>
            <p className="text-lg text-foreground max-w-3xl">
              Every number tells a story of persistence, performance, and progress. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
            </p>
          </div>
        </ScrollAnimation>

        {/* Stats Grid */}
        <StaggerContainer className="grid md:grid-cols-3 gap-6 mb-20">
          {stats.map((stat, i) => (
            <StaggerItem key={i}>
              <div className="bg-card rounded-2xl p-8 border border-border h-full">
                <span className="font-display text-5xl text-foreground">{stat.number}</span>
                <h3 className="font-display text-lg text-foreground tracking-wider mt-2 mb-4">{stat.title}</h3>
                <p className="text-muted-foreground text-sm">{stat.description}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* About Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Images */}
          <ScrollAnimation direction="left">
            <div className="flex gap-4">
              <div className="flex-1">
                <img
                  src={runnerVictory}
                  alt="Runner celebrating"
                  className="w-full h-80 object-cover rounded-2xl"
                />
              </div>
              <div className="flex-1 pt-12">
                <img
                  src={groupRun}
                  alt="Group running"
                  className="w-full h-80 object-cover rounded-2xl"
                />
              </div>
            </div>
          </ScrollAnimation>

          {/* Content */}
          <ScrollAnimation direction="right" delay={0.2}>
            <div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 italic">
                STRONGER WITH EVERY STRIDE.
              </h2>
              <p className="text-muted-foreground mb-8">
                Runmate is more than just a running club—it's a thriving, inclusive community where runners of all levels come together to train, race, and grow. Founded in 2018, we've helped over 1,200 runners across 12 cities reach their goals—whether it's a couch-to-5K transformation or a Boston-qualifier dream.
              </p>

              {/* Features */}
              <div className="space-y-3 mb-8">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 bg-card rounded-full px-5 py-3 w-fit border border-border">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-foreground font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <Button variant="heroDark" size="lg">
                ABOUT US
              </Button>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default Stats;
