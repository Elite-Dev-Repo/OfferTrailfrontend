import React, { useState } from "react"; // Added useState
import { Link } from "react-router-dom";
import { ACCESS, REFRESH } from "../constants";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Logout01Icon,
  Menu01Icon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons"; // Added Menu/Cancel icons
import { useNavigate } from "react-router-dom";
import logo from "../assets/offerlogo.png";

function Nav() {
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu
  const navigate = useNavigate();
  const token = localStorage.getItem(ACCESS);

  const handleLogout = () => {
    localStorage.removeItem(ACCESS);
    localStorage.removeItem(REFRESH);
    setIsOpen(false);
    navigate("/");
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="relative flex items-center justify-between px-4 md:px-8 py-6 border-b border-border h-[80px] bg-background z-50">
      {/* Logo Section */}
      <Link to="/" onClick={() => setIsOpen(false)}>
        <div className="flex items-center gap-2 h-full overflow-hidden">
          <img src={logo} className="w-10 h-fit" alt="OfferTrail Logo" />
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-primary">
            OfferTrail
          </h1>
        </div>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium">
        <a href="/#features" className="hover:text-primary transition">
          Features
        </a>
        <a href="/#pricing" className="hover:text-primary transition">
          Pricing
        </a>
        <a href="/#faq" className="hover:text-primary transition">
          FAQ
        </a>

        {token ? (
          <div className="flex gap-3 items-center">
            <Link
              to="/dashboard"
              className="px-5 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition"
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center hover:text-destructive transition p-2 bg-red-50 text-red-400 rounded-lg border border-red-100"
            >
              <HugeiconsIcon icon={Logout01Icon} size={20} />
            </button>
          </div>
        ) : (
          <Link
            to="/register"
            className="px-5 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition"
          >
            Get Started
          </Link>
        )}
      </div>

      {/* Mobile Toggle Button */}
      <button
        className="md:hidden p-2 text-foreground"
        onClick={toggleMenu}
        aria-label="Toggle Menu"
      >
        <HugeiconsIcon icon={isOpen ? Cancel01Icon : Menu01Icon} size={24} />
      </button>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 top-[80px] bg-background flex flex-col p-6 gap-6 md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        <a
          href="/#features"
          onClick={toggleMenu}
          className="text-lg font-medium border-b pb-4"
        >
          Features
        </a>
        <a
          href="/#pricing"
          onClick={toggleMenu}
          className="text-lg font-medium border-b pb-4"
        >
          Pricing
        </a>
        <a
          href="/#faq"
          onClick={toggleMenu}
          className="text-lg font-medium border-b pb-4"
        >
          FAQ
        </a>

        <div className="mt-4">
          {token ? (
            <div className="flex flex-col gap-4">
              <Link
                to="/dashboard"
                onClick={toggleMenu}
                className="w-full text-center py-4 rounded-xl bg-primary text-primary-foreground font-bold"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-3 py-4 text-red-500 bg-red-50 rounded-xl border border-red-100 font-bold"
              >
                <HugeiconsIcon icon={Logout01Icon} size={20} />
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/register"
              onClick={toggleMenu}
              className="w-full text-center py-4 rounded-xl bg-primary text-primary-foreground font-bold"
            >
              Get Started
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
