import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import fetch from "node-fetch";

const app = express();
app.use(
  cors({
    origin: ["https://yt-to-mp3-mp4-converter.vercel.app/"],
  })
);

app.use(express.json());

function getYouTubeVideoId(url) {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}
// Serve the HTML file

app.post("/convertmp4", async (req, res) => {
  const url1 = req.body.url;
  const id = getYouTubeVideoId(url1);
  const url = `https://ytstream-download-youtube-videos.p.rapidapi.com/dl?id=${id}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "3f14faab52msh020e7711e01fb09p1ae353jsn8c6ca3c9e0e6",
      "x-rapidapi-host": "ytstream-download-youtube-videos.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Conversion failed" });
  }
});
// POST endpoint for conversion
app.post("/convertmp3", async (req, res) => {
  const url1 = req.body.url;
  const id = getYouTubeVideoId(url1);
  const url = `https://youtube-mp36.p.rapidapi.com/dl?id=${id}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "3f14faab52msh020e7711e01fb09p1ae353jsn8c6ca3c9e0e6",
      "x-rapidapi-host": "youtube-mp36.p.rapidapi.com",
    },
  };
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Conversion failed" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
