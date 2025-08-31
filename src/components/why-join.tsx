import { Rocket, Globe, TrendingUp } from "lucide-react";

const benefits = [
  {
    icon: Rocket,
    title: "Start Early",
    description:
      "Get ahead of the curve with early exposure to cutting-edge technologies and industry insights.",
    color: "text-red-600",
    bg: "bg-red-50",
  },
  {
    icon: Globe,
    title: "Global Community",
    description:
      "Connect with like-minded students from around the world across AI, CS, Physics, Engineering, and Biotech.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: TrendingUp,
    title: "Launch Ideas that Matter",
    description:
      "Turn your curiosity into real projects and innovations that can make a difference in the world.",
    color: "text-green-600",
    bg: "bg-green-50",
  },
];

export function WhyJoin() {
  return (
    <section className="bg-white py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-20 text-center">
          <div className="mb-6">
            <span className="inline-flex items-center rounded-full bg-gradient-to-r from-red-100 to-pink-100 px-4 py-2 text-sm font-medium text-red-800">
              Why Choose Us
            </span>
          </div>
          <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-6xl">
            Why Join{" "}
            <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
              UniVerse?
            </span>
          </h2>
          <p className="mb-12 text-2xl font-light text-gray-600">
            Learn, Build, Launch Ideas that{" "}
            <span className="font-semibold text-red-600">Matter</span>
          </p>

          {/* Enhanced Stats */}
          <div className="mb-16 flex flex-wrap justify-center gap-8">
            <div className="rounded-2xl border border-red-200 bg-gradient-to-br from-red-50 to-red-100 px-8 py-6 shadow-lg">
              <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-4xl font-bold text-transparent">
                1,100+
              </span>
              <span className="ml-3 font-medium text-gray-700">Members</span>
            </div>
            <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 px-8 py-6 shadow-lg">
              <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-4xl font-bold text-transparent">
                24+
              </span>
              <span className="ml-3 font-medium text-gray-700">Countries</span>
            </div>
            <div className="rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-green-100 px-8 py-6 shadow-lg">
              <span className="bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-4xl font-bold text-transparent">
                60+
              </span>
              <span className="ml-3 font-medium text-gray-700">
                Events Hosted
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {benefits.map((benefit, index) => (
            <div key={index} className="group text-center">
              <div
                className={`h-24 w-24 ${benefit.bg} mx-auto mb-8 flex transform items-center justify-center rounded-3xl shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl`}
              >
                <benefit.icon className={`h-12 w-12 ${benefit.color}`} />
              </div>
              <h3 className="mb-6 text-2xl font-bold text-gray-900 transition-colors group-hover:text-gray-800">
                {benefit.title}
              </h3>
              <p className="text-lg leading-relaxed text-gray-600 transition-colors group-hover:text-gray-700">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
