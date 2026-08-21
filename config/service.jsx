import axios from "axios";

const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3";

const getVideos = async (query) => {
  try {
    const apiKey = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
    if (!apiKey) {
      console.warn("No YouTube API Key found, using dynamic algorithmic fallback videos.");
      return generateDynamicPlaceholderVideos(query);
    }

    const params = {
      part: "snippet",
      q: query,
      maxResults: 4,
      type: "video",
      videoEmbeddable: true,
      key: apiKey,
    };

    const resp = await axios.get(YOUTUBE_BASE_URL + "/search", { params });
    return resp.data.items;
  } catch (error) {
    console.error(
      "YouTube API request failed:",
      error.response ? error.response.data : error.message
    );
    // Dynamic Fallback on Failure
    return generateDynamicPlaceholderVideos(query);
  }
};

// Algorithmic Fallback to prevent blank UI if API key is not yet configured or quota is exceeded
const generateDynamicPlaceholderVideos = (query) => {
  return [
    {
      id: { videoId: "w7ejDZ8SWv8" }, // Real React crash course video ID
      snippet: {
        title: `React JS Course for Beginners - (Simulated search for: ${query})`,
        thumbnails: { high: { url: "https://i.ytimg.com/vi/w7ejDZ8SWv8/hqdefault.jpg" } }
      }
    },
    {
      id: { videoId: "UB1O30fR-EE" }, // Real HTML crash course
      snippet: {
        title: `HTML Crash Course - (Simulated search for: ${query})`,
        thumbnails: { high: { url: "https://i.ytimg.com/vi/UB1O30fR-EE/hqdefault.jpg" } }
      }
    },
    {
      id: { videoId: "_uQrJ0TkZlc" }, // Real Python crash course
      snippet: {
        title: `Python for Beginners - (Simulated search for: ${query})`,
        thumbnails: { high: { url: "https://i.ytimg.com/vi/_uQrJ0TkZlc/hqdefault.jpg" } }
      }
    },
    {
      id: { videoId: "pVNqA1vHh-g" }, // Generic tech talk
      snippet: {
        title: `System Design - (Simulated search for: ${query})`,
        thumbnails: { high: { url: "https://i.ytimg.com/vi/pVNqA1vHh-g/hqdefault.jpg" } }
      }
    }
  ];
};

export default {
  getVideos,
}; 