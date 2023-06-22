// Function to sort size in correct order
export const sizeComparator = (a: string, b: string) => {
  const sizeOrder = ["XS", "S", "M", "L", "XL", "3XL"];

  // Check if the sizes are in other format with regex pattern
  const sizeFormatContainsR = (size: string) => /\d+R/.test(size);

  // Check if the sizes are only numbers
  const sizeContainsNumber = (size: string) => /^\d+$/.test(size);

  if (
    (sizeFormatContainsR(a) && sizeFormatContainsR(b)) ||
    (sizeContainsNumber(a) && sizeContainsNumber(b))
  ) {
    const sizeA = parseInt(a);
    const sizeB = parseInt(b);

    if (!isNaN(sizeA) && !isNaN(sizeB)) {
      return sizeA - sizeB;
    }
  }

  return sizeOrder.indexOf(a) - sizeOrder.indexOf(b);
};
