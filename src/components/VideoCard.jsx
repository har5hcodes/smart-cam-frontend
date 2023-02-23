import React, { useEffect, useState } from "react";
import axios from "axios";
import { useVisibility } from "reactjs-visibility";
import ProgressBar from "bootstrap-progress-bar";

import { Link } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Modal,
  Box,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckBoxSharpIcon from "@mui/icons-material/CheckBox";

import {
  demoThumbnailUrl,
  demoVideoUrl,
  demoChannelUrl,
  demoChannelTitle,
} from "../utils/constants";
import HoverVideoPlayer from "react-hover-video-player";

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

const VideoCard = ({
  video: {
    id: { videoId },
    snippet,
  },
  addFilterHandler,
}) => {
  const [open, setOpen] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCloseError = () => setOpenError(false);

  const [progressBarValue, setProgressBarValue] = useState(0);

  const [openAnalyseLoader, setOpenAnalyseLoader] = useState(false);
  const handleCloseAnalyseLoader = () => setOpenAnalyseLoader(false);
  const [prevAnalysed, setPrevAnalysed] = useState(false);
  const [analyseMessage, setAnalyseMessage] = useState("Processing.....");

  const [existsInDatabase, setExistsInDatabase] = useState(false);

  const [gifUrl, setGifUrl] = useState("");

  const description = snippet.description.slice(0, 25);
  const { removeStopwords } = require("stopword");
  const oldString = description.split(" ");
  const tagsList = removeStopwords(oldString);

  const client1 = axios.create({
    baseURL: "http://127.0.0.1:8000/displaycode/camera/",
  });

  const client2 = axios.create({
    baseURL: " http://127.0.0.1:8000/displaycode/snapshotdetails/",
  });

  const addToDatabaseHandler = () => {
    client1
      .post("", {
        camName: snippet.title,
        camUrl: `https://www.youtube.com/watch?v=${videoId}`,
        camLoc: "New York",
        metadata: snippet.description,
      })
      .then((response) => {
        setOpen(true);
        console.log("Camera Uploaded to database.", snippet);
      })
      .catch((error) => {
        // Error
        setOpenError(true);
        console.log(error.request.responseText);
      });
  };

  const analyseHandler = () => {
    setOpenAnalyseLoader(true);
    client2
      .post("", {
        liveStreamUrl: `https://www.youtube.com/watch?v=${videoId}`,
      })
      .then((response) => {
        setAnalyseMessage("Completed. You can view the latest GIF.");
        console.log(videoId, snippet);
      })
      .catch((error) => {
        console.log(videoId, snippet);
        console.log(error.request.responseText);
      });
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/displaycode/snapshotdetails/")
      .then((res) => res.json())
      .then((data) => {
        let flag = data.find(
          (snapshot) =>
            snapshot.liveStreamUrl ===
            `https://www.youtube.com/watch?v=${videoId}`
        );
        if (flag !== undefined) {
          setPrevAnalysed(true);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [prevAnalysed]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/displaycode/camera/")
      .then((res) => res.json())
      .then((data) => {
        let flag = data.find(
          (cameraDetail) =>
            cameraDetail.camUrl === `https://www.youtube.com/watch?v=${videoId}`
        );
        if (flag !== undefined) setExistsInDatabase(true);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [open]);
  return (
    <>
      <div className="h-1/4 bg-slate-400 flex-col justify-start">
        <Link to={videoId ? `/video/${videoId}` : demoVideoUrl}>
          <video
            className="w-80"
            poster={snippet.thumbnails.high.url}
            muted
            loop
            onMouseOver={(event) => event.target.play()}
            onMouseOut={(event) => event.target.pause()}
          >
            <source
              src="../generatedSnaps/generatedGif1676823648.gif"
              type="video/mp4"
            />
          </video>
        </Link>
        <div className="pl-4 pt-2 pb-4 flex-col ">
          <div className="overflow-hidden flex gap-1 mb-3">
            {tagsList.map((tag, index) => {
              if (tag.length > 0) {
                return (
                  <div
                    key={index}
                    className="bg-white  px-3 rounded-md text-sm cursor-pointer"
                    onClick={() => {
                      addFilterHandler(tag);
                    }}
                  >
                    {tag}
                  </div>
                );
              }
            })}
          </div>
          <div className="font-medium text-xl tracking-normal">
            {snippet?.channelTitle || demoChannelTitle}
          </div>
          {prevAnalysed && <div className="text-sm mb-3">You can hover.</div>}
          {!prevAnalysed && (
            <div className="text-sm mb-3">
              Click on analyse to generate a gif.
            </div>
          )}
          <div className="flex gap-4 ">
            {!existsInDatabase && (
              <button
                onClick={addToDatabaseHandler}
                className="bg-white py-1 px-2"
              >
                Add to Database
              </button>
            )}
            <button onClick={analyseHandler} className="bg-white py-1 px-2">
              Analyse
            </button>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Successfully sent to backend
            </Typography>
            <CheckBoxSharpIcon sx={{ color: "green", fontSize: "48px" }} />
          </Box>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Our backend will start taking snapshots of the stream in intervals.
          </Typography>
        </Box>
      </Modal>

      <Modal
        open={openError}
        onClose={handleCloseError}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              camera with this camUrl already exists.
            </Typography>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={openAnalyseLoader}
        onClose={handleCloseAnalyseLoader}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{analyseMessage}</Box>
      </Modal>
    </>
  );
};

export default VideoCard;
