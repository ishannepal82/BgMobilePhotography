import Dashboard from "../../components/admin/Dashboard"
import { Bell, Settings } from "lucide-react"

export default function AdminPanel() {

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <div className="greetuser flex bg-primary/20 justify-between  items-center max-w-7xl min-w-[90%] p-6 m-5 rounded-lg">
        <div className="text flex flex-col">
          <h1 className="text-3xl font-bold text-text">Welcome <span className="text-accent">Birendra</span></h1>
        <p className="text-text">Welcome to the Admin Panel</p>
        </div>
        <div className="icons flex gap-4">
          <Settings size={40} className="text-primary bg-background/60 rounded-full p-2" />
          <Bell size={40} className="text-accent bg-background rounded-full p-2" />
        </div>
      </div>
      <Dashboard />
    </div>
  )
}