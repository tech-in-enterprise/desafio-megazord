import {  useEffect } from "react"
import StarBorderIcon from '@mui/icons-material/StarBorder'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'
import { useRepoStore } from "../../../store/use-repo-store"

interface RepoTabsProps {
  activeTab: "repositories" | "starred"
  setActiveTab: (tab: "repositories" | "starred") => void
}


export default function RepoTabs({ activeTab, setActiveTab }: RepoTabsProps) {
  const { username, userInfo, starredRepos, UsersRepositories, isLoading, error } = useRepoStore()
 
  useEffect(() => {
    if (username) {
      UsersRepositories(username)
    }
  }, [username, UsersRepositories])

  if (isLoading) return <div>Carregando...</div>
  if (error) return <div className="text-red-500">{error}</div>


  //componente tabs para altenar entre repositórios e favoritos do usuário
  return (
    <div className=" w-[376px] md:flex md:justify-start">
      <div className="flex justify-between  p-2 pt-0">
        <button onClick={() => setActiveTab("repositories")} className={`flex items-center md:w-[196px]  md:mr-10 relative ${activeTab === "repositories" ? "text-black font-medium" : "text-secondary-text"}`}>
          <span className="flex items-center gap-2 ">
            <LibraryBooksIcon sx={{ fontSize: '20px' }} />
            <span className="p-2">Repositories</span>
            <span className="bg-tab w-[40px] h-[24px] text-secondary-text text-xs px-3 py-1 rounded-full border border-tab-border">
              {userInfo?.public_repos}
            </span>
          </span>

          {activeTab === "repositories" && (
            <span className="absolute bottom-[-1px] left-[-8px] right-[-8px] h-[2px] bg-tab-color rounded-md"></span>
          )}
        </button>

        <button onClick={() => setActiveTab("starred")} className={`flex items-center md:w-[196px]  space-x-2 relative ${activeTab === "starred" ? "text-black font-medium" : "text-secondary-text"}`}>
          <StarBorderIcon sx={{ fontSize: '20px' }} />
          <span>Starred</span>
          <span className="bg-tab w-[40px] h-[24px] mr:2 text-secondary-text text-xs px-3 py-1 rounded-full border border-tab-border">
            {starredRepos.length}
          </span>
          {activeTab === "starred" && (
            <span className="absolute bottom-[-1px] left-[-8px] right-[-8px] h-[2px] bg-tab-color rounded-md"></span>
          )}
        </button>
      </div>

    </div>
  )
}
