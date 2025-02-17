import React, { useEffect } from "react"
import StarIcon from "@mui/icons-material/Star"
import { GoRepoForked } from "react-icons/go"
import { useStarredRepoStore } from "../../../store/user-repo-starred"
import { useRepoStore } from "../../../store/user-repo-store"



export const UserStarredRepos: React.FC = () => {
  const { username } = useRepoStore()
  const { starredRepos, getStarredRepos, isLoading, error } = useStarredRepoStore()

  useEffect(() => {
    if (username) {
      getStarredRepos(username)
    }
  }, [username, getStarredRepos])

  if (isLoading) return <div>Carregando...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="mt-5 lg:max-w-xl xl:max-w-4x1">
      <ul className="space-y-2">
        {starredRepos.map((repo) => (
          <li key={repo.id} className="p-4 border border-gray-300 rounded-md">
            <a href={repo.html_url} className="text-lg text-bg-buttom-color font-semibold">
              {repo.name}
            </a>
            <p className="text-sm text-secondary-text">{repo.description}</p>
            <div className="text-sm text-black items-center flex mt-3 space-x-4">
              <div className="flex items-center space-x-1">
                <p className="text-sm text-black-400 items-center flex">
                  <StarIcon sx={{ fontSize: "20px", mr: 1 }} /> {repo.stargazers_count}
                </p>
              </div>
              <div className="flex items-center space-x-1">
                <GoRepoForked style={{ fontSize: "20px" }} />
                <span>{repo.forks_count}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
