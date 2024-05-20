"use client"; // error.js must be client componenets, as error can occure while interacting with user as well.

export default function FilterError({error}) {
  return (
    <div id="error">
      <h2>An error occured!</h2>
      <p>{error.message}</p>
    </div>
  )
}