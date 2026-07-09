import { Link } from '@tanstack/react-router'
import {
  ArrowLeft,
  BadgeCheck,
  Bookmark,
  Check,
  Eye,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Repeat2,
  Send,
  Share2,
} from 'lucide-react'
import { FormEvent, useMemo, useState } from 'react'
import type { Comment, Post } from '../data/content'
import { posts } from '../data/content'
import { Avatar } from './Avatar'
import { PostArtwork } from './PostArtwork'
import { SiteHeader } from './SiteHeader'

type ArticlePageProps = {
  post: Post
  initialComments: Array<Comment>
}

export function ArticlePage({ post, initialComments }: ArticlePageProps) {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [copied, setCopied] = useState(false)

  async function shareArticle() {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    }
  }

  return (
    <div className="site-page article-page">
      <SiteHeader />

      <main>
        <section className="article-head shell">
          <Link to="/" className="back-link"><ArrowLeft size={17} /> Back to the notebook</Link>
          <div className="article-title-wrap">
            <div className="article-kicker"><span>{post.category}</span><i />{post.date}<i />{post.readTime}</div>
            <h1>{post.title}</h1>
            <p>{post.dek}</p>
            <div className="article-byline">
              <Avatar initials={post.author.avatar} color={post.author.color} size="large" />
              <div><strong>{post.author.name}</strong><span>{post.author.role} · {post.author.handle}</span></div>
              <button type="button" className="follow-button">Follow</button>
            </div>
          </div>
        </section>

        <section className="article-visual shell">
          <PostArtwork accent={post.accent} art={post.art} label={`FIELDNOTE / ${post.category}`} />
        </section>

        <section className="article-layout shell">
          <aside className="article-actions" aria-label="Article actions">
            <span className="action-label">Respond</span>
            <button className={liked ? 'is-active' : ''} type="button" onClick={() => setLiked((value) => !value)} aria-label="Like this article">
              <Heart size={20} fill={liked ? 'currentColor' : 'none'} /><span>{liked ? 329 : 328}</span>
            </button>
            <a href="#conversation" aria-label="Jump to comments"><MessageCircle size={20} /><span>{post.commentCount}</span></a>
            <button type="button" onClick={shareArticle} aria-label="Copy article link">{copied ? <Check size={20} /> : <Share2 size={20} />}</button>
            <button className={saved ? 'is-saved' : ''} type="button" onClick={() => setSaved((value) => !value)} aria-label="Save article"><Bookmark size={20} fill={saved ? 'currentColor' : 'none'} /></button>
          </aside>

          <article className="article-body">
            {post.body.map((block, index) => {
              if (block.type === 'heading') return <h2 key={index}>{block.text}</h2>
              if (block.type === 'quote') return <blockquote key={index}><span>“</span>{block.text}</blockquote>
              return <p key={index} className={index === 0 ? 'article-lede' : undefined}>{block.text}</p>
            })}

            <div className="article-end-mark"><span>FIELDNOTE</span><i /><strong>Thanks for reading.</strong></div>
          </article>

          <aside className="article-aside">
            <div className="aside-note">Worth your<br />next ten minutes <span>↓</span></div>
            <h3>Also in the notebook</h3>
            {posts.filter((item) => item.slug !== post.slug).slice(0, 3).map((item, index) => (
              <Link to="/blog/$slug" params={{ slug: item.slug }} key={item.slug} className="aside-story">
                <span>0{index + 1}</span>
                <div><strong>{item.title}</strong><small>{item.readTime}</small></div>
              </Link>
            ))}
          </aside>
        </section>

        <CommentsThread post={post} initialComments={initialComments} />
      </main>
    </div>
  )
}

function CommentsThread({ post, initialComments }: ArticlePageProps) {
  const [threadComments, setThreadComments] = useState(initialComments)
  const [draft, setDraft] = useState('')
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyDraft, setReplyDraft] = useState('')
  const [sort, setSort] = useState<'top' | 'latest'>('top')
  const [likedIds, setLikedIds] = useState<Array<string>>([])

  const roots = useMemo(() => {
    const items = threadComments.filter((comment) => comment.parentId === null)
    return sort === 'top' ? [...items].sort((a, b) => b.likes - a.likes) : [...items].reverse()
  }, [sort, threadComments])

  function addComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const text = draft.trim()
    if (!text) return
    setThreadComments((comments) => [{
      id: `local-${Date.now()}`,
      postSlug: post.slug,
      parentId: null,
      name: 'You',
      handle: '@guestreader',
      avatar: 'YO',
      color: 'coral',
      time: 'now',
      text,
      likes: 0,
      replies: 0,
      verified: false,
    }, ...comments])
    setDraft('')
    setSort('latest')
  }

  function addReply(event: FormEvent<HTMLFormElement>, parentId: string) {
    event.preventDefault()
    const text = replyDraft.trim()
    if (!text) return
    setThreadComments((comments) => [...comments, {
      id: `reply-${Date.now()}`,
      postSlug: post.slug,
      parentId,
      name: 'You',
      handle: '@guestreader',
      avatar: 'YO',
      color: 'coral',
      time: 'now',
      text,
      likes: 0,
      replies: 0,
      verified: false,
    }])
    setReplyDraft('')
    setReplyingTo(null)
  }

  function toggleCommentLike(id: string) {
    setLikedIds((ids) => ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id])
  }

  return (
    <section className="conversation" id="conversation">
      <div className="conversation-inner shell">
        <div className="conversation-heading">
          <div><span className="section-kicker">The good part starts here</span><h2>The conversation <sup>{threadComments.length}</sup></h2></div>
          <div className="sort-toggle" aria-label="Sort comments">
            <button className={sort === 'top' ? 'active' : ''} type="button" onClick={() => setSort('top')}>Top</button>
            <button className={sort === 'latest' ? 'active' : ''} type="button" onClick={() => setSort('latest')}>Latest</button>
          </div>
        </div>

        <div className="comment-layout">
          <div>
            <form className="comment-composer" onSubmit={addComment}>
              <Avatar initials="YO" color="coral" size="medium" />
              <div>
                <textarea value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Add something thoughtful…" aria-label="Write a comment" />
                <div className="composer-footer">
                  <span>{draft.length}/280</span>
                  <button type="submit" disabled={!draft.trim()}>Reply <Send size={15} /></button>
                </div>
              </div>
            </form>

            <div className="comment-list">
              {roots.map((comment) => {
                const replies = threadComments.filter((item) => item.parentId === comment.id)
                return (
                  <div className="thread-group" key={comment.id}>
                    <CommentCard
                      comment={comment}
                      liked={likedIds.includes(comment.id)}
                      onLike={() => toggleCommentLike(comment.id)}
                      onReply={() => {
                        setReplyingTo(replyingTo === comment.id ? null : comment.id)
                        setReplyDraft('')
                      }}
                    />
                    {replyingTo === comment.id && (
                      <form className="inline-reply" onSubmit={(event) => addReply(event, comment.id)}>
                        <Avatar initials="YO" color="coral" size="small" />
                        <input autoFocus value={replyDraft} onChange={(event) => setReplyDraft(event.target.value)} placeholder={`Reply to ${comment.handle}`} aria-label={`Reply to ${comment.name}`} />
                        <button type="submit" disabled={!replyDraft.trim()}><Send size={15} /></button>
                      </form>
                    )}
                    {replies.map((reply) => (
                      <div className="comment-reply" key={reply.id}>
                        <CommentCard
                          comment={reply}
                          liked={likedIds.includes(reply.id)}
                          onLike={() => toggleCommentLike(reply.id)}
                          onReply={() => {
                            setReplyingTo(comment.id)
                            setReplyDraft(`@${reply.handle.replace('@', '')} `)
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )
              })}
            </div>
          </div>

          <aside className="conversation-aside">
            <span className="conversation-bubble">✦</span>
            <h3>Keep it generous.</h3>
            <p>Challenge the idea, add context, tell a story. The best replies leave the room better than they found it.</p>
            <div><Eye size={15} /> 248 people are reading</div>
          </aside>
        </div>
      </div>
    </section>
  )
}

type CommentCardProps = {
  comment: Comment
  liked: boolean
  onLike: () => void
  onReply: () => void
}

function CommentCard({ comment, liked, onLike, onReply }: CommentCardProps) {
  return (
    <article className="comment-card">
      <Avatar initials={comment.avatar} color={comment.color} size="medium" />
      <div className="comment-main">
        <div className="comment-author">
          <strong>{comment.name}</strong>
          {comment.verified && <BadgeCheck size={15} className="verified" fill="currentColor" />}
          <span>{comment.handle} · {comment.time}</span>
          <button type="button" aria-label="More comment options"><MoreHorizontal size={18} /></button>
        </div>
        <p>{comment.text}</p>
        <div className="comment-actions">
          <button type="button" onClick={onReply}><MessageCircle size={16} /><span>{comment.replies || ''}</span></button>
          <button type="button"><Repeat2 size={17} /></button>
          <button className={liked ? 'liked' : ''} type="button" onClick={onLike}><Heart size={16} fill={liked ? 'currentColor' : 'none'} /><span>{comment.likes + (liked ? 1 : 0)}</span></button>
          <button type="button"><Share2 size={15} /></button>
        </div>
      </div>
    </article>
  )
}
