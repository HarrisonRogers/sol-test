import { createFileRoute, notFound } from '@tanstack/react-router'
import { ArticlePage } from '../components/ArticlePage'
import { getComments, getPost } from '../data/content'

export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params }) => {
    const post = getPost(params.slug)
    if (!post) throw notFound()
    return { post, comments: getComments(params.slug) }
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.post.title} — FIELDNOTE` },
      { name: 'description', content: loaderData.post.dek },
      { property: 'og:title', content: loaderData.post.title },
      { property: 'og:description', content: loaderData.post.dek },
      { property: 'og:type', content: 'article' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ] : [],
  }),
  component: ArticleRoute,
})

function ArticleRoute() {
  const { post, comments } = Route.useLoaderData()
  return <ArticlePage post={post} initialComments={comments} />
}
