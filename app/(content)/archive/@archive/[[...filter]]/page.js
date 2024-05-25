import { Suspense } from "react";
import NewsList from "@/components/news-list";
import Link from "next/link";
import { getAvailableNewsMonths, getAvailableNewsYears, getNewsForYear, getNewsForYearAndMonth } from "@/lib/news";

async function FilteredNews({year, month}) {
  let news;

  if (year && !month) {
    news  = await getNewsForYear(year);
  } else if (year && month) {
    news = await getNewsForYearAndMonth(year, month)
  }

  // get list of news ... or fallback text if none.
  let newsContent = <p>No news found for the selected period.</p>
  if (news && news.length > 0) {
    newsContent = <NewsList news={news} />
  }

  return newsContent;
}

async function FilterHeader({year, month}) {
  const availabeYears = await getAvailableNewsYears();
  let links = availabeYears; // by default, get all years of the available news.

  // validate proper url
  if (
    (year   && !availabeYears.includes(year)) || 
    (month  && !getAvailableNewsMonths(year).includes(month))
  ) {
    throw new Error('Invalid Filter.');
  }

  if (year && !month) {
    // we just have year ... display all news from the year, and replace year links to months.
    links = getAvailableNewsMonths(year);
  }
  if (year && month) {
    links = []; // don't want to load links when at the deepest level.
  }

  return (
    <header id="archive-header">
        <nav>
          <ul>
            {links.map(link => {
              const href = year ? `/archive/${year}/${link}` : `/archive/${link}`; // in url, month should come AFTER selected year.

              return (
                <li key={link}>
                  <Link href={href}>{link}</Link>
                </li>
              )}
            )}
          </ul>
        </nav>
      </header>
  )
}


export default async function FilteredNewsPage({params}) {
  // filter returns array of all matched URL segments.
  const filter = params.filter; // `/archive/2024/03` => ['2024', '03']

  const selectedYear  = filter?.[0]; // access the first index IF filter is defined.
  const selectedMonth = filter?.[1];

  return (
    <>
      <Suspense fallback={<p>Loading filter with Suspense...</p>}>
        <FilterHeader year={selectedYear} month={selectedMonth}/>
      </Suspense>
      <Suspense fallback={<p>Loading News with Suspense ...</p>}>
        <FilteredNews year={selectedYear} month={selectedMonth}/>
      </Suspense>
    </>
  );
}


/**
 * By default, `/archive/2024` will return 404.
 * Still rendered same as @latest, meaning because @latest does not support [year] - returns 404.
 * Must keep in mind, parralel routing must support all sub routings too, like [year].
 * 
 * "Catch-All" files. Catches ALL segments after `/archive/`
 * Syntax: [[...filter]]
 * 
 * Error: You cannot define a route with the same specificity as a optional catch-all route ("/archive" and "/archive[[...filter]]")
 * We have conflicting page.js because when visting /archive, /archive/page.js will load.
 * However, Catch-All means it will also try to load /archive/[[...filter]]/page.js!
 * SOLUTION: Now only use the page.js under the Catch-All file.
 */