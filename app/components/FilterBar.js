"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import "../globals.css";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const type_prev = searchParams.get("type") || "";
  const search_prev = searchParams.get("search") || "";
  const limit_prev = searchParams.get("limit") || "20";

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const type = formData.get("type");
    const search = formData.get("search");
    const limit = formData.get("limit");
    const url = `/pokemon?type=${type}&search=${search}&limit=${limit}`;

    router.push(url);
  };

  return (
    <form className="search-div flex flex-col gap-4" onSubmit={handleSubmit}>
      <label htmlFor="search" className="mx-auto block font-bold">
        Pokémon Name
      </label>
      <input
        type="text"
        name="search"
        placeholder="Enter Pokémon name..."
        defaultValue={search_prev}
        className="mx-auto border rounded px-2 py-1 w-1/3"
      />

      <label htmlFor="type" className="mx-auto block font-bold">
        Pokémon Type
      </label>
      <input
        type="text"
        name="type"
        placeholder="Enter Pokémon type..."
        defaultValue={type_prev}
        className="mx-auto border rounded px-2 py-1 w-1/3"
      />

      <label htmlFor="limit" className="mx-auto block font-bold">
        Limit of Results
      </label>
      <select
        name="limit"
        defaultValue={limit_prev}
        className="mx-auto border rounded px-2 py-1 w-1/15"
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>

      <button
        className="mx-auto bg-teal-500 text-white font-bold py-2 px-4 rounded hover:bg-teal-600 block text-center w-1/4"
        type="submit"
      >
        Search Pokémon
      </button>
    </form>
  );
}
