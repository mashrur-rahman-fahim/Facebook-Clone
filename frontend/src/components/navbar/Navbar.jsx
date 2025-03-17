import { useState, useEffect } from "react"
import { Home, Users, Youtube, Bell, Menu, Search, X, Grid, MessageCircle } from 'lucide-react'
import { useNavigate, useLocation} from "react-router-dom"

export const Navbar = () => {
    const navigate=useNavigate();
    const location=useLocation();
  const [isMobile, setIsMobile] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [activeTab, setActiveTab] = useState(() => {
    const path = location.pathname;
    if (path === "/friends") return "friends";
    if (path === "/dashboard") return "home";
    return "home"; // default
  });
  useEffect(() => {
    const path = location.pathname;
    if (path === "/friends") setActiveTab("friends");
    if (path === "/dashboard") setActiveTab("home");
  }, [location.pathname]);

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768)
    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])
  const home=()=>{
    setActiveTab("home");
    navigate("/dashboard");
  }
  const friends=()=>{
    setActiveTab("friends");
    navigate("/friends");

  }

  // Updated Messenger Icon
  const MessengerIcon = ({ size = 24, className = "" }) => (
    <svg 
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="currentColor"
      className={className}
    >
      <path
        d="M14 2.333c6.437 0 11.667 5.23 11.667 11.667 0 6.436-5.23 11.667-11.667 11.667S2.333 20.436 2.333 14c0-6.437 5.23-11.667 11.667-11.667z"
      />
      <path 
        d="M15.8 8.333l-3.4 6.8h2.6l-1.533 4.6 5.666-6.9h-3.066l2.2-4.5h-5.867z" 
        fill="#fff" 
      />
    </svg>
  )

  // Facebook Logo
  const FacebookLogo = ({ className = "" }) => (
    <svg viewBox="0 0 36 36" fill="url(#jsc_s_b)" height="40" width="40" className={className}>
      <defs>
        <linearGradient x1="50%" x2="50%" y1="97.0782%" y2="0%" id="jsc_s_b">
          <stop offset="0%" stopColor="#0062E0"></stop>
          <stop offset="100%" stopColor="#19AFFF"></stop>
        </linearGradient>
      </defs>
      <path d="M15 35.8C6.5 34.3 0 26.9 0 18 0 8.1 8.1 0 18 0s18 8.1 18 18c0 8.9-6.5 16.3-15 17.8l-1-.8h-4l-1 .8z"></path>
      <path
        fill="#FFFFFF"
        d="M25 23l.8-5H21v-3.5c0-1.4.5-2.5 2.7-2.5H26V7.4c-1.3-.2-2.7-.4-4-.4-4.1 0-7 2.5-7 7v4h-4.5v5H15v12.7c1 .2 2 .3 3 .3s2-.1 3-.3V23h4z"
      ></path>
    </svg>
  )

  const MobileNavbar = () => (
    <div className="bg-white border-b border-gray-200 fixed w-full top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between p-2">
        {/* Logo Section */}
        <div className="flex items-center">
          <FacebookLogo />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSearch(true)}
            className="p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <Search size={20} className="text-gray-600" />
          </button>
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="p-2.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Search Bar Overlay */}
      {showSearch && (
        <div className="absolute inset-0 bg-white z-10 flex items-center p-2">
          <button onClick={() => setShowSearch(false)} className="p-2 rounded-full hover:bg-gray-100">
            <X size={24} />
          </button>
          <div className="flex-1 ml-2 bg-gray-100 rounded-full px-4 py-2 flex items-center">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search Facebook"
              className="ml-2 bg-transparent outline-none w-full"
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="flex justify-around py-1 border-t border-gray-100">
        <button
          className={`p-2 flex-1 flex flex-col items-center ${
            activeTab === "home" ? "text-blue-600" : "text-gray-500"
          } transition-colors`}
          onClick={home}
        >
          <Home size={24} />
          <span className="text-xs mt-1">Home</span>
          {activeTab === "home" && <span className="absolute bottom-0 w-10 h-1 bg-blue-600 rounded-t-full"></span>}
        </button>
        <button
          className={`p-2 flex-1 flex flex-col items-center ${
            activeTab === "friends" ? "text-blue-600" : "text-gray-500"
          } transition-colors`}
          onClick={friends}
        >
          <Users size={24} />
          <span className="text-xs mt-1">Friends</span>
          {activeTab === "friends" && <span className="absolute bottom-0 w-10 h-1 bg-blue-600 rounded-t-full"></span>}
        </button>
        <button
          className={`p-2 flex-1 flex flex-col items-center ${
            activeTab === "chat" ? "text-blue-600" : "text-gray-500"
          } transition-colors`}
          onClick={() => setActiveTab("chat")}
        >
          <MessageCircle size={24} />
          <span className="text-xs mt-1">Chat</span>
          {activeTab === "chat" && <span className="absolute bottom-0 w-10 h-1 bg-blue-600 rounded-t-full"></span>}
        </button>
        <button
          className={`p-2 flex-1 flex flex-col items-center ${
            activeTab === "videos" ? "text-blue-600" : "text-gray-500"
          } transition-colors`}
          onClick={() => setActiveTab("videos")}
        >
          <Youtube size={24} />
          <span className="text-xs mt-1">Videos</span>
          {activeTab === "videos" && <span className="absolute bottom-0 w-10 h-1 bg-blue-600 rounded-t-full"></span>}
        </button>
        <button
          className={`p-2 flex-1 flex flex-col items-center ${
            activeTab === "notifications" ? "text-blue-600" : "text-gray-500"
          } transition-colors`}
          onClick={() => setActiveTab("notifications")}
        >
          <Bell size={24} />
          <span className="text-xs mt-1">Notifications</span>
          {activeTab === "notifications" && (
            <span className="absolute bottom-0 w-10 h-1 bg-blue-600 rounded-t-full"></span>
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div className="fixed inset-0 bg-white z-50 pt-16 px-4 overflow-y-auto">
          <div className="flex justify-between items-center mb-4 border-b border-gray-200 pb-2 fixed top-0 left-0 right-0 bg-white px-4 pt-4">
            <h2 className="text-xl font-bold">Menu</h2>
            <button onClick={() => setShowMobileMenu(false)} className="p-2 rounded-full hover:bg-gray-100">
              <X size={24} />
            </button>
          </div>
          <div className="space-y-4 mt-4">
            <div className="flex items-center p-2 hover:bg-gray-100 rounded-lg">
              <div className="h-12 w-12 rounded-full bg-gray-200 mr-3"></div>
              <div>
                <p className="font-semibold">Your Name</p>
                <p className="text-sm text-gray-500">View your profile</p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              {[
                { name: "Friends", icon: <Users size={20} /> },
                { name: "Groups", icon: <Users size={20} /> },
                { name: "Watch", icon: <Youtube size={20} /> },
                { name: "Memories", icon: <Bell size={20} /> },
                { name: "Saved", icon: <Bell size={20} /> },
                { name: "Pages", icon: <Bell size={20} /> },
                { name: "Events", icon: <Bell size={20} /> },
              ].map((item) => (
                <div key={item.name} className="flex items-center p-3 hover:bg-gray-100 rounded-lg">
                  <div className="h-8 w-8 rounded-full bg-gray-100 mr-3 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <p>{item.name}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4">
              <button className="w-full text-left p-3 hover:bg-gray-100 rounded-lg flex items-center">
                <div className="h-8 w-8 rounded-full bg-gray-100 mr-3 flex items-center justify-center">
                  <Grid size={20} />
                </div>
                <span>Settings & Privacy</span>
              </button>
              <button className="w-full text-left p-3 hover:bg-gray-100 rounded-lg flex items-center">
                <div className="h-8 w-8 rounded-full bg-gray-100 mr-3 flex items-center justify-center">
                  <Grid size={20} />
                </div>
                <span>Help & Support</span>
              </button>
              <button className="w-full text-left p-3 hover:bg-gray-100 rounded-lg flex items-center">
                <div className="h-8 w-8 rounded-full bg-gray-100 mr-3 flex items-center justify-center">
                  <Grid size={20} />
                </div>
                <span>Display & Accessibility</span>
              </button>
              <button className="w-full text-left p-3 hover:bg-gray-100 rounded-lg flex items-center">
                <div className="h-8 w-8 rounded-full bg-gray-100 mr-3 flex items-center justify-center">
                  <Grid size={20} />
                </div>
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  const DesktopNavbar = () => (
    <div className="bg-white border-b border-gray-200 fixed w-full top-0 z-50 shadow-sm">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between p-0">
        {/* Left Section */}
        <div className="flex items-center">
          {/* Logo */}
          <div className="p-2">
            <FacebookLogo />
          </div>

          {/* Search Bar */}
          <div className="bg-gray-100 rounded-full px-4 py-2.5 flex items-center ml-2 hover:bg-gray-200 transition-colors">
            <Search size={16} className="text-gray-500" />
            <input type="text" placeholder="Search Facebook" className="ml-2 bg-transparent outline-none w-56" />
          </div>
        </div>

        {/* Middle Section - Main Navigation */}
        <div className="flex justify-center flex-1">
          <div className="flex">
            <button
              className={`px-12 py-3 ${
                activeTab === "home" ? "text-blue-600 border-b-4 border-blue-600" : "text-gray-500 hover:bg-gray-100"
              } rounded-lg transition-colors relative`}
              onClick={home}
            >
              <Home size={28} />
              {activeTab === "home" && (
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-blue-600 rounded-t-full"></span>
              )}
            </button>
            <button
              className={`px-12 py-3 ${
                activeTab === "friends" ? "text-blue-600 border-b-4 border-blue-600" : "text-gray-500 hover:bg-gray-100"
              } rounded-lg transition-colors relative`}
              onClick={friends}
            >
              <Users size={28} />
              {activeTab === "friends" && (
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-blue-600 rounded-t-full"></span>
              )}
            </button>
            <button
              className={`px-12 py-3 ${
                activeTab === "videos" ? "text-blue-600 border-b-4 border-blue-600" : "text-gray-500 hover:bg-gray-100"
              } rounded-lg transition-colors relative`}
              onClick={() => setActiveTab("videos")}
            >
              <Youtube size={28} />
              {activeTab === "videos" && (
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-blue-600 rounded-t-full"></span>
              )}
            </button>
          </div>
        </div>

        {/* Right Section - User Actions */}
        <div className="flex items-center space-x-3 pr-3">
          <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
            <Grid size={20} />
          </button>
          <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
            <MessengerIcon size={20} className="text-gray-800" />
          </button>
          <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
            <Bell size={20} />
          </button>

          {/* User Profile */}
          <button className="flex items-center p-1 rounded-full hover:bg-gray-100 transition-colors">
            <div className="h-10 w-10 rounded-full bg-gray-300 border-2 border-blue-500"></div>
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {isMobile ? <MobileNavbar /> : <DesktopNavbar />}
      <div className={isMobile ? "h-16" : "h-5"}></div> {/* Fixed spacer for navbar */}
    </>
  )
}
