import Flower from '@/components/Flower';

export default function Home() {
  return (
    <main
      style={{
        minHeight:       '100vh',
        display:         'flex',
        flexDirection:   'column',
        alignItems:      'center',
        justifyContent:  'center',
        gap:             '2rem',
        // Animated gradient background
        background:      'linear-gradient(135deg, #bae6fd, #e0f2fe, #d1fae5, #bbf7d0)',
        backgroundSize:  '300% 300%',
        animation:       'bgDrift 12s ease-in-out infinite',
        padding:         '2rem',
        overflow:        'hidden',
        position:        'relative',
      }}
    >
      {/* Decorative blurred blobs */}
      <div
        aria-hidden
        style={{
          position:     'absolute',
          top:          '-10%',
          left:         '-10%',
          width:        400,
          height:       400,
          borderRadius: '50%',
          background:   'rgba(251, 207, 232, 0.35)',
          filter:       'blur(80px)',
          pointerEvents:'none',
        }}
      />
      <div
        aria-hidden
        style={{
          position:     'absolute',
          bottom:       '-10%',
          right:        '-8%',
          width:        360,
          height:       360,
          borderRadius: '50%',
          background:   'rgba(167, 243, 208, 0.35)',
          filter:       'blur(80px)',
          pointerEvents:'none',
        }}
      />

      {/* Title */}
      <h1
        style={{
          fontSize:      'clamp(1.6rem, 5vw, 2.8rem)',
          fontWeight:    800,
          letterSpacing: '-0.02em',
          background:    'linear-gradient(135deg, #be185d 0%, #f43f5e 40%, #fb923c 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor:  'transparent',
          backgroundClip:       'text',
          textAlign:     'center',
          animation:     'fadeInDown 0.9s ease-out 0.1s both',
          userSelect:    'none',
        }}
      >
        In Full Bloom
      </h1>

      {/* The Flower */}
      <Flower />

      {/* Subtitle */}
      <p
        style={{
          fontSize:      '0.95rem',
          color:         '#6b7280',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          fontWeight:    500,
          animation:     'fadeInDown 1s ease-out 2.2s both',
          userSelect:    'none',
        }}
      >
        Pure CSS &middot; No Dependencies
      </p>
    </main>
  );
}
