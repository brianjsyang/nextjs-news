'use client';

// This is intercepting router
// Syntax is ()filenameToIntercept
// This page will show only directed internally.
import { notFound } from "next/navigation";
import { DUMMY_NEWS } from "@/dummy-news";
import { useRouter } from "next/navigation";

export default function InterceptedImagePage({ params }) {
  const router = useRouter(); // programmic navigation

  const newsItemSlug = params.slug; // this still has access to the [slug] because it is the child page.
  const newsItem = DUMMY_NEWS.find(newsItem => newsItem.slug === newsItemSlug) // find a news article identical to slug

  if (!newsItem) {
    notFound(); // redirect to closest not found content, if newsItem is false.
  }

  return (
    <>
      <div className="modal-backdrop" onClick={router.back}/>
      <dialog className="modal" open>
        <div className="fullscreen-image">
          <img src={`/images/news/${newsItem.image}`} alt={newsItem.title}/>
        </div>
      </dialog>
    </>
  )
}