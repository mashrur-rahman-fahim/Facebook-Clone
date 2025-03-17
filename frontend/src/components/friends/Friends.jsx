"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { authentication } from "../auth/auth"
import { Search, UserPlus, MessageCircle, MoreHorizontal, Users, Filter } from "lucide-react"

export const Friends = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [activeSection, setActiveSection] = useState("all")
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

  // Sample friends data
  const friendRequests = [
    { id: 1, name: "Michael Johnson", mutualFriends: 5, avatar: "/placeholder.svg?height=100&width=100", time: "3d" },
    { id: 2, name: "Emily Davis", mutualFriends: 2, avatar: "/placeholder.svg?height=100&width=100", time: "1w" },
  ]

  const suggestions = [
    { id: 1, name: "Robert Smith", mutualFriends: 8, avatar: "/placeholder.svg?height=100&width=100" },
    { id: 2, name: "Jennifer Lee", mutualFriends: 3, avatar: "/placeholder.svg?height=100&width=100" },
    { id: 3, name: "David Wilson", mutualFriends: 12, avatar: "/placeholder.svg?height=100&width=100" },
    { id: 4, name: "Sarah Brown", mutualFriends: 6, avatar: "/placeholder.svg?height=100&width=100" },
  ]

  const allFriends = [
    { id: 1, name: "Alex Johnson", avatar: "/placeholder.svg?height=100&width=100", mutualFriends: 15 },
    { id: 2, name: "Maria Garcia", avatar: "/placeholder.svg?height=100&width=100", mutualFriends: 8 },
    { id: 3, name: "David Kim", avatar: "/placeholder.svg?height=100&width=100", mutualFriends: 5 },
    { id: 4, name: "Lisa Wong", avatar: "/placeholder.svg?height=100&width=100", mutualFriends: 20 },
    { id: 5, name: "Robert Chen", avatar: "/placeholder.svg?height=100&width=100", mutualFriends: 3 },
    { id: 6, name: "Emma Wilson", avatar: "/placeholder.svg?height=100&width=100", mutualFriends: 10 },
    { id: 7, name: "James Taylor", avatar: "/placeholder.svg?height=100&width=100", mutualFriends: 7 },
    { id: 8, name: "Sophia Martinez", avatar: "/placeholder.svg?height=100&width=100", mutualFriends: 12 },
  ]

  const renderFriendRequests = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Friend Requests</h2>
      {friendRequests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {friendRequests.map((request) => (
            <div key={request.id} className="bg-white rounded-lg shadow p-4 flex">
              <div className="h-24 w-24 rounded-full overflow-hidden mr-3">
                <img
                  src={request.avatar || "/placeholder.svg"}
                  alt={request.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{request.name}</h3>
                    <p className="text-gray-500 text-sm">{request.mutualFriends} mutual friends</p>
                    <p className="text-gray-500 text-xs">{request.time}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 transition-colors w-full">
                    Confirm
                  </button>
                  <button className="px-4 py-2 bg-gray-200 text-black rounded-md font-medium hover:bg-gray-300 transition-colors w-full">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Users size={32} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No friend requests</h3>
          <p className="text-gray-500">When you have friend requests, you'll see them here.</p>
        </div>
      )}
    </div>
  )

  const renderSuggestions = () => (
    <div className="space-y-4 mt-8">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">People You May Know</h2>
        <button className="text-blue-500 font-medium">See All</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {suggestions.map((suggestion) => (
          <div key={suggestion.id} className="bg-white rounded-lg shadow overflow-hidden">
            <div className="h-48 bg-gray-200">
              <img
                src={suggestion.avatar || "/placeholder.svg"}
                alt={suggestion.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-3">
              <h3 className="font-semibold">{suggestion.name}</h3>
              <p className="text-gray-500 text-sm">{suggestion.mutualFriends} mutual friends</p>
              <div className="mt-3">
                <button className="w-full px-3 py-1.5 bg-blue-100 text-blue-600 rounded-md font-medium hover:bg-blue-200 transition-colors flex items-center justify-center">
                  <UserPlus size={16} className="mr-2" />
                  Add Friend
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderAllFriends = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Friends</h2>
          <div className="flex items-center gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Friends"
                className="pl-9 pr-4 py-2 bg-gray-100 rounded-full outline-none w-full md:w-64"
              />
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
            <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
              <Filter size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        <div className="flex overflow-x-auto pb-2 gap-2 mb-4">
          {["All Friends", "Recently Added", "Birthdays", "College", "Current City", "Following"].map(
            (filter, index) => (
              <button
                key={index}
                className={`px-4 py-1.5 rounded-full whitespace-nowrap ${
                  index === 0 ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {filter}
              </button>
            ),
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allFriends.map((friend) => (
            <div key={friend.id} className="flex items-center p-2 hover:bg-gray-100 rounded-lg">
              <div className="h-16 w-16 rounded-full overflow-hidden mr-3">
                <img
                  src={friend.avatar || "/placeholder.svg"}
                  alt={friend.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">{friend.name}</h3>
                  <div className="flex gap-1">
                    <button className="p-2 rounded-full hover:bg-gray-200">
                      <MessageCircle size={20} className="text-gray-600" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-200">
                      <MoreHorizontal size={20} className="text-gray-600" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-500 text-sm">{friend.mutualFriends} mutual friends</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="pt-16 pb-4 px-4 md:px-8 max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Left Sidebar - Hidden on mobile */}
          {!isMobile && (
            <div className="hidden md:block w-1/4 lg:w-1/5">
              <div className="bg-white rounded-lg shadow p-4 sticky top-20">
                <h2 className="text-2xl font-bold mb-4">Friends</h2>

                <div className="space-y-1">
                  {[
                    { id: "home", label: "Home", icon: <Users size={20} /> },
                    {
                      id: "requests",
                      label: "Friend Requests",
                      icon: <UserPlus size={20} />,
                      count: friendRequests.length,
                    },
                    { id: "suggestions", label: "Suggestions", icon: <Users size={20} /> },
                    { id: "all", label: "All Friends", icon: <Users size={20} />, count: allFriends.length },
                    { id: "birthdays", label: "Birthdays", icon: <Users size={20} /> },
                    { id: "custom", label: "Custom Lists", icon: <Users size={20} /> },
                  ].map((item) => (
                    <button
                      key={item.id}
                      className={`flex items-center justify-between w-full p-2 rounded-lg ${
                        activeSection === item.id ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
                      }`}
                      onClick={() => setActiveSection(item.id)}
                    >
                      <div className="flex items-center">
                        <div className={`mr-2 ${activeSection === item.id ? "text-blue-600" : "text-gray-500"}`}>
                          {item.icon}
                        </div>
                        <span>{item.label}</span>
                      </div>
                      {item.count > 0 && (
                        <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">{item.count}</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Mobile Header */}
            {isMobile && (
              <div className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
                <h2 className="text-xl font-bold">Friends</h2>
                <div className="flex gap-2">
                  <button className="p-2 bg-gray-100 rounded-full">
                    <Search size={20} className="text-gray-600" />
                  </button>
                </div>
              </div>
            )}

            {/* Mobile Tabs */}
            {isMobile && (
              <div className="bg-white rounded-lg shadow p-2 flex justify-around">
                {[
                  { id: "suggestions", label: "Suggestions" },
                  { id: "all", label: "Your Friends" },
                  { id: "requests", label: "Requests", count: friendRequests.length },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    className={`flex-1 py-2 relative ${
                      activeSection === tab.id ? "text-blue-600 font-medium" : "text-gray-600"
                    }`}
                    onClick={() => setActiveSection(tab.id)}
                  >
                    <div className="flex flex-col items-center">
                      <span>{tab.label}</span>
                      {tab.count > 0 && (
                        <span className="absolute top-0 right-1/4 bg-red-500 text-white text-xs rounded-full px-1.5">
                          {tab.count}
                        </span>
                      )}
                    </div>
                    {activeSection === tab.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Content based on active section */}
            {activeSection === "requests" && renderFriendRequests()}
            {activeSection === "suggestions" && renderSuggestions()}
            {activeSection === "all" && renderAllFriends()}

            {/* If on home section, show both requests and suggestions */}
            {activeSection === "home" && (
              <>
                {renderFriendRequests()}
                {renderSuggestions()}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

