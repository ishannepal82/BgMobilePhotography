import { useState } from "react"
import Dashboard from "../../components/admin/Dashboard"
import { Bell, Settings, X, User, Lock, Palette, LogOut } from "lucide-react"

export default function AdminPanel() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/user'
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center">
      <div className="greetuser flex bg-primary/20 justify-between  items-center max-w-7xl min-w-[90%] p-6 m-5 rounded-lg">
        <div className="text flex flex-col">
          <h1 className="text-3xl font-bold text-text">Welcome <span className="text-accent">Birendra</span></h1>
        <p className="text-text">Welcome to the Admin Panel</p>
        </div>
        <div className="icons flex gap-4">
          <Settings 
            size={40} 
            className="text-primary bg-background/60 rounded-full p-2 cursor-pointer hover:bg-background transition-all" 
            onClick={() => setIsSettingsOpen(true)}
          />
          <Bell size={40} className="text-accent bg-background rounded-full p-2 cursor-pointer hover:bg-background/80 transition-all" />
        </div>
      </div>
      <Dashboard />

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-background border-2 border-primary/30 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-background border-b border-primary/20 p-6 flex justify-between items-center">
              <h2 className="text-3xl font-heading font-bold text-text">Settings</h2>
              <button 
                onClick={() => setIsSettingsOpen(false)}
                className="text-text hover:text-accent transition-colors"
              >
                <X size={28} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Profile Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-accent">
                  <User size={24} />
                  <h3 className="text-xl font-heading font-semibold">Profile Settings</h3>
                </div>
                <div className="pl-9 space-y-4">
                  <div>
                    <label className="block text-text/70 text-sm mb-2">Username</label>
                    <input 
                      type="text" 
                      defaultValue="Birendra"
                      className="w-full bg-primary/10 border border-primary/30 rounded-lg px-4 py-2 text-text focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-text/70 text-sm mb-2">Email</label>
                    <input 
                      type="email" 
                      defaultValue="admin@bgmobile.com"
                      className="w-full bg-primary/10 border border-primary/30 rounded-lg px-4 py-2 text-text focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-primary/20"></div>

              {/* Security Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-accent">
                  <Lock size={24} />
                  <h3 className="text-xl font-heading font-semibold">Security</h3>
                </div>
                <div className="pl-9 space-y-4">
                  <div>
                    <label className="block text-text/70 text-sm mb-2">Current Password</label>
                    <input 
                      type="password" 
                      placeholder="Enter current password"
                      className="w-full bg-primary/10 border border-primary/30 rounded-lg px-4 py-2 text-text focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-text/70 text-sm mb-2">New Password</label>
                    <input 
                      type="password" 
                      placeholder="Enter new password"
                      className="w-full bg-primary/10 border border-primary/30 rounded-lg px-4 py-2 text-text focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-primary/20"></div>

              {/* Preferences Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-accent">
                  <Palette size={24} />
                  <h3 className="text-xl font-heading font-semibold">Preferences</h3>
                </div>
                <div className="pl-9 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-text">Email Notifications</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-primary/30 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text">Push Notifications</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-primary/30 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-text">Auto-save Changes</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-primary/30 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="border-t border-primary/20"></div>

              {/* Actions */}
              <div className="space-y-4">
                <button className="w-full bg-accent hover:bg-accent/80 text-white font-heading font-semibold py-3 rounded-lg transition-all">
                  Save Changes
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-heading font-semibold py-3 rounded-lg transition-all flex items-center justify-center gap-2"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}