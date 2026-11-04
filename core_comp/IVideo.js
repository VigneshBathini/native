import * as ImagePicker from "expo-image-picker";
import {
  Button,
  View,
  Text,
  StyleSheet,
} from "react-native";

import { useState } from "react";
import { useVideoPlayer, VideoView } from "expo-video";

// Separate component to play the uploaded video
function VideoPlayer({ uri }) {
  const player = useVideoPlayer(uri, (player) => {
    player.loop = true;
  });

  return (
    <VideoView
      player={player}
      style={styles.video}
      nativeControls
      contentFit="contain"
    />
  );
}

export default function App() {
  const [videoUrl, setVideoUrl] = useState(null);

  const uploadVideo = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        alert("Permission denied");
        return;
      }

      // Select video
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["videos"],
        quality: 1,
      });

      if (result.canceled) return;

      const video = result.assets[0];

      // Create FormData
      const formData = new FormData();

      formData.append("video", {
        uri: video.uri,
        name: video.fileName || "video.mp4",
        type: video.mimeType || "video/mp4",
      });

      // Upload video
      const response = await fetch(
        "http://192.168.29.210:5000/upload-video",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      console.log("Uploaded video URL:", data.videoUrl);

      // Store backend video URL in state
      setVideoUrl(data.videoUrl);

    } catch (error) {
      console.log("Video upload error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title="Upload Video"
        onPress={uploadVideo}
      />

      {videoUrl && (
        <View>
          <Text style={styles.heading}>Uploaded Video</Text>

          <VideoPlayer uri={videoUrl} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 100,
  },

  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 15,
  },

  video: {
    width: "100%",
    height: 250,
    backgroundColor: "black",
  },
});