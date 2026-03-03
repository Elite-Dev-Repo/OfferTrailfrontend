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
      question: "Is OfferTrail really free to use?",
      answer:
        "Yes! Our 'Starter Plan' allows you to track unlimited job applications and manage your status workflow at zero cost. Advanced analytics are reserved for our Pro users.",
    },
    {
      question: "How does the application tracking work?",
      answer:
        "Simply add a new job entry with the company name, role, and current status. As you move through interviews, you can update the status, add notes, and keep all your job search data in one organized dashboard.",
    },
    {
      question: "Is my data secure and private?",
      answer:
        "Absolutely. We use Supabase for secure authentication and database isolation. Your application data is tied strictly to your account and is never shared with third parties.",
    },
    {
      question: "Can I export my data?",
      answer:
        "Pro users can export their entire application history as a CSV or PDF file, perfect for keeping personal records or sharing progress with a career coach.",
    },
    {
      question: "Can I use OfferTrail on my mobile phone?",
      answer:
        "Yes! OfferTrail is built with a responsive TailwindCSS design, making it fully accessible and easy to use on any mobile browser or tablet.",
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
                  className="border border-foreground/10 bg-foreground/5 px-9 rounded-lg py-4"
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
