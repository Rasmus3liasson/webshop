"use client";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import { useDebounce } from "use-debounce";
import { FilteredItemDataInterface, SearchInputInterface } from "@/types/items";

export default function SearchInput({
  data,
}: {
  data?: FilteredItemDataInterface[];
}) {
  const dataFilter: SearchInputInterface[] = Array.isArray(data)
    ? data.map((item) => ({
        title: item.name,
        imagePoster: item.imagePoster,
      }))
    : [];

  const [searchInput, setSearchInput] = useState("");
  const [searchField, setSearchField] = useState(true);
  const [searchResult, setSearchResult] =
    useState<SearchInputInterface[]>(dataFilter);

  const [debounceValue] = useDebounce(searchInput, 200);

  //filter and show result that match value
  const manageInput = (event: ChangeEvent<HTMLInputElement>) => {
    const itemData = dataFilter;
    const inputValue = event.target.value;
    setSearchInput(inputValue);
    if (inputValue.length >= 2) {
      const filteredResults = itemData.filter((item) =>
        item.title.toLowerCase().includes(debounceValue.toLowerCase())
      );
      setSearchResult(filteredResults);
    } else {
      setSearchResult([]);
    }
  };

  const toggleSearchField = () => {
    if (window.innerWidth >= 1024) {
      setSearchField(!searchField);
    }
  };

  

  return (
    <div className="flex flex-col items-center justify-center">
      <form>
        <div className="relative md:flex max-w-sm">
          <div className="absolute md:relative inset-y-0 left-0 flex items-center pl-2 z-10">
            <Image
              onClick={toggleSearchField}
              src={"/header/search-icon.svg"}
              alt="search icon"
              width={30}
              height={30}
              quality={100}
            />
          </div>
          {!searchField && (
            <input
              onChange={manageInput}
              type="search"
              className="w-full p-2 pl-10 md:pl-3 text-black rounded-xl animate-searchInput"
              placeholder="Search"
              required
            />
          )}
        </div>
      </form>
      {/* Condition to show dropdown */}
      {searchInput.length > 0 && (
        <div>
          <ul className={`grid grid-cols-4 md:grid-cols-2 md:place-items-start mt-4 md:mt-16 p-5 md:max-h-96 md:overflow-y-auto gap-6 md:absolute md:-right-[105px] md:scale-110 bg-white rounded-md ${searchResult?.length === 0 && "hidden" }`}>
            {searchResult?.map((product, index) => {
              // Retrieve image using the index of title
              const imageUrl = product.imagePoster;
              return (
                <li key={index}>
                  <Image
                    src={imageUrl}
                    alt="poster of movie"
                    width={120}
                    height={130}
                  />
                  <Link
                    className="dropdown-item"
                    href={"#"}
                    onClick={() => setSearchInput(product.title)}
                  >
                    <p className="md:w-20">{product.title}</p>
                    <p>price</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {/* If no matching results */}
      {searchInput.length > 1 && searchResult?.length === 0 && (
        <div className="md:absolute md:top-20 right-14">
          <ul>
            <li className="no-match">Ingen matchning</li>
          </ul>
        </div>
      )}
    </div>
  );
}
