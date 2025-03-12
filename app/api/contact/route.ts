import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const json = await request.json()

    const { name, email, subject, message } = json

    // Validate the input
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 })
    }

    // Create the contact submission
    const contact = await prisma.contact.create({
      data: {
        name,
        email,
        subject: subject || "No Subject",
        message,
      },
    })

    return NextResponse.json(contact, { status: 201 })
  } catch (error) {
    console.error("Error submitting contact form:", error)
    return NextResponse.json({ error: "Failed to submit contact form" }, { status: 500 })
  }
}

