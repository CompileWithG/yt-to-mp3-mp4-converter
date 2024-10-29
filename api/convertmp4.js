import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { url } = req.body.url; // Ensure this is in the body of the request
  const id = getYouTubeVideoId(url);
  const apiUrl = `https://ytstream-download-youtube-videos.p.rapidapi.com/dl?id=${id}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "YOUR_RAPIDAPI_KEY",
      "x-rapidapi-host": "ytstream-download-youtube-videos.p.rapidapi.com",
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
}

const getYouTubeVideoId = (url) => {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};
