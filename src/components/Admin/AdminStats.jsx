import React from 'react';
import { Award, Package } from 'lucide-react';

const iconMap = {
  Award: Award,
  Package: Package,
};

const AdminStats = ({ stats, progressData }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      {/* Stats Cards */}
      {stats.map((stat, index) => {
        const Icon = iconMap[stat.icon];
        return (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center space-x-4">
              <div
                className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">{stat.label}</div>
                <div className="text-sm text-gray-500">{stat.sublabel}</div>
              </div>
            </div>
            <div className="mt-4">
              <button className="text-blue-500 text-sm hover:underline">
                View course →
              </button>
            </div>
          </div>
        );
      })}

      {/* Progress Card */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Today Progress</h3>
        <p className="text-sm text-gray-500 mb-4">Your Daily Goal Almost Done!</p>

        <div className="relative w-32 h-32 mx-auto">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="8"
            />
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${progressData.percentage * 3.14} 314`}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">
                {progressData.percentage}%
              </div>
              <div className="text-xs text-gray-500">Task Done!</div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-4 mt-4">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-purple-500 rounded-full" />
            <span className="text-xs text-gray-500">Progress</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-orange-400 rounded-full" />
            <span className="text-xs text-gray-500">Done</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
