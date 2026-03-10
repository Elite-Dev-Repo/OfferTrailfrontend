import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { CustomerSupportIcon } from "@hugeicons/core-free-icons";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

function Faqs() {
  const faqs = [
    {
      question: "Is OfferTrail free to use?",
      answer:
        "Yes! The Starter plan is completely free and lets you track up to 50 job applications. If you need unlimited tracking, reminders, and analytics, you can upgrade to the Pro plan anytime.",
    },
    {
      question: "How does OfferTrail help me track job applications?",
      answer:
        "You can add each job application with details like the company, role, and status. As you progress through the hiring process, you can update statuses, add notes, and keep everything organized in one dashboard.",
    },
    {
      question: "Can I track interview stages and follow-ups?",
      answer:
        "Yes. OfferTrail lets you update application stages such as Applied, Interviewing, Offer, or Rejected. Pro users can also set reminders for follow-ups and interviews.",
    },
    {
      question: "Is my job search data private?",
      answer:
        "Absolutely. Your data is tied only to your account and securely stored. We never share your job application information with recruiters or third parties.",
    },
    {
      question: "Can I export my job application data?",
      answer:
        "Yes. Pro users can export their application history as a CSV file, making it easy to keep personal records or analyze their job search progress.",
    },
    {
      question: "Can I use OfferTrail on my phone?",
      answer:
        "Yes! OfferTrail is fully responsive and works smoothly on mobile phones, tablets, and desktop browsers so you can update your applications anywhere.",
    },
  ];

  return (
    <section className="py-24 px-6 bg-background" id="faq">
      <div className="max-w-3xl mx-auto flex flex-col gap-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center gap-4"
        >
          <h3 className="text-4xl font-bold tracking-tight">
            Frequently Asked Questions
          </h3>
          <p className="text-muted-foreground text-lg max-w-xl">
            Everything you need to know about tracking your job search with
            OfferTrail.
          </p>
        </motion.div>

        {/* Accordion Section */}
        <div className="w-full">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="border border-primary/10 bg-primary/5 px-9 rounded-lg py-4"
                >
                  <AccordionTrigger className="text-foreground text-md hover:no-underline font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className=" text-foreground/60 leading-relaxed  py-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

export default Faqs;
