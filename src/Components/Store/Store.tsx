import React, { forwardRef, RefObject, useState } from "react";
import "./Store.css";
import { beatList } from "../../data.ts";
import cart_icon from "../../assets/icons/cart-icon.png";
import play_icon from "../../assets/icons/play-icon.png";
import search_icon from "../../assets/icons/search-icon.png";
import close_icon from "../../assets/icons/close-icon.png";
import list_icon from "../../assets/icons/list-view.png";
import grid_icon from "../../assets/icons/grid-view.png";
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
  const [searchQuery, setSearchQuery] = useState<string>("");

  // SWITCH BETWEEN GRID AND LIST VIEW IN STORE AND SAVE THE STATE

  const [isGridView, setIsGridView] = useState(() => {
    return localStorage.getItem("viewMode") === "list" ? false : true;
  });

  const toggleView = () => {
    const listView = !isGridView;
    setIsGridView(listView);
    localStorage.setItem("viewMode", listView ? "grid" : "list");
  };

  const filteredBeat = beatList.filter((beat) =>
    beat.name.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div ref={ref} className="store-bg relative z-0">
      <div className="absolute inset-0 bg-black/60 -z-10"></div>
      <div className="store box-border px-4 mx-6">
        <div
          className={`${
            isGridView
              ? "store-header relative flex flex-col items-center rounded-t-lg mt-1 xs:py-5 xl:py-7"
              : "store-header xs:w-full md:w-[48rem] lg:w-[64rem] relative flex flex-col items-center justify-self-center rounded-t-lg mt-1 xs:py-5 xl:py-7"
          }`}
        >
          <h1 className="xs:text-xl md:text-2xl lg:text-4xl font-medium mb-4">
            Beat Shop
          </h1>

          <div className="p-4"></div>
          <div className="search-input absolute xs:-left-6 xs:scale-75 sm:scale-[0.80] sm:-left-2 md:left-4 md:scale-90 lg:left-8 bottom-2 lg:scale-100 flex items-center p-3  rounded-lg w-[15rem] z-[5]">
            <img
              className="invert opacity-80 mr-3 w-[16px]"
              src={search_icon}
              alt=""
            />
            <input
              type="text"
              placeholder="Search A Beat Here..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="bg-transparent text-gray-400 placeholder:opacity-90 placeholder:py-3 outline-none  placeholder:font-light w-full"
            />

            <button
              className={`invert opacity-60 ${
                searchQuery ? "block" : "hidden"
              }`}
              onClick={clearSearch}
            >
              <img className="w-[14px]" src={close_icon} alt="" />
            </button>
          </div>
          <button onClick={toggleView}>
            {isGridView ? (
              <img
                className="xs:hidden md:block absolute md:left-64 lg:left-72 bottom-5 w-[18px] invert opacity-80 cursor-pointer"
                src={list_icon}
                alt=""
              />
            ) : (
              <img
                className="xs:hidden md:block absolute md:left-64 lg:left-72 bottom-5 w-[18px] invert opacity-80 cursor-pointer"
                src={grid_icon}
                alt=""
              />
            )}
          </button>
        </div>

        {/* {TOGGLE BETWEEN GRID AND LIST VIEW: BIG SCREEN SIZE} */}
        {isGridView ? (
          <div className="store-grid bg-black/80 grid gap-6 box-border p-6 xs:hidden md:grid max-h-[64rem]">
            {filteredBeat.length > 0 ? (
              filteredBeat.map((beat, id) => {
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
                        className="rounded-lg mb-3 w-[11.875rem]"
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

                    <h4 className="mb-6 text-gray-300 font-semibold">
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
                      className="cart-btn w-32 hover:w-36 flex justify-center items-center border rounded-lg px-4 py-2"
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
              <p className="flex justify-center text-lg text-gray-300 font-light">
                No such beat found!
              </p>
            )}
          </div>
        ) : (
          <div className="store-list2 bg-black/80 xs:hidden md:flex flex-col flex-1 justify-self-center box-border p-6 max-h-[64rem] md:w-[48rem] lg:w-[64rem] overflow-y-auto">
            {filteredBeat.length > 0 ? (
              filteredBeat.map((beat, id) => {
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
                        className="invert w-4 mr-5 cursor-pointer"
                        src={play_icon}
                        alt=""
                      />
                      <img
                        className="rounded-md mr-3 w-[50px]"
                        src={beat.image}
                        alt="Beat cover"
                      />
                      <h4 className="text-white/80 font-medium">{beat.name}</h4>
                    </div>

                    <div className="text-[10px] flex justify-between items-center">
                      <p className="border rounded-[6px] p-1 mr-4">
                        {beat.bpm}
                      </p>
                      <p className="border rounded-[6px] p-1">{beat.key}</p>
                    </div>
                    <button
                      className="cart-btn w-32 flex justify-center items-center border rounded-lg px-4 py-2"
                      onClick={() => addToCart(beat)}
                    >
                      <p className="text-sm mr-3 font-medium">
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
              <p className="flex justify-center text-lg text-gray-300 font-light">
                No such beat found!
              </p>
            )}
          </div>
        )}

        {/* {FOR SMALL SIZE} */}
        <div className="store-list bg-black/80 flex flex-col md:hidden max-h-[36rem] overflow-y-auto">
          {filteredBeat.length > 0 ? (
            filteredBeat.map((beat, id) => {
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
                      className="invert w-3 mr-2 cursor-pointer"
                      src={play_icon}
                      alt=""
                    />
                    <img
                      className="rounded-md mr-3 w-[35px]"
                      src={beat.image}
                      alt="Beat cover"
                    />
                    <h4 className="text-sm text-gray-300 font-semibold ">
                      {beat.name}
                    </h4>
                  </div>

                  <div className="text-[8px] xs:hidden sm:flex flex-col justify-between items-center mr-4">
                    <p className="border rounded-[6px] p-1 mb-1">{beat.bpm}</p>
                    <p className="border rounded-[6px] p-1">{beat.key}</p>
                  </div>
                  <button
                    className="cart-btn w-20 hover:w-24 flex justify-center items-center border rounded-md px-3 py-2"
                    onClick={() => addToCart(beat)}
                  >
                    <p className="text-xs mr-2 text-gray-300">
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
            <p className="flex justify-center text-lg text-gray-300 font-light">
              No such beat found!
            </p>
          )}
        </div>

        <div
          className={`${
            isGridView
              ? "store-footer xs:h-12 md:h-20 rounded-b-lg"
              : "store-footer justify-self-center xs:w-full md:w-[48rem] lg:w-[64rem] xs:h-12 md:h-20 rounded-b-lg"
          }`}
        ></div>
      </div>
    </div>
  );
});

export default Store;
