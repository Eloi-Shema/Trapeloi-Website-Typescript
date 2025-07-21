import React, {
  forwardRef,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import "./Store.css";
import cart_icon from "../../assets/icons/cart.svg";
import search_icon from "../../assets/icons/search.svg";
import close_icon from "../../assets/icons/close.svg";
import list_icon from "../../assets/icons/list.svg";
import grid_icon from "../../assets/icons/grid.svg";
import arrow from "../../assets/icons/arrow.svg";
import backgroundImage from "../../assets/studio1.webp";
import { motion } from "framer-motion";
import { useBeat } from "../../contexts/Beats/BeatContext.tsx";
import { IBeat } from "../../services/beat.api.service.ts";
import GridLoadingSkeleton from "../../utils/Loading/GridLoadingSkeleton.tsx";
import ListLoadingSkeleton from "../../utils/Loading/ListLoadingSkeleton.tsx";
import ListLoadingSkeleton2 from "../../utils/Loading/ListLoadingSkeleton2.tsx";
import { useAudioPlayer } from "../../contexts/PlayerContext/PlayerContext.tsx";
import { Pause, Play } from "lucide-react";
import Waveform from "../../utils/Waveform/Waveform.tsx";

interface StoreProps {
  addToCart: (beat: IBeat) => void;
  ref: RefObject<HTMLDivElement | null>;
}

const Store: React.FC<StoreProps> = forwardRef(({ addToCart }, ref) => {
  const { beats, setClickedBeat, isLoading, error, fetchBeats } = useBeat();

  const { playBeat, currentBeat, isPlaying, togglePlay } = useAudioPlayer();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(0);
  const [renderKey, setRenderKey] = useState(0);

  // SWITCH BETWEEN GRID AND LIST VIEW IN STORE AND SAVE THE STATE
  const [isGridView, setIsGridView] = useState(() => {
    return localStorage.getItem("viewMode") === "list" ? true : false;
  });

  // Fetching beats at app initialization
  useEffect(() => {
    fetchBeats();
  }, []);

  useEffect(() => {
    setRenderKey((prev) => prev + 1);
  }, [isPlaying, currentBeat?._id]);

  //AUDIO PLAYER
  const handlePlay = (beat: IBeat) => {
    setClickedBeat(beat);

    const isCurrentBeat = currentBeat?._id === beat._id;

    if (isCurrentBeat) {
      togglePlay();
    } else {
      playBeat(beat);
    }
  };

  // Get the current playing state for each beat
  const isCurrentBeat = (beat: IBeat) => currentBeat?._id === beat._id;
  const isCurrentlyPlaying = (beat: IBeat) => isCurrentBeat(beat) && isPlaying;

  // Reset search and pagination when beats are loaded
  useEffect(() => {
    if (!isLoading && beats.length > 0) {
      // Only reset if we have beats and we're not currently searching
      if (searchQuery === "") {
        setCurrentPage(0);
      }
    }
  }, [isLoading, beats.length, searchQuery]);

  const toggleView = useCallback(() => {
    const newGridView = !isGridView;
    setIsGridView(newGridView);
    localStorage.setItem("viewMode", newGridView ? "grid" : "list");
  }, [isGridView]);

  const filteredBeat = useMemo(() => {
    if (!beats || beats.length === 0) return [];

    if (searchQuery.trim() === "") {
      return beats;
    }

    const query = searchQuery.toLowerCase().trim();
    return beats.filter((beat) => beat.title.toLowerCase().includes(query));
  }, [searchQuery, beats]);

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setCurrentPage(0);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
    setCurrentPage(0);
  }, []);

  // HANDLING PAGINATION - Memoized for performance
  const paginationData = useMemo(() => {
    const beatsPerPage = 10;
    const totalPages = Math.max(
      1,
      Math.ceil(filteredBeat.length / beatsPerPage)
    );
    const startIndex = currentPage * beatsPerPage;
    const endIndex = startIndex + beatsPerPage;
    const beatsOnPage = filteredBeat.slice(startIndex, endIndex);

    return {
      beatsPerPage,
      totalPages,
      startIndex,
      endIndex,
      beatsOnPage,
    };
  }, [filteredBeat, currentPage]);

  const { totalPages, beatsOnPage } = paginationData;

  // update the current page when filtered results change
  useEffect(() => {
    const { totalPages: newTotalPages } = paginationData;
    if (currentPage >= newTotalPages && newTotalPages > 0) {
      setCurrentPage(Math.max(0, newTotalPages - 1));
    }
  }, [paginationData, currentPage]);

  //make store component stay into view when height decrease.
  const storePageRef = useRef<HTMLDivElement | null>(null);
  const prevPageRef = useRef(currentPage);
  const prevHeightRef = useRef<number>(0);

  useEffect(() => {
    if (prevPageRef.current !== currentPage && storePageRef.current) {
      const currenHeight = storePageRef.current.offsetHeight;
      const containerPosition =
        storePageRef.current.getBoundingClientRect().top + window.scrollY;

      if (currenHeight < prevHeightRef.current) {
        setTimeout(() => {
          window.scrollTo({
            top: containerPosition,
            behavior: "instant",
          });
        }, 0);
      }
      prevHeightRef.current = currenHeight;
    }
    prevPageRef.current = currentPage;
  }, [currentPage]);

  useEffect(() => {
    if (storePageRef.current) {
      prevHeightRef.current = storePageRef.current.offsetHeight;
    }
  }, []);

  //make the current page dot pagination not disappear when pages of beats increase in the future
  const dotsContainerRef = useRef<HTMLDivElement>(null);
  const [pageRender, setPageRender] = useState<boolean>(true);

  useEffect(() => {
    if (pageRender) {
      setPageRender(false);
      return;
    }

    if (dotsContainerRef.current && totalPages > 1) {
      const currentDot = dotsContainerRef.current?.children[currentPage];

      if (currentDot) {
        const containerRect = dotsContainerRef.current.getBoundingClientRect();
        const dotRect = currentDot.getBoundingClientRect();

        const scrollLeft =
          dotRect.left +
          dotRect.width / 2 -
          (containerRect.left + containerRect.width / 2) +
          dotsContainerRef.current.scrollLeft;

        dotsContainerRef.current.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        });
      }
    }
  }, [currentPage, pageRender, totalPages]);

  // Memoized pagination handlers
  const handlePrevPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  }, [totalPages]);

  const handlePageClick = useCallback((pageIndex: number) => {
    setCurrentPage(pageIndex);
  }, []);

  //GRID VIEW
  const beatGrid = useCallback(() => {
    if (isLoading) {
      return (
        <>
          <GridLoadingSkeleton />
          <GridLoadingSkeleton />
          <GridLoadingSkeleton />
          <GridLoadingSkeleton />
          <GridLoadingSkeleton />
        </>
      );
    }

    if (error) {
      return (
        <p className="flex justify-center text-lg font-medium text-black dark:text-gray-300">
          {error}
        </p>
      );
    }

    if (beatsOnPage.length === 0) {
      const message = searchQuery.trim()
        ? `"${searchQuery}" is not found.`
        : beats.length === 0
        ? "No beats available"
        : "No beats found";

      return (
        <p className="flex justify-center text-lg font-medium text-black dark:text-gray-300">
          {message}
        </p>
      );
    }

    return beatsOnPage.map((beat, id) => {
      return (
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex flex-col items-center px-2 py-4 beat-grid justify-self-center"
          key={beat._id || id} // Use beat._id if available, fallback to index
        >
          <div className="relative cover">
            <img
              className="w-56 mb-3 border rounded-sm border-gray-700/30"
              src={beat.coverImageUrl}
              alt="Beat cover"
            />
            <div className="absolute rounded-full thumbnail top-[87px] left-[87px]">
              <button
                onClick={() => handlePlay(beat)}
                className="flex items-center p-2"
              >
                {isCurrentlyPlaying(beat) ? (
                  <Pause size={35} className="text-platinum fill-platinum" />
                ) : (
                  <Play size={35} className="text-platinum fill-platinum" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <h4 className="font-semibold text-black dark:text-gray-300">
              {beat.title}
            </h4>
            {isCurrentBeat(beat) && isPlaying && <Waveform />}
          </div>
          <div className="flex justify-between items-center mb-12 text-[10px] text-black">
            <p className="px-5 py-1 mr-2 border rounded-full">{beat.bpm}</p>
            <p className="px-5 py-1 border rounded-full">{beat.key}</p>
          </div>
          <button
            className="flex items-center justify-center w-32 px-4 py-2 rounded-lg cart-btn hover:w-36 bg-bgBlack"
            onClick={() => addToCart(beat)}
          >
            <p className="mr-3 text-sm font-medium text-white">
              {beat.price > 0 ? `$${beat.price / 100}` : "FREE"}{" "}
            </p>
            <img
              className="w-[18px] invert -mt-[2px] -ml-1 opacity-80"
              src={cart_icon}
              alt=""
            />
          </button>
        </motion.div>
      );
    });
  }, [
    beatsOnPage,
    searchQuery,
    beats.length,
    addToCart,
    isLoading,
    error,
    renderKey,
  ]);

  // LIST VIEW
  const beatList = useCallback(() => {
    if (isLoading) {
      return (
        <>
          <ListLoadingSkeleton />
          <ListLoadingSkeleton />
          <ListLoadingSkeleton />
          <ListLoadingSkeleton />
          <ListLoadingSkeleton />
          <ListLoadingSkeleton />
          <ListLoadingSkeleton />
          <ListLoadingSkeleton />
        </>
      );
    }

    if (error) {
      return (
        <p className="flex justify-center text-lg font-medium dark:text-gray-300 text-bgBlack">
          {error}
        </p>
      );
    }

    if (beatsOnPage.length === 0) {
      const message = searchQuery.trim()
        ? `"${searchQuery}" is not found.`
        : beats.length === 0
        ? "No beats available"
        : "No beats found";

      return (
        <p className="flex justify-center text-lg font-medium dark:text-gray-300 text-bgBlack">
          {message}
        </p>
      );
    }

    return beatsOnPage.map((beat, id) => {
      return (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="beat-grid flex items-center justify-between p-3 h-[4.75rem] max-w-screen-lg"
          key={beat._id || id} // Use beat id if available, fallback to index
        >
          <div className="flex items-center md:w-60">
            <button onClick={() => handlePlay(beat)} className="w-10">
              {isCurrentlyPlaying(beat) ? (
                <Waveform />
              ) : (
                <Play
                  size={20}
                  className="text-black dark:text-white fill-black dark:fill-platinum"
                />
              )}
            </button>
            <img
              className="border-2 border-bgBlack/30 rounded-md mr-3 w-[50px]"
              src={beat.coverImageUrl}
              alt="Beat cover"
            />
            <h4 className="font-semibold text-black dark:text-white/80 dark:font-medium">
              {beat.title}
            </h4>
          </div>

          <div className="text-[10px] text-black flex justify-between items-center">
            <p className="border rounded-[6px] p-1 mr-4">{beat.bpm}</p>
            <p className="border rounded-[6px] p-1">{beat.key}</p>
          </div>
          <button
            className="cart-btn dark:bg-transparent bg-bgBlack w-32 flex justify-center items-center dark:border rounded-lg px-4 py-[10px]"
            onClick={() => addToCart(beat)}
          >
            <p className="mr-3 text-sm font-medium text-white">
              {beat.price > 0 ? `$${beat.price / 100}` : "FREE"}
            </p>
            <img
              className="w-[18px] invert -mt-[2px] -ml-1 opacity-80"
              src={cart_icon}
              alt=""
            />
          </button>
        </motion.div>
      );
    });
  }, [
    beatsOnPage,
    searchQuery,
    beats.length,
    addToCart,
    isLoading,
    error,
    renderKey,
  ]);

  //LIST VIEW (for small devices)
  const beaListMobile = useCallback(() => {
    if (isLoading) {
      return (
        <>
          <ListLoadingSkeleton2 />
          <ListLoadingSkeleton2 />
          <ListLoadingSkeleton2 />
          <ListLoadingSkeleton2 />
          <ListLoadingSkeleton2 />
        </>
      );
    }

    if (error) {
      return (
        <p className="flex justify-center text-sm font-medium text-black dark:text-gray-300">
          {error}
        </p>
      );
    }

    if (beatsOnPage.length === 0) {
      const message = searchQuery.trim()
        ? `"${searchQuery}" is not found.`
        : beats.length === 0
        ? "No beats available"
        : "No beats found";

      return (
        <p className="flex justify-center p-4 text-sm font-light text-black dark:text-gray-300">
          {message}
        </p>
      );
    }

    return beatsOnPage.map((beat, id) => {
      return (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="flex items-center justify-between max-w-screen-md p-3 beat-grid"
          key={beat._id || id}
        >
          <div className="flex items-center w-40 break-words">
            <button onClick={() => handlePlay(beat)} className="w-6">
              {isCurrentlyPlaying(beat) ? (
                <Waveform />
              ) : (
                <Play
                  size={15}
                  className="text-black dark:text-white fill-black dark:fill-white"
                />
              )}
            </button>
            <img
              className="border-2 border-bgBlack/30 rounded-md mr-3 w-[35px]"
              src={beat.coverImageUrl}
              alt="Beat cover"
            />
            <h4 className="text-sm font-semibold text-black truncate dark:text-white/80">
              {beat.title}
            </h4>
          </div>

          <div className="text-[8px] text-black xs:hidden sm:flex flex-col justify-between items-center mr-4">
            <p className="border rounded-[6px] p-1 mb-1">{beat.bpm}</p>
            <p className="border rounded-[6px] p-1 truncate">{beat.key}</p>
          </div>
          <button
            className="flex items-center justify-center w-20 px-3 py-2 border rounded-md cart-btn dark:bg-transparent bg-bgBlack"
            onClick={() => addToCart(beat)}
          >
            <p className="mr-3 text-xs font-medium text-white">
              {beat.price > 0 ? `$${beat.price / 100}` : "FREE"}
            </p>
            <img
              className="w-4 -ml-2 invert opacity-80"
              src={cart_icon}
              alt=""
            />
          </button>
        </motion.div>
      );
    });
  }, [
    beatsOnPage,
    searchQuery,
    beats.length,
    addToCart,
    isLoading,
    error,
    renderKey,
  ]);

  return (
    <div
      ref={storePageRef}
      className="relative z-0 w-screen justify-self-center"
    >
      <div className="absolute inset-0 h-full opacity-50 -z-10">
        <div className="absolute inset-0 object-cover dark:bg-black/40 bg-platinum/60 backdrop-blur-lg"></div>
        <img
          src={backgroundImage}
          alt="Studio"
          className="object-cover w-full h-full"
        />
      </div>
      <div
        ref={ref}
        className={`store box-border p-10 ${
          isGridView ? "" : "flex flex-col items-center justify-center"
        }`}
      >
        <div
          className={`${
            isGridView
              ? "store-header relative flex flex-col items-center rounded-t-lg mt-1 xs:py-5 xl:py-7"
              : "store-header xs:w-full lg:w-[64rem] relative flex flex-col items-center justify-self-center rounded-t-lg mt-1 xs:py-5 xl:py-7"
          }`}
        >
          <h1 className="mb-4 font-bold text-black dark:text-platinum xs:text-2xl md:text-3xl lg:text-4xl font-trap">
            Beat Shop
          </h1>

          <div className="p-4"></div>
          <div className="search-input absolute xs:-left-6 xs:scale-75 sm:scale-[0.80] sm:-left-2 md:left-4 md:scale-90 lg:left-8 bottom-2 lg:scale-100 flex items-center p-3 rounded-lg w-[15rem] z-[5]">
            <img
              className="dark:invert invert-0 opacity-80 mr-3 w-[16px]"
              src={search_icon}
              alt=""
            />
            <input
              type="text"
              placeholder="Search A Beat Here..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full mt-1 text-gray-900 bg-transparent outline-none dark:text-gray-400 dark:placeholder:text-white/60 placeholder:text-black/40 placeholder:font-light"
            />

            <button
              className={`invert opacity-60 ${
                searchQuery ? "block" : "hidden"
              }`}
              onClick={clearSearch}
            >
              <img
                className="w-5 dark:invert-0 invert"
                src={close_icon}
                alt=""
              />
            </button>
          </div>
          <button onClick={toggleView}>
            {isGridView ? (
              <img
                className="absolute w-6 cursor-pointer xs:hidden md:block md:left-64 lg:left-72 bottom-5 dark:invert invert-0 opacity-80"
                src={list_icon}
                alt=""
              />
            ) : (
              <img
                className="absolute w-6 cursor-pointer xs:hidden md:block md:left-64 lg:left-72 bottom-5 dark:invert invert-0 opacity-80"
                src={grid_icon}
                alt=""
              />
            )}
          </button>
        </div>

        {/* {TOGGLE BETWEEN GRID AND LIST VIEW: BIG SCREEN SIZE} */}
        {isGridView ? (
          <div className="store-grid dark:bg-black bg-platinum/50 grid gap-5 box-border p-6 xs:hidden md:grid max-h-[64rem]">
            {beatGrid()}
          </div>
        ) : (
          <div className="store-list2 dark:bg-black/80 bg-platinum/60 xs:hidden md:flex flex-col justify-self-center gap-5 box-border px-6 py-5 max-h-[64rem] md:w-full lg:w-[64rem] overflow-y-auto">
            {beatList()}
          </div>
        )}

        {/* {FOR SMALL SIZE} */}
        <div className="store-list dark:bg-black/80 bg-platinum/60 flex flex-col gap-6 md:hidden w-full max-h-[36rem] px-1 py-5 overflow-y-auto">
          {beaListMobile()}
        </div>

        {/* {FOOTER} */}
        <div
          className={`${
            isGridView
              ? "store-footer flex items-center justify-center xs:h-12 md:h-20 rounded-b-lg"
              : "store-footer flex items-center justify-center xs:w-full md:w-full lg:w-[64rem] xs:h-12 md:h-20 rounded-b-lg"
          }`}
        >
          <div className="flex items-center justify-between justify-self-center xs:max-w-28 md:max-w-36 xs:scale-[85%] md:scale-100 xs:py-[17px] md:py-[33px]">
            <button
              className={`${
                currentPage === 0 ? "opacity-50" : "opacity-100 cursor-pointer"
              }`}
              onClick={handlePrevPage}
              disabled={currentPage === 0}
            >
              <img
                className="mr-2 -rotate-90 min-w-6 max-w-6 dark:invert"
                src={arrow}
                alt=""
              />
            </button>

            <div
              ref={dotsContainerRef}
              className="flex gap-2 truncate rounded-full"
            >
              {Array.from({ length: totalPages }).map((_, i) => (
                <motion.span
                  key={i}
                  animate={{ scale: i === currentPage ? 1.3 : 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 5 }}
                  className={`h-2 rounded-full cursor-pointer ${
                    i === currentPage
                      ? "bg-black/70 dark:bg-blueGreen/70 min-w-3 align-middle"
                      : "bg-gray-400 min-w-2"
                  }`}
                  onClick={() => handlePageClick(i)}
                />
              ))}
            </div>

            <button
              className={`${
                currentPage === totalPages - 1
                  ? "opacity-50"
                  : "opacity-100 cursor-pointer"
              }`}
              onClick={handleNextPage}
              disabled={currentPage === totalPages - 1}
            >
              <img
                className="ml-2 rotate-90 min-w-6 max-w-6 dark:invert"
                src={arrow}
                alt=""
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Store;
