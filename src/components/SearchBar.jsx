import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  IconButton,
  Button,
  Box,
  Modal,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const client = axios.create({
  baseURL: "http://127.0.0.1:8000/displaycode/camera/",
});

const SearchBar = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [webcamName, setWebcamName] = useState("");
  const [webcamUrl, setWebcamUrl] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const onhandleSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      navigate(`/search/${searchTerm}`);
      setSearchTerm("");
    }
  };

  const SubmitWebcamHandler = () => {
    client
      .post("", {
        camName: webcamName,
        camUrl: webcamUrl,
      })
      .then((response) => {
        console.log("Uploaded");
      })
      .catch((error) => {
        // Error
        console.log(error.request.responseText);
      });
    setWebcamName("");
    setWebcamUrl("");
  };

  return (
    <form
      onSubmit={onhandleSubmit}
      className="w-1/2 flex justify-center items-center "
    >
      <input
        className="w-full h-10 px-5 "
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
