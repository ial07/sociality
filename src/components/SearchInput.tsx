"use client";

import { Search, User, X } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Author } from "@/types/Profile.type";
import { useUsersSearch } from "@/features/users/hooks/useUsers";

// --- 1. Utility Hook: useDebounce ---
// (Bisa dipindahkan ke file terpisah: src/hooks/useDebounce.ts)
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

type SearchInputProps = React.ComponentProps<"input"> & {};

const SearchInput: React.FC<SearchInputProps> = ({ ...props }) => {
  const [isMobileInputVisible, setIsMobileInputVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const inputRef = useRef<HTMLInputElement>(null);
  const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;

  const {
    data: searchResults,
    isLoading,
    isFetching,
  } = useUsersSearch(debouncedSearchTerm);

  const users: Author[] = searchResults?.users || [];

  const shouldShowPopup = isFocused && searchTerm.length > 0;

  const toggleInput = () => {
    if (!isDesktop) {
      setIsMobileInputVisible((prev) => !prev);
    } else {
      inputRef.current?.focus();
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    setIsFocused(false);
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (isMobileInputVisible) {
      inputRef.current?.focus();
    }
  }, [isMobileInputVisible]);

  const handleBlur = () => {
    // Delay penutupan agar klik pada link hasil sempat tereksekusi
    setTimeout(() => {
      setIsFocused(false);
      if (!isDesktop && searchTerm.length === 0) {
        setIsMobileInputVisible(false);
      }
    }, 200);
  };

  const shouldShowInput = isDesktop || isMobileInputVisible;

  const inputClasses = `
    py-2 px-4 bg-neutral-900 border border-neutral-800 rounded-full w-full transition-all duration-300
    focus:border-primary-300 focus:outline-none placeholder:text-neutral-500 text-foreground
    md:w-[491px] md:block 
    ${isMobileInputVisible || isDesktop ? "block" : "hidden"}
    pl-10 ${searchTerm.length > 0 ? "pr-10" : ""} 
  `;

  return (
    <div
      className={`relative flex md:w-auto ${
        isMobileInputVisible ? "justify-end" : "justify-center"
      }`}
    >
      <button
        type="button"
        onClick={toggleInput}
        className={`text-neutral-500 transition-colors duration-300 ${
          shouldShowInput ? "hidden md:hidden" : "block"
        }`}
      >
        <Search className="size-5" />
      </button>

      {shouldShowInput && (
        <div className="relative w-full md:w-auto flex items-center">
          <div className="absolute left-3 text-neutral-500 pointer-events-none">
            <Search className="size-5" />
          </div>

          <input
            ref={inputRef}
            type="text"
            className={inputClasses}
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={handleBlur}
            {...props}
          />

          {searchTerm.length > 0 && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 text-neutral-500 hover:text-white transition-colors p-1 z-10"
            >
              <X size={16} />
            </button>
          )}

          {shouldShowPopup && (
            <div className="absolute top-full mt-2 w-full md:w-[491px] bg-neutral-900 border border-neutral-800 rounded-xl shadow-lg z-20 overflow-hidden">
              {isFetching || isLoading ? (
                <div className="p-4 text-neutral-400 text-sm text-center">
                  Searching...
                </div>
              ) : users.length > 0 ? (
                users.map((user) => (
                  <Link
                    key={user.id}
                    href={`/profile/${user.username}`}
                    className="flex items-center p-3 hover:bg-neutral-800 transition-colors"
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    <User className="size-5 mr-3 text-primary-300" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        {user.name}
                      </p>
                      <p className="text-xs text-neutral-400">
                        @{user.username}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="p-4 text-neutral-500 text-sm text-center">
                  No results found for "{searchTerm}"
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
