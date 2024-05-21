// @modal parallel route needs a default export in case there is no modal to display.
// in this case, we don't want to show anyhting at all - but still needs explicit definition
export default function ModalDefaultPage() {
  return null;
}