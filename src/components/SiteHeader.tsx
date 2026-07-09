import { Link } from '@tanstack/react-router'
import { Menu, Search, X } from 'lucide-react'
import { useState } from 'react'

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <>
      <header className="site-header">
        <div className="shell header-inner">
          <Link to="/" className="brand" aria-label="Fieldnote home">
            <span className="brand-mark"><i /><i /><i /></span>
            <span>FIELDNOTE</span>
          </Link>

          <nav className="desktop-nav" aria-label="Main navigation">
            <Link to="/" activeOptions={{ exact: true }}>Latest</Link>
            <a href="/#stories">Stories</a>
            <a href="/#topics">Topics</a>
            <a href="/#about">About</a>
          </nav>

          <div className="header-actions">
            <button
              className="icon-button"
              type="button"
              aria-label="Search Fieldnote"
              onClick={() => setSearchOpen(true)}
            >
              <Search size={19} strokeWidth={2.2} />
            </button>
            <a className="subscribe-button" href="/#newsletter">Join the notes</a>
            <button
              className="icon-button mobile-menu-button"
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((value) => !value)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            <Link to="/" onClick={() => setMenuOpen(false)}>Latest</Link>
            <a href="/#stories" onClick={() => setMenuOpen(false)}>Stories</a>
            <a href="/#topics" onClick={() => setMenuOpen(false)}>Topics</a>
            <a href="/#about" onClick={() => setMenuOpen(false)}>About</a>
          </nav>
        )}
      </header>

      {searchOpen && (
        <div className="search-layer" role="dialog" aria-modal="true" aria-label="Search Fieldnote">
          <button
            className="search-scrim"
            type="button"
            aria-label="Close search"
            onClick={() => setSearchOpen(false)}
          />
          <div className="search-box">
            <div className="search-title">
              <span>Find a fieldnote</span>
              <button type="button" className="icon-button" onClick={() => setSearchOpen(false)} aria-label="Close search"><X size={20} /></button>
            </div>
            <label className="search-input-wrap">
              <Search size={21} />
              <input autoFocus placeholder="Try ‘design’, ‘quiet web’…" />
            </label>
            <p>Search is a visual demo for now — all stories are loaded from local JSON.</p>
          </div>
        </div>
      )}
    </>
  )
}
