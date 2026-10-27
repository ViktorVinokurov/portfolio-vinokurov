// Русская форма слова для числа: plural(5, ['год', 'года', 'лет']) → 'лет'
export function plural(n: number, [one, few, many]: [string, string, string]) {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return one
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few
  return many
}

export function yearsSince(isoDate: string) {
  const ms = Date.now() - new Date(isoDate).getTime()
  return Math.floor(ms / (365.25 * 24 * 60 * 60 * 1000))
}

const monthYear = new Intl.DateTimeFormat('ru-RU', { month: 'long', year: 'numeric' })

export function formatMonthYear(isoDate: string) {
  return monthYear.format(new Date(isoDate))
}
