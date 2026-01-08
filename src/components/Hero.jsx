import { motion } from "framer-motion";
import { Button } from "../components/Button";
import { Play, Calendar, Clock, MapPin, Facebook, Instagram, Twitter, Youtube, Download } from "lucide-react";
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
                <span className="text-primary font-bold text-lg">3rd</span>
                <p className="text-sm opacity-80">edition</p>
              </div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-none mb-6"
            >
              GENERAL
              <br />
              CHAMPIONSHIP 2026
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg opacity-90 mb-8 max-w-md"
            >The ultimate sporting battleground of IIT Palakkad — where grit, glory, and house pride collide under one banner.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center gap-4"
            >
              <a 
                href="https://www.youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all shadow-lg hover:shadow-xl"
              >
                <Youtube className="w-5 h-5" />
                <span>WATCH ON YOUTUBE</span>
              </a>
            </motion.div>

            {/* Event Info Cards */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-4 mt-8"
            >
              {/* Time Period Card */}
              <div className="bg-secondary-foreground/10 backdrop-blur-sm border border-secondary-foreground/20 rounded-xl p-4 flex items-center gap-3 min-w-[200px]">
                <div className="bg-primary/20 p-2 rounded-lg">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-secondary-foreground/60 uppercase tracking-wide">Event Period</p>
                  <p className="text-sm font-bold text-secondary-foreground">14 - 21 Dec 2025</p>
                </div>
              </div>

              {/* Download Rulebook Card */}
              <a 
                href="/rulebook.pdf" 
                download
                className="bg-secondary-foreground/10 backdrop-blur-sm border border-secondary-foreground/20 rounded-xl p-4 flex items-center gap-3 min-w-[200px] hover:bg-secondary-foreground/20 transition-all cursor-pointer group"
              >
                <div className="bg-primary/20 p-2 rounded-lg group-hover:bg-primary/30 transition-colors">
                  <Download className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-secondary-foreground/60 uppercase tracking-wide">Download</p>
                  <p className="text-sm font-bold text-secondary-foreground">Rulebook PDF</p>
                </div>
              </a>
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
            href="https://www.instagram.com/"
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
