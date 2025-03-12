export interface Project {
  id: string
  title: string
  description: string
  imageUrl: string
  demoUrl?: string
  codeUrl?: string
  featured: boolean
  tags: Tag[]
  createdAt: string
  updatedAt: string
}

export interface Skill {
  id: string
  name: string
  icon: string
  category?: string
  tags: Tag[]
  createdAt: string
  updatedAt: string
}

export interface Tag {
  id: string
  name: string
}

export interface ContactFormData {
  name: string
  email: string
  subject?: string
  message: string
}

