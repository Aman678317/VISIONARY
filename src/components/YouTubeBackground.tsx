import React from 'react';

interface YouTubeBackgroundProps {
  videoId: string;
  overlayOpacity?: number;
  startTime?: number;
}

export const YouTubeBackground: React.FC<YouTubeBackgroundProps> = ({ 
  videoId, 
  overlayOpacity = 0.5,
  startTime = 0
}) => {
  // Extract ID if full URL is passed
  const id = videoId.includes('v=') ? videoId.split('v=')[1].split('&')[0] : videoId;

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      <div className="absolute top-1/2 left-1/2 w-[110%] h-[110%] -translate-x-1/2 -translate-y-1/2">
        <iframe
          src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&showinfo=0&rel=0&enablejsapi=1&modestbranding=1&iv_load_policy=3&start=${startTime}`}
          className="w-full h-full object-cover scale-[1.35]"
          allow="autoplay; fullscreen"
          title="Background Video"
        />
      </div>
      <div 
        className="absolute inset-0 bg-black/40" 
        style={{ opacity: overlayOpacity }} 
      />
      {/* Cinematic Grain/Noise */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
        <div className="absolute inset-0 bg-[url('https://grain-y.com/images/grain.png')] bg-repeat" />
      </div>
      {/* Vignette */}
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-luxury-black/40" />
    </div>
  );
};
