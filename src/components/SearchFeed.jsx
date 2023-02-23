import { useState, useEffect } from "react";
import { Typography, Box } from "@mui/material";
import { useParams } from "react-router-dom";

import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos } from "./";

const SearchFeed = () => {
  const [videos, setVideos] = useState(null);
  const { searchTerm } = useParams();

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${searchTerm}`).then((data) =>
      setVideos(data.items)
    );
  }, [searchTerm]);
  return (
    <div>
      <div className="text-2xl tracking-wide font-bold px-10 py-5">
        Search Results for
        <span style={{ color: "#FC1503" }}> {searchTerm}</span> videos
      </div>

      {<Videos videos={videos} />}
    </div>
  );
};

export default SearchFeed;
