import axios from "axios"

// configuração do axios de forma global
const axiosRequest = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
  },
})

export default axiosRequest
