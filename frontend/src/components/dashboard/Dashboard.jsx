"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { authentication } from "../auth/auth"
import { Logout } from "../logout/Logout"

import {
  Home,
  Users,
  GroupIcon as Groups,
  Bookmark,
  Calendar,
  Clock,
  ChevronDown,
  Search,
  Image,
  Smile,
  ThumbsUp,
  MessageCircle,
  Share2,
  MoreHorizontal,
} from "lucide-react"
import { Navbar } from "../navbar/navbar"

export const Dashboard = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState("home")
  const [postText, setPostText] = useState("")
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => setIsMobile(window.innerWidth < 768)
    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  useEffect(() => {
    const fetchUser = async () => {
      const users = await authentication()
      if (!users) {
        navigate("/")
      }
      setUser(users)
    }
    fetchUser()
  }, [navigate])

  const handleLogout = async () => {
    setUser(null)
    await Logout()
    navigate("/")
  }

  // Sample posts data
  const posts = [
    {
      id: 1,
      user: { name: "Jane Smith", avatar: "/placeholder.svg?height=40&width=40" },
      time: "3 hours ago",
      content: "Just finished a great book! Anyone have recommendations for what to read next?",
      likes: 24,
      comments: 5,
      shares: 2,
    },
    {
      id: 2,
      user: { name: "John Doe", avatar: "/placeholder.svg?height=40&width=40" },
      time: "5 hours ago",
      content: "Beautiful day for a hike! 🏞️ #nature #outdoors",
      image: "/placeholder.svg?height=400&width=600",
      likes: 56,
      comments: 8,
      shares: 3,
    },
    {
      id: 3,
      user: { name: "Sarah Johnson", avatar: "/placeholder.svg?height=40&width=40" },
      time: "Yesterday",
      content: "Just launched my new website! Check it out and let me know what you think.",
      likes: 102,
      comments: 15,
      shares: 7,
    },
  ]

  // Sample contacts
  const contacts = [
    { id: 1, name: "Alex Johnson", avatar: "/placeholder.svg?height=36&width=36", online: true },
    { id: 2, name: "Maria Garcia", avatar: "/placeholder.svg?height=36&width=36", online: true },
    { id: 3, name: "David Kim", avatar: "/placeholder.svg?height=36&width=36", online: false },
    { id: 4, name: "Lisa Wong", avatar: "/placeholder.svg?height=36&width=36", online: true },
    { id: 5, name: "Robert Chen", avatar: "/placeholder.svg?height=36&width=36", online: false },
  ]

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

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="pt-16 pb-4 px-4 md:px-8 max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Left Sidebar - Hidden on mobile */}
          {!isMobile && (
            <div className="hidden md:block w-1/4 lg:w-1/5">
              <div className="bg-white rounded-lg shadow p-4 sticky top-20">
                <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                  <div className="h-9 w-9 rounded-full bg-gray-300 overflow-hidden">
                    <img
                      src="/placeholder.svg?height=36&width=36"
                      alt={user?.firstName || "User"}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="font-medium">
                    {user?.firstName} {user?.lastName}
                  </span>
                </div>

                <div className="mt-4 space-y-1">
                  {[
                    { icon: <Home size={20} />, label: "Home" },
                    { icon: <Users size={20} />, label: "Friends" },
                    { icon: <Groups size={20} />, label: "Groups" },
                    { icon: <Bookmark size={20} />, label: "Saved" },
                    { icon: <Calendar size={20} />, label: "Events" },
                    { icon: <Clock size={20} />, label: "Memories" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                    >
                      <div className="text-blue-500">{item.icon}</div>
                      <span>{item.label}</span>
                    </div>
                  ))}

                  <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                    <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <ChevronDown size={20} />
                    </div>
                    <span>See more</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-gray-500 font-medium">Your shortcuts</h3>
                    <button className="text-blue-500 text-sm">Edit</button>
                  </div>

                  <div className="space-y-1">
                    {["Gaming Group", "Tech News", "Web Development"].map((group, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                      >
                        <div className="h-8 w-8 bg-gray-300 rounded-lg"></div>
                        <span>{group}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="mt-4 w-full text-left p-2 rounded-lg hover:bg-gray-100 text-red-500 font-medium"
                >
                  Logout
                </button>
              </div>
            </div>
          )}

          {/* Main Feed */}
          <div className="flex-1 space-y-4 mt-4 md:mt-0">
            {/* Create Post - Improved for mobile */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-10 w-10 min-w-[40px] rounded-full bg-gray-300 overflow-hidden">
                  <img
                    src="/placeholder.svg?height=40&width=40"
                    alt={user?.firstName || "User"}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder={`What's on your mind, ${user?.firstName || "User"}?`}
                    className="bg-gray-100 rounded-full px-4 py-2.5 w-full outline-none"
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                  />
                </div>
              </div>

              <div className="border-t border-gray-200 pt-3 flex justify-between">
                <button className="flex items-center justify-center space-x-1 md:space-x-2 p-2 rounded-lg hover:bg-gray-100 flex-1">
                  <Image size={20} className="text-red-500" />
                  <span className="text-gray-600 font-medium text-xs md:text-sm">Photo/Video</span>
                </button>
                <button className="flex items-center justify-center space-x-1 md:space-x-2 p-2 rounded-lg hover:bg-gray-100 flex-1">
                  <Smile size={20} className="text-yellow-500" />
                  <span className="text-gray-600 font-medium text-xs md:text-sm">Feeling/Activity</span>
                </button>
              </div>
            </div>

            {/* Posts */}
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow">
                {/* Post Header */}
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="h-10 w-10 rounded-full bg-gray-300 overflow-hidden">
                        <img
                          src={post.user.avatar || "/placeholder.svg"}
                          alt={post.user.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{post.user.name}</h3>
                        <p className="text-gray-500 text-sm">{post.time}</p>
                      </div>
                    </div>
                    <button className="p-2 rounded-full hover:bg-gray-100">
                      <MoreHorizontal size={20} />
                    </button>
                  </div>

                  {/* Post Content */}
                  <div className="mt-3">
                    <p className="mb-3">{post.content}</p>
                    {post.image && (
                      <div className="rounded-lg overflow-hidden -mx-4">
                        <img src={post.image || "/placeholder.svg"} alt="Post" className="w-full h-auto" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Post Stats */}
                <div className="px-4 py-2 flex items-center justify-between border-t border-b border-gray-200">
                  <div className="flex items-center space-x-1">
                    <div className="bg-blue-500 text-white rounded-full p-1">
                      <ThumbsUp size={12} />
                    </div>
                    <span className="text-gray-500 text-sm">{post.likes}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-500 text-sm">
                    <span>{post.comments} comments</span>
                    <span>{post.shares} shares</span>
                  </div>
                </div>

                {/* Post Actions */}
                <div className="px-4 py-1 flex justify-between">
                  <button className="flex items-center justify-center space-x-1 md:space-x-2 p-2 rounded-lg hover:bg-gray-100 flex-1">
                    <ThumbsUp size={20} className="text-gray-500" />
                    <span className="text-gray-600 font-medium text-xs md:text-sm">Like</span>
                  </button>
                  <button className="flex items-center justify-center space-x-1 md:space-x-2 p-2 rounded-lg hover:bg-gray-100 flex-1">
                    <MessageCircle size={20} className="text-gray-500" />
                    <span className="text-gray-600 font-medium text-xs md:text-sm">Comment</span>
                  </button>
                  <button className="flex items-center justify-center space-x-1 md:space-x-2 p-2 rounded-lg hover:bg-gray-100 flex-1">
                    <Share2 size={20} className="text-gray-500" />
                    <span className="text-gray-600 font-medium text-xs md:text-sm">Share</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Sidebar - Hidden on mobile */}
          {!isMobile && (
            <div className="hidden md:block w-1/4 lg:w-1/5">
              <div className="bg-white rounded-lg shadow p-4 sticky top-20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-500 font-medium">Contacts</h3>
                  <div className="flex items-center space-x-2">
                    <button className="p-1.5 rounded-full hover:bg-gray-100">
                      <Search size={16} />
                    </button>
                    <button className="p-1.5 rounded-full hover:bg-gray-100">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  {contacts.map((contact) => (
                    <div
                      key={contact.id}
                      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
                    >
                      <div className="relative">
                        <div className="h-9 w-9 rounded-full bg-gray-300 overflow-hidden">
                          <img
                            src={contact.avatar || "/placeholder.svg"}
                            alt={contact.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        {contact.online && (
                          <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <span>{contact.name}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h3 className="text-gray-500 font-medium mb-2">Group conversations</h3>
                  <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
                    <div className="h-9 w-9 bg-gray-200 rounded-full flex items-center justify-center">
                      <Users size={16} />
                    </div>
                    <span>Create New Group</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

