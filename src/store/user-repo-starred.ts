// store/starred-repos-store.ts
import { create } from "zustand"
import { getStarredRepos, Repo } from "../services/git-repo-services"

interface StarredRepoStore {
  starredRepos: Repo[]
  isLoading: boolean
  error: string | null
  getStarredRepos: (username: string) => Promise<void>
}

export const useStarredRepoStore = create<StarredRepoStore>((set) => ({
  starredRepos: [],
  isLoading: false,
  error: null,

  getStarredRepos: async (username: string) => {
    set({ isLoading: true, error: null })

    try {
      const starredRepos = await getStarredRepos(username)
      set({ starredRepos, isLoading: false })
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Erro ao buscar repositórios estrelados",
        isLoading: false,
      })
    }
  },
}))
