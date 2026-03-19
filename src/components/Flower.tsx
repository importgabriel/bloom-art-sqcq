'use client';

import React from 'react';

// ─── Types ─────────────────────────────────────────────────────────────────

interface PetalConfig {
  angle: number;
  color: string;
  bloomDelay: string;
  breathDelay: string;
}

// ─── Constants ─────────────────────────────────────────────────────────────

const PETAL_COUNT = 8;
const PETAL_WIDTH  = 52;   // px
const PETAL_HEIGHT = 96;   // px
const HEAD_SIZE    = 220;  // px  (the relative container for petals)
const CENTER_SIZE  = 58;   // px

const PETAL_COLORS: string[] = [
  'linear-gradient(to top, #f43f5e 0%, #fda4af 60%, #ffe4e6 100%)',
  'linear-gradient(to top, #e11d48 0%, #fb7185 60%, #fecdd3 100%)',
  'linear-gradient(to top, #db2777 0%, #f472b6 60%, #fce7f3 100%)',
  'linear-gradient(to top, #be185d 0%, #ec4899 60%, #fbcfe8 100%)',
  'linear-gradient(to top, #f43f5e 0%, #fda4af 60%, #ffe4e6 100%)',
  'linear-gradient(to top, #e11d48 0%, #fb7185 60%, #fecdd3 100%)',
  'linear-gradient(to top, #db2777 0%, #f472b6 60%, #fce7f3 100%)',
  'linear-gradient(to top, #be185d 0%, #ec4899 60%, #fbcfe8 100%)',
];

const PETALS: PetalConfig[] = Array.from({ length: PETAL_COUNT }, (_, i) => ({
  angle:        (360 / PETAL_COUNT) * i,
  color:        PETAL_COLORS[i % PETAL_COLORS.length],
  bloomDelay:   `${0.4 + i * 0.07}s`,
  breathDelay:  `${i * 0.35}s`,
}));

// Sparkle positions around the flower center (relative to head container center)
const SPARKLES = [
  { x: -70, y: -80, size: 6,  delay: '1.6s', dur: '2.8s' },
  { x:  65, y: -90, size: 5,  delay: '2.0s', dur: '3.2s' },
  { x: -95, y: -20, size: 4,  delay: '2.4s', dur: '2.6s' },
  { x:  90, y: -30, size: 7,  delay: '1.8s', dur: '3.0s' },
  { x:  10, y:-105, size: 5,  delay: '2.2s', dur: '2.9s' },
  { x: -40, y:-100, size: 4,  delay: '2.6s', dur: '3.3s' },
];

// ─── Sub-components ────────────────────────────────────────────────────────

function Petal({ angle, color, bloomDelay, breathDelay }: PetalConfig) {
  const baseTransform = `rotate(${angle}deg)`;

  return (
    <div
      style={{
        position:        'absolute',
        width:           PETAL_WIDTH,
        height:          PETAL_HEIGHT,
        left:            `calc(50% - ${PETAL_WIDTH / 2}px)`,
        // bottom of petal sits at center of container
        top:             `calc(50% - ${PETAL_HEIGHT}px)`,
        transformOrigin: '50% 100%',
        borderRadius:    '50% 50% 45% 45% / 65% 65% 35% 35%',
        background:      color,
        boxShadow:       'inset 0 -6px 16px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.12)',
        // CSS custom property used in keyframe
        ['--angle' as string]: baseTransform,
        animation: [
          `petalBloom 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) ${bloomDelay} both`,
          `petalBreath 4s ease-in-out ${breathDelay} infinite`,
        ].join(', '),
      }}
    />
  );
}

function FlowerCenter() {
  return (
    <div
      style={{
        position:     'absolute',
        width:        CENTER_SIZE,
        height:       CENTER_SIZE,
        left:         `calc(50% - ${CENTER_SIZE / 2}px)`,
        top:          `calc(50% - ${CENTER_SIZE / 2}px)`,
        borderRadius: '50%',
        background:   'radial-gradient(circle at 35% 35%, #fef08a 0%, #facc15 45%, #ca8a04 100%)',
        boxShadow:    '0 4px 16px rgba(202, 138, 4, 0.5), inset 0 2px 6px rgba(255,255,255,0.4)',
        zIndex:       10,
        animation:    'centerGlow 3s ease-in-out 1.8s infinite',
      }}
    >
      {/* Stamen dots */}
      {[
        { top: '28%', left: '28%' },
        { top: '28%', left: '55%' },
        { top: '50%', left: '20%' },
        { top: '50%', left: '62%' },
        { top: '62%', left: '38%' },
      ].map((pos, i) => (
        <div
          key={i}
          style={{
            position:     'absolute',
            width:        7,
            height:       7,
            borderRadius: '50%',
            background:   '#92400e',
            top:          pos.top,
            left:         pos.left,
            boxShadow:    '0 1px 3px rgba(0,0,0,0.3)',
          }}
        />
      ))}
    </div>
  );
}

function Sparkle({ x, y, size, delay, dur }: typeof SPARKLES[number]) {
  return (
    <div
      style={{
        position:     'absolute',
        width:        size,
        height:       size,
        left:         `calc(50% + ${x}px)`,
        top:          `calc(50% + ${y}px)`,
        borderRadius: '50%',
        background:   'radial-gradient(circle, #fef08a 0%, #facc15 60%, transparent 100%)',
        animation:    `sparkle ${dur} ease-out ${delay} infinite`,
        pointerEvents:'none',
        zIndex:       20,
      }}
    />
  );
}

function Stem() {
  const stemWidth  = 12;
  const stemHeight = 200;

  return (
    <div
      style={{
        position:      'relative',
        width:         HEAD_SIZE,
        height:        stemHeight,
        display:       'flex',
        justifyContent:'center',
      }}
    >
      {/* Main stem */}
      <div
        style={{
          width:         stemWidth,
          height:        stemHeight,
          background:    'linear-gradient(to bottom, #4ade80 0%, #16a34a 40%, #15803d 100%)',
          borderRadius:  '6px 6px 4px 4px',
          boxShadow:     'inset -3px 0 6px rgba(0,0,0,0.15), 2px 0 4px rgba(0,0,0,0.1)',
          transformOrigin: 'top center',
          animation:     'stemGrow 0.8s ease-out 0.1s both',
        }}
      />

      {/* Left leaf */}
      <div
        style={{
          position:     'absolute',
          top:          stemHeight * 0.35,
          left:         `calc(50% - ${stemWidth / 2}px - 68px)`,
          width:        70,
          height:       30,
          background:   'linear-gradient(to right, #15803d 0%, #4ade80 60%, #86efac 100%)',
          borderRadius: '50% 0 50% 50%',
          boxShadow:    'inset 0 -3px 8px rgba(0,0,0,0.12)',
          transformOrigin: 'right center',
          animation:    'leafLeft 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 1.0s both',
        }}
      />

      {/* Left leaf vein */}
      <div
        style={{
          position:     'absolute',
          top:          stemHeight * 0.35 + 14,
          left:         `calc(50% - ${stemWidth / 2}px - 66px)`,
          width:        60,
          height:       2,
          background:   'rgba(21, 128, 61, 0.4)',
          borderRadius: 1,
          transformOrigin: 'right center',
          animation:    'leafLeft 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 1.0s both',
        }}
      />

      {/* Right leaf */}
      <div
        style={{
          position:     'absolute',
          top:          stemHeight * 0.6,
          left:         `calc(50% + ${stemWidth / 2}px)`,
          width:        68,
          height:       28,
          background:   'linear-gradient(to left, #15803d 0%, #4ade80 60%, #86efac 100%)',
          borderRadius: '0 50% 50% 50%',
          boxShadow:    'inset 0 -3px 8px rgba(0,0,0,0.12)',
          transformOrigin: 'left center',
          animation:    'leafRight 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 1.3s both',
        }}
      />

      {/* Right leaf vein */}
      <div
        style={{
          position:     'absolute',
          top:          stemHeight * 0.6 + 13,
          left:         `calc(50% + ${stemWidth / 2}px + 2px)`,
          width:        58,
          height:       2,
          background:   'rgba(21, 128, 61, 0.4)',
          borderRadius: 1,
          transformOrigin: 'left center',
          animation:    'leafRight 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) 1.3s both',
        }}
      />
    </div>
  );
}

// ─── Ground / Soil ──────────────────────────────────────────────────────────

function Ground() {
  return (
    <div
      style={{
        width:        160,
        height:       28,
        background:   'linear-gradient(to bottom, #a16207 0%, #78350f 100%)',
        borderRadius: '50% 50% 40% 40% / 60% 60% 40% 40%',
        boxShadow:    '0 4px 12px rgba(0,0,0,0.3)',
        position:     'relative',
        overflow:     'hidden',
      }}
    >
      {/* soil texture streaks */}
      {[20, 50, 80].map((pct, i) => (
        <div
          key={i}
          style={{
            position:     'absolute',
            top:          '30%',
            left:         `${pct}%`,
            width:        '18%',
            height:       3,
            background:   'rgba(255,255,255,0.07)',
            borderRadius: 2,
          }}
        />
      ))}
    </div>
  );
}

// ─── Main Flower Component ──────────────────────────────────────────────────

export default function Flower() {
  return (
    <div
      style={{
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        transformOrigin:'center bottom',
        animation:      'sway 6s ease-in-out 2s infinite',
      }}
    >
      {/* Flower Head */}
      <div
        style={{
          position:   'relative',
          width:      HEAD_SIZE,
          height:     HEAD_SIZE,
          animation:  'bloom 1.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s both',
        }}
      >
        {PETALS.map((petal) => (
          <Petal key={petal.angle} {...petal} />
        ))}

        <FlowerCenter />

        {SPARKLES.map((s, i) => (
          <Sparkle key={i} {...s} />
        ))}
      </div>

      {/* Stem + Leaves */}
      <Stem />

      {/* Ground */}
      <Ground />
    </div>
  );
}
