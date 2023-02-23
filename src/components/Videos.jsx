import React from "react";
import { Stack, Box } from "@mui/material";

import { ChannelCard, Loader, VideoCard } from "./";

const Videos = ({ videos, direction, addFilterHandler }) => {
  if (!videos?.length) return <Loader />;
  console.log(videos, "videos");
  return (
    <div className="grid grid-cols-8  gap-y-8 place-items-center ">
      {videos.map((item, idx) => {
        if (item.snippet.liveBroadcastContent !== "none") {
          return (
            <div key={idx} className="col-span-2">
              {item.id.videoId && (
                <VideoCard video={item} addFilterHandler={addFilterHandler} />
              )}
              {/* {item.id.channelId && <ChannelCard channelDetail={item} />} */}
            </div>
          );
        }
      })}
    </div>
  );
};

export default Videos;
