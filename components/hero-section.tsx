"use client";

import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { motion, useAnimation, useInView, Variants } from "framer-motion";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  const scrollToElement = useSmoothScroll();
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="home" className="py-20 md:py-32 relative overflow-hidden">
      <div className="container">
        <motion.div
          ref={ref}
          className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.div className="space-y-4" variants={itemVariants}>
            <motion.div variants={itemVariants}>
              <Badge className="mb-4">Available for hire</Badge>
            </motion.div>
            <motion.h1
              className="text-4xl md:text-6xl font-bold tracking-tight"
              variants={itemVariants}
            >
              Hi, I'm <span className="text-primary">Fordcer</span>
            </motion.h1>
            <TypewriterText text="Full Stack Web Developer" />
            <motion.p
              className="text-muted-foreground text-lg md:text-xl max-w-md"
              variants={itemVariants}
            >
              I build exceptional and accessible digital experiences for the
              web.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-3 pt-4"
              variants={itemVariants}
            >
              <Button size="lg" onClick={() => scrollToElement("projects")}>
                View My Work
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Download Resume
              </Button>
            </motion.div>
          </motion.div>
          <motion.div
            className="relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden"
            variants={itemVariants}
          >
            <Image
              src="/placeholder.svg?height=500&width=500"
              alt="John Doe"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute -z-10 top-0 right-0 left-0 h-full bg-gradient-to-b from-primary/5 to-background dark:from-primary/10 dark:to-background" />
    </section>
  );
}

function TypewriterText({ text }: Readonly<{ text: string }>) {
  return (
    <motion.h2
      className="text-2xl md:text-3xl font-medium text-primary"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 + index * 0.05 }}
        >
          {char}
        </motion.span>
      ))}
    </motion.h2>
  );
}
