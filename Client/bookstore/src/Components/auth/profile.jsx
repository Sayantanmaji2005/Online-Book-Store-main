import React from 'react';
import { useAuth } from '../../Context/authContext';

export const Profile = ({ onLogoutSuccess, onAdminClick }) => {
  const { user, logout } = useAuth();

  // Get current month and year dynamically
  const currentMonthYear = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

  // Sample data if user prop is empty (though AuthContext should handle this)
  const userData = user || {
    name: "Guest User",
    email: "guest@example.com",
    joinedDate: currentMonthYear,
    totalOrders: 0
  };

  // Format the date if it exists in the user object (usually user.date from MongoDB)
  const formattedJoinedDate = user?.date
    ? new Date(user.date).toLocaleString('default', { month: 'long', year: 'numeric' })
    : (user?.joinedDate || currentMonthYear);

  const handleLogout = () => {
    logout();
    if (onLogoutSuccess) onLogoutSuccess();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        {/* Header/Cover Area */}
        <div className="h-32 bg-indigo-600"></div>

        <div className="px-8 pb-8">
          <div className="relative flex justify-between items-end -mt-12 mb-8">
            <div className="w-24 h-24 bg-slate-100 rounded-2xl border-4 border-white flex items-center justify-center text-3xl font-bold text-indigo-600 shadow-md">
              {userData.name.charAt(0)}
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-red-600 transition-colors"
            >
              Log Out
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-black text-slate-900">{userData.name}</h2>
                <p className="text-slate-500 font-medium">{userData.email}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Member Since</p>
                  <p className="text-slate-900 font-bold">{formattedJoinedDate}</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Orders</p>
                  <p className="text-slate-900 font-bold">{userData.totalOrders || 0} Orders</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-black text-slate-900">Account Settings</h3>
              <button className="w-full text-left p-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl transition-all">
                Edit Profile
              </button>
              <button className="w-full text-left p-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl transition-all">
                Order History
              </button>
              <button className="w-full text-left p-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl transition-all">
                Shipping Addresses
              </button>
              {user?.role === 'admin' && (
                <button
                  onClick={onAdminClick}
                  className="w-full text-left p-3 text-sm font-black text-indigo-600 bg-indigo-50 border border-indigo-100 rounded-xl transition-all hover:bg-indigo-600 hover:text-white"
                >
                  Admin Panel
                </button>
              )}
              {/* For Demo purposes, let's keep a small link if role is not set */}
              {!user?.role && (
                <button
                  onClick={onAdminClick}
                  className="w-full text-left p-2 text-[10px] font-bold text-slate-300 hover:text-indigo-400"
                >
                  Demo Admin Access
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};