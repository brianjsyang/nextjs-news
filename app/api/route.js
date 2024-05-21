// another reserved file name ... for Route Handler!
// setup API routes - produce and/or store data.
export function GET(request) {
  console.log(request);

  return new Response('Hello!'); // response object provided by browser & node
}