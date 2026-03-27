import React, { useRef, useState } from 'react';
import { Play, Pause, Download, Maximize2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  url: string;
  className?: string;
  onRegenerate?: () => void;
}

export default function VideoPreview({ url, className = '', onRegenerate }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <div className={`relative group rounded-xl overflow-hidden bg-black border border-white/10 ${className}`}>
      <video
        ref={videoRef}
        src={url}
        className="w-full h-auto aspect-video object-contain bg-[#0a0a0d]"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        loop
        playsInline
      />
      
      {/* Controls overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
        {/* Playback center button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button 
            onClick={togglePlay}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all hover:scale-105"
          >
            {isPlaying ? <Pause className="w-5 h-5" fill="currentColor" /> : <Play className="w-5 h-5 ml-1" fill="currentColor" />}
          </button>
        </div>

        {/* Bottom bar */}
        <div className="w-full flex items-center gap-2 relative z-10 justify-end">
          {onRegenerate && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRegenerate}
              className="bg-black/50 border-white/10 text-white hover:bg-white/10 h-8 text-xs backdrop-blur-md mr-auto"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
              Regenerate
            </Button>
          )}

          <a 
            href={url} 
            download 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center justify-center w-8 h-8 rounded bg-black/50 border border-white/10 text-white hover:bg-white/10 backdrop-blur-md"
          >
            <Download className="w-3.5 h-3.5" />
          </a>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={handleFullscreen}
            className="bg-black/50 border-white/10 text-white hover:bg-white/10 w-8 h-8 rounded backdrop-blur-md"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
