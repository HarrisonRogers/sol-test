type AvatarProps = {
  initials: string
  color: string
  size?: 'small' | 'medium' | 'large'
}

export function Avatar({ initials, color, size = 'medium' }: AvatarProps) {
  return <span className={`avatar avatar-${color} avatar-${size}`} aria-hidden="true">{initials}</span>
}
