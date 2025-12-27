import { Calendar, Home, Users, Settings } from "lucide-react"

export default function Sidebar() {
  return (
    <div className="w-20 bg-white border-r h-screen flex flex-col items-center py-6 gap-8">
      <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold">
        EMR
      </div>

      <div className="flex flex-col gap-6 text-gray-400">
        <Home className="w-6 h-6 cursor-pointer hover:text-primary" />
        <Calendar className="w-6 h-6 cursor-pointer text-primary" />
        <Users className="w-6 h-6 cursor-pointer hover:text-primary" />
        <Settings className="w-6 h-6 cursor-pointer hover:text-primary" />
      </div>
    </div>
  )
}
