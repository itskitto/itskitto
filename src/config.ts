import type { SidebarConfig } from './types'
import avatarSrc from './assets/profile.jpeg'

export const SITE_TITLE = 'Nicholas Khrangtong'

export const STATUS_MESSAGES = [
  'SYSTEMS NOMINAL',
  'LAST QUERY: CAN AI BENEFIT BUSINESS OPS?',
  'CURRENT BUILD: GREENLINE LANDSCAPING',
  'PIPELINE STATUS: REDUCING FRICTION',
  'EDITOR: VSCODE | FONT: JETBRAINS MONO',
  'MODE: FOCUSED',
  'STACK: REACT / TS / RAILS / PYTHON',
]

/** Base sidebar config — nav counts are merged in per-page where needed */
export const SIDEBAR: SidebarConfig = {
  name: 'Nicholas Khrangtong',
  title: 'Software Engineer & Technical Consultant',
  initials: 'NK',
  avatarSrc,
  cta: { label: 'Explore sandbox', href: 'https://sandbox.itskitto.dev', comingSoon: true },
  availability: 'Available for projects. Open to full-time positions',
}
