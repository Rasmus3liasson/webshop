import React, { useEffect, useState } from "react";

export default function ActiveFilter({
  colorFilter,
  setColorFilter,
  categoryFilter,
  setCategoryFilter,
}: {
  colorFilter: string[];
  setColorFilter: (updatedColorFilter: string[]) => void;
  categoryFilter: string[];
  setCategoryFilter: (updatedCategoryFilter: string[]) => void;
}) {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleEdit = (index: number) => {
    const updatedColorFilter = [...colorFilter];
    const updatedCategoryFilter = [...categoryFilter];

    const colorIndex = colorFilter.indexOf(activeFilters[index]);
    const categoryIndex = categoryFilter.indexOf(activeFilters[index]);

    if (colorIndex !== -1) {
      updatedColorFilter.splice(colorIndex, 1);
      setColorFilter(updatedColorFilter);
    }

    if (categoryIndex !== -1) {
      updatedCategoryFilter.splice(categoryIndex, 1);
      setCategoryFilter(updatedCategoryFilter);
    }
  };
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const categoryQuery = params.get("category");

    if (categoryQuery) {
      setCategoryFilter([categoryQuery]);
    }
  }, [setCategoryFilter]);

  useEffect(() => {
    const updatedActiveFilters = [...colorFilter];

    // Check if "categoryFilter" is not empty and add it to the active filters
    if (categoryFilter.length > 0) {
      updatedActiveFilters.push(...categoryFilter);
    }

    setActiveFilters(updatedActiveFilters);
  }, [colorFilter, categoryFilter]);

  return (
    <>
      {activeFilters.length > 0 && (
        <ul className="bg-greyLight rounded-md mt-2 p-3 flex flex-col items-center gap-2">
          {activeFilters.map((filter, index) => (
            <li className="flex justify-center items-center gap-3" key={index}>
              {filter.toUpperCase()}
              <span onClick={() => handleEdit(index)}>&#10005;</span>
            </li>
          ))}

          <button
            className="text-lg underline hover:scale-105 active:scale-98 duration-150"
            onClick={() => {
              setActiveFilters([]);
              setColorFilter([]);
              setCategoryFilter([]);
            }}
          >
            Clear
          </button>
        </ul>
      )}
    </>
  );
}
