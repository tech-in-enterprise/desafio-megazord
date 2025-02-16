import GitHubIcon from '@mui/icons-material/GitHub'

export default function Topbar() {
    return (
        <div className="h-[72px] p-2 bg-black text-white flex items-center justify-between px-10">
            <div className="flex items-center space-x-2">
                <GitHubIcon fontSize="large" />
                <span className="text-xl font-semibold">Github</span>
            </div>
        </div>
    )
}
