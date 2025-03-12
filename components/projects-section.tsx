"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, useAnimation, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Code, ArrowRight } from "lucide-react";
import type { Project } from "@/types";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";

export function ProjectsSection() {
  const scrollToElement = useSmoothScroll();
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch("/api/projects");

        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const data = await response.json();
        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProjects();
  }, []);

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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  // Fallback projects if none are loaded from the API
  const fallbackProjects = [
    {
      id: "1",
      title: "E-Commerce Platform",
      description:
        "A full-stack e-commerce platform with payment processing and inventory management.",
      imageUrl: "/placeholder.svg?height=400&width=600",
      tags: [
        { id: "1", name: "React" },
        { id: "2", name: "Node.js" },
        { id: "3", name: "MongoDB" },
        { id: "4", name: "Stripe" },
      ],
      demoUrl: "#",
      codeUrl: "#",
      featured: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Social Media Dashboard",
      description:
        "A responsive dashboard for managing social media accounts and analytics.",
      imageUrl: "/placeholder.svg?height=400&width=600",
      tags: [
        { id: "5", name: "Next.js" },
        { id: "6", name: "TypeScript" },
        { id: "7", name: "Tailwind CSS" },
        { id: "8", name: "Chart.js" },
      ],
      demoUrl: "#",
      codeUrl: "#",
      featured: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: "3",
      title: "Task Management App",
      description:
        "A collaborative task management application with real-time updates.",
      imageUrl: "/placeholder.svg?height=400&width=600",
      tags: [
        { id: "9", name: "React" },
        { id: "10", name: "Firebase" },
        { id: "11", name: "Redux" },
        { id: "12", name: "Material UI" },
      ],
      demoUrl: "#",
      codeUrl: "#",
      featured: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  // Use fallback projects if API fails or no projects are returned
  const displayProjects = projects.length > 0 ? projects : fallbackProjects;

  return (
    <section id="projects" className="py-20">
      <div className="container">
        <motion.div
          ref={ref}
          className="space-y-12"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.div className="text-center space-y-4" variants={itemVariants}>
            <Badge>Projects</Badge>
            <h2 className="text-3xl md:text-4xl font-bold">My Recent Work</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Here are some of my recent projects. Each project is unique and
              solves a specific problem.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <motion.div className="text-center py-8" variants={itemVariants}>
              <p className="text-red-500">{error}</p>
              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                className="mt-4"
              >
                Try Again
              </Button>
            </motion.div>
          ) : (
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
            >
              {displayProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  whileHover={{ y: -10, transition: { duration: 0.2 } }}
                >
                  <Card className="overflow-hidden h-full flex flex-col dark:border-gray-700 dark:hover:border-primary/50 transition-colors">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={
                          project.imageUrl ||
                          "/placeholder.svg?height=400&width=600"
                        }
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                      {project.featured && (
                        <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                          Featured
                        </div>
                      )}
                    </div>
                    <CardContent className="flex flex-col flex-grow p-6">
                      <h3 className="text-xl font-bold mb-2">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 flex-grow">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                          <Badge
                            key={tag.id}
                            variant="secondary"
                            className="dark:bg-gray-800"
                          >
                            {tag.name}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-3 mt-auto">
                        {project.demoUrl && (
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="dark:hover:bg-gray-800"
                          >
                            <Link href={project.demoUrl}>
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Live Demo
                            </Link>
                          </Button>
                        )}
                        {project.codeUrl && (
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="dark:hover:bg-gray-800"
                          >
                            <Link href={project.codeUrl}>
                              <Code className="mr-2 h-4 w-4" />
                              View Code
                            </Link>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}

          <motion.div className="text-center" variants={itemVariants}>
            <Button
              size="lg"
              variant="outline"
              className="dark:hover:bg-gray-800"
              onClick={() => scrollToElement("projects")}
              asChild
            >
              <Link href="/projects">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
