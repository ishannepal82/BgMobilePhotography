import StatCard from "../../components/admin/statCard"
import { Album,  User, Video } from "lucide-react"
export default function AdminPannel() {
  const AdminControls = [
    {"name": "Photos"},
    {"name": "Albums"},
    {"name": "Contacts"}
  ]

  return (
   <div className="w-full h-screen flex justify-center">
    <div className="bg-background/30 rounded-md backdrop-blur-md px-6 py-4 h-[60vh] m-12 w-[60vw] border-2 border-secondary">
            <h1 className="text-text text-2xl font-body font-semi-bold">Welcome <span className="text-accent"> Birendra</span></h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-8">
                <StatCard statIcon={<Video size={50}/>} stat="Total Feed" statPoints="No of Feed: 3" />
                <StatCard statIcon={<User size={50}/>} stat="Pending Messages" statPoints="No of Messages: 4"
                StatIconStyle="text-blue-400 bg-secondary/30"/>

                <StatCard statIcon={<Album size={50}/>} stat="Total Albums" statPoints="No of Albums: 2"
                StatIconStyle="text-green-400 bg-accent/30 font-normal"/>
            </div>

            <div className="border-t-2 border-secondary/50" />
            <div className="flex items-center gap-16 py-4 px-4">
              {AdminControls.map((control) => (
                <h1 className="text-primary font-body font-semibold">{control.name}</h1>
              ))}
            </div>
        </div>
   </div>
  )
}
