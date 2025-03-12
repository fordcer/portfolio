"use server"

import { z } from "zod"
import prisma from "@/lib/prisma"

// Define validation schema
const ContactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export async function submitContactForm(formData: FormData) {
  try {
    // Extract data from FormData
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    // Validate the data
    const result = ContactSchema.safeParse({ name, email, subject, message })

    if (!result.success) {
      return {
        success: false,
        errors: result.error.flatten().fieldErrors,
      }
    }

    // Save to database
    await prisma.contact.create({
      data: {
        name,
        email,
        subject: subject || "No Subject",
        message,
      },
    })

    return {
      success: true,
      message: "Your message has been sent successfully!",
    }
  } catch (error) {
    console.error("Error submitting contact form:", error)
    return {
      success: false,
      message: "Failed to submit the form. Please try again later.",
    }
  }
}

