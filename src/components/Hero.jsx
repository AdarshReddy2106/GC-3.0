import { motion } from "framer-motion";
import { Button } from "../components/Button";
import { Play, Calendar, Clock, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import heroRunner from "../assets/hero-runner.jpg";
import raceGroup from "../assets/race-group.jpg";

const Hero = () => {
  return (
    <section className="relative pt-20 min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 pt-20">
        <img
          src={heroRunner}
          alt="Runner on track"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
          {/* Left Content */}
          <div className="text-secondary-foreground">
            {/* Member Avatars */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary border-2 border-secondary" />
                <div className="w-10 h-10 rounded-full bg-muted border-2 border-secondary" />
                <div className="w-10 h-10 rounded-full bg-primary/60 border-2 border-secondary" />
              </div>
              <div>
                <span className="text-primary font-bold text-lg">1,200+</span>
                <p className="text-sm opacity-80">Active Members</p>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-none mb-6"
            >
              RUN TOGETHER,
              <br />
              ACHIEVE MORE
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg opacity-90 mb-8 max-w-md"
            >
              Join our vibrant running club and conquer every mile – from weekend jogs to marathon triumphs.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center gap-4"
            >
              <Button variant="hero" size="lg">
                JOIN THE CLUB
              </Button>
              <button className="w-12 h-12 rounded-full bg-secondary-foreground/20 backdrop-blur flex items-center justify-center hover:bg-secondary-foreground/30 transition-colors">
                <Play className="w-5 h-5 text-secondary-foreground fill-current" />
              </button>
            </motion.div>
          </div>

          {/* Right Content - Event Card */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex justify-end"
          >
            <div className="bg-muted/20 backdrop-blur-md rounded-3xl overflow-hidden max-w-md">
              <img
                src={raceGroup}
                alt="Runners in race"
                className="w-full h-48 object-cover"
              />
              <div className="p-6 bg-secondary/90">
                <Button variant="tagGreen" size="tag" className="mb-3">
                  ~ UPCOMING RACES ~
                </Button>
                <h3 className="font-display text-2xl text-secondary-foreground mb-4">
                  RUNMATE CITY SPRINT 10K
                </h3>
                <div className="space-y-2 text-secondary-foreground/80">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="text-sm">September 20, 2025</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-sm">Start 05:00 AM – Finish</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-sm">South Jekardah</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Social Links */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3"
      >
        {[Facebook, Instagram, Twitter].map((Icon, i) => (
          <a
            key={i}
            href="#"
            className="w-10 h-10 rounded-full bg-secondary/80 backdrop-blur flex items-center justify-center hover:bg-primary transition-colors group"
          >
            <Icon className="w-4 h-4 text-secondary-foreground group-hover:text-primary-foreground" />
          </a>
        ))}
      </motion.div>
    </section>
  );
};

export default Hero;
