import { create } from "zustand"
import { Repo } from "../services/git-repo-services"
import { useRepoStore } from "./user-repo-store"


interface LanguageStore {
  languageFilter: string
  filteredRepositories: Repo[]
  setLanguageFilter: (language: string) => void
}

export const useLanguageStore = create<LanguageStore>((set) => ({
  languageFilter: "",
  filteredRepositories: [],
  setLanguageFilter: (language: string) => {
    const { repositories } = useRepoStore.getState() 
    const filtered = language
      ? repositories.filter((repo) => repo.language === language)
      : repositories
    set({ languageFilter: language, filteredRepositories: filtered })
  },
}))
