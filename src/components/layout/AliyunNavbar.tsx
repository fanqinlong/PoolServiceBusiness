import React from 'react';
import { 
  Search,
  Bell,
  User,
  ChevronDown
} from 'lucide-react';

export function AliyunNavbar() {
  return (
    <nav className="h-14 bg-white flex items-center px-6 relative z-50 border-b border-gray-200 shadow-sm">
      {/* Left Section - Brand Logo */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          {/* Pool Water Icon with gradient background */}
          <div className="w-10 h-10 rounded-xl flex items-center justify-center relative overflow-hidden"
               style={{ background: 'linear-gradient(135deg, #4285f4 0%, #1a73e8 50%, #0d47a1 100%)' }}>
            {/* Wave SVG Icon */}
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none"
              className="text-white"
            >
              <path 
                d="M2 12c0-2 1-3 2-3s2 1 2 3-1 3-2 3-2-1-2-3zm6 0c0-2 1-3 2-3s2 1 2 3-1 3-2 3-2-1-2-3zm6 0c0-2 1-3 2-3s2 1 2 3-1 3-2 3-2-1-2-3z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                fill="currentColor"
                opacity="0.9"
              />
              <path 
                d="M2 8c0-1.5 1-2.5 2-2.5s2 1 2 2.5-1 2.5-2 2.5-2-1-2-2.5zm6 0c0-1.5 1-2.5 2-2.5s2 1 2 2.5-1 2.5-2 2.5-2-1-2-2.5zm6 0c0-1.5 1-2.5 2-2.5s2 1 2 2.5-1 2.5-2 2.5-2-1-2-2.5z" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                fill="currentColor"
                opacity="0.6"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <span 
              className="text-gray-900 font-semibold tracking-tight"
              style={{ 
                fontSize: '18px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                letterSpacing: '-0.02em'
              }}
            >
              AquaCare
            </span>
            <span 
              className="text-gray-500"
              style={{ 
                fontSize: '11px',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                marginTop: '-2px'
              }}
            >
              Pool Service Manager
            </span>
          </div>
        </div>
      </div>

      {/* Center Section - Empty space */}
      <div className="flex-1"></div>

      {/* Right Section - Search + Actions + User */}
      <div className="flex items-center gap-6">
        {/* Search Box */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search customers, orders, or services..."
            className="w-80 h-9 pl-10 pr-4 bg-gray-50 border border-gray-200 rounded-lg outline-none text-gray-700 placeholder-gray-400 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
            style={{ 
              fontSize: '13px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
            }}
          />
        </div>

        {/* Actions and User Section */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <div className="relative">
            <button className="w-9 h-9 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
              <Bell className="w-4.5 h-4.5" />
            </button>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center border-2 border-white">
              <span className="text-white font-medium" style={{ fontSize: '10px' }}>3</span>
            </div>
          </div>

          {/* Divider */}
          <div className="w-px h-6 bg-gray-300"></div>

          {/* User Profile */}
          <div className="flex items-center gap-2 hover:bg-gray-50 rounded-lg px-3 py-2 cursor-pointer transition-all duration-200 group">
            <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col">
              <span 
                className="text-gray-900 font-medium"
                style={{ 
                  fontSize: '13px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  lineHeight: '1.2'
                }}
              >
                John Smith
              </span>
              <span 
                className="text-gray-500"
                style={{ 
                  fontSize: '11px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                  lineHeight: '1.2'
                }}
              >
                Pool Manager
              </span>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
          </div>
        </div>
      </div>
    </nav>
  );
}