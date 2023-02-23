import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";

import {
  ChannelDetail,
  VideoDetails,
  SearchFeed,
  Navbar,
  Feed,
} from "./components";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

const App = () => (
  <BrowserRouter>
    <Box className="bg-slate-100">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Feed />} />
        <Route path="/video/:id" element={<VideoDetails />} />
        <Route path="/channel/:id" element={<ChannelDetail />} />
        <Route path="/search/:searchTerm" element={<SearchFeed />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Box>
  </BrowserRouter>
);

export default App;
