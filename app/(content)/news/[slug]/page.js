import { DUMMY_NEWS } from "@/dummy-news";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function NewsDetailPage({params}) {
  const newsSlug = params.slug; // params object passed by NextJS.
  const newsItem = DUMMY_NEWS.find(newsItem => newsItem.slug === newsSlug) // find a news article identical to slug

  if (!newsItem) {
    notFound(); // redirect to closest not found content, if newsItem is false.
  }

  return (
    <article className="news-article">
      <header>
        <Link href={`/news/${newsItem.slug}/image`}>
          <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
        </Link>
        <h1>{newsItem.title}</h1>
        <time dateTime={newsItem.date}>{newsItem.date}</time>
      </header>
      <p>{newsItem.content}</p>
    </article>
  );
}