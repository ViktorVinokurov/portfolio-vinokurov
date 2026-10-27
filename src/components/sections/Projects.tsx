import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, CircleAlert, GitFork, Star } from 'lucide-react'
import { cn } from 'cn'
import { GithubIcon } from '@/components/GithubIcon'
import { Reveal } from '@/components/Reveal'
import { Section } from '@/components/Section'
import { TiltCard } from '@/components/TiltCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { profile } from '@/data/profile'
import { formatMonthYear } from '@/lib/format'
import { easeOutExpo } from '@/lib/motion'
import { useAppDispatch, useAppSelector } from '@/store'
import { useGetReposQuery, type Repo } from '@/store/githubApi'
import { setLanguage } from '@/store/projectsSlice'

// Цвета языков как на GitHub; для остальных — основной цвет темы
const languageColors: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Vue: '#41b883',
  HTML: '#e34c26',
  CSS: '#663399',
  PHP: '#4f5d95',
  'C#': '#178600',
  Python: '#3572a5',
}

function RepoCard({ repo }: { repo: Repo }) {
  return (
    <Card className="group relative h-full bg-card/60 transition-all duration-300 hover:ring-primary/60 hover:shadow-[0_10px_40px_-10px] hover:shadow-primary/40">
      <CardHeader>
        <CardTitle className="flex items-start justify-between gap-3 text-lg">
          <a href={repo.html_url} target="_blank" rel="noreferrer" className="after:absolute after:inset-0">
            {repo.name}
          </a>
          <ArrowUpRight className="size-5 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
        </CardTitle>
        <CardDescription className="leading-relaxed">
          {repo.description ?? 'Описание пока не добавлено'}
        </CardDescription>
      </CardHeader>
      <CardContent className="mt-auto flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span
              className="size-2.5 rounded-full"
              style={{ backgroundColor: languageColors[repo.language] ?? 'var(--primary)' }}
            />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1">
          <Star className="size-4" /> {repo.stargazers_count}
        </span>
        <span className="flex items-center gap-1">
          <GitFork className="size-4" /> {repo.forks_count}
        </span>
      </CardContent>
      <CardFooter className="bg-transparent text-xs text-muted-foreground">
        Обновлён: {formatMonthYear(repo.pushed_at)}
      </CardFooter>
    </Card>
  )
}

export function Projects() {
  const dispatch = useAppDispatch()
  const selectedLanguage = useAppSelector((state) => state.projects.language)
  const { data: repos, isLoading, isError } = useGetReposQuery(profile.github.username)

  const languages = [...new Set(repos?.map((repo) => repo.language).filter((lang) => lang !== null))]
  const visibleRepos = selectedLanguage ? repos?.filter((repo) => repo.language === selectedLanguage) : repos

  return (
    <Section id="projects" number="04" eyebrow="Проекты" title="Репозитории на GitHub">
      {languages.length > 1 && (
        <Reveal className="mb-8 flex w-fit flex-wrap gap-1 rounded-full border bg-card/60 p-1">
          {[null, ...languages].map((lang) => (
            <button
              key={lang ?? 'all'}
              type="button"
              onClick={() => dispatch(setLanguage(lang))}
              className={cn(
                'relative rounded-full px-4 py-1.5 text-sm transition-colors',
                selectedLanguage === lang ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {/* Подложка активного фильтра «перетекает» между кнопками */}
              {selectedLanguage === lang && (
                <motion.span
                  layoutId="language-pill"
                  className="absolute inset-0 rounded-full bg-primary"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">{lang ?? 'Все'}</span>
            </button>
          ))}
        </Reveal>
      )}

      {isLoading && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }, (_, i) => (
            <Skeleton key={i} className="h-48 rounded-xl" />
          ))}
        </div>
      )}

      {isError && (
        <Reveal>
          <div className="flex items-start gap-3 rounded-xl border border-destructive/40 bg-destructive/10 p-5">
            <CircleAlert className="mt-0.5 size-5 shrink-0 text-destructive" />
            <p>
              Не удалось загрузить репозитории — возможно, исчерпан лимит запросов к GitHub API. Все проекты можно
              посмотреть{' '}
              <a href={profile.github.url} target="_blank" rel="noreferrer" className="text-primary underline">
                на GitHub
              </a>
              .
            </p>
          </div>
        </Reveal>
      )}

      {visibleRepos && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* При смене фильтра оставшиеся карточки плавно переезжают на новые места, лишние — схлопываются */}
          <AnimatePresence mode="popLayout">
            {visibleRepos.map((repo, index) => (
              <motion.div
                key={repo.id}
                layout
                initial={{ opacity: 0, y: 40, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85, filter: 'blur(6px)' }}
                viewport={{ once: true }}
                transition={{
                  default: { duration: 0.6, delay: (index % 3) * 0.1, ease: easeOutExpo },
                  layout: { type: 'spring', stiffness: 300, damping: 30 },
                }}
              >
                <TiltCard max={6} className="h-full rounded-xl">
                  <RepoCard repo={repo} />
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <Reveal className="mt-10 text-center">
        <Button asChild variant="outline" size="lg" className="h-11 px-5">
          <a href={`${profile.github.url}?tab=repositories`} target="_blank" rel="noreferrer">
            <GithubIcon className="size-4" /> Все репозитории на GitHub
          </a>
        </Button>
      </Reveal>
    </Section>
  )
}
