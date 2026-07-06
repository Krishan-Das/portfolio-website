import React from 'react';

const LoaderRK = ({ show, message = "Processing, please wait..." }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950/60 backdrop-blur-sm transition-all duration-300">
      <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 shadow-2xl max-w-xs w-full text-center">
        
        {/* Modern Animated Spinner */}
        <div className="relative w-12 h-12">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-4 border-slate-800"></div>
          {/* Animated spinning ring */}
          <div className="absolute inset-0 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>
        </div>

        {/* Text Message */}
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-white tracking-wide">
            {message}
          </p>
          <p className="text-[11px] text-slate-400 font-medium">
            Don't close or refresh this page
          </p>
        </div>

      </div>
    </div>
  );
};

export default LoaderRK;