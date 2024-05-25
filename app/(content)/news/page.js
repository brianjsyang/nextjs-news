import NewsList from "@/components/news-list";
import { getAllNews } from "@/lib/news";

export default async function NewsPage() {
  // fetch the news from the backend via API
  // we are in the server already, so fetching data server-side is perfectly valid.
  const news = await getAllNews();

  return (
    <>
      <h1>News Page</h1>
      <NewsList news={news} />
    </>
  );
}
  