import React from "react";
import { IoSearch } from "react-icons/io5";

type SearchProps = {
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  value?: string | number | readonly string[] | undefined;
};
const SearchBar = ({ value, onChange }: SearchProps) => {
  return (
    <div className="md:mx-10 w-full rounded-full items-center flex overflow-hidden relative">
      <IoSearch className="absolute text-xl left-5" />
      <input
        placeholder="Search..."
        type="text"
        value={value}
        onChange={onChange}
        className="h-10 w-full bg-gray-300 dark:bg-gray-600 rounded-full pl-12 outline-blue-300"
      />
    </div>
  );
};

export default SearchBar;
