import { notFound } from "next/navigation";
import { getNewsItem } from "@/lib/news";

export default async function ImagePage({ params }) {
  const newsItemSlug = params.slug; // this still has access to the [slug] because it is the child page.
  const newsItem = await getNewsItem(newsItemSlug) // find a news article identical to slug

  if (!newsItem) {
    notFound(); // redirect to closest not found content, if newsItem is false.
  }

  return (
    <div className="fullscreen-image">
      <img src={`/images/news/${newsItem.image}`} alt={newsItem.title}/>
    </div>
  )
}