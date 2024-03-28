"use client";

import Logo from "@/components/Logo";
import SearchBar from "@/components/SearchBar";
import ThemeButton from "@/components/ThemeButton";
import { fetchImages } from "@/server";
import { Photo } from "@/type";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import Loading from "./Loading";
import ImageCard from "@/components/ImageCard";

interface PhotoType {
  total: number;
  total_pages: number;
  results: Photo[];
}
const Home = () => {
  const [search, setSearch] = useState("");
  const [value] = useDebounce(search, 700);

  const sentinelRef = useRef(null);

  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery<
    PhotoType,
    Error
  >({
    queryKey: ["images", value],
    queryFn: ({ pageParam = 1 }) => fetchImages(pageParam as number, value),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return nextPage <= lastPage.total_pages ? nextPage : undefined;
    },
    initialPageParam: 1,
  });

  useEffect(() => {
    if (!hasNextPage) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        fetchNextPage();
      }
    });
    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }
    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [hasNextPage, fetchNextPage]);

  // console.log("data", data);

  const photos = data?.pages.flatMap((page) => page.results);
  // console.log(photos);
  return (
    <div className="flex flex-col">
      <div className="w-full text-[#000000] dark:text-[#FFFFFF] bg-[#FFFFFF] dark:bg-[#0A0A0A] fixed z-30 top-0 left-0 md:h-20 h-16 flex items-center">
        <div className="md:mx-20 mx-4 flex flex-row items-center w-full justify-between">
          <Logo />
          <div className="w-full hidden md:flex">
            <SearchBar
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <ThemeButton />
        </div>
      </div>
      <div className="mt-20 flex md:hidden px-2">
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div className="md:mt-20 mt-2">
        {isLoading ? (
          <Loading />
        ) : photos && photos.length < 1 ? (
          <p className="mx-auto text-lg font-bold text-center mt-16 text-red-700">
            No Images found
          </p>
        ) : (
          <main className="columns-1 md:columns-3 lg:columns-4">
            {photos?.map((photo) => (
              <ImageCard key={photo.id} photo={photo} />
            ))}
          </main>
        )}
        {hasNextPage && (
          <div ref={sentinelRef} className="mx-auto">
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
