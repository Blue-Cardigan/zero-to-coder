import React from 'react';

export default function GitFlowDiagram() {
  return (
    <svg width="500" height="300" viewBox="0 0 500 300" className="w-full h-full">
      {/* Background elements */}
      <defs>
        {/* Box gradients */}
        <linearGradient id="localGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#4f46e5', stopOpacity: 0.8 }} />
          <stop offset="100%" style={{ stopColor: '#312e81', stopOpacity: 0.8 }} />
        </linearGradient>
        <linearGradient id="stagingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#7c3aed', stopOpacity: 0.8 }} />
          <stop offset="100%" style={{ stopColor: '#4f46e5', stopOpacity: 0.8 }} />
        </linearGradient>
        <linearGradient id="remoteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#a855f7', stopOpacity: 0.8 }} />
          <stop offset="100%" style={{ stopColor: '#7c3aed', stopOpacity: 0.8 }} />
        </linearGradient>

        {/* Arrow gradients */}
        <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: '#60a5fa' }} />
          <stop offset="100%" style={{ stopColor: '#a855f7' }} />
        </linearGradient>

        {/* Command background gradient */}
        <linearGradient id="commandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#1e40af', stopOpacity: 0.9 }} />
          <stop offset="100%" style={{ stopColor: '#312e81', stopOpacity: 0.9 }} />
        </linearGradient>
      </defs>

      {/* Local Repository Box */}
      <g transform="translate(10, 200)">
        <rect
          width="140"
          height="90"
          rx="10"
          fill="url(#localGradient)"
          stroke="#60a5fa"
          strokeWidth="2"
          className="drop-shadow-lg"
        />
        <text
          x="70"
          y="50"
          textAnchor="middle"
          fill="#bfdbfe"
          className="text-base font-semibold"
        >
          <tspan x="70" y="40" textAnchor="middle" fill="#bfdbfe" className="text-base font-semibold">
            Local
          </tspan>
          <tspan x="70" y="60" textAnchor="middle" fill="#bfdbfe" className="text-base font-semibold">
            Repository
          </tspan>
        </text>
      </g>

      {/* Staging Area Box */}
      <g transform="translate(180, 120)">
        <rect
          width="140"
          height="90"
          rx="10"
          fill="url(#stagingGradient)"
          stroke="#818cf8"
          strokeWidth="2"
          className="drop-shadow-lg"
        />
        <text
          x="70"
          y="50"
          textAnchor="middle"
          fill="#bfdbfe"
          className="text-base font-semibold"
        >
          Staging Area
        </text>
      </g>

      {/* Remote Repository Box */}
      <g transform="translate(350, 40)">
        <rect
          width="140"
          height="90"
          rx="10"
          fill="url(#remoteGradient)"
          stroke="#a855f7"
          strokeWidth="2"
          className="drop-shadow-lg"
        />
        <text
          x="70"
          y="50"
          textAnchor="middle"
          fill="#bfdbfe"
          className="text-base font-semibold"
        >
          <tspan x="70" y="40" textAnchor="middle" fill="#bfdbfe" className="text-base font-semibold">
            Remote
          </tspan>
          <tspan x="70" y="60" textAnchor="middle" fill="#bfdbfe" className="text-base font-semibold">
            Repository
          </tspan>
        </text>
      </g>

      {/* Arrows */}
      <g stroke="url(#arrowGradient)" strokeWidth="2" fill="none">
        {/* Local to Staging */}
        <path
          d="M 80 200 C 120 120, 100 100, 180 165"
          markerEnd="url(#arrowhead)"
        />
        <g transform="translate(120, 120)">
          <rect
            x="-35"
            y="-12"
            width="70"
            height="24"
            rx="6"
            fill="url(#commandGradient)"
            className="drop-shadow-md"
          />
          <text x="0" y="4" textAnchor="middle" fill="#bfdbfe" className="text-sm font-bold">
            git add
          </text>
        </g>

        {/* Staging to Remote */}
        <path
          d="M 240 120 C 280 20, 300 20, 350 85"
          markerEnd="url(#arrowhead)"
        />
        <g transform="translate(280, 20)">
          <rect
            x="-75"
            y="-12"
            width="150"
            height="24"
            rx="6"
            fill="url(#commandGradient)"
            className="drop-shadow-md"
          />
          <text x="0" y="4" textAnchor="middle" fill="#bfdbfe" className="text-sm font-bold">
            git commit & push
          </text>
        </g>

        {/* Remote to Local */}
        <path
          d="M 420 130 C 420 400, 290 200, 150 245"
          markerEnd="url(#arrowhead)"
        />
        <g transform="translate(370, 270)">
          <rect
            x="-35"
            y="-12"
            width="70"
            height="24"
            rx="6"
            fill="url(#commandGradient)"
            className="drop-shadow-md"
          />
          <text x="0" y="4" textAnchor="middle" fill="#bfdbfe" className="text-sm font-bold">
            git pull
          </text>
        </g>
      </g>

      {/* Arrow marker definition */}
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto-start-reverse"
        >
          <polygon
            points="0 0, 10 3.5, 0 7"
            fill="url(#arrowGradient)"
          />
        </marker>
      </defs>
    </svg>
  );
} 