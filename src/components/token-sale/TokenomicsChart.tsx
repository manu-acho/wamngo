"use client";

const tokenomicsData = [
  {
    name: 'Project Funding',
    value: 52,
    color: 'bg-blue-500',
    description: 'Direct funding for women\'s rights projects and community initiatives'
  },
  {
    name: 'Public Sale',
    value: 20,
    color: 'bg-purple-500',
    description: 'Tokens available for community participation'
  },
  {
    name: 'Community Rewards',
    value: 15,
    color: 'bg-green-500',
    description: 'Staking rewards, governance incentives, and community benefits'
  },
  {
    name: 'Operations & Development',
    value: 10,
    color: 'bg-orange-500',
    description: 'Platform development, operations, and sustainability'
  },
  {
    name: 'Emergency Reserve',
    value: 3,
    color: 'bg-red-500',
    description: 'Emergency funding for critical situations'
  }
];

export default function TokenomicsChart() {
  return (
    <div className="w-full">
      {/* Visual Chart using CSS */}
      <div className="relative w-80 h-80 mx-auto mb-8">
        <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r="80"
            fill="none"
            stroke="#f3f4f6"
            strokeWidth="20"
          />
          
          {/* Segments */}
          {tokenomicsData.map((item, index) => {
            const prevTotal = tokenomicsData.slice(0, index).reduce((sum, prev) => sum + prev.value, 0);
            const circumference = 2 * Math.PI * 80;
            const offset = (prevTotal / 100) * circumference;
            const dashLength = (item.value / 100) * circumference;
            
            return (
              <circle
                key={index}
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke={`rgb(${
                  item.color === 'bg-blue-500' ? '59 130 246' :
                  item.color === 'bg-purple-500' ? '139 92 246' :
                  item.color === 'bg-green-500' ? '16 185 129' :
                  item.color === 'bg-orange-500' ? '245 158 11' :
                  item.color === 'bg-teal-500' ? '20 184 166' :
                  '239 68 68'
                })`}
                strokeWidth="20"
                strokeDasharray={`${dashLength} ${circumference - dashLength}`}
                strokeDashoffset={-offset}
                className="transition-all duration-300 hover:stroke-opacity-80"
              />
            );
          })}
        </svg>
        
        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">1B</div>
            <div className="text-sm text-gray-600">Total Supply</div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-3">
        {tokenomicsData.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded ${item.color}`}></div>
              <div>
                <div className="font-medium text-gray-900">{item.name}</div>
                <div className="text-sm text-gray-600">{item.description}</div>
              </div>
            </div>
            <div className="text-lg font-bold text-gray-900">{item.value}%</div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <h3 className="text-xl font-bold mb-4">Total Supply: 1,000,000,000 WAM</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-semibold">Public Sale Allocation:</span>
            <br />
            <span className="text-gray-600">20% (200M WAM)</span>
          </div>
          <div>
            <span className="font-semibold">Project Funding:</span>
            <br />
            <span className="text-gray-600">52% (520M WAM)</span>
          </div>
          <div>
            <span className="font-semibold">Community Rewards:</span>
            <br />
            <span className="text-gray-600">15% (150M WAM)</span>
          </div>
          <div>
            <span className="font-semibold">Max Supply:</span>
            <br />
            <span className="text-gray-600">Fixed at 1B</span>
          </div>
        </div>
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>NGO Focus:</strong> 52% dedicated to direct project funding ensures maximum impact for women's rights initiatives
          </p>
        </div>
      </div>
    </div>
  );
}
