import React, { forwardRef, RefObject, useMemo, useState } from "react";
import "./Store.css";
import { beatList } from "../../data.ts";
import cart_icon from "../../assets/icons/cart-icon.png";
import play_icon from "../../assets/icons/play-icon.png";
import search_icon from "../../assets/icons/search-icon.png";
import close_icon from "../../assets/icons/close-icon.png";
import list_icon from "../../assets/icons/list-view.png";
import grid_icon from "../../assets/icons/grid-view.png";
import arrow from "../../assets/icons/up-icon.png";
import backgroundImage from "../../assets/ambient-studio.png";
import { motion } from "framer-motion";

interface BeatType {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface StoreProps {
  addToCart: (beat: BeatType) => void;
  ref: RefObject<HTMLDivElement | null>;
}

const Store: React.FC<StoreProps> = forwardRef(({ addToCart }, ref) => {
  // SWITCH BETWEEN GRID AND LIST VIEW IN STORE AND SAVE THE STATE

  const [isGridView, setIsGridView] = useState(() => {
    return localStorage.getItem("viewMode") === "list" ? false : true;
  });

  const toggleView = () => {
    const listView = !isGridView;
    setIsGridView(listView);
    localStorage.setItem("viewMode", listView ? "grid" : "list");
  };

  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredBeat = useMemo(() => {
    return beatList.filter((beat) =>
      beat.name.toLowerCase().startsWith(searchQuery.toLowerCase())
    );
  }, [searchQuery, beatList]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setCurrentPage(0);
  };

  // HANDLING PAGINATION
  const [currentPage, setCurrentPage] = useState(0);
  const beatsPerPage = 10;
  const totalPages = Math.ceil(filteredBeat.length / beatsPerPage);

  const startIndex = currentPage * beatsPerPage;
  const endIndex = startIndex + beatsPerPage;
  const beatsOnPage = filteredBeat.slice(startIndex, endIndex);

  return (
    <div ref={ref} className="relative z-0">
      <div className="absolute w-full h-full inset-0 opacity-50 -z-10">
        <div className="dark:bg-black/60 bg-platinum/80 absolute inset-0 object-cover backdrop-blur-lg"></div>
        <img
          src={backgroundImage}
          alt="Studio"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="store box-border px-4 py-12 mx-6">
        <div
          className={`${
            isGridView
              ? "store-header relative flex flex-col items-center rounded-t-lg mt-1 xs:py-5 xl:py-7"
              : "store-header xs:w-full md:w-[48rem] lg:w-[64rem] relative flex flex-col items-center justify-self-center rounded-t-lg mt-1 xs:py-5 xl:py-7"
          }`}
        >
          <h1 className="dark:text-platinum text-black xs:text-xl md:text-2xl lg:text-4xl font-trap font-bold mb-4">
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
              className="bg-transparent dark:text-gray-400 text-gray-900 placeholder:opacity-90 placeholder:py-3 dark:placeholder:text-white/60 placeholder:text-black/40 outline-none  placeholder:font-light w-full"
            />

            <button
              className={`invert opacity-60 ${
                searchQuery ? "block" : "hidden"
              }`}
              onClick={clearSearch}
            >
              <img
                className="w-[14px] dark:invert-0 invert"
                src={close_icon}
                alt=""
              />
            </button>
          </div>
          <button onClick={toggleView}>
            {isGridView ? (
              <img
                className="xs:hidden md:block absolute md:left-64 lg:left-72 bottom-5 w-[18px] dark:invert invert-0 opacity-80 cursor-pointer"
                src={list_icon}
                alt=""
              />
            ) : (
              <img
                className="xs:hidden md:block absolute md:left-64 lg:left-72 bottom-5 w-[18px] dark:invert invert-0 opacity-80 cursor-pointer"
                src={grid_icon}
                alt=""
              />
            )}
          </button>
        </div>

        {/* {TOGGLE BETWEEN GRID AND LIST VIEW: BIG SCREEN SIZE} */}
        {isGridView ? (
          <div className="store-grid dark:bg-black bg-platinum/50 grid gap-6 box-border p-6 xs:hidden md:grid max-h-[64rem]">
            {beatsOnPage.length > 0 ? (
              beatsOnPage.map((beat, id) => {
                return (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="beat-grid flex flex-col items-center px-1 py-4"
                    key={id}
                  >
                    <div className="cover relative cursor-pointer">
                      <img
                        className="rounded-sm mb-3 w-[11.875rem] border border-gray-700/30"
                        src={beat.image}
                        alt="Beat cover"
                      />
                      <div className="thumbnail absolute top-[4.375rem] left-[4.375rem] rounded-full">
                        <img
                          className="invert w-[3.125rem] p-3"
                          src={play_icon}
                          alt=""
                        />
                      </div>
                    </div>

                    <h4 className="mb-6 dark:text-gray-300 text-black  font-semibold">
                      {beat.name}
                    </h4>
                    <div className="flex justify-between items-center mb-12 text-[10px]">
                      <p className="border rounded-full px-5 py-1 mr-2">
                        {beat.bpm}
                      </p>
                      <p className="border rounded-full px-5 py-1">
                        {beat.key}
                      </p>
                    </div>
                    <button
                      className="cart-btn w-32 hover:w-36 flex justify-center items-center bg-bgBlack rounded-lg px-4 py-2"
                      onClick={() => addToCart(beat)}
                    >
                      <p className="text-sm mr-3 font-medium">
                        {beat.price > 0 ? `$${beat.price / 100}` : "FREE"}{" "}
                      </p>
                      <img
                        className="w-[15px] invert -mt-[2px] opacity-80"
                        src={cart_icon}
                        alt=""
                      />
                    </button>
                  </motion.div>
                );
              })
            ) : (
              <p className="flex justify-center text-lg dark:text-gray-300 text-black font-medium">
                No such beat found!
              </p>
            )}
          </div>
        ) : (
          <div className="store-list2 dark:bg-black/80 bg-platinum/80 xs:hidden md:flex flex-col flex-1 justify-self-center box-border p-6 max-h-[64rem] md:w-[48rem] lg:w-[64rem] overflow-y-auto">
            {beatsOnPage.length > 0 ? (
              beatsOnPage.map((beat, id) => {
                return (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="beat-grid flex flex-1 items-center justify-between mb-6 p-3 h-[4.5rem] max-w-screen-lg"
                    key={id}
                  >
                    <div className="flex items-center md:w-60">
                      <img
                        className="dark:invert invert-0 w-4 mr-5 cursor-pointer"
                        src={play_icon}
                        alt=""
                      />
                      <img
                        className="border-2 border-bgBlack/30 rounded-md mr-3 w-[50px]"
                        src={beat.image}
                        alt="Beat cover"
                      />
                      <h4 className="dark:text-white/80 text-black dark:font-medium font-semibold">
                        {beat.name}
                      </h4>
                    </div>

                    <div className="text-[10px] flex justify-between items-center">
                      <p className="border rounded-[6px] p-1 mr-4">
                        {beat.bpm}
                      </p>
                      <p className="border rounded-[6px] p-1">{beat.key}</p>
                    </div>
                    <button
                      className="cart-btn dark:bg-transparent bg-bgBlack w-32 flex justify-center items-center dark:border rounded-lg px-4 py-[10px]"
                      onClick={() => addToCart(beat)}
                    >
                      <p className="text-white text-sm mr-3 font-medium">
                        {beat.price > 0 ? `$${beat.price / 100}` : "FREE"}
                      </p>
                      <img
                        className="w-[15px] invert -mt-[2px] opacity-80"
                        src={cart_icon}
                        alt=""
                      />
                    </button>
                  </motion.div>
                );
              })
            ) : (
              <p className="flex justify-center text-lg dark:text-gray-300 text-bgBlack font-medium">
                No such beat found!
              </p>
            )}
          </div>
        )}

        {/* {FOR SMALL SIZE} */}
        <div className="store-list dark:bg-black/80 bg-platinum/80 flex flex-col md:hidden max-h-[36rem] overflow-y-auto">
          {beatsOnPage.length > 0 ? (
            beatsOnPage.map((beat, id) => {
              return (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="beat-grid flex flex-1 items-center justify-between mb-6 p-3 max-w-screen-md"
                  key={id}
                >
                  <div className="flex items-center w-40 break-words">
                    <img
                      className="dark:invert invert-0 w-3 mr-2 cursor-pointer"
                      src={play_icon}
                      alt=""
                    />
                    <img
                      className="border-2 border-bgBlack/30 rounded-md mr-3 w-[35px]"
                      src={beat.image}
                      alt="Beat cover"
                    />
                    <h4 className="dark:text-white/80 text-black text-sm font-semibold ">
                      {beat.name}
                    </h4>
                  </div>

                  <div className="text-[8px] xs:hidden sm:flex flex-col justify-between items-center mr-4">
                    <p className="border rounded-[6px] p-1 mb-1">{beat.bpm}</p>
                    <p className="border rounded-[6px] p-1">{beat.key}</p>
                  </div>
                  <button
                    className="cart-btn dark:bg-transparent bg-bgBlack w-20 flex justify-center items-center border rounded-md px-3 py-2"
                    onClick={() => addToCart(beat)}
                  >
                    <p className="text-xs mr-2 text-white/90">
                      {beat.price > 0 ? `$${beat.price / 100}` : "FREE"}
                    </p>
                    <img
                      className="w-3 invert -mt-[2px] opacity-80"
                      src={cart_icon}
                      alt=""
                    />
                  </button>
                </motion.div>
              );
            })
          ) : (
            <p className="flex justify-center text-sm dark:text-gray-300 text-black p-4 font-light">
              No such beat found!
            </p>
          )}
        </div>

        {/* {FOOTER} */}
        <div
          className={`${
            isGridView
              ? "store-footer xs:h-12 md:h-20 rounded-b-lg"
              : "store-footer justify-self-center xs:w-full md:w-[48rem] lg:w-[64rem] xs:h-12 md:h-20 rounded-b-lg"
          }`}
        >
          <div className="flex items-center justify-between justify-self-center xs:w-28 md:w-40 xs:scale-[85%] md:scale-100 xs:py-[17px] md:py-[33px]">
            <button
              className={`${
                currentPage === 0 ? "opacity-50" : "opacity-100 cursor-pointer"
              }`}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
              disabled={currentPage === 0}
            >
              <img
                className="w-[14px] dark:invert -rotate-90"
                src={arrow}
                alt=""
              />
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <motion.span
                  key={i}
                  animate={{ scale: i === currentPage ? 1.3 : 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 5 }}
                  className={`h-[6px] rounded-full cursor-pointer ${
                    i === currentPage
                      ? "bg-niceGreen/80 dark:bg-blueGreen/70 w-4"
                      : "bg-gray-600 w-2"
                  }`}
                  onClick={() => setCurrentPage(i)}
                />
              ))}
            </div>

            <button
              className={`${
                currentPage === totalPages - 1
                  ? "opacity-50"
                  : "opacity-100 cursor-pointer"
              }`}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
              }
              disabled={currentPage === totalPages - 1}
            >
              <img
                className="w-[14px] dark:invert rotate-90"
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
