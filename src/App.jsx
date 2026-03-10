import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [errorText, setErrorText] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchSolutions = async () => {

    if (!errorText) return;

    setLoading(true);

    try {

      const response = await axios.get(
        "https://codestackradar-api-production.up.railway.app/api/search?q=" + encodeURIComponent(errorText)
      );

      setResults(response.data);

    } catch (err) {

      console.error(err);

    }

    setLoading(false);

  };

  return (
    <div className="container">

      <h1>CodeStackRadar</h1>

      <p className="subtitle">
        Detect solutions for coding errors instantly
      </p>

      <textarea
        placeholder="Paste your error message here..."
        value={errorText}
        onChange={(e) => setErrorText(e.target.value)}
      />

      <button onClick={searchSolutions}>
        Search Solutions
      </button>

      {loading && <p>Searching StackOverflow...</p>}

      <div className="results">

        {results.map((item) => (

          <div className="result-card" key={item.question_id}>

            <a href={item.link} target="_blank">

              {item.title}

            </a>

          </div>

        ))}

      </div>

    </div>
  );
}

export default App;
