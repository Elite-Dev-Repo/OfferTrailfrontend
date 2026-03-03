import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-background bg-primary/90 border-t border-border px-8 py-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10 text-sm">
        <div>
          <h4 className="font-semibold text-lg">OfferTrail</h4>
          <p className="mt-4 text-muted-background">
            Track your path to your next offer.
          </p>
        </div>

        <div>
          <h5 className="font-medium mb-4">Product</h5>
          <ul className="space-y-2 text-muted-background">
            <li>Features</li>
            <li>Pricing</li>
            <li>FAQ</li>
          </ul>
        </div>

        <div>
          <h5 className="font-medium mb-4">Company</h5>
          <ul className="space-y-2 text-muted-background">
            <li>About</li>
            <li>Careers</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h5 className="font-medium mb-4">Legal</h5>
          <ul className="space-y-2 text-muted-background">
            <li>Privacy Policy</li>
            <li>Terms</li>
          </ul>
        </div>
      </div>

      <div className="text-center text-muted-background mt-12 text-xs">
        © {new Date().getFullYear()} OfferTrail. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
