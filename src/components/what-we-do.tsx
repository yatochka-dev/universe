import { Users, Lightbulb, Code, Trophy } from "lucide-react";

const offerings = [
  {
    icon: Users,
    title: "Expert-led Events",
    description:
      "Learn from industry leaders, researchers, and successful entrepreneurs through AMAs and speaker sessions.",
    gradient: "from-blue-500 to-purple-600",
  },
  {
    icon: Lightbulb,
    title: "Innovation Challenges",
    description:
      "Participate in hackathons and competitions that push the boundaries of technology and creativity.",
    gradient: "from-yellow-500 to-orange-600",
  },
  {
    icon: Code,
    title: "Workshops",
    description:
      "Hands-on learning experiences covering coding, ML, product design, and emerging technologies.",
    gradient: "from-green-500 to-teal-600",
  },
  {
    icon: Trophy,
    title: "Career Prep",
    description:
      "Resume reviews, scholarship guidance, mentorship, and internship opportunities to launch your career.",
    gradient: "from-red-500 to-pink-600",
  },
];

export function WhatWeDo() {
  return (
    <section className="py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-20 text-center">
          <div className="mb-6">
            <span className="inline-flex items-center rounded-full bg-red-100 px-4 py-2 text-sm font-medium text-red-800">
              What We Offer
            </span>
          </div>
          <h2 className="mb-6 text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent md:text-6xl">
            What We <span className="text-red-600">Do</span>
          </h2>
          <p className="mx-auto max-w-4xl text-xl leading-relaxed text-white/90">
            UniVerse is a student-led platform dedicated to helping students
            take ideas from
            <span className="font-semibold text-red-600">
              {" "}
              curiosity to creation
            </span>{" "}
            through hands-on, collaborative, and future-focused learning.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {offerings.map((offering, index) => (
            <div
              key={index}
              className="group relative transform rounded-3xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${offering.gradient} rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-5`}
              ></div>

              <div
                className={`h-16 w-16 bg-gradient-to-br ${offering.gradient} mb-6 flex items-center justify-center rounded-2xl shadow-lg`}
              >
                <offering.icon className="h-8 w-8 text-white" />
              </div>

              <h3 className="mb-4 text-xl font-bold text-gray-900 transition-colors group-hover:text-gray-800">
                {offering.title}
              </h3>

              <p className="leading-relaxed text-gray-600 transition-colors group-hover:text-gray-700">
                {offering.description}
              </p>

              {/* Hover Effect Border */}
              <div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${offering.gradient} -z-10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-20`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
