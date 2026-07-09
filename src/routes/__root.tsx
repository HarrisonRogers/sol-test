import type { ReactNode } from 'react'
import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { getRequest } from '@tanstack/react-start/server'
import appCss from '../styles.css?url'

const getSiteOrigin = createServerFn({ method: 'GET' }).handler(() => {
  return new URL(getRequest().url).origin
})

export const Route = createRootRoute({
  loader: () => getSiteOrigin(),
  head: ({ loaderData }) => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'FIELDNOTE — Stories for curious humans' },
      { name: 'description', content: 'Independent stories on design, technology, work and the small details that make ordinary life feel electric.' },
      { name: 'theme-color', content: '#f4efe5' },
      { property: 'og:title', content: 'FIELDNOTE — Stories for curious humans' },
      { property: 'og:description', content: 'Independent ideas on design, technology, work and culture.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: `${loaderData}/og.png` },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: 'FIELDNOTE — Stories for curious humans' },
      { name: 'twitter:image', content: `${loaderData}/og.png` },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', href: '/favicon.png', type: 'image/png' },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
