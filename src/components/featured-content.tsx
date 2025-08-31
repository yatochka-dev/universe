import { Button } from "~/components/ui/button";
import { Calendar, Users, ArrowRight, Clock, MapPin } from "lucide-react";
import BackgroundPattern from "~/components/bg-pattern";

const upcomingEvents = [
  {
    title: "AI in Healthcare: Future Perspectives",
    date: "March 15, 2024",
    time: "7:00 PM EST",
    speaker: "Dr. Sarah Chen, Stanford AI Lab",
    attendees: 250,
    type: "Speaker Event",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    title: "Spring Innovation Challenge",
    date: "March 22-24, 2024",
    time: "48 Hours",
    speaker: "Multi-day Hackathon",
    attendees: 150,
    type: "Hackathon",
    gradient: "from-blue-500 to-cyan-600",
  },
];

export function FeaturedContent() {
  return (
    <section className="overflow-hidden py-32 text-white">
      <BackgroundPattern />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-20 text-center">
          <div className="mb-6">
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
              ⚡ What&apos;s Coming Up
            </span>
          </div>
          <h2 className="mb-6 text-4xl font-bold md:text-6xl">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Upcoming Events
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-300">
            Don&apos;t miss out on our latest events and opportunities to
            connect, learn, and innovate
          </p>
        </div>

        <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {upcomingEvents.map((event, index) => (
            <div
              key={index}
              className="group relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:transform hover:border-white/20"
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${event.gradient} rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-10`}
              ></div>

              <div className="relative z-10">
                <div className="mb-6 flex items-center justify-between">
                  <span
                    className={`bg-gradient-to-r ${event.gradient} rounded-full px-4 py-2 text-sm font-semibold text-white shadow-lg`}
                  >
                    {event.type}
                  </span>
                  <div className="flex items-center text-gray-400">
                    <Users className="mr-2 h-4 w-4" />
                    <span className="text-sm font-medium">
                      {event.attendees} registered
                    </span>
                  </div>
                </div>

                <h3 className="mb-4 text-2xl font-bold transition-colors group-hover:text-white">
                  {event.title}
                </h3>

                <p className="mb-6 text-lg text-gray-300">{event.speaker}</p>

                <div className="mb-8 space-y-3">
                  <div className="flex items-center text-gray-400">
                    <Calendar className="mr-3 h-5 w-5" />
                    <span className="font-medium">{event.date}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Clock className="mr-3 h-5 w-5" />
                    <span className="font-medium">{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <MapPin className="mr-3 h-5 w-5" />
                    <span className="font-medium">Virtual Event</span>
                  </div>
                </div>

                <Button
                  className={`w-full bg-gradient-to-r ${event.gradient} rounded-xl py-3 font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-red-500/25`}
                >
                  Register Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="rounded-full bg-gradient-to-r from-red-600 to-red-700 px-10 py-6 text-lg font-semibold text-white shadow-2xl transition-all duration-300 hover:from-red-700 hover:to-red-800 hover:shadow-red-500/25"
          >
            View All Events
            <ArrowRight className="ml-3 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
