import React, { useEffect } from "react"
import { useRepoStore } from "../../../store/use-repo-store"
import StarIcon from "@mui/icons-material/Star"


export const UserStarredRepos: React.FC = () => {
  const { username, starredRepos, UsersRepositories, isLoading, error } = useRepoStore()

  useEffect(() => {
    if (username) {
      UsersRepositories(username)
    }
  }, [username, UsersRepositories])

  if (isLoading) return <div>Carregando...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className=" mt-5 lg:w-full xl:w-full">
      <ul className="space-y-2">
        {starredRepos.map((repo) => (
          <li key={repo.id} className="p-4 border border-gray-300 rounded-md">
            <a href={repo.html_url} className="text-lg text-bg-buttom-color font-semibold">
              {repo.name}
            </a>
            <p className="text-sm text-secondary-text">{repo.description}</p>
            <p className="text-sm text-black-400 items-center flex mt-3">
              <StarIcon sx={{ fontSize: "20px", mr: 1 }} /> {repo.stargazers_count}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
