import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      include: {
        tags: true,
      },
    })

    return NextResponse.json(skills)
  } catch (error) {
    console.error("Error fetching skills:", error)
    return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json()

    const { name, icon, category, tags } = json

    // Create the skill
    const skill = await prisma.skill.create({
      data: {
        name,
        icon,
        category,
        tags: {
          connectOrCreate: tags
            ? tags.map((tag: string) => ({
                where: { name: tag },
                create: { name: tag },
              }))
            : [],
        },
      },
      include: {
        tags: true,
      },
    })

    return NextResponse.json(skill, { status: 201 })
  } catch (error) {
    console.error("Error creating skill:", error)
    return NextResponse.json({ error: "Failed to create skill" }, { status: 500 })
  }
}

