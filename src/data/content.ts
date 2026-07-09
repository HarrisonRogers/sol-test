import commentsJson from './comments.json'
import postsJson from './posts.json'

export type Author = {
  name: string
  handle: string
  role: string
  avatar: string
  color: string
}

export type BodyBlock = {
  type: 'paragraph' | 'heading' | 'quote'
  text: string
}

export type Post = {
  slug: string
  title: string
  dek: string
  category: string
  date: string
  readTime: string
  views: string
  commentCount: number
  accent: string
  art: string
  featured: boolean
  author: Author
  body: Array<BodyBlock>
}

export type Comment = {
  id: string
  postSlug: string
  parentId: string | null
  name: string
  handle: string
  avatar: string
  color: string
  time: string
  text: string
  likes: number
  replies: number
  verified: boolean
}

export const posts = postsJson as Array<Post>
export const comments = commentsJson as Array<Comment>

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug)
}

export function getComments(slug: string) {
  return comments.filter((comment) => comment.postSlug === slug)
}
