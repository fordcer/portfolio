import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clean up existing data
  await prisma.tag.deleteMany();
  await prisma.project.deleteMany();
  await prisma.skill.deleteMany();

  console.log("Seeding database...");

  // Create skills
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
  ];

  for (const skill of skills) {
    await prisma.skill.create({
      data: skill,
    });
  }

  console.log("Created skills");

  // Create tags
  const tags = [
    "React",
    "Node.js",
    "MongoDB",
    "Stripe",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Chart.js",
    "Firebase",
    "Redux",
    "Material UI",
  ];

  const tagObjects: Record<string, { id: string }> = {};

  for (const tag of tags) {
    const createdTag = await prisma.tag.create({
      data: { name: tag },
    });
    tagObjects[tag] = createdTag;
  }

  console.log("Created tags");

  // Create projects
  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "A full-stack e-commerce platform with payment processing and inventory management.",
      imageUrl: "/placeholder.svg?height=400&width=600",
      demoUrl: "https://example.com/demo1",
      codeUrl: "https://github.com/example/ecommerce",
      featured: true,
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
    },
    {
      title: "Social Media Dashboard",
      description:
        "A responsive dashboard for managing social media accounts and analytics.",
      imageUrl: "/placeholder.svg?height=400&width=600",
      demoUrl: "https://example.com/demo2",
      codeUrl: "https://github.com/example/dashboard",
      featured: true,
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Chart.js"],
    },
    {
      title: "Task Management App",
      description:
        "A collaborative task management application with real-time updates.",
      imageUrl: "/placeholder.svg?height=400&width=600",
      demoUrl: "https://example.com/demo3",
      codeUrl: "https://github.com/example/taskapp",
      featured: false,
      tags: ["React", "Firebase", "Redux", "Material UI"],
    },
  ];

  for (const project of projects) {
    await prisma.project.create({
      data: {
        title: project.title,
        description: project.description,
        imageUrl: project.imageUrl,
        demoUrl: project.demoUrl,
        codeUrl: project.codeUrl,
        featured: project.featured,
        tags: {
          connect: project.tags.map((tag) => ({ id: tagObjects[tag].id })),
        },
      },
    });
  }

  console.log("Created projects");
  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
