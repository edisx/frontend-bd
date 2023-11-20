import React, { useState } from "react";
import { InputBase, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Search } from "react-feather";

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/?keyword=${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <form onSubmit={submitHandler} className="flex justify-center items-center w-full">
      <div className="flex items-center border-2 border-gray-300 rounded w-full">
        <InputBase
          type="text"
          name="q"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search Products..."
          className="pl-2 pr-2 w-full"
          style={{ color: 'white' }} 
        />
        <IconButton
          type="submit"
          aria-label="search"
        >
          <Search className="text-gray-500" size="20" />
        </IconButton>
      </div>
    </form>
  );
};

export default SearchBox;
