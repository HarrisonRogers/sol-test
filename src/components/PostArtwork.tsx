type PostArtworkProps = {
  accent: string
  art: string
  label?: string
  compact?: boolean
}

export function PostArtwork({ accent, art, label, compact = false }: PostArtworkProps) {
  return (
    <div className={`post-art art-${accent} pattern-${art} ${compact ? 'art-compact' : ''}`} aria-hidden="true">
      <div className="art-noise" />
      <div className="art-shape shape-one" />
      <div className="art-shape shape-two" />
      <div className="art-shape shape-three" />
      {label && <span className="art-label">{label}</span>}
      <span className="art-stamp">FIELD<br />NOTE</span>
    </div>
  )
}
