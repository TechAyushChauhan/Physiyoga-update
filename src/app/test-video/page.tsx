"use client";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import Replay10Icon from "@mui/icons-material/Replay10";
import Forward10Icon from "@mui/icons-material/Forward10";
import { default as VideoPlayer } from 'react-player';

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};
// const proxyUrl = `/api/test`; 

const Home = ({ videoUrl:string }) => {
  // const [url, setUrl] = useState<string>(
  //  'http://localhost:3000/api/test'
  // );
  const [playing, setPlaying] = useState<boolean>(false);
  // const [volume, setVolume] = useState<number>(0.8);
  const [muted, setMuted] = useState<boolean>(false);
  const [loop, setLoop] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [played, setPlayed] = useState<number>(0);
  const [controlsVisible, setControlsVisible] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showPlayOverlay, setShowPlayOverlay] = useState<boolean>(false);
  const playerRef = useRef<VideoPlayer | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const clickTimeout = useRef<NodeJS.Timeout | null>(null);
  const [skipMessage, setSkipMessage] = useState<string | null>(null);
  const TELEGRAM_API_URL = 'https://api.telegram.org/bot7580167715:AAEqAfsidqgvNtqvPsxnUSs9UqBbRiiWqLA/';

async function getTelegramFileUrl() {
  const fileId='BAACAgUAAxkDAAMHZ10vfzuHT0WL903yQb_Fw2dFJVkAAt4RAALFSelWHglmJ05JzAo2BA'
  const response = await fetch(`${TELEGRAM_API_URL}getFile?file_id=${fileId}`);
  const data = await response.json();
  console.log(data);
  // setUrl(`https://api.telegram.org/file/7580167715:AAEqAfsidqgvNtqvPsxnUSs9UqBbRiiWqLA/videos/file_0.mp4`)
  if (data.ok) {
    return `https://api.telegram.org/file/7580167715:AAEqAfsidqgvNtqvPsxnUSs9UqBbRiiWqLA/videos/file_0.mp4`;
  } else {
    throw new Error('Failed to fetch file from Telegram');
  }
}
useEffect(()=>{
  getTelegramFileUrl()
},[])


  

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setPlayed(newTime / duration);
    if (playerRef.current) {
      playerRef.current.seekTo(newTime);
    }
  
  };

  const handlePlayPause = () => setPlaying((prev) => !prev);
  const handleMutedChange = () => setMuted((prev) => !prev);
  const handleLoopChange = () => setLoop((prev) => !prev);

  const handleProgress = (state: { played: number }) => {
    if (!controlsVisible) setControlsVisible(true);
    setPlayed(state.played);
  };

  const handleDuration = (duration: number) => setDuration(duration);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      containerRef.current?.requestFullscreen().catch((err) => {
        console.error("Failed to enter fullscreen:", err);
      });
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch((err) => {
          console.error("Failed to exit fullscreen:", err);
        });
      } else {
        console.log("Document is not in fullscreen mode");
      }
    }
    setIsFullscreen((prev) => !prev);
  };

  // Skip Backward 10 Seconds
  const handleSkipBackward = () => {
    if (playerRef.current) {
    const currentTime = playerRef.current.getCurrentTime();
    const newTime = Math.max(currentTime - 10, 0);
    setSkipMessage("Skipped Backward 10 Seconds");
    playerRef.current.seekTo(newTime);
    setPlayed(newTime / duration);
    setTimeout(() => setSkipMessage(null), 2000);}
  };

  // Skip Forward 10 Seconds
  const handleSkipForward = () => {
    if (playerRef.current) {
    const currentTime = playerRef.current.getCurrentTime();
    const newTime = Math.min(currentTime + 10, duration);
    playerRef.current.seekTo(newTime);
    setPlayed(newTime / duration);
    setSkipMessage("Skipped Forward 10 Seconds");
  setTimeout(() => setSkipMessage(null), 2000); }
  };

  // Handle Clicks
  const handleClick = (e: React.MouseEvent) => {
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;
      // Double Click: Forward or Backward
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        if (e.clientX < rect.width / 2) {
          handleSkipBackward();
        } else {
          handleSkipForward();
        }
      }
    } else {
      // Single Click: Show Play Overlay
      clickTimeout.current = setTimeout(() => {
        setShowPlayOverlay(true);
        setTimeout(() => setShowPlayOverlay(false), 4000); // Hide after 1 second
        clickTimeout.current = null;
      }, 300); 
    }
  };
  console.log(showPlayOverlay ,playing)

  return (
    <div style={{ padding: "20px" }}>
      <h1>ReactPlayer Demo</h1>
      <div
        ref={containerRef}
        style={{
          position: "relative",
          width: "100%",
          height: isFullscreen ? "100vh" : "500px",
          background: "#000",
          margin: "20px 0",
          overflow: "hidden",
        }}
        onClick={handleClick}
      >
        <ReactPlayer
          ref={playerRef}
          url={url}
          playing={playing}
          volume={1}
          loop={loop}
          muted={muted}
          onDuration={handleDuration}
          onProgress={handleProgress}
          width="100%"
          height="100%"
          controls={false}
           config={{
          youtube: {
            playerVars: {
              modestbranding: 1, // Minimizes the YouTube logo
              rel: 0, // Prevents showing related videos
              showinfo: 0, // Hides video title and uploader
              controls: 0, // Hides player controls
              autoplay: 0, // Prevents auto-play
            },
          },
        }}
        />
        {skipMessage && (
  <div
    style={{
      position: "absolute",
      top: "10%",
      left: "50%",
      transform: "translateX(-50%)",
      background: "rgba(0, 0, 0, 0.7)",
      color: "white",
      padding: "10px 20px",
      borderRadius: "5px",
      zIndex: 20,
      fontSize: "16px",
    }}
  >
    {skipMessage}
  </div>
)}

        {/* Play Overlay */}
        {(showPlayOverlay|| !playing )&& (
          <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 10,
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "150px",
            height: "150px",
            backgroundColor: "rgba(0, 0, 0, 0.5)", 
            borderRadius: "50%", 
          }}
          onClick={(e) => {
            e.stopPropagation(); 
            handlePlayPause(); 
          }}
          >
            {playing ? (
              <PauseIcon  style={{ fontSize: 100, color: "white" }} />
            ) : (
              <PlayArrowIcon style={{ fontSize: 100, color: "white" }} />
            )}
          </div>
        )}

        {(showPlayOverlay ) && (
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              width: "100%",
              background: "rgba(0, 0, 0, 0.5)",
              padding: "10px",
              color: "#fff",
              zIndex: 10,
            }}
          >
            {/* Progress Bar */}
            <input
              type="range"
              min="0"
              max={duration}
              step="0.1"
              value={played * duration}
              onChange={handleSeek}
              style={{ width: "100%" }}
            />

            {/* Control Buttons */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <button onClick={handlePlayPause}>
                  {playing ? (
                    <PauseIcon style={{ fontSize: 50, color: "blue" }} />
                  ) : (
                    <PlayArrowIcon style={{ fontSize: 50, color: "blue" }} />
                  )}
                </button>
                <span>
                  {formatTime(played * duration)} / {formatTime(duration)}
                </span>
                <button onClick={handleMutedChange}>
                  {muted ? "Unmute" : "Mute"}
                </button>
              </div>

              <div>
                <button onClick={handleSkipBackward}>
                  <Replay10Icon style={{ fontSize: 40, color: "orange" }} />
                </button>
                <button onClick={handleSkipForward}>
                  <Forward10Icon style={{ fontSize: 40, color: "orange" }} />
                </button>
                <button onClick={handleLoopChange}>
                  {loop ? "Disable Loop" : "Enable Loop"}
                </button>
                <button onClick={toggleFullscreen}>
                  {isFullscreen ? (
                    <FullscreenExitIcon
                      style={{ fontSize: 40, color: "green" }}
                    />
                  ) : (
                    <FullscreenIcon style={{ fontSize: 40, color: "green" }} />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* URL Input */}
      <div>
        <h3>Enter Video URL</h3>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter video URL"
        />
        <button onClick={() => setUrl(url)}>Load</button>
      </div>
    </div>
  );
};

export default Home;
