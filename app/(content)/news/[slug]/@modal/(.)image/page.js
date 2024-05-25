// This is intercepting router
// Syntax is ()filenameToIntercept
// This page will show only directed internally.
import { notFound } from "next/navigation";
import ModalBackdrop from "@/components/modal-backdrop";
import { getNewsItem } from "@/lib/news";

export default async function InterceptedImagePage({ params }) {
  const newsItemSlug = params.slug; // this still has access to the [slug] because it is the child page.
  const newsItem = await getNewsItem(newsItemSlug) // find a news article identical to slug

  if (!newsItem) {
    notFound(); // redirect to closest not found content, if newsItem is false.
  }

  return (
    <>
      <ModalBackdrop />
      <dialog className="modal" open>
        <div className="fullscreen-image">
          <img src={`/images/news/${newsItem.image}`} alt={newsItem.title}/>
        </div>
      </dialog>
    </>
  )
}