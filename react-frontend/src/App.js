import { useEffect, useState } from "react";

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/articles")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <h2 style={{ padding: 20 }}>Loading articles...</h2>;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>BeyondChats Articles</h1>

      {articles.length === 0 && <p>No articles found.</p>}

      {articles.map((article) => (
        <div
          key={article.id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "6px",
          }}
        >
          <h3>{article.title}</h3>
          <p>{article.content.slice(0, 300)}...</p>
          <a href={article.url} target="_blank" rel="noreferrer">
            Read original
          </a>
        </div>
      ))}
    </div>
  );
}

export default App;
