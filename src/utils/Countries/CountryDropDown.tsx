import React, { useState, useEffect, useRef } from "react";
import { countries } from "./CountryList";
import arrow from "../../assets/icons/arrow.svg";
import "./CountryDrop.css";

const CountryDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        className={`flex items-center justify-between w-full bg-black/[3%] dark:bg-white/[4%] px-3 py-4 mb-4 font-montserrat text-gray/700 dark:text-white rounded-lg border-b-2 border-black/80 dark:border-white/70 transition-all duration-300 cursor-pointer ${
          isOpen ? "border-purple-600 dark:border-blueGreen/80" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`text-sm ${
            selectedCountry ? "text-black dark:text-gray-300" : "text-gray-500"
          }
          `}
        >
          {selectedCountry || "Select a country"}
        </span>
        <img
          src={arrow}
          alt="Arrow"
          className={`w-5 ml-2 invert-0 dark:invert ${
            isOpen ? "rotate-180" : "rotate-0"
          } transition-all duration-300`}
        />
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 rounded-md shadow-lg dark:shadow-slate-200/20">
          <div className="sticky top-0 p-2 bg-white dark:bg-bgBlack ">
            <input
              type="text"
              className="w-full bg-black/[3%] dark:bg-white/[4%] p-2 border border-gray-500 text-sm rounded-md focus:outline-none  focus:border-gray-500"
              placeholder="Search your country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="country-list bg-white dark:bg-bgBlack max-h-60 overflow-y-auto">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country, index) => (
                <div
                  key={index}
                  className={`p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-white/5 text-sm ${
                    selectedCountry === country.name
                      ? "bg-platinum dark:bg-white/10 text-nicePurple dark:text-blueGreen"
                      : ""
                  }`}
                  onClick={() => {
                    setSelectedCountry(country.name);
                    setIsOpen(false);
                    setSearchTerm("");
                  }}
                >
                  {country.name}
                </div>
              ))
            ) : (
              <div className="p-2 text-gray-600 dark:text-400 text-center">
                No countries found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountryDropdown;
