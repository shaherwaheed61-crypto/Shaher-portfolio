import { defineConfig, defineCollection, s } from 'velite'

const projects = defineCollection({
  name: 'Project',
  pattern: 'projects/**/*.mdx',
  schema: s
    .object({
      title: s.string(),
      slug: s.slug('projects'),
      employer: s.string(),
      client: s.string().optional(),
      consultant: s.string().optional(),
      role: s.string(),
      location: s.string(),
      period: s.string(),
      summary: s.string(),
      cover: s.string(),
      gallery: s.array(s.string()).default([]),
      tags: s.array(s.string()).default([]),
      order: s.number().default(0),
      body: s.mdx()
    })
    .transform((data) => ({ ...data, permalink: `/projects/${data.slug}` }))
})

export default defineConfig({
  root: 'content',
  collections: { projects }
})
