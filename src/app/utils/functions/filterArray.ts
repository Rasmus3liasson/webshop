import { FilteredItemDataInterface } from "@/types/items";
import { useSearchParams } from "next/navigation";

// Add or removes to filter Arr
export const handleFilterSettings = (
  linkName: string,
  setState: React.Dispatch<React.SetStateAction<string[]>>
) => {
  setState((prevFilter) => {
    const updatedFilter = prevFilter && [...prevFilter];
    const index = updatedFilter.indexOf(linkName);
    if (index === -1) {
      // Adds to filter array
      updatedFilter.push(linkName);
    } else {
      // Removes from filter array
      updatedFilter.splice(index, 1);
    }
    return updatedFilter;
  });
};
export const filterItemsArray = (dataArray: FilteredItemDataInterface[]) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const searchParams = useSearchParams();

  const colorQuery = searchParams.get("color");
  const categoryQuery = searchParams.get("category");

  const queryStringColor: string[] | null = colorQuery
    ? colorQuery.toUpperCase().split(" ")
    : null;
  const queryStringCategory: string[] | null = categoryQuery
    ? categoryQuery.split(" ")
    : null;

  const filteredItems = dataArray.filter((productItem) => {
    const colorMatches = queryStringColor
      ? queryStringColor.some(
          (queryColor) =>
            productItem.itemColor.text.toLowerCase() ===
            queryColor.toLowerCase()
        )
      : true;

    return colorMatches;
  });
  return filteredItems;
};
