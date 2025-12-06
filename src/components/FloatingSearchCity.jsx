import SearchCity from "./SearchCity";

export default function FloatingSearch() {
  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-999 w-[300px]">
      <SearchCity />
    </div>
  );
}
