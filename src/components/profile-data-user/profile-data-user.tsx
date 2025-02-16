import { useEffect, useState } from "react"
import { useRepoStore } from "../../store/use-repo-store"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

export default function UserProfile() {
  const { username, userInfo, UsersRepositories, isLoading, error } = useRepoStore()
  const [showAdicionalInfo, setShowAditionalInfor] = useState(true)

  const handleOpenAditionalInfo = () => {
    setShowAditionalInfor(!showAdicionalInfo)
  }

  useEffect(() => {
    if (username) {
      UsersRepositories(username)
    }
  }, [username, UsersRepositories])

  if (isLoading) return (
    <div className="mt-4 md:ml-10 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4 p-6  animate-pulse">
        <div className="w-[104px] h-[104px] bg-gray-200 rounded-full"></div>
        <div className="w-[147px] h-[16px] bg-gray-200 rounded"></div>
        <div className="w-[217px] h-[16px] bg-gray-200 rounded"></div>
        <div className="w-[148px] h-[16px] bg-gray-200 rounded"></div>
      </div>
    </div>
  )

  if (error) return (
    <div className="mt-4 md:ml-10 flex items-center justify-center">
      <div className="flex items-center space-x-2 p-4 bg-red-600 text-white rounded-lg shadow-lg w-[320px]">
        <span className="text-sm font-semibold">{error}</span>
      </div>
    </div>
  )


  return (
    <div className="mt-4 md:ml-10">
      {/* Layout para dispositivos móveis */}
      <div className="flex items-center justify-center ">
        <div className="flex flex-col items-center">
          <img
            src={userInfo?.avatar_url}
            alt={`${userInfo?.username} avatar`}
            className="w-[104px] h-[104px] rounded-full object-cover"
          />
          <h2 className="text-center text-primary-text font-bold mt-2 w-[147px]">{userInfo?.name}</h2>
          <p className="text-center text-sm text-secondary-text w-[217px]">
            {userInfo?.bio || "Sem bio disponível"}
          </p>
          <button className="w-[148px] md:hidden lg:hidden xl:hidden text-bg-buttom-color text-sm mt-5" onClick={handleOpenAditionalInfo}>Informações Adicionais {showAdicionalInfo ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} </button>
          <div className={`sm:w-[380px] md:w-[148px] lg:w-[148px] p-4 mt-2 sm:bg-tab md:bg-transparent lg:bg-transparent rounded-2xl  md:block lg:block xl:block ${showAdicionalInfo ? 'block' : 'sm:hidden'}`}>
            <p className="w-[148px] text-sm text-bg-buttom-color "> {userInfo?.location && `${userInfo.location}`}</p>
            <p className="w-[148px] text-sm text-bg-buttom-color ">{userInfo?.company && `${userInfo.company}`}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
