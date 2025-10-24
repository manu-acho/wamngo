interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className = "", showText = true }: LogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      {/* Logo Symbol */}
      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
        <span className="text-white font-bold text-lg">W</span>
      </div>
      
      {/* Logo Text */}
      {showText && (
        <div className="flex flex-col">
          <div className="text-2xl font-bold text-blue-900 leading-none">WAM</div>
          <div className="text-xs text-gray-600 leading-none">Women Against Mutilations</div>
        </div>
      )}
    </div>
  );
}
