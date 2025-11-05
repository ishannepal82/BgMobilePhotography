import { Newspaper, Images, Camera, Users } from "lucide-react";
import StatCard from "./statCard";
import { useState } from "react";
import ControlsSection from "./ControlsSection";


export default function Dashboard() {
    const [pannelControl, setControl] = useState("Feed");
    const AdminStats = [
        {
            title: "Feed",
            count: 128,
            icon: Newspaper,
            color: "bg-blue-500/20 text-blue-600",
            desc: "Recent posts and updates from users",
        },
        {
            title: "Albums",
            count: 42,
            icon: Images,
            color: "bg-purple-500/20 text-purple-600",
            desc: "User-created photo albums",
        },
        {
            title: "Photos",
            count: 963,
            icon: Camera,
            color: "bg-pink-500/20 text-pink-600",
            desc: "Total uploaded photos",
        },
        {
            title: "Contacts",
            count: 87,
            icon: Users,
            color: "bg-green-500/20 text-green-600",
            desc: "Total number of user connections",
        },
    ];

    const AdminControls = [
       "Feed",
       "Albums",
       "Photos",
       "Contacts"
    ];



  return (
    <div className="dashboard bg-primary/30 min-w-[90%] max-w-7xl rounded-md mb-6 min-h-screen max-h-full mx-3 px-4 py-4">
        <div className="Cards grid-cols-1 grid  md:grid-cols-2 lg:grid-cols-4 sm:grid-cols-4 gap-4">
            {AdminStats.map((stat, index) => (
                <StatCard
                    key={index}
                    title={stat.title}
                    count={stat.count}
                    icon={stat.icon}
                    color={stat.color}
                    desc={stat.desc}
                />
            ))}
        </div>
        <p className="border-b-2 border-primary/30 mt-8"/>
        <div className="userControls flex items-center justify-center sm:justify-end gap-1.5 sm:gap-4 py-6 text-lg font-medium ">
            {AdminControls.map((control, index) => (
                <button className={`${pannelControl === control ? "text-accent" : "text-text"}  hover:text-primary transition-all duration-200 font-body`} onClick={() => setControl(control)} key={index}>{control}</button>
            ))}
        </div>
        <ControlsSection control={pannelControl}/>
    </div>
  )
}
