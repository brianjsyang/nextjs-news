export default function ArchiveLayout({archive, latest}) {
  // setting up for parallel routing.
  // one prop PER paraell route, named after the @ folder.

  /**
   * What's the point?
   * Make sure that "Archive" area can dig deeper ... e.g. list by years
   */
  return <div>
    <h1>News Archive</h1>
    <section id="archive-filter">
      {archive}
    </section>
    <section id="archive-latest">
      {latest}
    </section>
  </div>
}