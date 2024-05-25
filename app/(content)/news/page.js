import NewsList from "@/components/news-list";

export default async function NewsPage() {
  // fetch the news from the backend via API
  const response = await fetch('http://localhost:8080/news');

  if (!response.ok) {
    throw new Error('Failed to fetch news');
  }

  const news = await response.json();
  
  return (
    <>
      <h1>News Page</h1>
      <NewsList news={news} />
    </>
  );
}
  