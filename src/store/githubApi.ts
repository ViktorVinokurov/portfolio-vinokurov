import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { profile } from '@/data/profile'

// Только поля, которые использует UI. Полный ответ: https://docs.github.com/en/rest/repos/repos#list-repositories-for-a-user
export interface Repo {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  topics: string[]
  fork: boolean
  pushed_at: string
}

// Запросы идут без токена (лимит 60 в час на IP), поэтому токен в бандл не добавлять
export const githubApi = createApi({
  reducerPath: 'githubApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com/' }),
  endpoints: (build) => ({
    getRepos: build.query<Repo[], string>({
      query: (username) => `users/${username}/repos?per_page=100&sort=pushed`,
      transformResponse: (repos: Repo[]) =>
        repos.filter((repo) => !repo.fork && !profile.github.hiddenRepos.includes(repo.name)),
    }),
  }),
})

export const { useGetReposQuery } = githubApi
