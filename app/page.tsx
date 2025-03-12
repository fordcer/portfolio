"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView, useAnimation, type Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Mail, ExternalLink, Code, ArrowRight } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

function Header() {
  return (
    <motion.header
      className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-bold text-xl">
          <span className="text-primary">Dev</span>Portfolio
        </Link>
        <nav className="hidden md:flex gap-6">
          {["Home", "Skills", "Projects", "About", "Contact"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {item}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button>
            <Mail className="mr-2 h-4 w-4" />
            Contact Me
          </Button>
        </div>
      </div>
    </motion.header>
  )
}

function HeroSection() {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

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
            <motion.h1 className="text-4xl md:text-6xl font-bold tracking-tight" variants={itemVariants}>
              Hi, I'm <span className="text-primary">John Doe</span>
            </motion.h1>
            <TypewriterText text="Full Stack Web Developer" />
            <motion.p className="text-muted-foreground text-lg md:text-xl max-w-md" variants={itemVariants}>
              I build exceptional and accessible digital experiences for the web.
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row gap-3 pt-4" variants={itemVariants}>
              <Button size="lg">
                View My Work
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Download Resume
              </Button>
            </motion.div>
          </motion.div>
          <motion.div className="relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden" variants={itemVariants}>
            <Image src="/placeholder.svg?height=500&width=500" alt="John Doe" fill className="object-cover" priority />
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute -z-10 top-0 right-0 left-0 h-full bg-gradient-to-b from-primary/5 to-background dark:from-primary/10 dark:to-background" />
    </section>
  )
}

function TypewriterText({ text }: { text: string }) {
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
  )
}

function SkillsSection() {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  const skills = [
    { name: "React", icon: "⚛️" },
    { name: "Next.js", icon: "▲" },
    { name: "TypeScript", icon: "TS" },
    { name: "Node.js", icon: "🟢" },
    { name: "Tailwind CSS", icon: "🌊" },
    { name: "JavaScript", icon: "JS" },
    { name: "HTML", icon: "🌐" },
    { name: "CSS", icon: "🎨" },
    { name: "Git", icon: "🔄" },
    { name: "MongoDB", icon: "🍃" },
    { name: "PostgreSQL", icon: "🐘" },
    { name: "GraphQL", icon: "◢" },
  ]

  return (
    <section id="skills" className="py-20 bg-muted/50">
      <div className="container">
        <motion.div ref={ref} className="space-y-12" variants={containerVariants} initial="hidden" animate={controls}>
          <motion.div className="text-center space-y-4" variants={itemVariants}>
            <Badge>Skills</Badge>
            <h2 className="text-3xl md:text-4xl font-bold">My Technical Skills</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              I've worked with a range of technologies in the web development world, from front-end to back-end.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
            variants={containerVariants}
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="bg-background rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow border dark:border-gray-700 dark:hover:border-primary/50"
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div className="text-3xl mb-2">{skill.icon}</div>
                <h3 className="font-medium">{skill.name}</h3>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function ProjectsSection() {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  }

  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce platform with payment processing and inventory management.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      demoUrl: "#",
      codeUrl: "#",
    },
    {
      title: "Social Media Dashboard",
      description: "A responsive dashboard for managing social media accounts and analytics.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Chart.js"],
      demoUrl: "#",
      codeUrl: "#",
    },
    {
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["React", "Firebase", "Redux", "Material UI"],
      demoUrl: "#",
      codeUrl: "#",
    },
  ]

  return (
    <section id="projects" className="py-20">
      <div className="container">
        <motion.div ref={ref} className="space-y-12" variants={containerVariants} initial="hidden" animate={controls}>
          <motion.div className="text-center space-y-4" variants={itemVariants}>
            <Badge>Projects</Badge>
            <h2 className="text-3xl md:text-4xl font-bold">My Recent Work</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Here are some of my recent projects. Each project is unique and solves a specific problem.
            </p>
          </motion.div>

          <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" variants={containerVariants}>
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
              >
                <Card className="overflow-hidden h-full flex flex-col dark:border-gray-700 dark:hover:border-primary/50 transition-colors">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <CardContent className="flex flex-col flex-grow p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-muted-foreground mb-4 flex-grow">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="dark:bg-gray-800">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-3 mt-auto">
                      <Button variant="outline" size="sm" asChild className="dark:hover:bg-gray-800">
                        <Link href={project.demoUrl}>
                          <ExternalLink className="mr-2 h-4 w-4" />
                          Live Demo
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild className="dark:hover:bg-gray-800">
                        <Link href={project.codeUrl}>
                          <Code className="mr-2 h-4 w-4" />
                          View Code
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className="text-center" variants={itemVariants}>
            <Button size="lg" variant="outline" className="dark:hover:bg-gray-800">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function AboutSection() {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

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
          <motion.div className="relative h-[400px] rounded-lg overflow-hidden" variants={itemVariants}>
            <Image src="/placeholder.svg?height=400&width=600" alt="About John Doe" fill className="object-cover" />
          </motion.div>
          <motion.div className="space-y-4" variants={containerVariants}>
            <motion.div variants={itemVariants}>
              <Badge>About Me</Badge>
            </motion.div>
            <motion.h2 className="text-3xl md:text-4xl font-bold" variants={itemVariants}>
              My Journey as a Developer
            </motion.h2>
            <motion.p className="text-muted-foreground" variants={itemVariants}>
              I'm a passionate web developer with over 5 years of experience building modern web applications. My
              journey began when I discovered my love for turning ideas into reality through code.
            </motion.p>
            <motion.p className="text-muted-foreground" variants={itemVariants}>
              I specialize in building responsive, accessible, and performant web applications using modern technologies
              like React, Next.js, and Node.js. I'm constantly learning and exploring new technologies to stay at the
              forefront of web development.
            </motion.p>
            <motion.p className="text-muted-foreground" variants={itemVariants}>
              When I'm not coding, you can find me hiking, reading, or experimenting with new recipes in the kitchen.
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
  )
}

function ContactSection() {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="contact" className="py-20">
      <div className="container max-w-4xl">
        <motion.div ref={ref} className="space-y-8" variants={containerVariants} initial="hidden" animate={controls}>
          <motion.div className="text-center space-y-4" variants={itemVariants}>
            <Badge>Contact</Badge>
            <h2 className="text-3xl md:text-4xl font-bold">Get In Touch</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Have a project in mind or just want to say hello? Feel free to reach out!
            </p>
          </motion.div>

          <motion.div className="bg-card rounded-lg p-6 md:p-8 shadow-sm border" variants={itemVariants}>
            <form className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <input
                    id="name"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <input
                  id="subject"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Project Inquiry"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Tell me about your project..."
                />
              </div>
              <Button type="submit" className="w-full sm:w-auto">
                Send Message
              </Button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t py-8 md:py-12">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div>
          <Link href="/" className="font-bold text-xl">
            <span className="text-primary">Dev</span>Portfolio
          </Link>
          <p className="text-sm text-muted-foreground mt-1">
            &copy; {new Date().getFullYear()} John Doe. All rights reserved.
          </p>
        </div>
        <div className="flex gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="#" aria-label="GitHub">
              <Github className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="#" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="#" aria-label="Email">
              <Mail className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  )
}

