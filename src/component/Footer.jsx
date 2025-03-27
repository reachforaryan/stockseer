import React from "react";
import { Link } from "react-router-dom";
import data from "../data/data.json";

function Footer() {
  return (
    <footer
      data-scroll
      data-scroll-section
      className="w-full bg-zinc-900 text-white py-12"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-light mb-4">StockSeer</h3>
            <p className="text-zinc-400 text-sm">
              Empowering investors with AI-driven insights for smarter trading
              decisions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-light mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/stockseer"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/stockseer/about"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/stockseer/bench"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  Bench
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-light mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-zinc-400">
                <a
                  href="mailto:contact@stockseer.com"
                  className="hover:text-white transition-colors"
                >
                  contact@stockseer.com
                </a>
              </li>
              <li className="text-zinc-400">
                <a
                  href="tel:+1234567890"
                  className="hover:text-white transition-colors"
                >
                  +1 (234) 567-890
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-zinc-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-zinc-400 text-sm">
              © {new Date().getFullYear()} StockSeer. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-zinc-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-zinc-400 hover:text-white transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
