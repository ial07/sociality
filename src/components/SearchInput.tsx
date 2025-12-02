"use client";

import { Search } from "lucide-react";
import React, { useState } from "react";

type SearchInputProps = React.ComponentProps<"input"> & {};

const SearchInput: React.FC<SearchInputProps> = ({ ...props }) => {
  const [isMobileInputVisible, setIsMobileInputVisible] = useState(false);

  const toggleInput = () => {
    setIsMobileInputVisible((prev) => !prev);
  };

  const handleBlur = () => {
    if (window.innerWidth < 768) {
      setIsMobileInputVisible(false);
    }
  };

  const inputClasses = `
    py-2 px-10.5 bg-neutral-900 border border-neutral-900 rounded-full w-full transition-all duration-300
    md:w-123 md:block 
    ${isMobileInputVisible ? "block w-full" : "hidden"}
  `;

  const containerClasses = `
    flex items-center 
    ${isMobileInputVisible ? "relative" : "justify-center"}
    md:relative md:justify-start
  `;

  // Tentukan class untuk ikon
  // Mobile: Selalu tampilkan ikon
  // Desktop: Ikon berada di dalam input sebagai dekorasi (left-2)
  const iconClasses = `
    absolute text-neutral-500 transition-colors duration-300 cursor-pointer 
    size-5 top-2.5 -translate-y-1/2 
    ${isMobileInputVisible ? "left-3" : "relative left-9"} 
  `;

  return (
    <div className={containerClasses}>
      <div
        className={`flex ${isMobileInputVisible ? "md:flex" : "flex"}`}
        onClick={toggleInput}
      >
        <Search className={iconClasses} />
      </div>

      {/* Input Field */}
      <input
        type="text"
        className={inputClasses}
        placeholder="Search..."
        onBlur={handleBlur}
        autoFocus={isMobileInputVisible}
        {...props}
      />
    </div>
  );
};

export default SearchInput;
