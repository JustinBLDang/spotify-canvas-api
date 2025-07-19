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
  
  canvasData.hasOwnProperty("canvasesList") && canvasData.canvasesList.length > 0 ? res.status(200) : res.status(204);
    
  // Return data
  res.set({
    'Access-Control-Allow-Origin': '*'
  });
  res.json(canvasData);
};