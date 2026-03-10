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

import { HugeiconsIcon } from "@hugeicons/react";

import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Pricing from "./components/Pricing";
import React from "react";
import More from "./components/More";
import Faqs from "./components/Faqs";
import { ACCESS } from "./constants";

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />

      {/* HERO */}
      <section
        className={`hero px-8 py-20 relative text-center max-w-6xl mx-auto`}
      >
        <div className="absolute bottom-[15%]  h-fit w-fit animate-spin animation-duration-7005 text-primary">
          <HugeiconsIcon icon={PlusSignIcon} size={58} />
        </div>
        <motion.div
          initial={{ opacity: 0, x: -120 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className=" w-fit mx-auto mb-5 flex items-center gap-3 px-3 py-1 border border-primary/20 bg-primary/[0.03] rounded-full"
        >
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 "></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary animate-bounce"></span>
          </div>
          <span className="font-light text-[12px] tracking-wide uppercase px-5">
            Analyze your Job Experience.
          </span>
        </motion.div>{" "}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl relative font-bold tracking-tight leading-tight"
        >
          <span className="bg-primary text-background px-5 rounded-sm ">
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
            className="px-6 py-2  rounded-sm bg-primary text-primary-foreground flex items-center gap-2 hover:opacity-90 transition"
          >
            Start Free
            <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
          </Link>
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
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              key={i}
              className="p-10 rounded-3xl border border-border bg-card"
            >
              <div className={`mb-6 p-3 w-fit rounded-full ${item.color}`}>
                <HugeiconsIcon icon={item.icon} size={28} />
              </div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-4 text-muted-foreground text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* MORE */}
      <More />
      {/* PRICING */}
      <Pricing />
      {/* FAQ */}
      <Faqs />

      <Footer />
    </div>
  );
}

export default App;
