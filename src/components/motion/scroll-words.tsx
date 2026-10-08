import { Fragment } from "react";
export function ScrollWords({ text }: { text: string }) {
  return <span data-scroll-words aria-label={text}><span aria-hidden="true">{text.split(" ").map((word, index) => (
    <Fragment key={`${word}-${index}`}><span data-scroll-word>{word}</span>{" "}</Fragment>
  ))}</span></span>;
}
