import NewsList from "@/components/news-list";
import { getLatestNews } from "@/lib/news"

// Setting up to be "Parallel Routing"
export default function LatestNewsPage() {
  const latestNews = getLatestNews();

  return (
    <>
        <h1>Latest News</h1>
        <NewsList news={latestNews} />
    </>
  )
}

/**
 * when dealing with parralel, this is used if one parralel does not support the same route as other parralel routes.
 * In this case, @latest should not have [year] like @archive does, so @latest should fallback to this default
 * 
 * IF default.js simply prints the same content as page.js, page.js can be deleted.
 */