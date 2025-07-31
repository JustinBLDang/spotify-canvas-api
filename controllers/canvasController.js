import { getCanvases } from '../services/spotifyCanvasService.js';

export const fetchCanvas = async (req, res) => {
  res.set({
    'Access-Control-Allow-Origin': '*'
  });
  
  const { trackId } = req.query;
  if (!trackId) {
    return res.status(400).json({ error: 'Missing trackId parameter' });
  }

  const canvasData = await getCanvases(`spotify:track:${trackId}`);
  if (!canvasData) {
    return res.status(500).json({ error: 'Failed to fetch canvas data' });
  }
  
  if(canvasData.hasOwnProperty("canvasesList") && canvasData.canvasesList.length > 0){
    res.status(200);
  } 
  else {
    res.status(204).json({ message: 'No canvas found for track' });
  }

  // Return data
  res.json(canvasData);
};