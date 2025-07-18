import { getCanvases } from '../services/spotifyCanvasService.js';

export const fetchCanvas = async (req, res) => {
  const { trackId } = req.query;
  if (!trackId) {
    return res.status(400).json({ error: 'Missing trackId parameter' });
  }

  const canvasData = await getCanvases(`spotify:track:${trackId}`);
  if (!canvasData) {
    return res.status(500).json({ error: 'Failed to fetch canvas data' });
  }
  console.log(canvasData);
  canvasData.hasOwnProperty("canvasesList") ? res.status(204) : res.status(200);
    
  // Return data
  res.set({
    'Access-Control-Allow-Origin': '*'
  });
  res.json(canvasData);
};