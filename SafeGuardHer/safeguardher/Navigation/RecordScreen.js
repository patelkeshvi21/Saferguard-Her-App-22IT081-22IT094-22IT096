import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function RecordScreen({ navigation }) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const toggleRecording = () => {
    setIsRecording((prev) => !prev);
    // Your recording logic here
  };

  const togglePlayback = () => {
    setIsPlaying((prev) => !prev);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#554288" />
      <View style={styles.navbar}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/icon-logo.png")}
            style={styles.logo}
          />
          <Text style={styles.appName}>SafeGuard Her</Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Notifications")}
          >
            <MaterialCommunityIcons name="bell" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <MaterialCommunityIcons name="account" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.content}>
        <TouchableOpacity
          style={[
            styles.controlButton,
            isRecording ? styles.recordingButton : null,
          ]}
          onPress={toggleRecording}
        >
          <Text style={styles.controlButtonText}>
            {isRecording ? "Stop Recording" : "Record"}
          </Text>
        </TouchableOpacity>
        <View style={styles.fileList}>
          <Text style={styles.fileItem}>Recording1.mp3</Text>
          <Text style={styles.fileItem}>Recording2.mp3</Text>
          <Text style={styles.fileItem}>Recording3.mp3</Text>
        </View>
        <TouchableOpacity style={styles.controlButton} onPress={togglePlayback}>
          <Text style={styles.controlButtonText}>
            {isPlaying ? "Pause Playback" : "Play Recording"}
          </Text>
        </TouchableOpacity>
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>{formatTime(timer)}</Text>
        </View>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progress,
              { width: (timer / 60) * 200 }, // Assuming 60 seconds is the max duration
            ]}
          ></View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdd9e4",
  },
  navbar: {
    backgroundColor: "#554288",
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 1,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  appName: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
    tintColor: "#fff",
  },
  iconContainer: {
    flexDirection: "row",
    gap: 15,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  controlButton: {
    backgroundColor: "#554288",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
  },
  recordingButton: {
    backgroundColor: "#FF0000", // Change color when recording
  },
  controlButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  fileList: {
    marginBottom: 20,
  },
  fileItem: {
    fontSize: 16,
    marginBottom: 10,
  },
  timerContainer: {
    marginBottom: 10,
  },
  timerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  progressBar: {
    backgroundColor: "#ddd",
    width: 200,
    height: 10,
    borderRadius: 5,
  },
  progress: {
    backgroundColor: "#554288",
    height: 10,
    borderRadius: 5,
  },
});
