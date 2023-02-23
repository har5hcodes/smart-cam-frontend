import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Videos, Loader } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

import imgSrc from "../generatedSnaps/generatedGif1676824508.gif";
import AnalysisTable from "./AnalysisTable";

const VideoDetails = () => {
  const [videoDetail, setVideoDetail] = useState(null);
  const [videos, setVideos] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetchFromAPI(`videos?part=snippet,statistics&id=${id}`).then((data) =>
      setVideoDetail(data.items[0])
    );

    fetchFromAPI(`search?part=snippet&relatedToVideoId=${id}&type=video`).then(
      (data) => setVideos(data.items)
    );
  }, [id]);

  if (!videoDetail?.snippet) return <Loader />;

  const {
    snippet: { title, channelId, channelTitle },
    statistics: { viewCount, likeCount },
  } = videoDetail;

  const client1 = axios.create({
    baseURL: "http://127.0.0.1:8000/displaycode/camera/",
  });

  const client2 = axios.create({
    baseURL: " http://127.0.0.1:8000/displaycode/snapshotdetails/",
  });

  const addToDatabaseHandler = () => {
    client1
      .post("", {
        camName: channelTitle,
        camUrl: `https://www.youtube.com/watch?v=${id}`,
        camLoc: "New York",
        metadata: title,
      })
      .then((response) => {
        // setOpen(true);
        console.log("Camera Uploaded to database.", videoDetail);
      })
      .catch((error) => {
        // Error
        // setOpenError(true);
        console.log(error.request.responseText);
      });
  };

  const analyseHandler = () => {
    client2
      .post("", {
        liveStreamUrl: `https://www.youtube.com/watch?v=${id}`,
      })
      .then((response) => {
        // console.log(videoId, snippet);
      })
      .catch((error) => {
        // console.log(videoId, snippet);
        console.log(error.request.responseText);
      });
  };

  return (
    <>
      <div className="grid grid-cols-2 w-full h-full` p-5 gap-10 bg-slate-400">
        <div>
          <div>
            <ReactPlayer
              height={"40vh"}
              width={"100%"}
              url={`https://www.youtube.com/watch?v=${id}`}
              controls
            />
            <div className="font-medium text-xl tracking-wide mt-5">
              {channelTitle}
            </div>
            <div className="flex gap-4 mt-2">
              <button
                onClick={addToDatabaseHandler}
                className="bg-white py-1 px-2"
              >
                Add to Database
              </button>
              <button onClick={analyseHandler} className="bg-white py-1 px-2">
                Analyze
              </button>
            </div>
          </div>
        </div>

        <AnalysisTable />
        <div className="col-span-2 grid grid-cols-5 gap-5 p-9 ">
          <div className="w-full h-64 bg-slate-50">GR</div>
          <div className="w-full h-full bg-slate-50">GR</div>
          <div className="w-full h-full bg-slate-50">GR</div>
          <div className="w-full h-full bg-slate-50">GR</div>
          <div className="w-full h-full bg-slate-50">GR</div>
        </div>
      </div>
      {/* <Box minHeight="95vh">
        <Stack direction={{ xs: "column", md: "row" }}>
          <Box
            px={2}
            py={{ md: 1, xs: 5 }}
            justifyContent="center"
            alignItems="center"
          >
            <img src={imgSrc} style={{ width: "500px", height: "300px" }} />
          </Box>
        </Stack>
      </Box> */}
    </>
  );
};

export default VideoDetails;
