import { useEffect, useState } from "react";
import axios from "axios";

function SingerList() {
  const [singers, setSingers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSingers = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/songs", {
          params: { category: "singer" },
        });
        setSingers(res.data);
      } catch (err) {
        setError("Failed to fetch singers");
      } finally {
        setLoading(false);
      }
    };

    fetchSingers();
  }, []);

  if (loading) return <p>Loading singers...</p>;
  if (error) return <p>{error}</p>;
  if (singers.length === 0) return <p>No singers found</p>;

  return (
    <div>
      <h2>Singers List</h2>
      <ul>
        {singers.map((song) => (
          <li key={song._id}>
            {song.artist} - {song.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SingerList;
