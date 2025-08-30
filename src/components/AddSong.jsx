import { useState } from "react";
import axios from "axios";
import "./AddSong.css";

const AddSong = () => {
  const [form, setForm] = useState({
    title: "",
    artist: "",
    album: "",
    genre: "",
    category: "all",
    url: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/songs", form);
      alert("✅ Song added: " + res.data.title);
      setForm({ title: "", artist: "", album: "", genre: "", category: "all", url: "" });
    } catch (err) {
      alert("❌ Failed to add song");
    }
  };

  return (
    <form className="add-song-form" onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
      <input name="artist" placeholder="Artist" value={form.artist} onChange={handleChange} />
      <input name="album" placeholder="Album" value={form.album} onChange={handleChange} />
      <input name="genre" placeholder="Genre" value={form.genre} onChange={handleChange} />
      <select name="category" value={form.category} onChange={handleChange}>
        <option value="all">All</option>
        <option value="singer">Singer</option>
        <option value="actor">Actor</option>
        <option value="actress">Actress</option>
        <option value="movie">Movie</option>
        <option value="album">Album</option>
        <option value="genre">Genre</option>
        <option value="playlist">Playlist</option>
        <option value="favorites">Favorites</option>
        <option value="recent">Recently Played</option>
      </select>
      <input name="url" placeholder="Song URL" value={form.url} onChange={handleChange} />
      <button type="submit">➕ Add Song</button>
    </form>
  );
};

export default AddSong;
