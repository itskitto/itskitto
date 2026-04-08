/**
 * Initialises the ToC active-section highlight via IntersectionObserver.
 * @param headingsSelector - CSS selector for the headings to observe.
 */
export function initTocObserver(headingsSelector: string): void {
  const headings = document.querySelectorAll<HTMLElement>(headingsSelector)
  const tocLinks = document.querySelectorAll<HTMLElement>('.toc__link')
  if (!headings.length || !tocLinks.length) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          tocLinks.forEach((link) => link.removeAttribute('aria-current'))
          const active = document.querySelector<HTMLElement>(
            `.toc__link[href="#${entry.target.id}"]`
          )
          if (active) active.setAttribute('aria-current', 'true')
        }
      })
    },
    { rootMargin: '-10% 0% -85% 0%' }
  )

  headings.forEach((h) => observer.observe(h))

  document.addEventListener(
    'scroll',
    () => {
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50
      if (atBottom) {
        tocLinks.forEach((l) => l.removeAttribute('aria-current'))
        tocLinks[tocLinks.length - 1]?.setAttribute('aria-current', 'true')
      }
    },
    { passive: true }
  )
}
