import axios from "axios";

async function run() {
  const response = await axios.get(
    "http://localhost:8000/api/articles/latest"
  );

  const article = response.data[0];

  console.log("Original title:", article.title);
  console.log("Original content length:", article.content.length);

  // Simulated AI rewrite
  const updatedContent =
    article.content + "\n\n[AI-enhanced version – placeholder]";

  console.log("Updated content length:", updatedContent.length);
}

run();
