import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-6 border-b border-border">
      <h1 className="text-2xl font-semibold tracking-tight">OfferTrail</h1>

      <div className="hidden md:flex items-center gap-8 text-sm">
        <a href="#features" className="hover:opacity-70 transition">
          Features
        </a>
        <a href="#pricing" className="hover:opacity-70 transition">
          Pricing
        </a>
        <a href="#faq" className="hover:opacity-70 transition">
          FAQ
        </a>
        <Link
          to="/register"
          className="px-5 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
