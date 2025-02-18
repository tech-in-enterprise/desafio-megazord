import React, { useEffect } from "react"
import { useRepoStore } from "../../../store/user-repo-store"
import StarIcon from "@mui/icons-material/Star"
import { GoRepoForked } from "react-icons/go"
import { useLanguageStore } from "../../../store/user-repo-language"

export const UserRepos: React.FC = () => {
  const { username, filteredRepositories, UsersRepositories, isLoading, error } = useRepoStore()
  const { languageFilter } = useLanguageStore()

  useEffect(() => {
    if (username) {
      UsersRepositories(username)
    }
  }, [username, UsersRepositories])

  if (isLoading) return <div>Carregando...</div>
  if (error) return <div className="text-red-500">{error}</div>

  // Filtra os repositórios com base no filtro de linguagem
  const filteredReposByLanguage = languageFilter
    ? filteredRepositories.filter((repo) => repo.language === languageFilter)
    : filteredRepositories

  return (
    <div className="mt-5 lg:max-w-4x1 xl:max-w-xl">
      <ul className="space-y-2">
        {filteredReposByLanguage.map((repo) => {
          return (
            <li key={repo.id} className="p-4 border border-gray-300 rounded-md">
              <a href={repo.html_url} className="text-lg text-bg-buttom-color font-semibold">
                {repo.name}
              </a>
              <p className="text-sm text-secondary-text">{repo.description}</p>
              <div className="text-sm text-black items-center flex mt-3 space-x-4">
                <div className="flex items-center space-x-1">
                  <StarIcon sx={{ fontSize: "20px" }} />
                  <span>{repo.stargazers_count}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <GoRepoForked style={{ fontSize: "20px" }} />
                  <span>{repo.forks_count}</span>
                </div>
              </div>
              <p className="text-sm text-black mt-2">
                {repo.language || ""}
              </p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
