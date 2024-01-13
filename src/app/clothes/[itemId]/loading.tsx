
export default function Loading() {
  return (
    <div className="animate-pulse space-x-1 rounded-xl border p-6 flex flex-col items-center md:scale-125 md:my-32 my-20 ">
      <div className="flex flex-col space-y-2 w-52 h-72 lg:h-96">
        <div className="h-2/4 w-full rounded-md bg-gray-300 "></div>
        <div className="h-1/4 rounded-md bg-gray-300 "></div>
        <div className="h-1/4 rounded-md bg-gray-300 "></div>
      </div>
    </div>
  );
}
