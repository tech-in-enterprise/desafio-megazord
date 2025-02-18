import { create } from "zustand"
import { getRepositories, Repo } from "../services/git-repo-services"

interface RepoStore {
  username: string
  repositories: Repo[]
  filteredRepositories: Repo[]
  isLoading: boolean
  error: string | null
  setUsername: (username: string) => void
  UsersRepositories: (username: string) => Promise<void>
  filterRepositories: (query: string) => void // Função para filtrar os repositórios
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
      const repositories = await getRepositories(username)
      set({ repositories, filteredRepositories: repositories, isLoading: false }) // Inicializa com todos os repositórios

    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Erro ao buscar dados",
        isLoading: false,
      })
    }
  },

  filterRepositories: (query: string) => {
    const { repositories } = get()
    if (query) {
      const filtered = repositories.filter((repo) =>
        repo.name.toLowerCase().includes(query.toLowerCase()) // Filtra pelo nome
      )
      set({ filteredRepositories: filtered })
    } else {
      set({ filteredRepositories: repositories }) // Se não houver filtro, mostra todos
    }
  }
}))
