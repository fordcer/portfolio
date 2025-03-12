"use client";

import { motion, useAnimation, useInView, Variants } from "framer-motion";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export default function AboutSection() {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

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
    <section id="about" className="py-20 bg-muted/50">
      <div className="container">
        <motion.div
          ref={ref}
          className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.div
            className="relative h-[400px] rounded-lg overflow-hidden"
            variants={itemVariants}
          >
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="About John Doe"
              fill
              className="object-cover"
            />
          </motion.div>
          <motion.div className="space-y-4" variants={containerVariants}>
            <motion.div variants={itemVariants}>
              <Badge>About Me</Badge>
            </motion.div>
            <motion.h2
              className="text-3xl md:text-4xl font-bold"
              variants={itemVariants}
            >
              My Journey as a Developer
            </motion.h2>
            <motion.p className="text-muted-foreground" variants={itemVariants}>
              I'm a passionate web developer with over 5 years of experience
              building modern web applications. My journey began when I
              discovered my love for turning ideas into reality through code.
            </motion.p>
            <motion.p className="text-muted-foreground" variants={itemVariants}>
              I specialize in building responsive, accessible, and performant
              web applications using modern technologies like React, Next.js,
              and Node.js. I'm constantly learning and exploring new
              technologies to stay at the forefront of web development.
            </motion.p>
            <motion.p className="text-muted-foreground" variants={itemVariants}>
              When I'm not coding, you can find me hiking, reading, or
              experimenting with new recipes in the kitchen.
            </motion.p>
            <motion.div className="flex gap-4 pt-4" variants={itemVariants}>
              <Button variant="outline" size="icon" asChild>
                <Link href="#" aria-label="GitHub">
                  <Github className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <Link href="#" aria-label="LinkedIn">
                  <Linkedin className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <Link href="#" aria-label="Email">
                  <Mail className="h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
