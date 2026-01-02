import { Button } from "../components/Button";
import { Calendar, Users, Clock, MapPin } from "lucide-react";
import raceGroup from "../assets/race-group.jpg";
import runnersCelebrating from "../assets/runners-celebrating.jpg";
import ScrollAnimation from "./ScrollAnimation";
import { StaggerContainer, StaggerItem } from "./StaggerAnimation";

const Events = () => {
  const events = [
    {
      title: "RUNMATE CITY SPRINT 10K",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.",
      date: "September 20, 2025",
      type: "General",
      time: "Start 05:00 AM – Finish",
      location: "South Jekardah",
      price: "$50",
      image: raceGroup,
    },
    {
      title: "COASTAL HALF MARATHON",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.",
      date: "December 12, 2025",
      type: "Member Only",
      time: "Start 05:00 AM – Finish",
      location: "Gadjah Mada Street",
      price: "$50",
      image: runnersCelebrating,
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <ScrollAnimation>
          <div className="text-center mb-16">
            <Button variant="tagGreen" size="tag" className="mb-6">
              ~ UPCOMING EVENTS ~
            </Button>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground italic">
              UPCOMING EVENTS – LACE UP FOR
              <br />
              SOMETHING BIG
            </h2>
          </div>
        </ScrollAnimation>

        {/* Events List */}
        <StaggerContainer className="space-y-6 mb-12" staggerDelay={0.15}>
          {events.map((event, i) => (
            <StaggerItem key={i}>
              <div className="grid md:grid-cols-[200px_1fr_300px] gap-6 bg-card rounded-2xl overflow-hidden border border-border">
                {/* Ticket Section */}
                <div className="bg-secondary p-6 flex flex-col justify-center">
                  <span className="text-primary font-display text-sm tracking-wider">TICKET</span>
                  <div className="mt-2">
                    <span className="font-display text-4xl text-secondary-foreground">{event.price}</span>
                    <span className="text-secondary-foreground/70 text-sm"> / Ticket</span>
                  </div>
                  <Button variant="hero" size="default" className="mt-6">
                    REGISTER NOW
                  </Button>
                </div>

                {/* Event Details */}
                <div className="p-6 flex flex-col justify-center">
                  <h3 className="font-display text-2xl text-foreground tracking-wider mb-3">{event.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{event.description}</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="text-sm text-foreground">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      <span className="text-sm text-foreground">{event.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-sm text-foreground">{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span className="text-sm text-foreground">{event.location}</span>
                    </div>
                  </div>
                </div>

                {/* Event Image */}
                <div className="h-48 md:h-auto">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* View More Button */}
        <ScrollAnimation>
          <div className="text-center">
            <Button variant="heroDark" size="lg">
              VIEW MORE EVENTS
            </Button>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default Events;
