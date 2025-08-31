"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "~/components/ui/button";
import type { Setting } from "../../../payload-types";
import { navItems } from "~/lib/nav";

export function Header(props: Setting) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-gray-200/50 bg-white/95 shadow-lg backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center">
            <Link
              href="/"
              className={`text-2xl font-bold transition-colors ${isScrolled ? "text-gray-900" : "text-white"}`}
            >
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                UniVerse
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isScrolled
                      ? "text-gray-600 hover:bg-red-50 hover:text-red-600"
                      : "text-white/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <Button
              asChild
              className="rounded-full bg-gradient-to-r from-red-600 to-red-700 px-6 py-2 font-semibold text-white shadow-lg transition-all duration-300 hover:from-red-700 hover:to-red-800 hover:shadow-red-500/25"
            >
              <Link
                href={props.discord_community_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Join Discord
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={isScrolled ? "text-gray-900" : "text-white"}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="mt-2 space-y-1 rounded-2xl border border-gray-200/50 bg-white/95 px-2 pt-2 pb-3 shadow-xl backdrop-blur-md sm:px-3">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block rounded-xl px-4 py-3 text-base font-medium text-gray-600 transition-colors hover:bg-red-50 hover:text-red-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="px-4 py-3">
                <Button
                  asChild
                  className="w-full rounded-full bg-gradient-to-r from-red-600 to-red-700 font-semibold text-white hover:from-red-700 hover:to-red-800"
                >
                  <Link
                    href={props.discord_community_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Join Discord
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
