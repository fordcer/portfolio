"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useAnimation, type Variants } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import type { Skill } from "@/types"

export function SkillsSection() {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const [skills, setSkills] = useState<Skill[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchSkills() {
      try {
        const response = await fetch("/api/skills")

        if (!response.ok) {
          throw new Error("Failed to fetch skills")
        }

        const data = await response.json()
        setSkills(data)
      } catch (err) {
        console.error("Error fetching skills:", err)
        setError("Failed to load skills. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchSkills()
  }, [])

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

  // Fallback skills if none are loaded from the API
  const fallbackSkills = [
    { id: "1", name: "React", icon: "⚛️", createdAt: "", updatedAt: "", tags: [] },
    { id: "2", name: "Next.js", icon: "▲", createdAt: "", updatedAt: "", tags: [] },
    { id: "3", name: "TypeScript", icon: "TS", createdAt: "", updatedAt: "", tags: [] },
    { id: "4", name: "Node.js", icon: "🟢", createdAt: "", updatedAt: "", tags: [] },
    { id: "5", name: "Tailwind CSS", icon: "🌊", createdAt: "", updatedAt: "", tags: [] },
    { id: "6", name: "JavaScript", icon: "JS", createdAt: "", updatedAt: "", tags: [] },
    { id: "7", name: "HTML", icon: "🌐", createdAt: "", updatedAt: "", tags: [] },
    { id: "8", name: "CSS", icon: "🎨", createdAt: "", updatedAt: "", tags: [] },
    { id: "9", name: "Git", icon: "🔄", createdAt: "", updatedAt: "", tags: [] },
    { id: "10", name: "MongoDB", icon: "🍃", createdAt: "", updatedAt: "", tags: [] },
    { id: "11", name: "PostgreSQL", icon: "🐘", createdAt: "", updatedAt: "", tags: [] },
    { id: "12", name: "GraphQL", icon: "◢", createdAt: "", updatedAt: "", tags: [] },
  ]

  // Use fallback skills if API fails or no skills are returned
  const displaySkills = skills.length > 0 ? skills : fallbackSkills

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

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <motion.div className="text-center py-8" variants={itemVariants}>
              <p className="text-red-500">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md"
              >
                Try Again
              </button>
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
              variants={containerVariants}
            >
              {displaySkills.map((skill) => (
                <motion.div
                  key={skill.id}
                  className="bg-background rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow border dark:border-gray-700 dark:hover:border-primary/50"
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="text-3xl mb-2">{skill.icon}</div>
                  <h3 className="font-medium">{skill.name}</h3>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

