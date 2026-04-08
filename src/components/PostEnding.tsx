import { useRef } from 'react'
import confetti from 'canvas-confetti'

// Warm palette + pops of contrast — matches the site's brand feel
const COLORS = ['#f59e0b', '#fb923c', '#fbbf24', '#34d399', '#f87171', '#a78bfa']

export default function PostEnding() {
  const emojiRef = useRef<HTMLButtonElement>(null)

  function fire() {
    if (!emojiRef.current) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const rect = emojiRef.current.getBoundingClientRect()

    confetti({
      particleCount: 90,
      spread: 65,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      },
      colors: COLORS,
      startVelocity: 28,
      gravity: 0.85,
      decay: 0.92,
      ticks: 200,
    })
  }

  return (
    <div className="post-ending">
      <p className="post-ending__text">
        Thank you for reading{' '}
        <button
          ref={emojiRef}
          className="post-ending__emoji"
          onClick={fire}
          aria-label="Celebrate"
          type="button"
        >
          🎉
        </button>
        <span className="post-ending__hint">← You can click me!</span>
      </p>
    </div>
  )
}
