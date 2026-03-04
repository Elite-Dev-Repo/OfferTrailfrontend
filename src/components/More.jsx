import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    id: 1,
    title: "Save Your Favourite Jobs",
    description:
      "Bookmark jobs you’re interested in and access them anytime. Never lose track of opportunities again with our centralized bookmarking system.",
    tag: "Organization",
    image:
      "https://cdn.jsdelivr.net/gh/realvjy/3dicons/src/assets/images/bookmark-dynamic-color.png",
  },
  {
    id: 2,
    title: "Track Application Status",
    description:
      "Monitor your job applications from Applied to Offer. Visualize your progress and stay organized with real-time status updates and stage tracking.",
    tag: "Workflow",
    image:
      "https://cdn.jsdelivr.net/gh/realvjy/3dicons/src/assets/images/kanban-dynamic-color.png",
  },
  {
    id: 3,
    title: "Analyze Your Job Search",
    description:
      "See insights like interview rate, application count, and performance trends to improve your strategy and get hired faster.",
    tag: "Analytics",
    image:
      "https://cdn.jsdelivr.net/gh/realvjy/3dicons/src/assets/images/chart-dynamic-color.png",
  },
];

const More = () => {
  return (
    <section className="py-32 bg-background overflow-hidden" id="features">
      <div className="max-w-6xl mx-auto px-6 space-y-32">
        {features.map((feature, index) => (
          <motion.div
            key={feature.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={`flex flex-col gap-12 items-center ${
              index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
            }`}
          >
            {/* Text Content */}
            <div className="flex-1 flex flex-col justify-center gap-4">
              <span className="px-4 mb-9 w-fit py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                {feature.tag}
              </span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.1]">
                {feature.title}
              </h2>
              <p className="text-muted-foreground text-md leading-relaxed max-w-md">
                {feature.description}
              </p>
              <div className="pt-4">
                <button className="text-primary font-semibold hover:underline flex items-center gap-2">
                  Learn more about {feature.tag.toLowerCase()} →
                </button>
              </div>
            </div>

            {/* Visual/Image Section */}
            <div className="flex-1 w-full relative group ">
              {/* Decorative background glow */}

              <div className="relative overflow-hidden rounded-sm border border-border bg-card  ring-1 ring-black/5">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-auto object-contain transform group-hover:scale-105 transition duration-700 p-8"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default More;
