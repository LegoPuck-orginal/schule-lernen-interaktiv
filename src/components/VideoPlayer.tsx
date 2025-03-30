
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { PlayCircle } from 'lucide-react';

interface VideoPlayerProps {
  title: string;
  description: string;
  videoId: string;
  thumbnail?: string;
}

const VideoPlayer = ({ title, description, videoId, thumbnail }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  
  const startVideo = () => {
    setIsPlaying(true);
  };
  
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        {!isPlaying ? (
          <div className="relative">
            <img 
              src={thumbnail || `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
              alt={title}
              className="w-full h-auto aspect-video object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <button 
                onClick={startVideo}
                className="p-3 rounded-full bg-white/90 text-primary hover:bg-white transition-colors"
              >
                <PlayCircle size={48} />
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
              <h3 className="text-white font-semibold text-lg">{title}</h3>
              <p className="text-white/80 text-sm line-clamp-2">{description}</p>
            </div>
          </div>
        ) : (
          <div className="aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VideoPlayer;
