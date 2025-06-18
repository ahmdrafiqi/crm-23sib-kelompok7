import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import AdminStats from './AdminStats';
import { stats, progressData, chartData } from '../../data/HalamanAdmin/dummyData';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const getDaysInMonth = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const days = [];
  for (let i = 0; i < startingDayOfWeek; i++) days.push(null);
  for (let day = 1; day <= daysInMonth; day++) days.push(day);
  return days;
};

const AdminDashboard = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const navigateMonth = (direction) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  return (
    <main className="flex-1 p-6">

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 rounded-2xl p-8 mb-6 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Hello Vina👋</h1>
          <p className="text-lg opacity-90 mb-4">
            Learn something new every day with
            <br />world's best makeup tutorials. Free online courses
            <br />available.
          </p>
        </div>
        {/* Decorative elements */}
        <div className="absolute right-8 top-8 w-64 h-40 opacity-20">
          <div className="w-full h-full bg-white rounded-lg shadow-lg transform rotate-12" />
          <div className="absolute top-4 left-4 w-8 h-8 bg-pink-300 rounded" />
          <div className="absolute bottom-4 right-4 w-6 h-6 bg-blue-300 rounded-full" />
        </div>
      </div>

      {/* Stats + Progress */}
      <AdminStats stats={stats} progressData={progressData} />

      {/* Calendar, Chart, Better Results */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <h3 className="font-semibold text-gray-800">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <button
              onClick={() => navigateMonth(1)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day) => (
              <div
                key={day}
                className="text-center text-xs font-medium text-gray-500 py-2"
              >
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {getDaysInMonth(currentDate).map((day, index) => (
              <div key={index} className="text-center py-2">
                {day && (
                  <span
                    className={`text-sm w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 cursor-pointer ${
                      day === 18 ? 'bg-blue-500 text-white' : 'text-gray-700'
                    }`}
                  >
                    {day}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Learning Overview Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Learning Overview</h3>
              <p className="text-sm text-gray-500">(75% Activity Growth)</p>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>

          <div className="h-64 relative">
            <svg className="w-full h-full" viewBox="0 0 600 200">
              {/* Grid lines */}
              {[0, 1, 2, 3, 4].map((i) => (
                <line
                  key={i}
                  x1="0"
                  y1={i * 40}
                  x2="600"
                  y2={i * 40}
                  stroke="#f3f4f6"
                  strokeWidth="1"
                />
              ))}

              {/* Chart lines */}
              <path
                d={`M ${chartData
                  .map((d, i) => `${i * 50 + 25},${160 - d.sales * 3}`)
                  .join(' L ')}`}
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d={`M ${chartData
                  .map((d, i) => `${i * 50 + 25},${160 - d.revenue * 3}`)
                  .join(' L ')}`}
                fill="none"
                stroke="#f59e0b"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d={`M ${chartData
                  .map((d, i) => `${i * 50 + 25},${160 - d.customers * 3}`)
                  .join(' L ')}`}
                fill="none"
                stroke="#ec4899"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Data points */}
              {chartData.map((d, i) => (
                <g key={i}>
                  <circle
                    cx={i * 50 + 25}
                    cy={160 - d.sales * 3}
                    r="4"
                    fill="#8b5cf6"
                  />
                  <circle
                    cx={i * 50 + 25}
                    cy={160 - d.revenue * 3}
                    r="4"
                    fill="#f59e0b"
                  />
                  <circle
                    cx={i * 50 + 25}
                    cy={160 - d.customers * 3}
                    r="4"
                    fill="#ec4899"
                  />
                </g>
              ))}
            </svg>

            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-400 -ml-8">
              <span>50</span>
              <span>40</span>
              <span>30</span>
              <span>20</span>
              <span>10</span>
            </div>
          </div>
        </div>

        {/* Better Results Card */}
        <div className="bg-white rounded-xl p-6 shadow-sm lg:col-start-3 lg:row-start-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Do You Want To Get Better Results?
          </h3>

          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors mb-4">
            More details →
          </button>

          <div className="relative">
            <div className="w-full h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mb-2 mx-auto">
                  💡
                </div>
                <div className="text-xs text-gray-600">Analytics & Reports</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminDashboard;