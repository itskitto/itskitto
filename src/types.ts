export interface NavItem {
  label: string
  href: string
  count?: number
}

export interface NavSection {
  heading: string
  items: NavItem[]
}

import type { ImageMetadata } from 'astro'

export interface SidebarConfig {
  name: string
  title: string
  initials: string
  avatarSrc?: ImageMetadata
  cta?: { label: string; href: string; comingSoon?: boolean }
  nav?: NavSection[]
  availability?: string
}

export interface StatusConfig {
  messages?: string[]
  interval?: number
  right?: string
}
