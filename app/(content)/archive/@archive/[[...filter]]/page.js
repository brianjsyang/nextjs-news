import NewsList from "@/components/news-list";
import Link from "next/link";
import { getAvailableNewsMonths, getAvailableNewsYears, getNewsForYear, getNewsForYearAndMonth } from "@/lib/news";

export default async function FilteredNewsPage({params}) {
  // filter returns array of all matched URL segments.
  const filter = params.filter; // `/archive/2024/03` => ['2024', '03']

  const selectedYear  = filter?.[0]; // access the first index IF filter is defined.
  const selectedMonth = filter?.[1];

  let news;
  let links = await getAvailableNewsYears(); // by default, get all years of the available news.


  if (selectedYear && !selectedMonth) {
    // we just have year ... display all news from the year, and replace year links to months.
    news  = await getNewsForYear(selectedYear);
    links = getAvailableNewsMonths(selectedYear);
  }
  if (selectedYear && selectedMonth) {
    news = await getNewsForYearAndMonth(selectedYear, selectedMonth);
    links = []; // don't want to load links when at the deepest level.
  }

  // get list of news ... or fallback text if none.
  let newsContent = <p>No news found for the selected period.</p>
  if (news && news.length > 0) {
    newsContent = <NewsList news={news} />
  }
 

  // validate proper url
  const availabeYears = await getAvailableNewsYears();
  if (
    (selectedYear   && !availabeYears.includes(selectedYear)) || 
    (selectedMonth  && !getAvailableNewsMonths(selectedYear).includes(selectedMonth))
  ) {
    throw new Error('Invalid Filter.');
  }

  return (
    <>
      <header id="archive-header">
        <nav>
          <ul>
            {links.map(link => {
              const href = selectedYear ? `/archive/${selectedYear}/${link}` : `/archive/${link}`; // in url, month should come AFTER selected year.

              return (
                <li key={link}>
                  <Link href={href}>{link}</Link>
                </li>
              )}
            )}
          </ul>
        </nav>
      </header>
      {newsContent}
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