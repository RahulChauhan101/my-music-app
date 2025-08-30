const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

// Enable CORS
app.use(cors());

// Serve static files from song_data folder
app.use('/Songdata', express.static(path.join(__dirname, 'public/song_data')));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: '🎵 Song server is running!' });
});

// Get all songs endpoint
app.get('/api/my_music', (req, res) => {
  try {
    // Import the music data
    const musicData = require('./src/data/musicData.js').musicData;
    
    // Transform the data to match what the frontend expects
    const transformedSongs = musicData.map(song => ({
      ...song,
      fileUrl: song.audioSrc, // Map audioSrc to fileUrl
      name: song.title, // Map title to name for compatibility
      artist: song.singer // Map singer to artist for compatibility
    }));
    
    res.json(transformedSongs);
  } catch (error) {
    console.error('Error serving music data:', error);
    res.status(500).json({ error: 'Failed to load music data' });
  }
});

// List available songs endpoint
app.get('/songs', (req, res) => {
  try {
    const songDataPath = path.join(__dirname, 'public/song_data');
    const categories = fs.readdirSync(songDataPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    res.json({
      categories,
      message: 'Available song categories',
      note: 'Add MP3 files to these folders to enable playback'
    });
  } catch (error) {
    res.json({ 
      message: 'Song data folder not found. Create public/song_data/ with category subfolders.',
      example: 'public/song_data/bollywood/tum-hi-ho.mp3'
    });
  }
});

app.listen(PORT, () => {
  console.log(`🎵 Song server running on http://localhost:${PORT}`);
  console.log(`📁 Song data available at http://localhost:${PORT}/Songdata`);
  console.log(`🔍 Check available songs at http://localhost:${PORT}/songs`);
  console.log(`💡 Add MP3 files to public/song_data/ folders to enable playback`);
});
