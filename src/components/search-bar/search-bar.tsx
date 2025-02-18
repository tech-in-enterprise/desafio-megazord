import React, { useState } from "react"
import { useRepoStore } from "../../store/user-repo-store"
import SearchIcon from '@mui/icons-material/Search'
import { useLanguageStore } from "../../store/user-repo-language"
import { useStarredRepoStore } from "../../store/user-repo-starred"

interface SearchBarProps {
    activeTab: "repositories" | "starred";
}

export const SearchBar: React.FC<SearchBarProps> = ({ activeTab }) => {
    const { username, setUsername, UsersRepositories, repositories, filterRepositories } = useRepoStore()
    const { starredRepos, getStarredRepos } = useStarredRepoStore()
    const { setLanguageFilter, languageFilter } = useLanguageStore()
    const [user, setUser] = useState(username)
    const [repoSearchQuery, setRepoSearchQuery] = useState("") 
    const [isSearchingRepositories, setIsSearchingRepositories] = useState(false)

    // Alterna entre modos de busca
    const toggleSearchMode = () => {
        setIsSearchingRepositories(!isSearchingRepositories)
        setRepoSearchQuery("") 
        if (!isSearchingRepositories) {
            filterRepositories("") 
        } else {
            filterRepositories(repoSearchQuery) 
        }
    }

    // Atualiza o usuário e faz a busca, depois limpa o estado
    const handleSearch = async () => {
        if (isSearchingRepositories) {
            filterRepositories(repoSearchQuery)
        } else {
            // Faz a busca de usuários
            setUsername(user)
            await UsersRepositories(user)
            await getStarredRepos(user)
        }
        setLanguageFilter("")
        setUser("")
    }

    // Seta o usuário com o novo valor
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser(event.target.value)
        if (isSearchingRepositories) {
            setRepoSearchQuery(event.target.value)
            filterRepositories(event.target.value) 
        }
    }

    // Busca o novo usuário quando aperta no ícone de busca ou no Enter
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSearch()
        }
    }

    // Seta a linguagem selecionada e envia para o store
    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguageFilter(event.target.value)
    }

    // Extrair linguagens únicas dos repositórios
    const languages = activeTab === "repositories" ? Array.from(new Set(repositories.map((repo) => repo.language).filter(Boolean)))
        : Array.from(new Set(starredRepos.map((repo) => repo.language).filter(Boolean)))

    return (
        <div className="lg:max-w-4xl lg:flex lg:flex-row lg:justify-between gap-4">
            <div className="flex bg-tab shadow-md rounded-md p-2 lg:w-full mt-2 pt-2 ">
                <input
                    type="text"
                    placeholder={isSearchingRepositories ? "Buscar repositório..." : "Pesquisar usuário..."}
                    value={isSearchingRepositories ? repoSearchQuery : user}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent outline-none px-2 h-[32px]"
                />
                <button onClick={handleSearch} className="text-bg-buttom-color">
                    <SearchIcon />
                </button>
            </div>
            <div className="flex justify-end right-0 mt-2 sm:pt-2 md:pt-0 ">
                <button onClick={toggleSearchMode} className="bg-bg-button-gradient-custom text-white rounded-md px-2 py-2 mr-2 flex items-center space-x-2">
                    <span>{isSearchingRepositories ? "Usuários" : "Repositórios"}</span>
                </button>
                <select className="bg-bg-button-gradient-custom text-white rounded-md px-2 py-2 mr-2 rounded-3xl">
                    <option>Type</option>
                    <option>Forks</option>
                    <option>Archived</option>
                    <option>Tamplates</option>
                </select>

                <select className="bg-bg-button-gradient-custom text-white rounded-md px-2 py-2 rounded-3xl" onChange={handleLanguageChange} value={languageFilter}>
                    <option value="">Languages</option>
                    {languages.map((lang) => (
                        <option key={lang} >
                            {lang}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}
