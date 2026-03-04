import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Rocket01Icon,
  CheckmarkCircle02Icon,
  ShieldKeyIcon,
  AnalyticsUpIcon,
  ArrowRight01Icon,
  Calendar02Icon,
  PlusSignIcon,
} from "@hugeicons/core-free-icons";

// This is the key to fixing the error
import { HugeiconsIcon } from "@hugeicons/react";

import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Pricing from "./components/Pricing";
import React from "react";
import doodle from "./assets/doodle.png";
import Faqs from "./components/Faqs";

const App = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />

      {/* HERO */}
      <section
        className={`hero px-8 py-28 relative text-center max-w-6xl mx-auto`}
      >
        <div className="absolute bottom-[15%]  h-fit w-fit animate-spin animation-duration-7005 text-blue-600">
          <HugeiconsIcon icon={PlusSignIcon} size={58} />
        </div>
        {/* <div className="absolute right-0 top-[15%] h-fit w-fit animate-bounce shad animation-duration-4000">
          <HugeiconsIcon icon={Calendar02Icon} size={58} />
        </div> */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl relative font-bold tracking-tight leading-tight"
        >
          <span className="bg-blue-600 text-background px-5 rounded-sm ">
            Track
          </span>{" "}
          every application.
          <br />
          Land your next offer faster.
        </motion.h2>

        <p className="mt-6 text-muted-foreground max-w-2xl mx-auto text-lg">
          OfferTrail helps you manage your job search like a professional. Stay
          organized, track progress, and never miss an opportunity.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link
            to="/dashboard"
            className="px-6 py-2  rounded-2xl bg-blue-600 text-primary-foreground flex items-center gap-2 hover:opacity-90 transition"
          >
            Start Free
            <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
          </Link>
          <button className="px-6 py-2 rounded-2xl border border-border hover:bg-muted transition">
            See Demo
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="px-8 py-24 border-t border-border">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
          {[
            {
              icon: Rocket01Icon,
              title: "Smart Tracking",
              desc: "Organize every application from Applied to Offer in one dashboard.",
              color: "bg-blue-100 text-blue-600",
            },
            {
              icon: AnalyticsUpIcon,
              title: "Progress Insights",
              desc: "Understand your job search performance with simple metrics.",
              color: "bg-green-100 text-green-600",
            },
            {
              icon: ShieldKeyIcon,
              title: "Secure & Private",
              desc: "Your job data stays encrypted and isolated to your account.",
              color: "bg-amber-50 text-amber-600 border border-amber-200",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-10 rounded-3xl border border-border bg-card"
            >
              <div className={`mb-6 p-3 w-fit rounded-full ${item.color}`}>
                <HugeiconsIcon icon={item.icon} size={28} />
              </div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-4 text-muted-foreground text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <Pricing />
      {/* FAQ */}
      <Faqs />

      <Footer />
    </div>
  );
};

export default App;
