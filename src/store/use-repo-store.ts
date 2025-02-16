import { create } from "zustand"
import { getUserInfo, Repositories, getStarredRepos, User, Repo } from "../services/git-repo-services"

interface RepoStore {
  username: string
  userInfo: User | null
  repositories: Repo[]
  starredRepos: Repo[]
  isLoading: boolean
  error: string | null
  setUsername: (username: string) => void
  UsersRepositories: (username: string) => Promise<void>
}

export const useRepoStore = create<RepoStore>((set, get) => ({
  username: localStorage.getItem("username") || "YuriAlvarenga",
  userInfo: null,
  repositories: [],
  starredRepos: [],
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
      const [userInfo, repositories, starredRepos] = await Promise.all([
        getUserInfo(username),
        Repositories(username),
        getStarredRepos(username),
      ])
      set({ userInfo, repositories, starredRepos, isLoading: false })
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Erro ao buscar dados",
        isLoading: false,
      })
    }
  },

}))

