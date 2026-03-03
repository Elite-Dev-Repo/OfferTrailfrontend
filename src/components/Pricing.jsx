import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ZapIcon, CheckmarkCircle02Icon } from "@hugeicons/core-free-icons";
import { motion } from "framer-motion";
import { useState } from "react";

const Pricing = () => {
  const [plans, setPlans] = useState("Monthly");

  const pricingPlans = [
    {
      name: "Starter Plan",
      price: "0",
      period: "per month",
      description:
        "Perfect for beginners who want to explore the basic features.",
      buttonText: "Start with Starter",
      features: [
        "Real-time market tracking",
        "Basic portfolio management",
        "Email notifications",
        "Price alerts",
        "Personal watchlists",
        "Email support",
      ],
      isPopular: false,
    },
    {
      name: "Pro Plan",
      price: "20",
      period: "per month",
      description:
        "For active traders who want deeper insights and advanced analysis tools.",
      buttonText: "Start with Pro",
      tag: "Recommended",
      features: [
        "Advanced market analysis",
        "Full portfolio management",
        "Multiple wallet support",
        "Smart alerts & notifications",
        "Instant token swaps",
        "Priority 24/7 support",
      ],
      isPopular: true,
    },
    {
      name: "Elite Plan",
      price: "49",
      period: "per month",
      description:
        "For professional traders and teams who want the full Cryptofi experience.",
      buttonText: "Start with Elite",
      features: [
        "All features of the Pro plan",
        "Advanced AI trading insights",
        "Team account management",
        "Custom analytics dashboards",
        "Beta access to new features",
        "Dedicated account manager",
      ],
      isPopular: false,
    },
  ];

  return (
    <section
      className="cont py-24 flex flex-col gap-16 items-center"
      id="pricing"
    >
      <div className="cont flex flex-col gap-16 items-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center gap-2"
        >
          <h3 className="text-4xl font-medium">Flexible Pricing Plans</h3>
          <p className="text-md  text-foreground/60 max-w-xl">
            Choose a plan that fits your needs and budget.
          </p>
        </motion.div>
      </div>

      <div className="flex gap-5 h-fit justify-center items-center  rounded-full border border-primary/20 bg-foreground/5 w-[300px]">
        <button
          onClick={() => setPlans("Monthly")}
          className={
            plans === "Monthly"
              ? "flex-1  rounded-full border border-primary/20 bg-primary text-background px-4 py-2"
              : "flex-1 px-4"
          }
        >
          Monthly
        </button>
        <button
          onClick={() => setPlans("Yearly")}
          className={
            plans === "Yearly"
              ? " flex-1 rounded-full border border-primary/20 bg-primary text-background px-4 py-2"
              : "flex-1 px-4"
          }
        >
          Yearly
        </button>
      </div>

      <div className="flex items-center md:flex-row flex-col gap-5">
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="flex flex-col gap-5 rounded-md border border-foreground/20 bg-foreground/3 p-5"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">{plan.name}</h3>{" "}
              {plan.tag && (
                <p className="text-sm  text-foreground/80 px-2 py-1 rounded-full border border-foreground/20 bg-foreground/5">
                  {plan.tag}
                </p>
              )}
            </div>
            <p className="text-sm text-foreground/60">{plan.description}</p>
            <p className="text-xl font-medium">
              {" "}
              {plans === "Yearly"
                ? `$${Number(plan.price) * 12}`
                : `$${plan.price}`}
              <span className="text-sm  text-foreground/60">
                {" "}
                {plan.period}
              </span>
            </p>
            <button className="bg-foreground text-background px-4 py-2 rounded-sm">
              {plan.buttonText}
            </button>

            <div className="flex flex-col gap-3">
              <h4 className="text-md font-medium">Features</h4>
              {plan.features.map((feature) => (
                <p
                  key={feature}
                  className="text-sm  text-foreground/60 flex items-center gap-2"
                >
                  <HugeiconsIcon icon={CheckmarkCircle02Icon} size={20} />
                  {feature}
                </p>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
