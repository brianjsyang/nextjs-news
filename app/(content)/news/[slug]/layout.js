// Want to create a modal backdrop display. Meaning need shared layout of the news details
// Make use of the parralel routing with @modal
export default function NewsDetailLayout({ children, modal }) {
  return (
    <>
      {modal}
      {children}
    </>
  );
}