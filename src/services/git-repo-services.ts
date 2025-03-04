import axiosRequest from "./api-request"

// Tipo para os dados do usuário
export type User = {
  id: number
  avatar_url: string
  username: string
  name: string
  bio: string
  location: string
  company?: string 
  followers: number
  following: number
  description: string
  html_url: string
  stargazers_count: number
  public_repos: number
  language: string | null 
}

// Função para buscar as informações do usuário
export const getUserInfo = async (username: string): Promise<User> => {
  const token = import.meta.env.VITE_GITHUB_TOKEN
  const { data } = await axiosRequest.get(`/users/${username}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}



// Tipo para os repositórios
export type Repo = {
  id: number
  name: string
  description: string
  forks_count: number
  stargazers_count: number
  html_url: string
  language: string | null 
  forks_url: string 
  is_template: boolean 
  mirror_url: string | null 
}

// Função para buscar os repositórios usando Axios
export const getRepositories = async (username: string): Promise<Repo[]> => {
  const token = import.meta.env.VITE_GITHUB_TOKEN
  const { data } = await axiosRequest.get(`/users/${username}/repos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return data
}


// Função para buscar repositórios starreds
export const getStarredRepos = async (username: string): Promise<Repo[]> => {
  const token = import.meta.env.VITE_GITHUB_TOKEN
  const { data } = await axiosRequest.get(`/users/${username}/starred`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}


