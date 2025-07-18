import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Loader2,
  FastForward,
} from "lucide-react";
import { useAudioPlayer } from "../../contexts/PlayerContext/PlayerContext";
import { switchTheme } from "../../hooks/switchTheme";
import "./AudioPlayer.css";
import { motion } from "framer-motion";

interface AudioPlayerProps {
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioRef }) => {
  const {
    currentBeat,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isVisible,
    isLoading,
    togglePlay,
    closeBeat,
    handleVolume,
    toggleMute,
    seekTo,
    skipForward,
    skipBackward,
  } = useAudioPlayer();

  const { theme } = switchTheme();

  // Format time to MM:SS
  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const playedSlider = theme === "dark" ? "#00faec" : "#a828f8";

  if (!isVisible || !currentBeat) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: isVisible ? 0 : 100, opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="fixed bottom-0 left-0 right-0 z-50 shadow-[0_-2px_6px_rgba(0,0,0,0.1)] bg-platinum/80 dark:bg-black/60 backdrop-blur-lg"
    >
      <audio ref={audioRef} preload="metadata">
        {currentBeat?.previewAudioUrl && (
          <source src={currentBeat.previewAudioUrl} type="audio/mpeg" />
        )}
      </audio>

      <div className="flex items-center xs:px-2 md:px-5 py-3 mx-auto max-w-[2000px] justify-between transition-all duration-200">
        <div className="relative flex items-center gap-2 mr-2 overflow-hidden min-w-28">
          <div className="absolute top-0 right-0 z-20 w-8 h-full rounded-lg bg-gradient-to-l from-platinum dark:from-black/60 to-transparent"></div>
          <img
            src={currentBeat?.coverImageUrl}
            alt={currentBeat?.title}
            className="z-20 object-cover w-10 h-10 transition-transform rounded-lg shadow-lg hover:scale-105"
          />
          <div className="whitespace-nowrap">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              {currentBeat?.title}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {currentBeat?.producer}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center max-w-2xl xs:gap-4 md:gap-10 xs:scale-[80%] md:scale-100">
          <div className="flex items-center xs:gap-1 md:gap-5">
            <button
              onClick={() => skipBackward(10)}
              className="text-gray-500 dark:text-gray-300 dark:hover:text-white hover:text-black xs:hidden md:block"
              disabled={isLoading}
            >
              <FastForward size={20} className="rotate-180" />
            </button>

            <button
              onClick={togglePlay}
              className="p-2 text-black transition-all duration-150 rounded-full shadow-md shadow-black/30 dark:shadow-white/20 group dark:text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 size={22} className="animate-spin" />
              ) : isPlaying ? (
                <Pause
                  size={22}
                  className="group-hover:fill-black dark:group-hover:fill-white"
                />
              ) : (
                <Play
                  size={22}
                  className="group-hover:fill-black dark:group-hover:fill-white"
                />
              )}
            </button>

            <button
              onClick={() => skipForward(10)}
              className="text-gray-500 dark:text-gray-300 dark:hover:text-white hover:text-black xs:hidden md:block"
              disabled={isLoading}
            >
              <FastForward size={20} />
            </button>
          </div>

          <div className="flex items-center w-full mt-[6px] xs:gap-1 md:gap-5">
            <span className="text-xs leading-none text-gray-700">
              {formatTime(currentTime)}
            </span>

            <div className="relative flex w-full -mt-1">
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={(e) => seekTo(parseFloat(e.target.value))}
                className="w-full h-1 rounded-lg appearance-none cursor-pointer bg-black/60 dark:bg-platinum min-w-20 slider"
                style={{
                  background: `linear-gradient(to right, ${playedSlider} 0%, ${playedSlider} ${
                    (currentTime / duration) * 100
                  }%, #737373 ${
                    (currentTime / duration) * 100
                  }%, #737373 100%)`,
                }}
                disabled={isLoading || !duration}
              />
            </div>

            <span className="text-xs leading-none text-gray-700">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleMute}
              className="text-gray-500 dark:text-gray-300 dark:hover:text-white hover:text-black"
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={isMuted ? 0 : volume}
              onChange={(e) => handleVolume(parseFloat(e.target.value))}
              className="w-20 h-1 bg-gray-500 rounded-lg appearance-none cursor-pointer dark:bg-platinum slider xs:hidden md:block"
              style={{
                background: `linear-gradient(to right, ${playedSlider} 0%, ${playedSlider} ${
                  (isMuted ? 0 : volume) * 100
                }%, #737373 ${(isMuted ? 0 : volume) * 100}%, #737373 100%)`,
              }}
            />
          </div>

          <button
            onClick={closeBeat}
            className="ml-2 text-gray-700 transition-colors dark:text-gray-200 hover:text-red-600 dark:hover:text-red-500"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AudioPlayer;
