import React, { useEffect, useState } from "react";
import Video from "react-native-video";
import RNFS from "react-native-fs";

interface AttachmentVideoPlayerProps {
  attachmentId: string;
  base64Content: string;
}

const AttachmentVideoPlayer = ({
  attachmentId,
  base64Content,
}: AttachmentVideoPlayerProps) => {
  const [isVideoReady, setIsVideoReady] = useState(false);
  const path = `file://${RNFS.DocumentDirectoryPath}/${attachmentId}.mp4`;

  useEffect(() => {
    RNFS.writeFile(path, base64Content, "base64")
      .then(() => {
        console.log("FILE WRITTEN");
        setIsVideoReady(true);
      })
      .catch((err) => {
        console.log(err.message);
      });

    return () => {
      RNFS.unlink(path)
        .then(() => {
          console.log("FILE DELETED");
        })
        // `unlink` will throw an error, if the item to unlink does not exist
        .catch((err) => {
          console.log(err.message);
        });
    };
  }, []);

  if (!isVideoReady) return null;

  return (
    <Video
      source={{ uri: path }}
      onBuffer={() => {
        console.log("RUNNING");
      }}
      onError={(err) => {
        console.log("ERROR", err);
      }}
    />
  );
};

export default AttachmentVideoPlayer;
