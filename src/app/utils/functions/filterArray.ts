// Add or removes to filter Arr
export const handleFilterSettings = (
  linkName: string,
  setState: React.Dispatch<React.SetStateAction<string[]>>
) => {
  setState((prevFilter) => {
    const updatedFilter = prevFilter ? [...prevFilter] : [];
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
