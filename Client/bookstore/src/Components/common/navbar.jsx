import React, { useState } from 'react';
import { useAuth } from '../../Context/authContext';

export const Navbar = ({ cartCount = 0, onCategoryChange, onCartClick, onProfileClick, onHomeClick }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();

  //   create genres or category for quick search
  //   this will be used in the dropdown menu
  // define  a genre object with id and name
  //   id will be used to filter the books
  //   name will be used to display the genre name
  const genres = [
    { id: 'all', name: 'All Books' },
    { id: 'fiction', name: 'Fiction' },
    { id: 'biography', name: 'Biography' },
    { id: 'motivation', name: 'Motivation' },
    { id: 'mythology', name: 'Mythology' },
    { id: 'children', name: 'Children' },
  ];

  return (

    <nav className="sticky top-0 z-[100] bg-white/90 backdrop-blur-xl border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo if the store this may changeable*/}
          <div
            onClick={onHomeClick}
            className="flex-shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tighter hidden lg:block">
              BOOK<span className="text-indigo-600">Store</span>
            </span>
          </div>

          {/* Navigation Links & Dropdown */}
          <div className="hidden md:flex items-center gap-8 mx-8">
            <button
              onClick={onHomeClick}
              className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors"
            >
              Home
            </button>

            <button
              onClick={() => onProfileClick('seller')}
              className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors"
            >
              Seller
            </button>

            {/* Genre Dropdown Trigger on mouse enter it open and on mouse leave it close*/}
            <div
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors py-8">
                Genres
                {/* add svg icon for genre */}
                <svg className={`w-4 h-4 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* The Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-[80px] -left-4 w-64 bg-white border border-slate-100 shadow-2xl rounded-2xl p-3 grid grid-cols-1 animate-in slide-in-from-top-2 duration-200">
                  {genres.map((genre) => (
                    <button
                      key={genre.id}
                      onClick={() => onCategoryChange(genre.id)}
                      className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-slate-50 transition-colors text-left group"
                    >
                      <span className="text-xl group-hover:scale-110 transition-transform">{genre.icon}</span>
                      <span className="text-sm font-bold text-slate-700 group-hover:text-indigo-600">{genre.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>


          </div>

          {/* Search Bar */}
          {/* Here I created a changeable search bar if over focused it will be wider */}
          <div className={`hidden lg:flex items-center transition-all duration-300 ${isSearchFocused ? 'w-64' : 'w-48'}`}>
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search..."
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="w-full bg-slate-100 border-none rounded-2xl py-2 pl-10 pr-4 text-xs focus:ring-2 focus:ring-indigo-500 transition-all"
              />
              <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* User & Cart Actions */}
          <div className="flex items-center gap-1 sm:gap-3">
            <button
              onClick={onCartClick}
              className="relative p-2.5 text-slate-600 hover:bg-slate-50 rounded-2xl transition-all">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-indigo-600 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>
            {/* User Profile this is mainly for the user to see their profile */}
            <button
              onClick={onProfileClick}
              className={`w-10 h-10 ${isAuthenticated ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'} rounded-xl flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all`}
            >
              {isAuthenticated ? (
                <span className="text-xs font-bold">{user?.name?.charAt(0).toUpperCase()}</span>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};