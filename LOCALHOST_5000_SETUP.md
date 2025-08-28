# 🎵 Localhost:5000 Song Server Setup

## 🚀 **Complete Setup for Local Song Server**

### **What This Does:**
- Runs a song server on `http://localhost:5000`
- Serves your MP3 files from the `song_data` folder
- Provides URLs like `http://localhost:5000/Songdata/bollywood/tum-hi-ho.mp3`
- Enables your React app to play local songs

## 📋 **Step-by-Step Setup:**

### **Step 1: Install Server Dependencies**
```bash
# In your my_music folder
npm install express cors
```

### **Step 2: Start the Song Server**
```bash
# Start the song server on port 5000
node server.js
```

**Expected Output:**
```
🎵 Song server running on http://localhost:5000
📁 Song data available at http://localhost:5000/Songdata
🔍 Check available songs at http://localhost:5000/songs
```

### **Step 3: Test the Server**
Open your browser and visit:
- `http://localhost:5000/health` → Should show server status
- `http://localhost:5000/songs` → Should list available songs
- `http://localhost:5000/Songdata/bollywood/` → Should show bollywood folder

### **Step 4: Start Your React App**
```bash
# In a new terminal window
npm run dev
```

## 📁 **Folder Structure:**
```
my_music/
├── public/
│   └── song_data/
│       ├── bollywood/
│       │   ├── tum-hi-ho.mp3      ← Your MP3 files here
│       │   ├── raabta.mp3
│       │   └── chaleya.mp3
│       ├── hollywood/
│       │   └── my-heart-will-go-on.mp3
│       └── rock/
│           └── bohemian-rhapsody.mp3
├── server.js                       ← Song server
└── src/
    └── data/
        └── musicData.js            ← Updated with localhost:5000 URLs
```

## 🎯 **URL Format:**
```
http://localhost:5000/Songdata/{category}/{filename}.mp3

Examples:
http://localhost:5000/Songdata/bollywood/tum-hi-ho.mp3
http://localhost:5000/Songdata/hollywood/my-heart-will-go-on.mp3
http://localhost:5000/Songdata/rock/bohemian-rhapsody.mp3
```

## 🔧 **How to Add Your Songs:**

### **Option A: Quick Test (1 Song)**
1. **Get any MP3 file**
2. **Rename it** to `tum-hi-ho.mp3`
3. **Place it in** `public/song_data/bollywood/`
4. **Start both servers** and test!

### **Option B: Full Library**
1. **Add MP3 files** to each category folder
2. **Use exact filenames** from musicData.js
3. **Restart song server** after adding files
4. **Test each category**

## 🚦 **Running Both Servers:**

### **Terminal 1: Song Server (Port 5000)**
```bash
cd my_music
node server.js
```

### **Terminal 2: React App (Port 5173)**
```bash
cd my_music
npm run dev
```

## 📱 **Testing Your Setup:**

1. **Song Server:** `http://localhost:5000/health` ✅
2. **React App:** `http://localhost:5173` ✅
3. **Click any song** → Should load from localhost:5000
4. **Check browser console** for any errors

## 🔍 **Troubleshooting:**

### **If Songs Don't Play:**
1. **Check song server** is running on port 5000
2. **Verify MP3 files** exist in correct folders
3. **Check browser console** for error messages
4. **Test server URLs** directly in browser

### **Common Issues:**
- **Port 5000 in use:** Change PORT in server.js
- **CORS errors:** Server includes CORS headers
- **File not found:** Check file paths and names

## 🎵 **Expected Results:**

- ✅ **Song server** running on localhost:5000
- ✅ **MP3 files** served from song_data folders
- ✅ **React app** plays songs from local server
- ✅ **Full functionality** with progress bar, volume, etc.

## 🚀 **Quick Start Commands:**

```bash
# Terminal 1: Start Song Server
cd my_music
npm install express cors
node server.js

# Terminal 2: Start React App
cd my_music
npm run dev
```

---

**Your localhost:5000 song server is ready! 🎶**