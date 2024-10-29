import express from "express";
import fetch from "node-fetch";
import cors from "cors"; // Import cors

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON requests

// Handle preflight requests (not necessary if using cors middleware)
app.options("*", cors()); // Respond to preflight request with CORS headers

// Convert to MP3
app.post("/api/convertmp3", async (req, res) => {
  const url1 = req.body.url;
  const id = getYouTubeVideoId(url1);
  const apiUrl = `https://youtube-mp36.p.rapidapi.com/dl?id=${id}`;

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "3f14faab52msh020e7711e01fb09p1ae353jsn8c6ca3c9e0e6",
      "x-rapidapi-host": "youtube-mp36.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(apiUrl, options);
    const result = await response.json();
    res.json(result); // Respond with JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Conversion failed" });
  }
});

// Convert to MP4
app.post("/api/convertmp4", async (req, res) => {
  const { url } = req.body; // Ensure this is in the body of the request
  const id = getYouTubeVideoId(url);
  const apiUrl = `https://ytstream-download-youtube-videos.p.rapidapi.com/dl?id=${id}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "3f14faab52msh020e7711e01fb09p1ae353jsn8c6ca3c9e0e6",
      "x-rapidapi-host": "ytstream-download-youtube-videos.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(apiUrl, options);
    const result = await response.json();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Conversion failed" });
  }
});

// Helper function to extract the video ID
const getYouTubeVideoId = (url) => {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
