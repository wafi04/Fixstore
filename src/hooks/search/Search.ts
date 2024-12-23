import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useRef, useState } from "react";

export function useSearchHooks() {
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const navigate = useRouter();
  const toggleSearch = () => {
    setOpenSearch(!openSearch);
    if (!openSearch) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 500);
    } else {
      setDebouncedSearch("");
    }
  };
  const handleSubmit = useCallback(() => {
    const newSearchParams = new URLSearchParams(`${searchParams}`);
    newSearchParams.set("q", debouncedSearch);
    navigate.push(`/p?${newSearchParams}`);
    setOpenSearch(false);
  }, [debouncedSearch, navigate, searchParams]);
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit]
  );

  return {
    debouncedSearch,
    setDebouncedSearch,
    openSearch,
    setOpenSearch,
    searchRef,
    inputRef,
    toggleSearch,
    handleKeyDown,
  };
}
