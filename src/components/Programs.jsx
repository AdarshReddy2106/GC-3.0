import { Button } from "../components/Button";
import coachFemale from "../assets/coach-female.jpg";
import trailRun from "../assets/trail-run.jpg";
import groupRun from "../assets/group-run.jpg";
import athleteAction from "../assets/athlete-action.jpg";
import ScrollAnimation from "./ScrollAnimation";

const Programs = () => {
  const smallPrograms = [
    {
      title: "COUCH TO 5K",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper.",
      image: groupRun,
    },
    {
      title: "TRAIL TRAINING CAMP",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper.",
      image: trailRun,
    },
  ];

  return (
    <section className="py-20 bg-background" id="programs">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <ScrollAnimation>
          <div className="flex flex-wrap items-start justify-between gap-6 mb-12">
            <div>
              <Button variant="tagGreen" size="tag" className="mb-6">
                ~ TRAINING PROGRAMS ~
              </Button>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground italic">
                TAILORED TRAINING PLANS FOR
                <br />
                EVERY RUNNER
              </h2>
            </div>
            <Button variant="hero" size="lg">
              ALL PROGRAMS
            </Button>
          </div>
        </ScrollAnimation>

        {/* Programs Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Program Card */}
          <ScrollAnimation className="lg:col-span-2" delay={0.1}>
            <div className="bg-card rounded-2xl overflow-hidden border border-border h-full">
              <div className="relative">
                {/* Decorative waves */}
                <div className="absolute top-4 right-4 z-10">
                  <svg className="w-32 h-20 text-primary/30" viewBox="0 0 100 50">
                    <path d="M0 25 Q25 0 50 25 Q75 50 100 25" stroke="currentColor" strokeWidth="2" fill="none" />
                    <path d="M0 35 Q25 10 50 35 Q75 60 100 35" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                </div>
                
                <div className="p-8">
                  <h3 className="font-display text-2xl text-foreground tracking-wider mb-4">BEST PROGRAMS</h3>
                  <p className="text-muted-foreground text-sm mb-6 max-w-md">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo. Class aptent taciti sociosqu ad litora torquent.
                  </p>
                  <Button variant="heroDark" size="default">
                    LEARN MORE
                  </Button>
                </div>
                <img
                  src={coachFemale}
                  alt="Coach"
                  className="w-full h-64 object-cover object-top"
                />
              </div>

              {/* Small Programs */}
              <div className="grid md:grid-cols-2 gap-6 p-6">
                {smallPrograms.map((program, i) => (
                  <div key={i}>
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-40 object-cover rounded-xl mb-4"
                    />
                    <h4 className="font-display text-lg text-foreground tracking-wider mb-2">{program.title}</h4>
                    <p className="text-muted-foreground text-sm mb-4">{program.description}</p>
                    <Button variant="heroDark" size="default">
                      JOIN PROGRAM
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </ScrollAnimation>

          {/* Side Card */}
          <ScrollAnimation direction="right" delay={0.2}>
            <div className="bg-secondary rounded-2xl overflow-hidden relative h-full">
              <div className="p-6">
                <h3 className="font-display text-2xl text-secondary-foreground tracking-wider mb-4">SHOOT UP ENDURANCE</h3>
                <p className="text-secondary-foreground/80 text-sm mb-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-primary border-2 border-secondary" />
                  <div className="w-10 h-10 rounded-full bg-muted border-2 border-secondary" />
                  <div className="w-10 h-10 rounded-full bg-primary/60 border-2 border-secondary" />
                </div>
              </div>
              <img
                src={athleteAction}
                alt="Athlete in action"
                className="w-full h-80 object-cover object-top"
              />
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default Programs;
