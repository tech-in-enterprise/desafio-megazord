import React, { useState } from "react"
import { useRepoStore } from "../../store/use-repo-store"
import SearchIcon from '@mui/icons-material/Search'

export const SearchBar: React.FC = () => {
    const { username, setUsername, UsersRepositories } = useRepoStore()
    const [user, setUser] = useState(username)

    const handleSearch = async () => {
        setUsername(user)
        await UsersRepositories(user)
        setUser("")
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser(event.target.value)
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSearch()
        }
    }

    return (
        <div className="lg:w-full lg:flex lg:flex-row  lg:justify-between gap-4">
            <div className="flex bg-tab shadow-md rounded-md p-2 lg:w-full mt-2 ">
                <input
                    type="text"
                    placeholder="Pesquisar usuário..."
                    value={user}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent outline-none px-2"
                />
                <button onClick={handleSearch} className="text-bg-buttom-color">
                    <SearchIcon />
                </button>
            </div>

            <div className="flex justify-end right-0 mt-2 sm:pt-2 md:pt-2">
                <select className="bg-bg-button-gradient-custom text-white rounded-md px-4 py-2 mr-2">
                    <option>Type</option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                </select>

                <select className="bg-bg-button-gradient-custom text-white rounded-md px-4 py-2">
                    <option>Language</option>
                    <option>English</option>
                    <option>Spanish</option>
                </select>
            </div>
        </div>
    )
}
