// /api/convertmp3.js
import fetch from "node-fetch";
import cors from "cors";

const handler = async (req, res) => {
  // Allow only POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

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
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Conversion failed" });
  }
};

const getYouTubeVideoId = (url) => {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export default handler;
