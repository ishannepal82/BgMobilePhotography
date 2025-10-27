import { Plus } from "lucide-react";

export default function SideBar({ toggleMenu }: { toggleMenu: () => void }) {
  return (
    <aside className="relative w-fit md:w-[22%] h-full bg-background/70 backdrop-blur-xl border-r border-primary/30 shadow-lg">
      <div className="flex flex-col mt-8 h-full p-6 text-text">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-heading font-bold tracking-tight">
            <span className="text-primary">BgMobile</span>{" "}
            <span className="text-accent">Photography</span>
          </h1>
          <button
            onClick={toggleMenu}
            className="p-2 rounded-full hover:bg-primary/10 transition-all"
            aria-label="Toggle menu"
          >
            <Plus size={22} className="text-primary" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center mt-10 gap-4 font-body">
          <h2 className="text-lg font-semibold tracking-wide text-primary underline underline-offset-4 decoration-primary/60">
            Date
          </h2>
          <div className="flex flex-col gap-3 w-full items-center">
            {["08/04/2021", "09/04/2021", "10/04/2021"].map((date, i) => (
              <button
                key={i}
                className="w-full text-center py-2 rounded-xl hover:border-primary hover:bg-primary/5 transition-all duration-200 hover:bg-accent/50"
              >
                <span className="text-base tracking-tight">{date}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer (optional) */}
        <div className="text-xs text-center text-muted-foreground mt-8 opacity-70">
          © 2025 BgMobile
        </div>
      </div>
    </aside>
  );
}
