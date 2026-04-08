import { getCollection } from 'astro:content'

export async function getNav() {
  const [posts, projects] = await Promise.all([
    getCollection('posts', ({ data }) => (import.meta.env.PROD ? !data.draft : true)),
    getCollection('projects', ({ data }) => (import.meta.env.PROD ? !data.draft : true)),
  ])

  const categories = [...new Set(posts.map((p) => p.data.category))]

  return [
    {
      heading: 'Projects',
      items: [
        { label: 'All Projects', href: '/projects', count: projects.length },
        ...projects.map((p) => ({ label: p.data.title, href: `/projects/${p.id}` })),
      ],
    },
    {
      heading: 'Writing',
      items: [
        { label: 'All Posts', href: '/posts', count: posts.length },
        ...categories.map((cat) => ({
          label: cat,
          href: `/posts/category/${cat.toLowerCase().replace(/\s+/g, '-')}`,
          count: posts.filter((p) => p.data.category === cat).length,
        })),
      ],
    },
  ]
}
