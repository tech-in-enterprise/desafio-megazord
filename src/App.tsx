import { useState } from "react"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./utils/queryClient"
import UserProfile from "./components/profile-data-user/profile-data-user"
import RepoTabs from "./components/tabs-repositories.tsx/tab-repo-switcher/tab-repo-switcher"
import { UserRepos } from "./components/tabs-repositories.tsx/repositories/repositories"
import { UserStarredRepos } from "./components/tabs-repositories.tsx/starred-repositories/starred-repositorie"
import { SearchBar } from "./components/search-bar/search-bar"
import Topbar from "./components/top-bar/top-bar"

export default function App() {
  const [tabRepo, setTabRepo] = useState<"repositories" | "starred">("repositories")

  return (
    <QueryClientProvider client={queryClient}>
        {/* Topbar para tablets e maiores */}
        <div className="hidden md:block bg-black text-white w-full">
          <Topbar />
        </div>
      <div className="min-h-screen flex flex-col md:flex-row">

        <div className="flex flex-col md:flex-row w-full  gap-10">
          {/* Profile */}
          <div className="flex-shrink-0 w-full md:w-1/4 p-4 pb-0">
            <UserProfile />
          </div>

          {/* Main Content */}
          <div className="flex-grow w-full md:w-3/4 p-4 pt-0">
            {/* Tabs */}
            <RepoTabs activeTab={tabRepo} setActiveTab={setTabRepo} />

            {/* Search Bar */}
            <div className="mt-4">
              <SearchBar />
            </div>

            {/* Conteúdo Principal */}
            <div className="flex flex-col justify-center mt-4">
              {tabRepo === "repositories" && <UserRepos />}
              {tabRepo === "starred" && <UserStarredRepos />}
            </div>
          </div>
        </div>
      </div>

    </QueryClientProvider>
  )
}
