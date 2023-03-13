import React from "react";
import { WebView } from "react-native-webview";
import { StyleSheet, View } from "react-native";

interface AttachmentVideoPlayerProps {
  base64Content: string;
}

const AttachmentVideoPlayer = ({
  base64Content,
}: AttachmentVideoPlayerProps) => {
  return (
    <View style={styles.container}>
      {/* @ts-ignore */}
      <WebView
        source={{
          html: `
        <html>
            <body>
                <video width="100%" controls controlsList="nodownload">
                    <source type="video/mp4" src="data:video/mp4;base64,${base64Content}">
                </video>
            </body>
        </html>
        `,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 400,
    width: "100%",
    paddingHorizontal: 24,
  },
});

export default AttachmentVideoPlayer;
