import React, { useState } from "react"
import { useRepoStore } from "../../store/user-repo-store"
import SearchIcon from '@mui/icons-material/Search'
import { useLanguageStore } from "../../store/user-repo-language"



export const SearchBar: React.FC = () => {
    const { username, setUsername, UsersRepositories, repositories } = useRepoStore()
    const { setLanguageFilter, languageFilter } = useLanguageStore() 
    const [user, setUser] = useState(username)

    // Atualiza o usuário e faz a busca, depois limpa o estado
    const handleSearch = async () => {
        setUsername(user)
        await UsersRepositories(user)
        setUser("")
    }

    // Seta o usuário com o novo valor
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser(event.target.value)
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
    const languages = Array.from(new Set(repositories.map((repo) => repo.language).filter(Boolean)))

    return (
        <div className="lg:max-w-4xl lg:flex lg:flex-row lg:justify-between gap-4">
            <div className="flex bg-tab shadow-md rounded-md p-2 lg:w-full mt-2 pt-2 ">
                <input
                    type="text"
                    placeholder="Pesquisar usuário..."
                    value={user}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent outline-none px-2 h-[32px]"
                />
                <button onClick={handleSearch} className="text-bg-buttom-color">
                    <SearchIcon />
                </button>
            </div>

            <div className="flex justify-end right-0 mt-2 sm:pt-2 md:pt-0 ">
                <select className="bg-bg-button-gradient-custom text-white rounded-md px-4 py-2 mr-2 rounded-3xl">
                    <option>Type</option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                </select>

                <select className="bg-bg-button-gradient-custom text-white rounded-md px-4 py-2 rounded-3xl" onChange={handleLanguageChange} value={languageFilter}>
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
