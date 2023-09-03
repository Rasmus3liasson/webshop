export async function getItemsFromApi() {
  try {
    const res = await fetch("/api/items");
    const data = await res.json();
    return data.productItems;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
