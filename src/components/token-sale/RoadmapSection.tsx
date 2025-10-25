"use client";

import { Check, Clock, Calendar, Target } from 'lucide-react';

const roadmapPhases = [
  {
    phase: "Phase 1",
    title: "Foundation & Launch",
    period: "Q1 - Q2 2026",
    status: "upcoming",
    items: [
      "Smart contract development & audit",
      "Token sale launch",
      "Community building",
      "Initial partnerships"
    ]
  },
  {
    phase: "Phase 2", 
    title: "Platform Development",
    period: "Q2 - Q3 2026",
    status: "upcoming",
    items: [
      "DAO governance implementation",
      "Project funding mechanism",
      "Staking rewards system",
      "Mobile app development"
    ]
  },
  {
    phase: "Phase 3",
    title: "Ecosystem Expansion",
    period: "Q3 - Q4 2026",
    status: "future",
    items: [
      "Cross-chain integration", 
      "NFT marketplace for cause awareness",
      "Enterprise partnerships",
      "Global ambassador program"
    ]
  },
  {
    phase: "Phase 4",
    title: "Global Impact",
    period: "Q4 2026 & Beyond",
    status: "future",
    items: [
      "4+ funded projects milestone",
      "Integration with major NGOs",
      "Educational platform launch",
      "Sustainable impact measurement"
    ]
  }
];

export default function RoadmapSection() {
  return (
    <div>
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">Roadmap</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Our strategic plan to revolutionize women's rights funding through blockchain technology and community governance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {roadmapPhases.map((phase, index) => (
          <div
            key={index}
            className={`relative p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg ${
              phase.status === 'completed'
                ? 'bg-green-50 border-green-200'
                : phase.status === 'active'
                ? 'bg-blue-50 border-blue-200 ring-2 ring-blue-400'
                : phase.status === 'upcoming'
                ? 'bg-orange-50 border-orange-200'
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            {/* Phase Badge */}
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-4 ${
              phase.status === 'completed'
                ? 'bg-green-100 text-green-800'
                : phase.status === 'active'
                ? 'bg-blue-100 text-blue-800'
                : phase.status === 'upcoming'
                ? 'bg-orange-100 text-orange-800'
                : 'bg-gray-100 text-gray-800'
            }`}>
              {phase.status === 'completed' ? (
                <Check className="w-4 h-4 mr-1" />
              ) : phase.status === 'active' ? (
                <Target className="w-4 h-4 mr-1" />
              ) : phase.status === 'upcoming' ? (
                <Clock className="w-4 h-4 mr-1" />
              ) : (
                <Calendar className="w-4 h-4 mr-1" />
              )}
              {phase.phase}
            </div>

            {/* Title & Period */}
            <h3 className="text-xl font-bold mb-2">{phase.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{phase.period}</p>

            {/* Items */}
            <ul className="space-y-2">
              {phase.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start gap-2 text-sm">
                  {phase.status === 'completed' ? (
                    <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  ) : (
                    <div className="w-4 h-4 mt-0.5 flex-shrink-0">
                      <div className={`w-2 h-2 rounded-full ${
                        phase.status === 'active'
                          ? 'bg-blue-500'
                          : phase.status === 'upcoming'
                          ? 'bg-orange-500'
                          : 'bg-gray-400'
                      }`}></div>
                    </div>
                  )}
                  <span className={phase.status === 'completed' ? 'text-green-700' : 'text-gray-700'}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* Progress Indicator */}
            {phase.status === 'active' && (
              <div className="mt-4 pt-4 border-t border-blue-200">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-blue-700 font-medium">Progress</span>
                  <span className="text-blue-600">60%</span>
                </div>
                <div className="w-full bg-blue-100 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full w-3/5"></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Timeline Connector (hidden on mobile) */}
      <div className="hidden lg:block absolute left-0 top-32 w-full h-0.5 bg-gray-200 -z-10"></div>
    </div>
  );
}
