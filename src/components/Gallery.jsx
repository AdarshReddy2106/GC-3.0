import { motion } from "framer-motion";
import { Button } from "../components/Button";
import urbanRunners from "../assets/urban-runners.jpg";
import sprinterStart from "../assets/sprinter-start.jpg";
import trailRun from "../assets/trail-run.jpg";
import runnersCelebrating from "../assets/runners-celebrating.jpg";
import ScrollAnimation from "./ScrollAnimation";

const Gallery = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-3 gap-4">
          {/* First tall image */}
          <ScrollAnimation className="row-span-2" direction="left">
            <motion.div 
              className="h-full"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={urbanRunners}
                alt="Urban runners"
                className="w-full h-full object-cover rounded-2xl min-h-[400px]"
              />
            </motion.div>
          </ScrollAnimation>

          {/* Second image */}
          <ScrollAnimation delay={0.1}>
            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
              <img
                src={sprinterStart}
                alt="Sprinter start"
                className="w-full h-48 object-cover rounded-2xl"
              />
            </motion.div>
          </ScrollAnimation>

          {/* Third image */}
          <ScrollAnimation delay={0.2}>
            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
              <img
                src={trailRun}
                alt="Trail running"
                className="w-full h-48 object-cover rounded-2xl"
              />
            </motion.div>
          </ScrollAnimation>

          {/* Fourth image */}
          <ScrollAnimation delay={0.15}>
            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
              <img
                src={runnersCelebrating}
                alt="Runners celebrating"
                className="w-full h-48 object-cover rounded-2xl"
              />
            </motion.div>
          </ScrollAnimation>

          {/* Instagram CTA */}
          <ScrollAnimation delay={0.25} direction="right">
            <div className="bg-secondary rounded-2xl p-8 flex flex-col justify-center h-full">
              <h3 className="font-display text-2xl text-secondary-foreground tracking-wider mb-4">
                FOLLOW OUR INSTAGRAM
              </h3>
              <p className="text-secondary-foreground/80 text-sm mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
              </p>
              <Button variant="hero" size="default" className="w-fit">
                FOLLOW US
              </Button>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
