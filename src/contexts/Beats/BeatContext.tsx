import { createContext, ReactNode, useContext, useState } from "react";
import { beatApiService, IBeat } from "../../services/beat.api.service";

interface BeatContextType {
  beats: IBeat[];
  clickedBeat: IBeat | null;
  isLoading: boolean;
  error: string | null;
  fetchBeats: () => Promise<void>;
  fetchBeatById: (id: string) => Promise<void>;
  getDownloadUrl: (
    beatId: string,
    fileType: "full" | "stems"
  ) => Promise<string>;
  setClickedBeat: (beat: IBeat | null) => void;
}

interface BeatProviderProps {
  children: ReactNode;
}

const BeatContext = createContext<BeatContextType | null>(null);

export const BeatProvider: React.FC<BeatProviderProps> = ({ children }) => {
  const [beats, setBeats] = useState<IBeat[]>([]);
  const [clickedBeat, setClickedBeat] = useState<IBeat | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBeats = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const beatsArray = await beatApiService.getAllBeats();

      setBeats(beatsArray);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to fetch beats"
      );
      setBeats([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBeatById = async (id: string) => {
    try {
      setIsLoading(true);

      const data = await beatApiService.getBeatById(id);

      setBeats([data]);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to fetch this beat"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getDownloadUrl = async (beatId: string, fileType: "full" | "stems") => {
    try {
      setIsLoading(true);

      return await beatApiService.generateDownloadUrl(beatId, fileType);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to generate download URL"
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const value: BeatContextType = {
    beats,
    clickedBeat,
    isLoading,
    error,
    fetchBeats,
    fetchBeatById,
    getDownloadUrl,
    setClickedBeat,
  };

  return <BeatContext.Provider value={value}>{children}</BeatContext.Provider>;
};

export const useBeat = (): BeatContextType => {
  const context = useContext(BeatContext);
  if (!context) {
    throw new Error("useBeat must be used within a BeatProvider");
  }
  return context;
};
