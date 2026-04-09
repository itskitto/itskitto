/**
 * Initialises the reading progress bar on a detail page.
 * @param barId - The id of the progress bar element.
 * @param articleSelector - CSS selector for the article to measure.
 */
export function initReadingProgress(barId: string, articleSelector: string): void {
  const bar = document.getElementById(barId)
  const article = document.querySelector<HTMLElement>(articleSelector)
  if (!bar || !article) return

  let rafId: number | null = null

  function update(): void {
    if (rafId !== null) return
    rafId = requestAnimationFrame(() => {
      rafId = null
      const { top, height } = article!.getBoundingClientRect()
      const progress = -top / (height - window.innerHeight)
      bar!.style.transform = `scaleX(${Math.max(0, Math.min(1, progress))})`
    })
  }

  document.addEventListener('scroll', update, { passive: true })
}
