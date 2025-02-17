// store/user-info-store.ts
import { create } from "zustand"
import { getUserInfo, User } from "../services/git-repo-services"

interface UserInfoStore {
  userInfo: User | null
  isLoading: boolean
  error: string | null
  getUserInfo: (username: string) => Promise<void>
}

export const useUserInfoStore = create<UserInfoStore>((set) => ({
  userInfo: null,
  isLoading: false,
  error: null,

  getUserInfo: async (username: string) => {
    set({ isLoading: true, error: null })

    try {
      const userInfo = await getUserInfo(username)
      set({ userInfo, isLoading: false })
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Erro ao buscar informações do usuário",
        isLoading: false,
      })
    }
  },
}))
