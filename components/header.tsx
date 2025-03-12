"use client";

import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { motion } from "framer-motion";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import { Mail } from "lucide-react";

export default function Header() {
  const scrollToElement = useSmoothScroll();

  return (
    <motion.header
      className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          <span className="text-primary">Fordcer</span>Portfolio
        </Link>
        <nav className="hidden md:flex gap-6">
          {["Home", "Skills", "Projects", "About", "Contact"].map((item) => (
            <button
              key={item}
              onClick={() => scrollToElement(item.toLowerCase())}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {item}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button onClick={() => scrollToElement("contact")}>
            <Mail className="mr-2 h-4 w-4" />
            Contact Me
          </Button>
        </div>
      </div>
    </motion.header>
  );
}
