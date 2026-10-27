import { cn } from 'cn'

interface MarqueeProps {
  items: string[]
  reverse?: boolean
}

// Бесконечная бегущая строка: две одинаковые ленты сдвигаются на свою ширину (keyframes marquee в index.css)
export function Marquee({ items, reverse }: MarqueeProps) {
  return (
    <div className="group flex overflow-hidden mask-[linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
      {[0, 1].map((copy) => (
        <ul
          key={copy}
          aria-hidden={copy === 1}
          className={cn(
            'flex shrink-0 animate-marquee items-center gap-3 pr-3 group-hover:[animation-play-state:paused] motion-reduce:animate-none',
            reverse && '[animation-direction:reverse]',
          )}
        >
          {items.map((item) => (
            <li
              key={item}
              className="rounded-full border bg-card/60 px-4 py-2 font-mono text-sm whitespace-nowrap text-muted-foreground"
            >
              {item}
            </li>
          ))}
        </ul>
      ))}
    </div>
  )
}
