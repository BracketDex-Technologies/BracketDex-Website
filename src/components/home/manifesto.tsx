import { ScrollWords } from "@/components/motion/scroll-words";
export function Manifesto({ text }: { text: string }) {
  return <section className="bd-manifesto" aria-labelledby="manifesto-heading"><div className="bd-manifesto-sticky content-shell">
    <p className="bd-scene-label">( Our purpose )</p>
    <h2 id="manifesto-heading"><ScrollWords text={text} /></h2>
    <p className="bd-scene-label">BracketDex Technologies · Built around your business</p>
  </div></section>;
}
