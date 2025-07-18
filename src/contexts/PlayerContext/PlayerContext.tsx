import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  ReactNode,
} from "react";
import AudioPlayer from "../../utils/AudioPlayer/AudioPlayer";
import { IBeat } from "../../services/beat.api.service";

interface AudioPlayerContextType {
  currentBeat: IBeat | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isVisible: boolean;
  isLoading: boolean;
  playerError: string;
  playBeat: (beat: IBeat) => void;
  togglePlay: () => void;
  pauseBeat: () => void;
  closeBeat: () => void;
  handleVolume: (volume: number) => void;
  toggleMute: () => void;
  seekTo: (time: number) => void;
  skipForward: (seconds?: number) => void;
  skipBackward: (seconds?: number) => void;
}

interface AudioPlayerProviderProps {
  children: ReactNode;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | null>(null);

export const AudioPlayerProvider: React.FC<AudioPlayerProviderProps> = ({
  children,
}) => {
  const [currentBeat, setCurrentBeat] = useState<IBeat | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [playerError, setPlayerError] = useState("");

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playBeat = (beat: IBeat) => {
    // Validate that the beat has a valid preview URL
    if (!beat.previewAudioUrl) {
      setPlayerError("Beat has no preview audio URL:");
      return;
    }

    setCurrentBeat(beat);
    setIsVisible(true);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setIsLoading(true);
  };

  const togglePlay = () => {
    if (audioRef.current && currentBeat) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
        setIsLoading(false);
      }
    }
  };

  const pauseBeat = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const closeBeat = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    setCurrentBeat(null);
    setIsVisible(false);
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setIsLoading(false);
  };

  const handleVolume = (volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = volume;

      setVolume(volume);
      setIsMuted(volume === 0);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const skipForward = (seconds: number = 10) => {
    if (audioRef.current) {
      const newTime = Math.min(duration, currentTime + seconds);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const skipBackward = (seconds: number = 10) => {
    if (audioRef.current) {
      const newTime = Math.max(0, currentTime - seconds);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const updateDuration = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    const handleCanPlay = () => {
      audio.volume = volume;
      setIsLoading(false);
    };

    const handleLoadStart = () => {
      setIsLoading(true);
    };

    const handleLoadedData = () => {
      setIsLoading(false);

      // Auto-play when audio is loaded
      if (currentBeat && audioRef.current) {
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            setIsPlaying(false);
          });
      }
    };

    const handleplayerError = () => {
      setIsLoading(false);
      setIsPlaying(false);
      setPlayerError("Failed to play audio");
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("loadeddata", handleLoadedData);
    audio.addEventListener("playerError", handleplayerError);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("loadeddata", handleLoadedData);
      audio.removeEventListener("playerError", handleplayerError);
    };
  }, [currentBeat, volume]);

  // Reset and load audio when beat changes
  useEffect(() => {
    if (currentBeat && audioRef.current && currentBeat.previewAudioUrl) {
      audioRef.current.src = currentBeat.previewAudioUrl;
      audioRef.current.load();
    }
  }, [currentBeat]);

  const contextValue: AudioPlayerContextType = {
    currentBeat,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isVisible,
    isLoading,
    playerError,
    playBeat,
    togglePlay,
    pauseBeat,
    closeBeat,
    handleVolume,
    toggleMute,
    seekTo,
    skipForward,
    skipBackward,
  };

  return (
    <AudioPlayerContext.Provider value={contextValue}>
      <AudioPlayer audioRef={audioRef} />
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error(
      "useAudioPlayer must be used within an AudioPlayerProvider"
    );
  }
  return context;
};
