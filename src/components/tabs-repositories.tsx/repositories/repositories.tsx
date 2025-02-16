import React, { useEffect, useState } from "react"
import { useRepoStore } from "../../../store/use-repo-store"
import { getRepoLanguages } from "../../../services/git-repo-services"
import StarIcon from "@mui/icons-material/Star"
import { GoRepoForked } from "react-icons/go"

export const UserRepos: React.FC = () => {
  const { username, repositories, UsersRepositories, isLoading, error } = useRepoStore()
  const [repoLanguages, setRepoLanguages] = useState<Record<number, Record<string, number>>>({})

  useEffect(() => {
    if (username) {
      UsersRepositories(username)
    }
  }, [username, UsersRepositories])

  useEffect(() => {
    // Quando os repositórios forem carregados, buscar as linguagens
    const fetchLanguages = async () => {
      for (const repo of repositories) {
        try {
          const languages = await getRepoLanguages(username, repo.name)
          setRepoLanguages((prev) => ({
            ...prev,
            [repo.id]: languages, // Atualiza as linguagens para cada repositório
          }))
        } catch (error) {
          console.error("Erro ao buscar linguagens do repositório", error)
        }
      }
    }

    if (repositories.length > 0) {
      fetchLanguages()
    }
  }, [repositories, username])

  if (isLoading) return <div>Carregando...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="mt-5  lg:w-full xl:w-full">
      <ul className="space-y-2">
        {repositories.map((repo) => {
          const languages = repoLanguages[repo.id] || {} 
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

              {/* Exibe as linguagens do repositório */}
              <div className="mt-2 text-sm flex flex-wrap">
                {Object.entries(languages).map(([language]) => (
                  <span key={language} className="mr-2">
                    {language || 'erro'}
                  </span>
                ))}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
