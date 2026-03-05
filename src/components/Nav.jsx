import React from "react";
import { Link } from "react-router-dom";
import { ACCESS, REFRESH } from "../constants";
import { HugeiconsIcon } from "@hugeicons/react";
import { Logout01Icon } from "@hugeicons/core-free-icons";
import { useNavigate } from "react-router-dom";

function Nav() {
  const navigate = useNavigate();
  const token = localStorage.getItem(ACCESS);
  const handleLogout = () => {
    localStorage.removeItem(ACCESS);
    localStorage.removeItem(REFRESH);
    navigate("/register");
  };

  return (
    <nav className="flex items-center justify-between px-8 py-6 border-b border-border">
      <Link to="/">
        <h1 className="text-2xl px-6 font-bold  tracking-tight text-primary">
          OfferTrail
        </h1>
      </Link>
      <div className="hidden md:flex items-center gap-8 text-sm">
        <a href="/#features" className="hover:opacity-70 transition">
          Features
        </a>
        <a href="/#pricing" className="hover:opacity-70 transition">
          Pricing
        </a>
        <a href="/#faq" className="hover:opacity-70 transition">
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
              className="flex items-center gap-3 text-sm hover:text-destructive transition p-4 py-3 mx-4 bg-red-50 text-red-500 rounded-lg border border-red-300 "
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
    </nav>
  );
}

export default Nav;
