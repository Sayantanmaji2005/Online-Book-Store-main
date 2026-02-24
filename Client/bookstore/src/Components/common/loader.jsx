import React from 'react';

export const Loader = ({ isLoading = false, message = 'Opening your Bookstore...' }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/95 backdrop-blur-md transition-opacity duration-300">
      <div className="relative flex flex-col items-center">
        {/* Premium Book Animation - 1 Second Cycle */}
        <div className="w-24 h-20 relative perspective-[1000px]">
          {/* Book Spine */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-indigo-800 rounded-full -translate-x-1/2 z-20"></div>

          {/* Main Book Body */}
          <div className="absolute inset-0 bg-indigo-600 rounded-r-md shadow-lg transform-origin-left"></div>
          <div className="absolute inset-0 bg-indigo-600 rounded-l-md shadow-lg transform-origin-right scale-x-[-1] -translate-x-full"></div>

          {/* Flipping Pages */}
          <div className="absolute top-1 bottom-1 left-1/2 w-[45%] bg-indigo-50 rounded-r-sm origin-left animate-[pageFlip_1s_infinite_ease-in-out]"></div>
          <div className="absolute top-1 bottom-1 left-1/2 w-[45%] bg-indigo-100 rounded-r-sm origin-left animate-[pageFlip_1s_infinite_ease-in-out_-250ms]"></div>
          <div className="absolute top-1 bottom-1 left-1/2 w-[45%] bg-indigo-200 rounded-r-sm origin-left animate-[pageFlip_1s_infinite_ease-in-out_-500ms]"></div>
          <div className="absolute top-1 bottom-1 left-1/2 w-[45%] bg-indigo-300 rounded-r-sm origin-left animate-[pageFlip_1s_infinite_ease-in-out_-750ms]"></div>
        </div>

        {/* Text and Animation */}
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">
            {message}
          </h2>
          <div className="flex justify-center gap-1.5">
            <span className="w-2 h-2 bg-indigo-600 rounded-full animate-[bounce_1s_infinite_0ms]"></span>
            <span className="w-2 h-2 bg-indigo-600 rounded-full animate-[bounce_1s_infinite_200ms]"></span>
            <span className="w-2 h-2 bg-indigo-600 rounded-full animate-[bounce_1s_infinite_400ms]"></span>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes pageFlip {
          0% { transform: rotateY(0deg); opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { transform: rotateY(-180deg); opacity: 0; }
        }
        .perspective-[1000px] {
          perspective: 1000px;
        }
      `}} />
    </div>
  );
};
