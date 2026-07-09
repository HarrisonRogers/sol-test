import { Link } from '@tanstack/react-router'
import { ArrowRight, ArrowUpRight, Clock3, Mail, MessageCircle, Sparkles } from 'lucide-react'
import { FormEvent, useState } from 'react'
import { posts } from '../data/content'
import { Avatar } from './Avatar'
import { PostArtwork } from './PostArtwork'
import { SiteHeader } from './SiteHeader'

export function HomePage() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const featured = posts.find((post) => post.featured) ?? posts[0]
  const latest = posts.filter((post) => !post.featured)

  function handleSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (email.trim()) setSubscribed(true)
  }

  return (
    <div className="site-page">
      <SiteHeader />

      <main>
        <section className="hero shell">
          <div className="hero-copy">
            <div className="eyebrow"><Sparkles size={15} fill="currentColor" /> Independent ideas, weekly-ish</div>
            <h1>Stories for<br />curious <em>humans.</em></h1>
            <p>Notes on design, technology, work and the small details that make ordinary life feel electric.</p>
            <div className="hero-actions">
              <a className="primary-button" href="#stories">Start reading <ArrowRight size={18} /></a>
              <span className="reader-note"><span className="mini-faces"><i>J</i><i>M</i><i>S</i></span> Read by 12,400 curious minds</span>
            </div>
          </div>

          <Link to="/blog/$slug" params={{ slug: featured.slug }} className="featured-story">
            <PostArtwork accent={featured.accent} art={featured.art} label="Issue 042" />
            <div className="featured-card-copy">
              <div className="story-meta"><span>{featured.category}</span><span>{featured.readTime}</span></div>
              <h2>{featured.title}</h2>
              <p>{featured.dek}</p>
              <div className="author-line">
                <Avatar initials={featured.author.avatar} color={featured.author.color} size="small" />
                <span>By {featured.author.name}</span>
                <time>{featured.date}</time>
                <ArrowUpRight className="featured-arrow" size={22} />
              </div>
            </div>
          </Link>
        </section>

        <section className="ticker" id="topics" aria-label="Topics covered">
          <div className="ticker-track">
            <span>Design</span><i>✦</i><span>Culture</span><i>✦</i><span>Technology</span><i>✦</i><span>Good Work</span><i>✦</i><span>Odd Objects</span><i>✦</i><span>Design</span><i>✦</i><span>Culture</span><i>✦</i><span>Technology</span>
          </div>
        </section>

        <section className="stories-section shell" id="stories">
          <div className="section-heading">
            <div>
              <span className="section-kicker">Fresh from the notebook</span>
              <h2>Latest stories</h2>
            </div>
            <div className="hand-note">New thoughts,<br />no hot takes <span>↘</span></div>
          </div>

          <div className="story-grid">
            {latest.map((post, index) => (
              <article className={`story-card story-card-${index + 1}`} key={post.slug}>
                <Link to="/blog/$slug" params={{ slug: post.slug }} className="story-art-link" aria-label={`Read ${post.title}`}>
                  <PostArtwork accent={post.accent} art={post.art} compact />
                </Link>
                <div className="story-card-body">
                  <div className="story-meta"><span>{post.category}</span><span><Clock3 size={13} /> {post.readTime}</span></div>
                  <h3><Link to="/blog/$slug" params={{ slug: post.slug }}>{post.title}</Link></h3>
                  <p>{post.dek}</p>
                  <div className="story-card-footer">
                    <div className="author-compact">
                      <Avatar initials={post.author.avatar} color={post.author.color} size="small" />
                      <span>{post.author.name}</span>
                    </div>
                    <span className="comment-count"><MessageCircle size={15} /> {post.commentCount}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="manifesto shell" id="about">
          <span className="manifesto-number">01—04</span>
          <p>We believe the internet feels better when ideas have room to <em>breathe</em>, writers sound like people and the comments are worth reading.</p>
          <div className="manifesto-seal"><span>Made for</span><strong>the second<br />cup of coffee</strong></div>
        </section>

        <section className="newsletter-wrap shell" id="newsletter">
          <div className="newsletter-card">
            <div className="newsletter-icon"><Mail size={29} /></div>
            <div className="newsletter-copy">
              <span className="section-kicker">A good email, imagine that</span>
              <h2>Keep a little curiosity in your inbox.</h2>
              <p>One thoughtful story every Sunday. No growth hacks. Unsubscribe whenever the vibe is off.</p>
            </div>
            {subscribed ? (
              <div className="success-note"><span>✓</span><strong>You’re on the list.</strong><small>See you Sunday.</small></div>
            ) : (
              <form className="newsletter-form" onSubmit={handleSubscribe}>
                <label htmlFor="email">Your email address</label>
                <div>
                  <input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required />
                  <button type="submit" aria-label="Subscribe"><ArrowRight size={19} /></button>
                </div>
                <small>Join 12,400 readers. Free forever.</small>
              </form>
            )}
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="shell footer-inner">
          <div className="brand footer-brand"><span className="brand-mark"><i /><i /><i /></span><span>FIELDNOTE</span></div>
          <p>Independent stories for interested people.</p>
          <div><a href="#stories">Instagram</a><a href="#stories">Are.na</a><a href="#stories">RSS</a></div>
          <span>© 2026, made slowly.</span>
        </div>
      </footer>
    </div>
  )
}
