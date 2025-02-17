import { create } from "zustand"
import { Repositories, Repo } from "../services/git-repo-services"

interface RepoStore {
  username: string
  repositories: Repo[]
  isLoading: boolean
  error: string | null
  setUsername: (username: string) => void
  UsersRepositories: (username: string) => Promise<void>
}

export const useRepoStore = create<RepoStore>((set, get) => ({
  username: localStorage.getItem("username") || "tech-in-enterprise",
  repositories: [],
  filteredRepositories: [],

  isLoading: false,
  error: null,

  setUsername: (username: string) => {
    localStorage.setItem("username", username)
    set({ username })
  },

  UsersRepositories: async (usernameOverride?: string) => {
    const username = usernameOverride || get().username
    if (!username) return
    set({ isLoading: true, error: null })
    
    try {
      const [repositories] = await Promise.all([
        Repositories(username),
      ])

      set({ repositories, isLoading: false })
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Erro ao buscar dados",
        isLoading: false,
      })
    }
  },

}))

